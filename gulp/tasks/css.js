'use strict';

var gulp = require('gulp');
var cssnext = require("gulp-cssnext");

var config = require('../config');
var del = require('del');

gulp.task('css', function() {
  var cssConfig = config.css;
  gulp.src(cssConfig.src)
    .pipe(cssnext({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest(cssConfig.dst))
});
