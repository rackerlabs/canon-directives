var gulp = require('gulp');
var $ = require('gulp-load-plugins');
var config = require('./gulp.config')();

gulp.task('server', function() {
  var webserver = require('gulp-webserver');
  return gulp
          .src('./')
          .pipe(webserver());
});
