const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();

// Компиляция CSS
function styles() {
  return gulp.src('src/css/**/*.css')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

// Минификация JS
function scripts() {
  return gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

// Минификация HTML
function html() {
  return gulp.src('src/**/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
}

// Копирование изображений (без оптимизации для упрощения)
function images() {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
}

// Копирование других файлов
function copy() {
  return gulp.src(['src/**/*', '!src/**/*.html', '!src/css/**/*', '!src/js/**/*'])
    .pipe(gulp.dest('dist'));
}

// Очистка папки dist
function clean() {
  const del = require('del');
  return del(['dist/**', '!dist']);
}

// Сервер для разработки
function serve() {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/css/**/*.css', styles);
  gulp.watch('src/js/**/*.js', scripts);
  gulp.watch('src/**/*.html', html);
  gulp.watch('src/img/**/*', images);
  gulp.watch(['src/**/*', '!src/**/*.html', '!src/css/**/*', '!src/js/**/*'], copy);
}

// Сборка проекта
const build = gulp.series(clean, gulp.parallel(styles, scripts, html, images, copy));

// Задача для разработки
const dev = gulp.series(build, serve);

// Экспорт задач
exports.styles = styles;
exports.scripts = scripts;
exports.html = html;
exports.images = images;
exports.clean = clean;
exports.copy = copy;
exports.build = build;
exports.serve = serve;
exports.dev = dev;
exports.default = dev;