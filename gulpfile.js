const { src, dest, watch, series, parallel } = require('gulp');
const livereload = require("gulp-livereload");
const htmlmin = require("gulp-htmlmin");
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');


function minifyhtml() {
    return src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("build"))
    .pipe(livereload());
}

function movecss() {
    return src('src/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest("build"))
    .pipe(livereload());
}

function minifyJS(){
    return src('src/*.js')
    .pipe(sourcemaps.init())  
    .pipe(terser({
        toplevel: true,
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(dest('build'))
    .pipe(livereload());
}

function watchTask() {
    require("./server.js");
    livereload.listen();
    watch('src/*.html', parallel(minifyhtml, movecss, minifyJS));
}

exports.default = series(minifyhtml, movecss, minifyJS, watchTask);