var formRoutes = {
    '#rsvp-names': {
        'next': '#rsvp-attending'
    },
    '#rsvp-attending': {
        'next': {
            'yes': '#rsvp-dietaryRequirements',
            'no': '#rsvp-excuses'
        },
        'previous': '#rsvp-names'
    },
    '#rsvp-dietaryRequirements': {
        'previous': '#rsvp-attending',
        'next': '#rsvp-songs'
    },
    '#rsvp-songs': {
        'previous': '#rsvp-dietaryRequirements',
        'next': '#rsvp-messages'
    },
    '#rsvp-messages': {
        'previous': '#rsvp-songs',
        'next': '#rsvp-complete'
    },
    '#rsvp-excuses': {
        'previous': '#rsvp-attending',
        'next': '#rsvp-yourLoss'
    },
    '#rsvp-yourLoss': {
        'previous': '#rsvp-excuses'
    },
    '#rsvp-complete': {
        'previous': '#rsvp-messages',
    }
};

// TODO: Switch off Enter key as submit
var currentStepId = '#rsvp-names';
var numberOfPeople = 1;

$('.js-next').on('click', function() {
    if (currentStepId === '#rsvp-attending') {
        var attending = $(currentStepId + ' input[name=attending]:checked').val();
        var newStepId = formRoutes['#rsvp-attending']['next'][attending];
    } else {
        var newStepId = formRoutes[currentStepId]['next'];
    }
    // TODO: Validate names
    // TODO: Update fields for #rsvp-dietaryRequirements and #rsvp-songs
    gotoStep(newStepId);
});

$('.js-previous').on('click', function() {
    var newStepId = formRoutes[currentStepId]['previous'];
    gotoStep(newStepId);
});

function gotoStep(newStepId) {
    $(currentStepId).addClass('hidden');
    currentStepId = newStepId;
    if ('next' in formRoutes[currentStepId]) {
        $('.js-next').removeClass('hidden');
        $('.js-submit').addClass('hidden');
    } else {
        $('.js-next').addClass('hidden');
        $('.js-submit').removeClass('hidden');
    }
    if ('previous' in formRoutes[currentStepId]) {
        $('.js-previous').removeClass('hidden');
    } else {
        $('.js-previous').addClass('hidden');
    }
    $(currentStepId).removeClass('hidden');
}

$('.js-addPerson').on('click', function() {
    var key = numberOfPeople;
    numberOfPeople++;
    var markup = '<div class="form-group">' +
            '<input type="text" class="form-control" id="person[' + key + ']" name="person[' + key + ']" placeholder="Thing #' + numberOfPeople + '">' +
        '</div>';
    $('#rsvp-names-list').append(markup);
});
