var gulp = require('gulp');
var concat = require('gulp-concat');
var myth = require('gulp-myth');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var connect = require('connect');
var serve = require('serve-static');
var browsersync = require('browser-sync');
var plumber = require('gulp-plumber');
var beeper = require('beeper');

function onError(err) {
	beeper();
	console.log(err);
}

var cssFiles = ['assets/css/normalize.css', 'assets/css/abc.css'];
gulp.task('styles', function () {
	// Code Goes Here
	return gulp.src(cssFiles)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(concat('all.css'))
		.pipe(myth())
		.pipe(gulp.dest('dist'));

});

gulp.task('scripts', function () {
	// Code Goes Here
	return gulp.src('app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));

});

gulp.task('images', function () {
	return gulp.src('app/img/*')
		// Pipes Coming Soon
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function () {
	gulp.watch('app/css/*.css', gulp.series('styles', browsersync.reload));
	gulp.watch('app/js/*.js', gulp.series('scripts', browsersync.reload));
	gulp.watch('app/img/*', gulp.series('images', browsersync.reload));

});

//for more than one task per watched files use this
/*gulp.watch('app/css/*.css', gulp.parallel('firstTask', 'secondTask'));
•gulp.watch('app/js/*.js', gulp.series('thirdTask', 'fourthTask'));*/

gulp.task('server', function () {
	return connect().use(serve(__dirname))
		.listen(8080)
		.on('listening', function () {
			console.log('Server Running: View at http://localhost:8080');
		});
});

gulp.task('browsersync', function (cb) {
	return browsersync({
		server: {
			baseDir: './'
		}
	}, cb);
});

gulp.task('default', ['styles', 'scripts', 'images', 'server', 'browsersync', 'watch']);
