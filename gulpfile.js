var gulp        = require('gulp');
    plumber = require('gulp-plumber');
    browserSync = require('browser-sync');
    sass        = require('gulp-sass');
    cp          = require('child_process');
    uglify      = require('gulp-uglify');
    cleanCSS   = require('gulp-clean-css');
    imagemin    = require('gulp-imagemin');
    rename      = require('gulp-rename');
    concat      = require('gulp-concat');
    notify      = require('gulp-notify');
    cache       = require('gulp-cache');
    gulpFilter  = require('gulp-filter');
    merge       = require('merge-stream');
    svgo        = require('imagemin-svgo');
    svg2png     = require('gulp-svg2png');
    sourcemaps  = require('gulp-sourcemaps');
    svgspritesheet = require('gulp-svg-spritesheet');

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
    tpl: paths.src + 'assets/tpl',
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
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
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
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(assets.css))
            .pipe(notify({message: 'all.css generated'}))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(assets.css))
            .pipe(browserSync.reload({stream: true}))
            .pipe(notify({message: 'all.min.css generated'}))
            .pipe(gulp.dest(assets.css));

    var print = gulp.src(assets.scss + '/print.scss')
            .pipe(plumber())
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(assets.css))
            .pipe(notify({message: 'print.css generated'}))
            .pipe(cleanCSS())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(assets.css))
            .pipe(notify({message: 'print.min.css generated'}));

    return all, print;
});

/* Concatenate & Minify JS */
gulp.task('scripts', function () {
  return gulp.src([assets.js + '/src/lib/*.js', assets.js + '/src/*.js']) //manage order
            .pipe(plumber())
            .pipe(concat('/all.js'))    
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(assets.js))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest(assets.js))
            .pipe(notify({message: 'Scripts task complete'}));
});

/* Optimise images */
gulp.task('images', function () {
  return gulp.src(assets.img + '/**/*')
            .pipe(plumber())
            .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
            .pipe(gulp.dest(assets.img));
});


/* sprites management 
 * note : pixelbase option = font-size on body in your CSS file
 */

gulp.task('sprites', function () {
    
  folder.forEach(function (name) {
    gulp.src(assets.sprites + '/'+ name + '/*.svg')
        .pipe(plumber())
        .pipe(svgspritesheet({
          cssPathNoSvg: assets.css_img_path + '/sprite_' + name + '.png',
          cssPathSvg: assets.css_img_path + '/sprite_' + name + '.svg',
          padding: 10,
          positioning: 'diagonal',
          templateDest: assets.util + '/_sprite_' + name + '.scss',
          templateSrc: assets.tpl + '/sprite-template-' + name + '.tpl',
          pixelBase: 14,
          units: 'px',
          x: 0,
          y: 0
        }))
        .pipe(svgo({
          plugins: [
            {removeXMLProcInst: false}
          ]
        })())
        .pipe(gulp.dest(assets.img + '/sprite_' + name + '.svg'))
        .pipe(svg2png({'verbose':true}))
        .pipe(gulp.dest(assets.img + '/sprite_' + name + '.png'))
        .pipe(notify({message: 'Sprite ' + name + ' generated'}));
  });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
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
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
