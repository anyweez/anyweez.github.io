const gulp = require('gulp');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

const compile = require('./ext/compile');
const group = require ('./ext/group');

compile();

gulp.task('default', ['html', 'css', 'js']);

gulp.task('html', () => {
    return gulp.src('html/*.pug')
        .pipe(pug({
            locals: {
                groups: [
                    group('recent', 'Recent')(compile()),
                    group('highlights', 'Highlights')(compile()),
                    group('interests', 'Interests')(compile()),
                    group('side-projects', 'Side projects')(compile()),
                ],
            },
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('css', () => {
    return gulp.src('scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/'));
});

gulp.task('js', () => {
    return gulp.src('js/app.js')
        .pipe(babel({
            presets: ['es2015'],
        }))
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', ['html', 'css', 'js'], function () {
    gulp.watch('html/*', ['html']);
    gulp.watch('js/*', ['js']);
    gulp.watch('scss/*', ['css']);
    gulp.watch('events.json', ['html']);
});