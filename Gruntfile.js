module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['lib/godel.gs',
              'lib/model.gs',
              'lib/table.gs'
            ],
        dest: '<%= pkg.name %>.gs'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};

