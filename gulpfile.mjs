import axe from 'gulp-axe-webdriver';
import browserSync from 'browser-sync';
import changed from 'gulp-changed';
import cheerio from 'gulp-cheerio';
import cleanCSS from '@aptuitiv/gulp-clean-css';
import concat from 'gulp-concat';
import {deleteAsync} from 'del';
import gulp from 'gulp';
import gulpFilter from 'gulp-filter';
import gulpIf from 'gulp-if';
import gulpSass from 'gulp-sass';
import imagemin, {gifsicle, mozjpeg, optipng, svgo} from 'gulp-imagemin';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import * as sass from 'sass';
import svgSymbols from 'gulp-svg-symbols';
import sourcemaps from '@sequencemedia/gulp-sourcemaps';
import terser from 'gulp-terser';
import cp from 'node:child_process';

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const { series, parallel, src, dest, task } = gulp;
const useSass = gulpSass(sass);

/* paths */

const paths = {
    src: ''
};

const assets = {
    js: paths.src + 'assets/js',
    css: paths.src + 'assets/css',
    scss: paths.src + 'assets/_scss',
    components: paths.src + 'assets/_scss/components',
    img: paths.src + 'assets/img',
    sprites: paths.src + 'assets/sprites',
    css_img_path: '../img'
};


/**
 * Build the Jekyll Site
 */

function jekyllBuild(done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit', shell: true}) .on('close', done);
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

    const all = src([assets.scss + '/screen.scss',
        assets.scss + '/**/*.scss',
        assets.scss + '/*.scss'])
        .pipe(plumber())
        .pipe(filterPrint)
        .pipe(useSass().on('error', useSass.logError))
        .pipe(sourcemaps.init())
        .pipe(concat('all.css'))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(assets.css))
        .pipe(browserSync.stream());

    const print = src(assets.scss + '/print.scss')
        .pipe(plumber())
        .pipe(useSass().on('error', useSass.logError))
        .pipe(dest(assets.css))
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest(assets.css))
        .pipe(browserSync.stream());

    return all, print;
}

async function scripts() {

    const all = gulp.src([assets.js + '/src/lib/*.js', assets.js + '/src/*.js'])
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
    .pipe(browserSync.stream());

    return all;
}

/* Optimize images */
function images() {
	
    return src([assets.img + '/**/*'], {encoding: false})
		
        .pipe(changed(assets.img + '/**/*')) //parse only new or updated files
        .pipe(imagemin([
            gifsicle({ interlaced: true }),
            mozjpeg({ progressive: true }),
            optipng({ optimizationLevel: 5 }),
            svgo({
                plugins: [
                    {
                        name: "preset-default",
                        params: { overrides: { removeViewBox: false, cleanupIDs: false } },
                    }
                ]
            })
        ]))

        .pipe(gulp.dest(assets.img));
}

/* sprites management 
 * generate svg file for inline use
 */

function sprites() {

    return src([assets.sprites + '/**/*.svg'])
        .pipe(plumber())
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgSymbols({
            svgAttrs:{
                class:'hidden'
            }
        }
        ))
        .pipe(gulpIf( /[.]svg$/, gulp.dest(assets.img + '/global')))
        .pipe(gulpIf( /[.]css$/, gulp.dest(assets.components)));	
}

/* rename generated css file for sprites */
function renameSprites() {
    return src([assets.components + '/*.css'])
        .pipe(plumber())
        .pipe(rename({
            basename: '_sprites',
            extname: '.scss'
        }))
        .pipe(dest(assets.components));
}

/* clean css generated file for sprites */
function cleanSprites() {
    return deleteAsync([assets.components + '/*.css'], {force: true});
}

/**
 * Wait for jekyll-build, then launch the Server
 */
function browserSyncServe(done) {
    browserSync.init({
        server: {
          baseDir: "_site"
        }
    })
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
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
/* watch */
function watchFiles() {
    gulp.watch(assets.scss + '/**/*.scss', series(css, jekyllBuild, browserSyncReload));
    gulp.watch(assets.js + '/src/**/*.js', series(scripts, jekyllBuild, browserSyncReload));
    gulp.watch(assets.img + '/**/*', images);
    gulp.watch(assets.sprites + '/*', series(sprites, renameSprites, cleanSprites));
    gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], series(jekyllBuild, browserSyncReload)); 
}
   
/* chained tasks */

async function spritesBuild() {
    return series(sprites, renameSprites, cleanSprites);
}

task('build', parallel(css, scripts, images, spritesBuild, jekyllBuild));
task('spritesBuild', series(sprites, renameSprites, cleanSprites));

const watch = parallel(watchFiles, browserSyncServe);

export default watch;
