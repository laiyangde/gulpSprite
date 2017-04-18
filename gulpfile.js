var gulp=require("gulp"),
    spritesmith=require('gulp.spritesmith'),
    minimist = require('minimist');
if (!process.argv[4]) {
    process.argv[4] = 1
}
var options = minimist(process.argv.slice(2), {
        string: 'env',
    });
console.log(options.env)
gulp.task('sprite', function (e) {
    return gulp.src('src/'+options.env+'/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding:0,//合并时两个图片的间距
            algorithm: 'left-right',//top-down、left-right,binary-tree
            cssTemplate:function (data) {
                var arr=[];
                data.sprites.forEach(function (sprite) {
                    arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url('"+sprite.escaped_image+"');"+
                    "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}\n");
                });
                return arr.join("");
            }//注释2
        }))
        .pipe(gulp.dest('dest/'+options.env+'/'));
});