'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('hugo', shell.task([
  'hugo'
]));
