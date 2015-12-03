var src = './src';
var dest = './dist';
var demo = './demo';

module.exports = {
  build: { 
    src: src,
    deps: './node_modules'
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
  jshint: {
    src: src
  }
};
