var src = './lib';
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
      build: dest,
      data: tests + '/data'
    },
    dest: demo + '/build',
    watch: [
      src + '/**/*',
      demo + '/!(build)/**/*.*',
      tests + '/data/*.json'
    ],
    webserver: {
      livereload: true
    }
  },
  tests: {
    src: tests +'/**/*.js'
  },
  jshint: {
    src: src + '/scripts',
    jshintrc: {
      //lint options taken from John Papa's AngularJs Style Guide
      //https://github.com/johnpapa/angular-styleguide#js-hint
      "bitwise": true,
      "camelcase": true,
      "curly": true,
      "eqeqeq": true,
      "es3": false,
      "forin": true,
      "freeze": true,
      "immed": true,
      "indent": 4,
      "latedef": "nofunc",
      "newcap": true,
      "noarg": true,
      "noempty": true,
      "nonbsp": true,
      "nonew": true,
      "plusplus": false,
      "quotmark": "single",
      "undef": true,
      "unused": false,
      "strict": false,
      "maxparams": 10,
      "maxdepth": 5,
      "maxstatements": 40,
      "maxcomplexity": 8,
      "maxlen": 120,

      "asi": false,
      "boss": false,
      "debug": false,
      "eqnull": true,
      "esnext": false,
      "evil": false,
      "expr": false,
      "funcscope": false,
      "globalstrict": false,
      "iterator": false,
      "lastsemic": false,
      "laxbreak": false,
      "laxcomma": false,
      "loopfunc": true,
      "maxerr": false,
      "moz": false,
      "multistr": false,
      "notypeof": false,
      "proto": false,
      "scripturl": false,
      "shadow": false,
      "sub": true,
      "supernew": false,
      "validthis": false,
      "noyield": false,

      "browser": true,
      "node": true,

      "globals": {
          "angular": false,
          "$": false
      }
    }
  }
};
