var gulp = require('gulp'),
    concat = require('gulp-concat'),
    async = require('async'),
    config  = require('../config').build;

gulp.task('build', function(done) {
  async.parallel({
    scripts: function (done) {
      //TODO: This should load modules first. Fix once files are renamed
      // gulp.src(['lib/scripts/**/module.js', 'src/**/*.js'])
      gulp.src([config.src + '/scripts/common.library.js', config.src + '/scripts/**/*.js'])
        .pipe(concat('canon-directives.js'))
        .pipe(gulp.dest(config.dest))
        .on('end', done);
    },
    templates: function (done) {
      gulp.src(config.src + '/templates/*.html')
        .pipe(gulp.dest(config.dest + '/templates'))
        .on('end', done);
    }
  }, done);
});
