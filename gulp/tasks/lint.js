var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    config  = require('../config').jshint;

gulp.task('lint', function() {
  return gulp.src(config.src + '**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
