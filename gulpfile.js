"use strict";

/* plugins */
const axe = require('gulp-axe-webdriver');
const browsersync = require('browser-sync').create();
const cheerio = require('gulp-cheerio');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const cp = require('child_process');
const del = require('del');
const gulp = require('gulp');
const gulpFilter = require('gulp-filter');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const svgSymbols = require('gulp-svg-symbols');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const paths = {
    src: ''
};

const assets = {
    js: paths.src + 'assets/js',
    css: paths.src + 'assets/css',
    scss: paths.src + 'assets/_scss',
    components: paths.src + 'assets/_scss/components',
    util: paths.src + 'assets/_scss/utilities',
    img: paths.src + 'assets/img',
    sprites: paths.src + 'assets/sprites',
    css_img_path: '../img'
};

/**
 * Build the Jekyll Site
 */

function jekyllBuild(done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'}) .on('close', done);
}

/*
 * Tasks
 * 1/ sass
 * 2/ scripts
 * 3/ images
 * 4/ sprites
 * 5/ browsersync
 * 6/ accessibility check
 * 7/ watch
 * 
 */

/* remove print css from concatenation + Concatenate & Minify CSS */
function css() {
    const filterPrint = gulpFilter(['**', '!' + assets.scss + '/print.scss'], { 'restore': true });

    const all = gulp.src([assets.scss + '/screen.scss',
        assets.scss + '/**/*.scss',
        assets.scss + '/*.scss'])
            .pipe(plumber())
            .pipe(filterPrint)
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.init())
            .pipe(concat('all.css'))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(assets.css))
            .pipe(browsersync.stream());

    const print = gulp.src(assets.scss + '/print.scss')
            .pipe(plumber())
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(assets.css))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(assets.css))
            .pipe(browsersync.stream());
    
    return all, print;
}
/* Concatenate & Minify JS */
function scripts() {

    return gulp.src([assets.js + '/src/lib/*.js', assets.js + '/src/*.js'])
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(concat('all.js'))
            .pipe(gulp.dest(assets.js))
            .pipe(rename({suffix: '.min'}))
            .pipe(terser({
                ecma: 5,
                safari10: true,
                keep_fnames: false,
                mangle: false,
                compress: {
                    defaults: false
                }
             }))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest(assets.js))
            .pipe(browsersync.stream());
};

/* Optimize images */
function images() {
	
    return gulp.src([assets.img + '/**/*'])
		
        .pipe(newer(assets.img + '/**/*')) //parse only new or updated files
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: false }
                ]
            })
        ]))

        .pipe(gulp.dest(assets.img));
};

/* sprites management 
 * generate svg file for inline use
 */
function sprites() {

	return gulp.src([assets.sprites + '/**/*.svg'])
        .pipe(plumber())
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgSymbols({
                svgAttrs:{
                    class:`hidden`
                }
            }
        ))
        .pipe(gulpIf( /[.]svg$/, gulp.dest(assets.img + '/global')))
        .pipe(gulpIf( /[.]css$/, gulp.dest(assets.components)));	
};

/* rename generated css file for sprites */
function renameSprites() {
   return gulp.src([assets.components + '/*.css'])
    .pipe(plumber())
    .pipe(rename({
        basename: '_sprites',
        extname: '.scss'
    }))
    .pipe(gulp.dest(assets.components))
};

/* clean css generated file for sprites */
function cleanSprites() {
    return del([assets.components + '/*.css'], {force: true});
}

/**
 * Wait for jekyll-build, then launch the Server
 */
 function browserSyncServe(done) {
    browsersync.init({
      server: {
        baseDir: "_site"
      }
    })
    done();
  }
  
  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }
  

function a11yCheck(done) {
    var options = {
        saveOutputIn: 'a11yResult.json',
        browser: 'phantomjs',
        urls: ['*.html']
      };
    return axe(options, done);
}

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload browsersync
 */

function watchFiles() {
    gulp.watch(assets.scss + '/**/*.scss', gulp.series(css, jekyllBuild, browserSyncReload));
    gulp.watch(assets.js + '/src/**/*.js', gulp.series(scripts, jekyllBuild, browserSyncReload));
    gulp.watch(assets.img + '/**/*', images);
    gulp.watch(assets.sprites + '/**', gulp.series(sprites, renameSprites, cleanSprites));
    gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], gulp.series(jekyllBuild, browserSyncReload));
}
   
/* chained tasks */
const spritesBuild = gulp.series(sprites, renameSprites, cleanSprites);
const build = gulp.parallel(css, scripts, images, spritesBuild, jekyllBuild);
const watch = gulp.parallel(watchFiles, browserSyncServe);

// export tasks
exports.images = images;
exports.css = css;
exports.scripts = scripts;
exports.spritesBuild = spritesBuild;

exports.build = build;

gulp.task('default', gulp.parallel(jekyllBuild, watch))