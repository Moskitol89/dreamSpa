let gulp = require("gulp"),
    sass = require("gulp-sass"),
    browserSync = require("browser-sync"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    rename = require("gulp-rename"),
    del = require("del"),
    autoPrefixer = require("gulp-autoprefixer"),
    imageMin = require("gulp-imagemin");

gulp.task("clean", async function () {
    del.sync("dist");
});

gulp.task("scss", function () {
    return gulp.src("app/scss/**/*.scss")
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 8 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task("css", function () {
    return gulp.src([
        "node_modules/normalize.css/normalize.css",
        "node_modules/swiper/swiper-bundle.css",
        "node_modules/magnific-popup/dist/magnific-popup.css",
        "node_modules/rateyo/min/jquery.rateyo.min.css",
        "node_modules/ion-rangeslider/css/ion.rangeSlider.min.css",
        "node_modules/jquery-form-styler/dist/jquery.formstyler.css",
        "node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css"
    ])
        .pipe(concat("_libs.scss"))
        .pipe(gulp.dest("app/scss"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("js", function () {
    return gulp.src([
        "node_modules/swiper/swiper-bundle.js",
        "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
        "node_modules/mixitup/dist/mixitup.js",
        "node_modules/rateyo/min/jquery.rateyo.min.js",
        "node_modules/ion-rangeslider/js/ion.rangeSlider.min.js",
        "node_modules/jquery-form-styler/dist/jquery.formstyler.js"
    ])
        .pipe(concat("libs.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task("html", function () {
    return gulp.src("app/*.html")
        .pipe(browserSync.reload({stream: true}));
});
gulp.task("script", function () {
    return gulp.src("app/js/*.js")
        .pipe(browserSync.reload({stream: true}));
});
// gulp.task("php", function() {
//     return gulp.src("app/php/*.php")
//         .pipe(browserSync.reload({ stream: true }));
// });
// gulp.task("mainPhp", function() {
//     return gulp.src("app/*.php")
//         .pipe(browserSync.reload({ stream: true }));
// });

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task("export", async function () {
    let buildHtml = gulp.src("app/**/*.html")
        .pipe(gulp.dest("dist"));

    let buildCss = gulp.src("app/css/**/*.css")
        .pipe(gulp.dest("dist/css"));

    let buildJs = gulp.src("app/js/**/*.js")
        .pipe(gulp.dest("dist/js"));

    let buildFonts = gulp.src("app/fonts/**/*.*")
        .pipe(gulp.dest("dist/fonts"));

    // let buildImg = gulp.src("app/img/**/*.*")
    //     .pipe(gulp.dest("dist/img"));

    let buildMainPagesPhp = gulp.src("app/*.php")
        .pipe(gulp.dest("dist"));

    let buildPhp = gulp.src("app/php/**/*.*")
        .pipe(gulp.dest("dist/php"));

    let buildImageMin = gulp.src("app/img/**/*.*")
        .pipe(imageMin())
        .pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
    gulp.watch("app/scss/**/*.scss", {
        delay: 1000
    }, gulp.parallel("scss"));
    gulp.watch("app/*.html", gulp.parallel("html"));
    gulp.watch("app/js/*.js", gulp.parallel("script"));
    // gulp.watch("app/php/*.php", gulp.parallel("php"));
    // gulp.watch("app/*.php", gulp.parallel("mainPhp"));
});

gulp.task("build", gulp.series("clean", "export"));

gulp.task("default", gulp.parallel("css", "scss", "js", "browser-sync", "watch"));