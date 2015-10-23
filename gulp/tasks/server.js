'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');

var config = require('../config');
var hugoConfig = require('../../config.json');

gulp.task('server', ['hugo', 'css'], function() {
  gulp.src(hugoConfig.publishdir)
    .pipe(webserver({
      fallback: '404/index.html',
      livereload: true
    }));
});
