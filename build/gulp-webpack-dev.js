var gulp = require("gulp");
var webpackConfig = require("../webpack.config.dev"); 
var myconfig = Object.create(webpackConfig);
let entrys = myconfig.entry;
var webpack = require("webpack");
var gulphtmldev = ()=>{
  webpack(myconfig,(err,sta)=>{
    for(let entry in entrys){
      gulp.src("./src/"+entry+"/*.html").
      pipe(gulp.dest("./dist/"+entry));
    }
  })
};
module.exports = gulphtmldev;