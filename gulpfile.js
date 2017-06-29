var gulp = require('gulp'),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    browserSync = require("browser-sync"),
    plumber = require("gulp-plumber");


gulp.task('default', ['browser-sync']);
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./public/"       //対象ディレクトリ
            ,index  : "index.html"      //インデックスファイル
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task("sass", function() {
    gulp.src(["./src/sass/**/*.scss"])
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./public/common/css"))//未圧縮を吐き出す
        .pipe(cssmin())//圧縮する
        .pipe(rename({ extname: '.min.css' }))//名前を変更する
        .pipe(gulp.dest("./public/common/css/min"))//圧縮後を吐き出す
        .pipe(browserSync.reload({stream:true}))//リロードする
});

gulp.task("default",['browser-sync'], function() {
    gulp.watch("./public/*.html", ['bs-reload']);
    gulp.watch("./src/sass/**/*.scss",["sass" , 'bs-reload']);
});