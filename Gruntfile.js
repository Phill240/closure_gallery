module.exports = function(grunt) {

	grunt.initConfig({
		
	   	clean: ["dist"],

	   	mkdir: {
	    	prod: {
	      		options: {
	        		create: ['dist', 'dist/js']
	      		},
	    	},
  		},

	    closureBuilder:  {
		  	options: {
			    closureLibraryPath: 'closure-library',
			    namespaces: 'my.gallery',
			    compilerFile: 'libs/compiler.jar',
			    compile: true, 
		  	},

		  	prod: {
		    	src: ['closure-library/', 'src/'],
		    	dest: 'dist/js/app.min.js'
		  	}
		},

		processhtml: {
			dist: {
				files: {
					'dist/index.html': ['src/index.html']
				}
			}
		},

	    sass: {
		    prod: {
				options: {
		            outputStyle: 'compressed',
		            sourceMap: false			
				},
				files: [{
					expand: true,
					cwd: 'src/css',
					src: ['*.scss'],
					dest: 'dist/css',
					ext: '.css'
				}]
			}
		},

		imagemin: {       
		    prod: {    
		      	files: [{
			        expand: true,                
			        cwd: 'src/img/',             
			        src: ['**/*.{png,jpg,gif}'],
			        dest: 'dist/img/'
		      	}]
		    }
		}

	});

    grunt.loadNpmTasks('grunt-contrib-clean');
  	grunt.loadNpmTasks('grunt-closure-tools');
  	grunt.loadNpmTasks('grunt-mkdir');
  	grunt.loadNpmTasks('grunt-processhtml');
  	grunt.loadNpmTasks('grunt-sass');
  	grunt.loadNpmTasks('grunt-contrib-imagemin');

  	grunt.registerTask('default', ['clean', 'mkdir', 'processhtml', 'closureBuilder', 'sass', 'imagemin']);
}