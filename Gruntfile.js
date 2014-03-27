var scripts = require('./express/app-scripts')(process.cwd())
  , src = scripts.development()
  , uglify_options = {
    compress: {
        loops        : true
      , unused       : true
      , unsafe       : true
      , cascade      : true
      , warnings     : true
      , booleans     : true
      , evaluate     : true
      , dead_code    : true
      , join_vars    : true
      , if_return    : true
      , sequences    : true
      , hoist_vars   : false
      , hoist_funs   : true
      , properties   : true
      , comparisons  : true
      , conditionals : true
    }
    , mangle: { except: ['OptionsDrawer', 'CodeMirror', 'angular', 'amplify', 'jQuery', 'Stor', 'less', '$', '_'] }
  };

var shell = require('shelljs');

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-shell');

  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json')
    , meta: {
      banner: [
          '/* <%= pkg.name %> - v<%= pkg.version %> - <%= pkg.homepage %>\n'
        , ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>. All rights reserved.\n'
        , ' * Licensed <%= _.pluck(pkg.licenses, "type")[0] %> - <%= _.pluck(pkg.licenses, "url")[0] %>\n'
        , ' */\n'
      ].join('')
    }

    , paths: {
        js      : './public/javascripts'
      , tmp     : './tmp'
      , test    : './test'
      , routes  : './routes'
      , express : './express'
    }

    , concat: {
      app: {
        src: src.app
        , dest: '<%= paths.tmp %>/less2css.js'
      }

      , vendor: {
        src: src.vendor
        , dest: '<%= paths.tmp %>/vendor.js'
      }

      , build: {
        options: { banner: '<%= meta.banner %>'}
        , files: {
          '<%= paths.js %>/less2css.min.js': ['<%= paths.js %>/less2css.min.js']
        }
      }
    }

    , watch: {
      js: {
        files: [
            '<%= paths.js %>/options-drawer.js'
          , '<%= paths.js %>/app/**/*.js'
        ]
        , tasks: ['jshint', 'uglify:app', 'karma:unit:run']
      }
      , tests: {
          files: ['<%= paths.test %>/**/*.spec.js']
        , tasks: ['karma:unit:run']
      }
    }

    , uglify: {
      app: {
        options: uglify_options
        , files: {
          '<%= paths.js %>/less2css.min.js': ['<%= paths.tmp %>/less2css.js']
        }
      }
      , vendor: {
        options: uglify_options
        , files: {
          '<%= paths.js %>/vendor.min.js': ['<%= paths.tmp %>/vendor.js']
        }
      }
    }
    , jshint: {
      options: { jshintrc: './.jshintrc' }
      , all: ['<%= paths.tmp %>/less2css.js']
    }

    , karma: {
      unit: {
        configFile: '<%= paths.express %>/karma.conf.js'
      }
    },
    shell: {
      options: {
        failOnError: true
      },
      'npm-update-videojs': { command: 'npm update video.js' },
      'jitsu-deploy': { command: 'jitsu deploy' }
    }
  });

  grunt.registerTask('default', [
    'concat:app'
    , 'concat:vendor'
    , 'jshint'
    , 'uglify'
    , 'concat:build'
    , 'karma:unit:run'
  ]);

  grunt.registerTask('copy-files', '', function(){
    var pkg = JSON.parse(grunt.file.read('node_modules/video.js/package.json'));

    // copy video.js player files
    shell.rm('-rf', './public/javascripts/vendor/video-js/*');
    
    // copy less file
    shell.cp('-Rf', ['./node_modules/video.js/dist/video-js/*'], './public/javascripts/vendor/video-js');
    shell.cp('-Rf', ['./node_modules/video.js/dist/video-js/video-js.less'], './public/stylesheets/video-js.less');

    // update the version in the less file
    var less = grunt.file.read('public/stylesheets/video-js.less');
    less = less.replace('GENERATED_AT_BUILD', pkg.version);
    grunt.file.write('public/stylesheets/video-js.less', less);
  });

  grunt.registerTask('release', [
    'shell:npm-update-videojs',
    'copy-files',
    'default'
  ]);

  grunt.registerTask('deploy', ['shell:jitsu-deploy']);

};
