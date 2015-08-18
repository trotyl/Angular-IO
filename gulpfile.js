var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

gulp.task('default', function() {
  gulp.src('src/**/*.js')
    .pipe(concat('angular-socket.js'))
    .pipe(gulp.dest('bin/'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('bin/'))

});
