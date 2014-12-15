module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['lib/goodel.gs',
              'lib/modeler.gs',
              'lib/model_class_methods.gs',
              'lib/model_instance_methods.gs',
              'lib/table.gs'
              ],
        dest: '<%= pkg.name %>.gs'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat']);
};

