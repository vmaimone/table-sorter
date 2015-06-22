// var babel = require('babel');
var gulp = require("gulp");
var babel = require("gulp-babel");
var concat = require("gulp-concat");



gulp.task('default', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({modules: 'ignore'}))
    .pipe(concat('sorter.js'))
    .pipe(gulp.dest("dist"));
});
