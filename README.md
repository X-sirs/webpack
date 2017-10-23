#   webpack+gulp项目工程化
一、原理
webpack+gulp就是webpack的输出目录作为gulp的入口文件在进行处理，利用webpack和gulp进行功能的互补

二、webpack篇
1.webpack常见命令
webpack --config webpack.dev.config.js //运行配置文件
webpack --display-error-details //显示异常信息
webpack --watch   //监听变动并自动打包
webpack -p    //压缩混淆脚本
webpack -d    //生成map映射文件，告知模块打包的详细的信息

三、项目运行
1.npm install     --安装下载相关依赖包
2.npm run dll     --生成manifest.json对包版本文件进行缓存（当安装新的依赖包或包版本升级时请先运行次命令）
3.npm run dev     --开启开发环境下的服务,打包，编译等工作
4.npm run build   --生产环境打包编译处理