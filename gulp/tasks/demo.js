var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    async = require('async'),
    config = require('../config').demo;

gulp.task('build:demo', ['build'], function(done) {
  async.series({
    demoFiles: function (done) {
      gulp.src([config.src.demo + '/*.*', config.src.demo + '/!(build)/**/*'])
        .pipe(gulp.dest(config.dest))
        .on('end', done);
    },
    buildFiles: function (done) {
      gulp.src(config.src.build + '/**/*')
        .pipe(gulp.dest(config.dest))
        .on('end', done);
    }
  }, done);
})

gulp.task('demo', ['build:demo'], function () {
  gulp.watch(config.watch, ['build:demo']);

  return gulp.src(config.dest)
    .pipe(webserver(config.webserver));
});
