var gulp = require('gulp');
var concat = require('gulp-concat');
var async = require('async');

gulp.task('clean', function (done) {
  var del = require('del');

  del(['dist','demo/build'], done);
});

gulp.task('build', function(done) {
  async.series({
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

gulp.task('build:demo', ['build'], function() {
  //Move demo files
  gulp.src('demo/*')
    .pipe(gulp.dest('demo/build'));

  //Move built components
  gulp.src('dist/**/*')
    .pipe(gulp.dest('demo/build'));

  //Move mock json data
  gulp.src('test/data/*.json')
    .pipe(gulp.dest('demo/build/data'));
})

gulp.task('server', ['build:demo'], function () {
  var webserver = require('gulp-webserver');

  gulp.watch(['lib/**/*', 'demo/!(build)/**/*.*', 'test/data/*.json'], ['build:demo']);

  return gulp.src('demo/build')
    .pipe(webserver({ livereload: true }));
});

gulp.task('default', ['build']);
