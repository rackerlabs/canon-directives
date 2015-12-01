var src = './src';
var dest = './dist';
var demo = './demo';
var tests = './test';

module.exports = {
  build: { 
    src: src,
    dest: dest
  },
  demo: {
    src: {
      demo: demo,
      build: dest
    },
    dest: demo + '/build',
    watch: [
      src + '/**/*',
      demo + '/!(build)/**/*.*'
    ],
    webserver: {
      livereload: true
    }
  },
  tests: {
    src: tests +'/**/*.js'
  },
  jshint: {
    src: src
  }
};
