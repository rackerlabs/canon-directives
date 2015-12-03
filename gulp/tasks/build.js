var gulp = require('gulp'),
    concat = require('gulp-concat'),
    flatten = require('gulp-flatten'),
    async = require('async'),
    config  = require('../config').build;

gulp.task('build', function(done) {
  async.parallel({
    scripts: function (done) {
      gulp.src([//'demo/ui-bootstrap-pagination-tpls.min.js',  //works
                'node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js', //doesn't work
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
