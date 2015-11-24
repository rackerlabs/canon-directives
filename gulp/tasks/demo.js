var gulp = require('gulp');
var webserver = require('gulp-webserver');
var async = require('async');

gulp.task('build:demo', ['build'], function(done) {
  async.parallel({
    demo: function (done) {
      gulp.src('demo/*')
        .pipe(gulp.dest('demo/build'))
        .on('end', done);
    },
    build: function (done) {
      gulp.src('dist/**/*')
        .pipe(gulp.dest('demo/build'))
        .on('end', done);
    },
    data: function (done) {
      gulp.src('test/data/*.json')
        .pipe(gulp.dest('demo/build/data'))
        .on('end', done);
    },
  }, done);
})

gulp.task('demo', ['build:demo'], function () {
  gulp.watch(['lib/**/*', 'demo/!(build)/**/*.*', 'test/data/*.json'], ['build:demo']);

  return gulp.src('demo/build')
    .pipe(webserver({ livereload: true }));
});
