const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');

const handleError = (error) => {
    console.log(error.toString());
    this.emit('end');
};

const js = callback => {
    gulp.src('src/**/*.js')
            .pipe(babel({
                presets: [
                    [
                        "@babel/env", {
                            targets: "> 1%, not dead",
                            modules: false
                        }
                    ]
                ],
                plugins:
                        [
                            'babel-plugin-minify-constant-folding',
                            'babel-plugin-minify-flip-comparisons',
                            'babel-plugin-minify-guarded-expressions',
                            'babel-plugin-minify-infinity',
                            'babel-plugin-minify-mangle-names',
                            'babel-plugin-minify-replace',
                            'babel-plugin-minify-simplify',
                            'babel-plugin-minify-type-constructors',
                            'babel-plugin-transform-member-expression-literals',
                            'babel-plugin-transform-merge-sibling-variables',
                            'babel-plugin-transform-minify-booleans',
                            'babel-plugin-transform-property-literals',
                            'babel-plugin-transform-simplify-comparison-operators',
                            'babel-plugin-transform-undefined-to-void'
                        ],
                comments: false
            }))
            .on('error', handleError)
            .pipe(gulp.dest('dist'));
    callback();
};

const css = callback => {
    gulp.src('src/**/*.less').
            pipe(less()).
            pipe(cleanCSS()).
            pipe(gulp.dest('dist'));
    callback();
};

const copyFiles = callback => {
    gulp.src('src/**/*.css').pipe(gulp.dest('dist'));
    gulp.src('src/**/*.html').pipe(gulp.dest('dist'));
    gulp.src('src/**/*.ico').pipe(gulp.dest('dist'));
    gulp.src('src/resource/font/*.*').pipe(gulp.dest('dist/resource/font'));
    gulp.src('src/resource/image/*.*').pipe(gulp.dest('dist/resource/image'));
    callback();
};

gulp.task('watch', function () {
    gulp.watch(['src/**/*.html'], copyFiles);
    gulp.watch('src/**/*.js', js);
    gulp.watch('src/**/*.less', css);
});
