/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
const
    autoprefixer    = require('gulp-autoprefixer'),
    babel           = require("gulp-babel"),
    babelify        = require('babelify'),
    browserify      = require('browserify'),
    cache           = require('gulp-cache'),
    concat          = require('gulp-concat'),
    cssnano         = require('gulp-cssnano'),
    del             = require('del'),
    gulp            = require('gulp'),
    gutil           = require('gulp-util'),
    imagemin        = require('gulp-imagemin'),
    jshint          = require('gulp-jshint'),
    livereload      = require('gulp-livereload'),
    nodemon         = require('gulp-nodemon'),
    notify          = require('gulp-notify'),
    path            = require('path'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    source          = require('vinyl-source-stream'),
    sourcemaps      = require("gulp-sourcemaps"),
    uglify          = require('gulp-uglify');

var dependencies = [
];

var scriptsCount = 0;

// Styles
gulp.task('styles', function() {

    return gulp.src('pub/src/scss/app.scss')
        .pipe(sass({
            includePaths: [
                'pub/lib/foundation-sites/scss',
                'pub/lib/motion-ui/src'
            ]
        })
            .on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('pub/dist/css'));
});

// Scripts
gulp.task('scripts', function() {
    bundleApp(false);
});

// Images
gulp.task('images', function() {
    return gulp.src('pub/src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('pub/dist/images'));
});

// Clean
gulp.task('clean', function() {
    return del(['pub/dist/css', 'pub/dist/js', 'pub/dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
    gulp.start('watch');
    nodemon({ script: 'app.js', watch:['app.js','app/'], ext: 'js json html' });
});

gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('pub/src/scss/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('pub/src/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('pub/src/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});

function bundleApp(isProduction) {
    scriptsCount++;
    // Browserify will bundle all our js files together in to one and will let
    // us use modules in the front end.
    var appBundler = browserify({
        entries: 'pub/src/js/App.js',
        debug: true
    })

    // If it's not for production, a separate vendors.js file will be created
    // the first time gulp is run so that we don't have to rebundle things like
    // react everytime there's a change in the js file
    if (!isProduction && scriptsCount === 1){
        // create vendors.js for dev environment.
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('vendors.js'))
            .pipe(gulp.dest('./pub/dist/js/'));
    }
    if (!isProduction){
        // make the dependencies external so they dont get bundled by the
        // app bundler. Dependencies are already bundled in vendor.js for
        // development environments.
        dependencies.forEach(function(dep){
            appBundler.external(dep);
        })
    }

    appBundler
        // transform ES6 and JSX to ES5 with babelify
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .on('error',gutil.log)
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./pub/dist/js/'));
}