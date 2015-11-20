var gulp = require('gulp');

gulp.task('default', ['build', 'server']);

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

  return gulp.src('demo/build')
    .pipe(webserver({ livereload: true }));
});
