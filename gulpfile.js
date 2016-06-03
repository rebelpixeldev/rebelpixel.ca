/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
const
    autoprefixer    = require('gulp-autoprefixer'),
    cache           = require('gulp-cache'),
    concat          = require('gulp-concat'),
    cssnano         = require('gulp-cssnano'),
    del             = require('del'),
    gulp            = require('gulp'),
    imagemin        = require('gulp-imagemin'),
    jshint          = require('gulp-jshint'),
    livereload      = require('gulp-livereload'),
    nodemon         = require('gulp-nodemon'),
    notify          = require('gulp-notify'),
    path            = require('path'),
    rename          = require('gulp-rename'),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify');

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

    //
    //return gulp.src('./sass/**/*.scss')
    //    .pipe(sass().on('error', sass.logError))
    //    .pipe(gulp.dest('./css'));

    //return sass('pub/src/scss/app.scss',
    //    {
    //        style: 'expanded',
    //        includePaths: [
    //            'app/lib/foundation-sites/scss',
    //            'app/lib/motion-ui/src'
    //        ]
    //    })
    //    .pipe(autoprefixer('last 2 version'))
    //    .pipe(gulp.dest('pub/dist/css'))
    //    .pipe(rename({ suffix: '.min' }))
    //    .pipe(cssnano())
    //    .pipe(gulp.dest('pub/dist/css'))
    //    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src('pub/src/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        //.pipe(concat('main.js'))
        .pipe(gulp.dest('pub/dist/js'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(uglify())
        .pipe(gulp.dest('pub/dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('pub/src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('pub/dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function() {
    return del(['pub/dist/css', 'pub/dist/js', 'pub/dist/images']);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');

    gulp.start('watch');

    nodemon({ script: 'app.js', watch:['app.js','app/'], ext: 'js json' });

    //nodemon({
    //    // the script to run the app
    //    script  : 'app.js',
    //    ext     : 'js html',
    //    ignore  : ['node_modules/', 'pub/dist'],
    //    env: { 'NODE_ENV': 'development' },
    //    tasks   : ['watch'],
    //    watch   : [path.join(__dirname, 'app/**/*.js'), 'app.js', path.join(__dirname, 'app/**/*.html')]
    //})
    //    .on('start', ['watch'])
    //    .on('change', ['watch'])
    //    .on('restart', function () {
    //        // when the app has restarted, run livereload.
    //        gulp.src('app.js')
    //            .pipe(livereload())
    //            .pipe(notify('Reloading page, please wait...'));
    //    });
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