const gulp = require('gulp'),
postcss = require("gulp-postcss"), 
autoprefixer = require("autoprefixer"),
cssvars = require("postcss-simple-vars"),
nested = require("postcss-nested"),
cssImport = require("postcss-import"),
browserSync = require("browser-sync").create();

//refresh html file
function html(){
    browserSync.reload();
}

//compile css file
function style(){
    //where is css file
    return gulp.src('.app/assets/styles/styles.css')

    //pass file through css compiler
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))

    .on('error', function(errorInfo){
        console.log("***Error*** " + errorInfo.toString());
        this.emit('end');
    })

    //save the compile css
    .pipe(gulp.dest('./app/temp/styles'))

    //stream changes to browsers
    .pipe(browserSync.stream())
};

//watcher
function watch(){
    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

    gulp.watch('./app/*.html').on('change', html);

    gulp.watch('./app/assets/styles/**/*.css', style);
};

exports.html = html;
exports.style=style;
exports.watch=watch;