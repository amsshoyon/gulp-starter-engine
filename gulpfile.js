// Initialize Modules
const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const useref = require('gulp-useref');
const nunjucksRender = require('gulp-nunjucks-render');
const prettyHtml = require('gulp-pretty-html');


// File Path Variables
const files = {
    vendorPath: 'app/assets/vendor/**/*',
    scssPath: 'app/assets/scss/**/*.scss',
    jsPath: 'app/assets/js/**/*.js',
    fontPath: 'app/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    imagePath: 'app/assets/images/**/*',
    htmlPath: 'dist/**/*.html',
    njkPath: 'app/**/*.+(html|nunjucks|njk)',
    njkPages: 'app/pages/**/*.+(html|nunjucks|njk)',
    webmanifestPath: 'app/site.webmanifest'
}

function webmanifest() {
    return src(files.webmanifestPath)
        .pipe(dest('dist'));
}

// Sass task
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/css'));
}

// Move Sass Files to dist For Client
function scssMove() {
    return src(files.scssPath)
        .pipe(dest('dist/assets/sass'));
}

// Move Vendor Files to dist For Client
function vendorMove() {
    return src(files.vendorPath)
        .pipe(dest('dist/assets/vendor'));
}

// js task
function jsTask() {
    return src(files.jsPath)
        // .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        // .pipe(uglify())
        // .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/assets/js'));
}

//Font Task
function fontTask() {
    return src(files.fontPath)
        .pipe(dest('dist/assets/fonts'))
}

//Image Task
function imageTask() {
    return src(files.imagePath)
        .pipe(gulp.dest('dist/assets/images'))
}

// Html Task
const cbString = new Date().getTime();
function htmlTask() {
    return src(files.njkPages)
        .pipe(nunjucksRender({
            path: ['app/templates']
        }))
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(prettyHtml({
            indent_size: 4,
            indent_char: ' ',
            unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
            extra_liners: ['head', 'body'],
            max_preserve_newlines: 1
        }))
        .pipe(dest('dist'));
}

// browser Sync: To Initialize 
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    done();
}

// browser Sync: To Reload 
function reload(done) {
    browserSync.reload();
    done();
}

// Combine Everything
function combineTask() {
    return src(files.htmlPath)
        .pipe(useref({ searchPath: './dist' }))
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        .pipe(dest('dist'));
}

// Clean Css Files
function cleanCssTask() {
    return gulp.src('./dist/assets/css', { read: false })
        .pipe(clean());
}

// Clean Js Files
function cleanJsTask() {
    return gulp.src('./dist/assets/js', { read: false })
        .pipe(clean());
}

// watch task
function watchTask() {
    watch([files.webmanifestPath, files.scssPath, files.jsPath, files.imagePath, files.njkPath],
        parallel(webmanifest, scssTask, jsTask, fontTask, imageTask, htmlTask, reload)
    );
}

// #########################################################
// Default Tasks =======================================
// #########################################################
exports.default = series(
    parallel(webmanifest, scssTask, jsTask, fontTask, htmlTask),
    vendorMove,
    scssMove,
    imageTask,
    reload,
    serve,
    watchTask
);

exports.combine = series(
    combineTask,
    cleanJsTask,
    reload,
    serve,
    watchTask
);

// #########################################################
// Non Default Tasks =======================================
// #########################################################

//Image Compression Task
gulp.task('optimize', () => {
    return gulp.src(files.imagePath)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('dist/assets/images'))
});

// Clean Everything
gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

