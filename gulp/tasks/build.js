var gulp = require('gulp'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    async = require('async'),
    config  = require('../config').build;

gulp.task('build', function(done) {
  async.parallel({
    scripts: function (done) {
      gulp.src([config.deps + '/angular-ui-bootstrap/ui-bootstrap-tpls.min.js',
                config.src + '/**/*.module.js',
                config.src + '/**/*.js'])
        .pipe(concat('canon-directives.js'))
        .pipe(gulp.dest(config.dest))
        .on('end', done);
    },
    templates: function (done) {
      gulp.src(config.src + '/**/*.html')
        .pipe(flatten())
        .pipe(gulp.dest(config.dest + '/templates'))
        .on('end', done);
    }
  }, done);
});
