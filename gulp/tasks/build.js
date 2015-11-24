var gulp = require('gulp');
var concat = require('gulp-concat');
var async = require('async');

gulp.task('build', function(done) {
  async.parallel({
    scripts: function (done) {
      //TODO: This should load modules first. Fix once files are renamed
      // gulp.src(['lib/scripts/**/module.js', 'src/**/*.js'])
      gulp.src(['lib/scripts/common.library.js', 'lib/scripts/**/*.js'])
        .pipe(concat('canon-directives.js'))
        .pipe(gulp.dest('dist'))
        .on('end', done);
    },
    templates: function (done) {
      gulp.src('lib/templates/*.html')
        .pipe(gulp.dest('dist/templates'))
        .on('end', done);
    }
  }, done);
});
