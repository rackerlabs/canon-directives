var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('lint', function() {
  return gulp.src('lib/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
