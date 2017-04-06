"use strict";

// Gulp plugins
var gulp         = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS     = require("gulp-clean-css"),
    concat       = require("gulp-concat"),
    git          = require("gulp-git"),
    gutil        = require("gulp-util"),
    jshint       = require("gulp-jshint"),
    rename       = require("gulp-rename"),
    sass         = require("gulp-sass"),
    sassLint     = require("gulp-sass-lint"),
    uglify       = require("gulp-uglify");

var DATA_DIR = 'data';
var DATA = {
    scripts:        DATA_DIR + '/scripts',
    styles:         DATA_DIR + '/styles'
};
var DIST_DIR = 'dist';
var DIST = {
    css:            DIST_DIR + '/css',
    js:             DIST_DIR + '/js',
    outputCssName:  'star_rating',
    outputJsName:   'star_rating'
};
    
gulp.task('styles', function () {
    return gulp.src(DATA.styles + '/hub.scss')
    .pipe(sass().on('error', gutil.log))
    .pipe(autoprefixer([
        'Android >= 4',
        'Chrome >= 30',
        'Firefox >= 30',
        'ie >= 9',
        'iOS >= 7',
        'Opera >= 12',
        'Safari >= 6']))
    .pipe(rename(DIST.outputCssName + '.css'))
    .pipe(gulp.dest(DIST.css))
    .pipe(cleanCSS({ zindex: false }))
    .pipe(rename(DIST.outputCssName + '.min.css'))
    .pipe(gulp.dest(DIST.css));
});

gulp.task('styles:watch', function () {
    gulp.watch(['styles']);
});

gulp.task('scripts', function() {
    return gulp.src([
        DATA.scripts + '/utilities.js',
        DATA.scripts + '/component.js'
    ])
    .pipe(concat(DIST.outputJsName + '.js'))
    .pipe(gulp.dest(DIST.js))
    .pipe(uglify())
    .pipe(rename(DIST.outputJsName + '.min.js'))
    .pipe(gulp.dest(DIST.js));
});

gulp.task('scripts:watch', function () {
    gulp.watch(['scripts']);
});

gulp.task('default', [ 'styles', 'scripts' ]);