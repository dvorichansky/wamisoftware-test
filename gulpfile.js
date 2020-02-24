const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();

const cssLinks = [
  './css/main.css',
  './css/bootstrap-custom.css',
  './css/components/header.css',
  './css/components/section.css',
  './css/components/pricing-box.css',
  './css/components/subscribe-notice.css',
];

function styles() {
  return gulp.src(cssLinks)
    .pipe(concat('all.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest('./css/'))
}

function watch() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp.watch('./css/**/*.css').on('change', () => {
    styles()
    browserSync.reload()
  });
  gulp.watch(['./*.html']).on('change', browserSync.reload);
}

gulp.task('watch', watch);
gulp.task('build', gulp.series(styles));
gulp.task('dev', gulp.series('build', 'watch'));