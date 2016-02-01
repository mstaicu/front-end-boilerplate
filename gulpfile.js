var gulp = require('gulp'),
  sourcemaps = require('gulp-sourcemaps'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  browserify = require('browserify'),
  babel = require('babelify'),
  sass = require('gulp-sass'),
  templateCache = require('gulp-angular-templatecache'),
  karmaServer = require('karma').Server,
  preprocess = require('gulp-preprocess');

/**
 * Callback function definition section
 */
function browserifyWrapper() {
  return browserify('./src/app.js', {
    debug: true
  }).transform(babel);
}

/**
 * Gulp task definition section
 */

gulp.task('compileSassFiles', function() {
  return gulp.src('./src/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
});

gulp.task('buildTemplateCache', function() {
  return gulp.src('./src/**/*.html')
    .pipe(templateCache('templates.js', {
      standalone: true
    }))
    .pipe(preprocess({
      context: {
        FAKE_BACKEND: true
      }
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task('bundleComponents', ['buildTemplateCache'], function() {
  return browserifyWrapper().bundle()
    .on('error', function(err) {
      console.error(err);
      this.emit('end');
    })
    .pipe(source('app-bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(preprocess({
      context: {
        FAKE_BACKEND: true
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('runComponentTests', ['bundleComponents'], function(isDone) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, isDone).start();
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.html', ['runComponentTests']);

  gulp.watch('./src/**/*.js', ['runComponentTests']);

  gulp.watch('./src/**/*.scss', ['compileSassFiles']);
});

gulp.task('build', ['runComponentTests', 'compileSassFiles']);

gulp.task('default', ['watch']);

gulp.task('run-tests', ['runComponentTests']);
