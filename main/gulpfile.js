/**
 * Gulpfile
 *
 * This Node script is executed when you run `gulp` or `sails lift`.
 * It's purpose is to load the Gulp tasks in your project's `tasks`
 * folder, and allow you to add and remove tasks as you see fit.
 * For more information on how this works, check out the `README.md`
 * file that was generated in your `tasks` folder. Module gulp-load-plugins is now needed.
 *
 * WARNING:
 * Unless you know what you're doing, you shouldn't change this file.
 * Check out the `tasks` directory instead.
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload')
    imagemin = require('gulp-imagemin'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    plugins = require('gulp-load-plugins')({
              pattern: ['gulp-*', 'merge-*', 'run-*', 'main-*'], // the glob to search for
              replaceString: /\bgulp[\-.]|run[\-.]|merge[\-.]|main[\-.]/, // what to remove from the name of the module when adding it to the context
              camelizePluginName: true, // if true, transforms hyphenated plugins names to camel case
              lazy: true // whether the plugins should be lazy loaded on demand
            }),
    path = require('path'),
    growl = false;

gulp.task('default', ['styles', 'scripts', 'images', 'watch']);

gulp.task('scripts', function() {
  gulp.src('js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('static'))
    .pipe(livereload());
});

gulp.task('styles', function() {
  gulp.src('scss/main.scss')
    .pipe(plumber())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('static'))
    .pipe(livereload());
});

gulp.task('images', function(){
  gulp.src('images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('static'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  var server = livereload();
  
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('scss/*.scss', ['styles']);
  gulp.watch('scss/*/*.scss', ['styles']);
  gulp.watch('images/*', ['images']);
});