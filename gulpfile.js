"use strict";

// Gulp plugins
var gulp         = require("gulp"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS     = require("gulp-clean-css"),
    jshint       = require('gulp-jshint'),
    concat       = require("gulp-concat"),
    gutil        = require("gulp-util"),
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
    demoCssName:    'demo-utilities',
    outputCssName:  'star-rating',
    outputJsName:   'star-rating'
};

var buildStylesheet = function(name, options){
    gulp.task(name, function () {
        var stream = gulp.src(DATA.styles + options.sourceFileName)
        .pipe(sass().on('error', gutil.log))
        .pipe(autoprefixer([
            'Android >= 4',
            'Chrome >= 30',
            'Firefox >= 30',
            'ie >= 9',
            'iOS >= 7',
            'Opera >= 12',
            'Safari >= 6']))
            
        if (options.isMinified){
            return stream
            .pipe(cleanCSS({ zindex: false }))
            .pipe(rename(options.outputFileName + '.min.css'))
            .pipe(gulp.dest(DIST.css));
        } else {
            return stream
            .pipe(rename(options.outputFileName + '.css'))
            .pipe(gulp.dest(DIST.css));
        }
    });
}    

function doStyles(task) {
    var styleName = task[0] + "_styles";
    buildStylesheet(styleName, {
        sourceFileName: task[1],
        outputFileName: task[2],
        isMinified:     task[3]
    });
    return styleName;
}

var styleTasks = [
    //["Task Name",         "Source file name",         "Output file name",         "Is the stylesheet minified?"]
      ["main",              "/hub.scss",                DIST.outputCssName,         true],
      ["demo",              "/demo.scss",               DIST.demoCssName,           true]
].map(doStyles);

gulp.task("styles", styleTasks, function(cb) {
    cb();
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

gulp.task('js_lint', function() {
  return gulp.src(DATA.scripts +'/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task('default', [ 'styles', 'scripts' ]);