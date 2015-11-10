var gulp = require('gulp')
	, stylus = require('gulp-stylus')
	, prefixer = require('autoprefixer-stylus')
  , koutoSwiss = require('kouto-swiss')
	, uglify = require('gulp-uglify')
  , rename = require('gulp-rename')
	, sourcemaps = require('gulp-sourcemaps')

var src = './src'
	, dist = './dist';

// css tasks
gulp.task('css', function() {
	return gulp.src(src + '/css/_malonebox.styl')
		.pipe(sourcemaps.init())
		.pipe(stylus({
			use: [koutoSwiss(), prefixer()]
			, compress: true
			, 'include css': true
		}))
    .on('error', nocrash)
		.pipe(sourcemaps.write('.'))
    .pipe(rename('malonebox.min.css'))
		.pipe(gulp.dest(dist + '/css'))
});

// js tasks
gulp.task('js', function() {
	return gulp.src(src + '/js/*.js')
    .pipe(rename('malone.min.js'))
		.pipe(uglify())
    .on('error', nocrash)
		.pipe(gulp.dest(dist + '/js'))
});

// run tasks
gulp.task('default', ['css', 'js'], function() {
	console.log('Done!!!');
});

// run tasks
gulp.task('watch', ['css', 'js'], function() {
  gulp.watch(src + '/css/**/*.styl', ['css']);
  gulp.watch(src + '/js/**/*.js', ['js']);
  console.log('I\'m watching you!');
});


// no crash. log it!
function nocrash(error) {
  console.log(error.toString());
  this.emit('end');
}

