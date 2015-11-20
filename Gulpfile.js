var gulp = require('gulp');

gulp.task('clean', function (done) {
  var del = require('del');

  del('demo/build', done);
});

gulp.task('build', function() {
  gulp.src('demo/*.html')
    .pipe(gulp.dest('demo/build'));

  gulp.src('lib/**/*')
    .pipe(gulp.dest('demo/build'));

  gulp.src('test/data/*.json')
    .pipe(gulp.dest('demo/build/data'));
});

gulp.task('server', function (){
  var webserver = require('gulp-webserver');

  gulp.watch(['lib/**/*', 'demo/!(build)/**/*.*', 'test/data/*.json'], ['build']);

  return gulp.src('demo/build')
    .pipe(webserver({ livereload: true }));
});

gulp.task('default', ['build', 'server']);
