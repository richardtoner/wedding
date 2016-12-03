var gulp = require('gulp');
var browserSync = require('browser-sync').create();

// Start the Browsersync server and serve the website from it
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            serveStaticOptions: {
                extensions: ['html'] // pretty urls
            }
        },
        browser: "google chrome"
    });

    // Reload if any changes to the source code is detected
    // TODO: Make this more clever by restructuring stuff
    gulp.watch('**/*').on('change', browserSync.reload);
});

// Serve the website as a default task
gulp.task('default', ['serve']);
