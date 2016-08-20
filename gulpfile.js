var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var merge = require('merge2');
var less = require('gulp-less');
var path = require('path');
var cache = require('gulp-cached');
 
gulp.task('build-less', function () {
  return gulp.src('views/**/*.less')
    .pipe(cache('less'))
    .pipe(less())
    .pipe(gulp.dest('views'));
});


var tsProject = ts.createProject({
      typescript: require('typescript'),
      declarationFiles: false,
      noExternalResolve: true,
      target: "es5",
      module: "amd",
      emitDecoratorMetadata: true,
      "experimentalDecorators": true
    });

gulp.task('build-ts', function () {
  var tsResult = gulp.src(myPaths.ts,
    { base: "./" })
    .pipe(cache('ts'))
    .pipe(ts(tsProject));

  return merge([
    tsResult.dts.pipe(gulp.dest('./')),
    tsResult.js.pipe(gulp.dest('./'))
  ]);
});

gulp.task('build', ['build-less', 'build-ts']);

var myPaths = {
  ts: ['views/**/*.ts', 'typings/**/*.d.ts'],
  js: "views/**/*.js",
  html: "views/**/*.html",
  css: "views/**/*.css",
  less: "views/**/*.less"
}

gulp.task('serve', ['build'], function (done) {
  browserSync({
    open: false,
    port: 9000,
    server: {
      baseDir: ['.'],
      middleware: function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  }, done);
});

function reportChange(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], function () {
  gulp.watch(myPaths.ts, ['build-ts']).on('change', reportChange);
  gulp.watch(myPaths.less, ['build-less']).on('change', reportChange);
  gulp.watch(myPaths.js, [browserSync.reload]).on('change', reportChange);
  gulp.watch(myPaths.html, [browserSync.reload]).on('change', reportChange);
  gulp.watch(myPaths.css, [browserSync.reload]).on('change', reportChange);
});
