const dir = "20200106_xhs_web" //项目目录
    , fs          = require('fs')
    , gulp        = require('gulp')
    , template    = require('gulp-template')
    , del         = require('del')
    , replace     = require('gulp-replace')
    , sass        = require('gulp-sass')
    , pug         = require('gulp-pug')
    , rev         = require('gulp-asset-rev')
    , postcss     = require('gulp-postcss')
    , autoprefixer= require('autoprefixer')
    , sourcemaps  = require("gulp-sourcemaps")
    , cleanCSS    = require('gulp-clean-css')
    , concat      = require('gulp-concat')
    , uglify      = require('gulp-uglify')
    , babel       = require('gulp-babel')
    , browserSync = require('browser-sync').create()
    , reload      = browserSync.reload
    , md5         = require('md5')
    , dev         = './'+ dir
    , page        = '*'
    , data = {}//require(dev+'/res/data.js');
var verStr = '?v='+md5(Date.parse(new Date())).substr(0,6);

function createCopyTask(taskName, src, dest, checkpath, isReload) {
    if(isReload!==false){ isReload = true; }
    gulp.task(taskName, ()=>{
        if(checkpath){
            fs.exists(dest, function(exists){
                if(exists){
                    throw (dir+' is exists.');
                }else{
                    console.log(dir + ' is created completed.');
                    done();
                }
            });
        }else{
            done();
        }
    });
    function done(){
        var fn = function(isReload){
            var res = gulp.src(src)
            res = res.pipe(gulp.dest(dest))
            if (isReload)
                res = res.pipe(reload({stream: true}))
            return res;
        }
        if(false){
            return del(dest).then(function () {
                fn(isReload);
            })
        }else{
            return fn(isReload);
        }
    }
}


createCopyTask('default', './.template/**/**','./' + dir, true);
createCopyTask('public', './.public/scripts/**/**', dir+'/res/scripts');

gulp.task('copy',['public']);

gulp.task('js', ()=>{
    gulp.src(dev+'/res/scripts/_*.js')
        .pipe(babel({
            presets:['es2015']
        }))
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dev+'/res/scripts'))
        .pipe(reload({stream:true}))
})


gulp.task('sass', ()=>{
    var processors = [
        autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove:true
        })
    ]
    return gulp.src(dev+'/res/styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rev({verStr:verStr}))
        .pipe(cleanCSS())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(dev+'/res/styles'))
        .pipe(reload({stream:true}))
})

gulp.task('sourceArr', ()=>{
    var imgList = [];
    var files = fs.readdirSync(dev+'/res/images/');
    files.forEach((itm)=>{
        imgList.push(itm);
    });
    console.log(imgList);
})

gulp.task('pug', ()=>{
    return gulp.src([dev+'/pug/'+page+'.pug', '!' + dir + '/pug/mixin.pug'])
        // .pipe(template({
        //     data:JSON.stringify(data)
        // }))
        .pipe(pug({pretty:true}))
        .pipe(replace(/<head>/, '<!DOCTYPE html>\n<html lang="en">\n<head>'))
        .pipe(replace(/\?v=/g, verStr))
        .pipe(replace(/\%TIME\%/g, new Date()))
        .pipe(replace(/src="@/g, 'src="res/images/'))
        .pipe(replace(/\.png/g, ".png"+verStr))
        .pipe(replace(/\.jpg/g, ".jpg"+verStr))
        .pipe(replace(/<\/body>/, '</body>\n</html>'))
        // .pipe(rev({verStr:verStr}))
        .pipe(gulp.dest(dev))
        .pipe(reload({stream:true}))
})


gulp.task('serve', ['sass', 'pug', 'js'], ()=>{
    browserSync.init({
        server: dev
    });
    gulp.watch(dir + '/res/styles/*.scss', ['sass']);
    gulp.watch(dir + '/res/scripts/_*.js', ['js']);
    gulp.watch(dir + '/pug/*.pug', ['pug']);
    gulp.watch(dir + '/*.pug', ['pug']);
    gulp.watch('.public/**/*.pug', ['pug']);
});
