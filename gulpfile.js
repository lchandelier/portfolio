var axe = require('gulp-axe-webdriver'),
	browsersync = require('browser-sync'),
	cache = require('gulp-cache'),
	changed = require('gulp-changed'),
	cheerio = require('gulp-cheerio'),
	cleanCSS = require('gulp-clean-css'),
	clone = require('gulp-clone'),
    concat = require('gulp-concat'),
    cp  = require('child_process');
	del	= require('del'),
	fileinclude = require('gulp-file-include'),
	gulp = require('gulp'),
	gulpFilter = require('gulp-filter'),
	gulpIf = require('gulp-if'),
	imagemin = require('gulp-imagemin'),
	merge = require('merge-stream'),
	notify = require('gulp-notify'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	shell = require('gulp-shell'),
	svgSymbols = require('gulp-svg-symbols'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	webp = require('gulp-webp'),
    zip = require('gulp-zip');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

var paths = {
    src: ''
};

var assets = {
    js: paths.src + 'assets/js',
    css: paths.src + 'assets/css',
    scss: paths.src + 'assets/_scss',
    util: paths.src + 'assets/_scss/utilities',
    img: paths.src + 'assets/img',
    sprites: paths.src + 'assets/sprites',
    css_img_path: '../img'
};

var folder = new Array('global');

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {

    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browsersync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browsersync({
        server: {
            baseDir: '_site'
        }
    });
});




/*
 * Tasks
 * 1/ sass
 * 2/ scripts
 * 3/ images
 * 4/ sprites
 * 5/ extend
 * 6/ styleguide
 * 7/ zip
 * 8/ watch
 * 9/ accessibility check
 * 
 */

/* remove print css from concatenation + Concatenate & Minify CSS */
gulp.task('sass', function () {
	var filterPrint = gulpFilter(['*', '!print.scss']);

    var all = gulp.src([assets.scss + '/screen.scss',
        assets.scss + '/**/*.scss',
        assets.scss + '/*.scss'])
            .pipe(plumber())
            .pipe(filterPrint)
            .pipe(sass().on('error', sass.logError))
            .pipe(sourcemaps.init())
            .pipe(concat('all.css'))
            .pipe(gulp.dest(assets.css))
            .pipe(notify({message: 'all.css generated', onLast: true}))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(assets.css))
            .pipe(browsersync.reload({stream: true}))
            .pipe(notify({message: 'all.min.css generated', onLast: true}));

    var print = gulp.src(assets.scss + '/print.scss')
            .pipe(plumber())
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(assets.css))
            .pipe(notify({message: 'print.css generated', onLast: true}))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(assets.css))
            .pipe(browsersync.reload({stream:true}))
            .pipe(notify({message: 'print.min.css generated', onLast: true}));

    return all, print;
});

/* Concatenate & Minify JS */
gulp.task('scripts', function () {
    return gulp.src([assets.js + '/src/lib/*.js', assets.js + '/src/*.js']) //manage order
            .pipe(plumber())
            .pipe(sourcemaps.init())
            .pipe(concat('all.js'))
            .pipe(gulp.dest(assets.js))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest(assets.js))
            .pipe(browsersync.reload({stream: true}))
            .pipe(notify({message: 'Scripts task complete', onLast: true}));
});

/* Optimize images */
gulp.task('images', function () {
    var cloneSink = clone.sink();
	
    return gulp.src([assets.img + '/**/*', '!' + assets.img + '/**/*.webp'])
            .pipe(plumber())
			
            .pipe(changed(assets.img + '/**/*')) //parse only new or updated files
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: false},
                        {cleanupIDs: false}
                    ]
                })
            ]))

			.pipe(cloneSink)   // clone image
			.pipe(webp())      // convert cloned image to WebP
            .pipe(cloneSink.tap()) 
            .pipe(gulp.dest(assets.img));
});

/* sprites management 
 * generate svg file for inline use
 */

gulp.task('sprites', function () {
	return gulp.src([assets.sprites + '/**/*.svg'])
        .pipe(plumber())
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(svgSymbols(
            {
                class: 'a11y_hidden',
				'aria-hidden':'true'
            }
        ))
        .pipe(gulpIf( /[.]svg$/, gulp.dest(assets.img + '/global')))
        .pipe(gulpIf( /[.]css$/, gulp.dest(assets.components)))	
		.pipe(notify({message: 'Sprite generated', onLast: true}));
});

/* rename generated css file for sprites */

gulp.task('rename-sprites', ['sprites'], function() {
   return gulp.src([assets.components + '/*.css'])
    .pipe(plumber())
    .pipe(rename({
        basename: '_sprites',
        extname: '.scss'
    }))
    .pipe(gulp.dest(assets.components))
});

/* delete the useless css file */
gulp.task('clean-sprites', ['rename-sprites'], function() {    
    return del([assets.components + '/*.css'], {force: true})
});

/* accessibility task */
gulp.task('axe', function(done) {
    var options = {
      saveOutputIn: 'a11yResult.json',
      browser: 'phantomjs',
      urls: ['*.html']
    };
    return axe(options, done);
  });

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload browsersync
 */
gulp.task('watch', function () {
    gulp.watch([assets.scss+'/*.scss', assets.scss+'/**/*.scss'], ['sass', 'jekyll-rebuild']);
    gulp.watch(assets.js+'/src/**/*.js', ['scripts', 'jekyll-rebuild']);
    gulp.watch(assets.img+'/**/*', ['images']);
    gulp.watch(assets.sprites+'/**', ['sprites', 'sass', 'jekyll-rebuild']);
    gulp.watch(['*.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch browsersync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
