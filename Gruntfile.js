/**
 * Created by georgestrajan on 2/4/15.
 */
/*jslint node: true */
"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
       jshint : {
           files : ['*.js']
       }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
};