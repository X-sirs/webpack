var gulp = require("gulp");
var del = require("del");
//var gulphtmldev = require("./build/gulp-webpack-dev");
gulp.task("clean",function(cb){
  del([
    "./dist/*",
    "!./dist/common",
  ], cb);
});
// gulp.task("disthtml",function(){
//   gulphtmldev();
// });