var gulp = require("gulp");
var webpackConfig = require("../webpack.config.dev"); 
var myconfig = Object.create(webpackConfig);
var replace = require('gulp-replace');//替换引入的文件
let entrys = myconfig.entry;
var webpack = require("webpack");
var gulphtmldev = ()=>{
  webpack(myconfig,(err,sta)=>{
    for(let entry in entrys){
      gulp.src("./src/"+entry+"/*.html")
      .pipe(replace(/<!--BeginInjectCss-->([\s\S]*?)<!--EndInjectCss-->/g,`<link rel="stylesheet" href="./style/${entry}.css">`))
      .pipe(replace(/<!--BeginInjectJs-->([\s\S]*?)<!--EndInjectJs-->/g,`<script src="./${entry}-bundle.js"></script>`))
      .pipe(gulp.dest("./dist/"+entry));
    }
  })
};
module.exports = gulphtmldev;