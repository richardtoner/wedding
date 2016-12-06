var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');
var nunjucksRender = require('gulp-nunjucks-render');

// Start the Browsersync server and serve the website from it
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./src",
            serveStaticOptions: {
                extensions: ['html'] // pretty urls
            }
        },
        browser: "google chrome"
    });

    // Reload if any changes to the source code is detected
    // TODO: Make this more clever by restructuring stuff
    //gulp.watch('**/*').on('change', browserSync.reload);
});

// Deploy to GitHub pages
gulp.task('deploy', function() {
    return gulp.src('./dist/**/*')
        .pipe(ghPages({
            'remoteUrl': 'git@github.com:claireo123/claireo123.github.io.git',
            'branch': 'master'
        }));
});

gulp.task('nunjucks', function() {
    // Gets .html and .nunjucks files in pages
    return gulp.src('src/pages/**/*.+(html|nunjucks)')
        // Renders template with nunjucks
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        // output files in app folder
        .pipe(gulp.dest('src'));
});

// Serve the website as a default task
gulp.task('default', ['serve']);
