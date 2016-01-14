// Basic Gulp File
//
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefix = require('gulp-autoprefixer'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower'),
    livereload = require('gulp-livereload'),
    webserver = require('gulp-webserver');

var config = {
    sassPath: './sass',
    bowerDir: './lib',
    imgPath: './images',
    indexPath:'./index.html',
    jsPath:'./js'
};


gulp.task('css', function() {
    return gulp.src(config.sassPath + '/style.scss')
        .pipe(sass({
            style: 'compressed',
            loadPath: [
                config.sassPath,
                config.bowerDir + '/bootstrap-sass-official/assets/stylesheets'
            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            })))
        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(config.sassPath + '/**/*.scss', ['css']);
  gulp.watch(config.imgPath + '/**/*').on('change', livereload.changed);
  gulp.watch(config.indexPath).on('change', livereload.changed);
  gulp.watch(config.jsPath + '/**/*.js').on('change', livereload.changed);
});

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      open: true,
      fallback: 'index.html'
    }));
});

gulp.task('default', ['css', 'watch', 'webserver']);
