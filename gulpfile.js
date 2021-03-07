var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var ghPages = require('gulp-gh-pages');

// Start the Browsersync server and serve the website from it
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: "./src",
            serveStaticOptions: {
                extensions: ['html'] // pretty urls
            }
        },
        browser: "google chrome"
    });
});

// Deploy to GitHub pages
gulp.task('deploy', () => {
    return gulp.src('./dist/**/*')
        .pipe(ghPages({
            'remoteUrl': 'git@github.com:claireo123/claireo123.github.io.git',
            'branch': 'master'
        }));
});

// Serve the website as a default task
gulp.task('default', gulp.series('serve'));
