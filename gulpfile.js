var gulp = require('gulp'),
watch = require("gulp-watch"),
postcss = require("gulp-postcss"), 
autoprefixer = require("autoprefixer"),
cssvars = require("postcss-simple-vars"),
nested = require("postcss-nested"),
cssImport = require("postcss-import"),
browserSync = require("browser-sync").create();


gulp.task("default", function(){
    console.log("Horray, Cherita you created a gulp task.");
});

gulp.task("html", function(){
    console.log("Something useful for HTML.");
});

gulp.task("styles", function(){
    return gulp.src("./app/assets/styles/styles.css")
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest("./app/temp/styles"));
});

gulp.task("watch", function(){

    browserSync.init({
        server: {
            baseDir: "app"
        }
    });

    watch("./app/index.html", function(){
        browserSync.reload();
    });
});

gulp.task("watch", function(){
    watch("./app/assets/styles/**/*.css", function(){
        gulp.start("styles");
    });
});