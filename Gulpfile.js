var gulp = require('gulp');
var concat = require('gulp-concat');
var async = require('async');

gulp.task('clean', function (done) {
  var del = require('del');

  del(['dist','demo/build'], done);
});

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
  var webserver = require('gulp-webserver');

  gulp.watch(['lib/**/*', 'demo/!(build)/**/*.*', 'test/data/*.json'], ['build:demo']);

  return gulp.src('demo/build')
    .pipe(webserver({ livereload: true }));
});

gulp.task('lint', function() {  
  var jshint = require('gulp-jshint');

  return gulp.src('lib/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['build']);
