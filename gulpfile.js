var gulp = require('gulp'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

gulp.task('js', function() {
    return gulp.src('builds/site/js/myscript.js')
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
    return sass('process/sass/KleiserAudioPlayerStyles.scss', {
        sourcemap: true,
        style: 'expanded'
    })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('builds/site/css'));
});

gulp.task('watch', function() {
    gulp.watch('builds/site/js/**/*', ['js']);
    gulp.watch(['process/sass/**/*'], ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('builds/site')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('babel', function () {
    return gulp.src('builds/site/js/**/*')
        .pipe(babel())
        .pipe(gulp.dest('builds/site/js/es5'));
});

gulp.task('default', ['sass', 'watch', 'webserver']);