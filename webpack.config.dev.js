const webpack = require("webpack");
const path = require("path");
//const WriteFilePlugin = require("write-file-webpack-plugin"); //生成打包后的文件,由于hmr也会产生，所以采用gulp处理
//const HtmlWebpackPlugin = require("html-webpack-plugin"); //html自动生成和导入对应的js文件到html,采用gulp处理
// const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //抽离css文件
const BabiliPlugin = require("babili-webpack-plugin"); //压缩js  
const glob = require("glob");

function getEntries(globPath) { //获取所有文件入口
    let files = glob.sync(globPath),
        entries = {};
    files.forEach(function(filePath) {
        let name = filePath.substr(0, filePath.lastIndexOf("/"));
        let names = name.substring(name.lastIndexOf("/") + 1, name.length);
        entries[names] =['webpack-hot-middleware/client',path.resolve(__dirname, name)];
    });
    return entries;
}
var htmls = getEntries("./src/**/*.html");
const PATHS = { //设置webpack的入口和出口配置
    src: htmls,
    dist: path.join(__dirname, "dist"),
};
//                                         __dirname 当前命令执行所在的目录
// entry:{                                 入口：entry的值有三种类型 ： 1.字符串，2.数组， 3.对象
//     home:__dirname+'/src/js/home.js',   字符串:指定从这个文件路径下面的文件作为打包的入口文件    数组：当存在多个入口时,多个文件会打包到一个文件中
//     main:__dirname+'/src/js/main.js'    对象:设置多个打包目标，每一对键值对都对应着一个入口文件。常用于多页面入口文件配置
// },
var webapckConfig = {
    entry: PATHS.src,
    output: {
        path: PATHS.dist,
        publicPath:"/",
        filename: "[name]/bundle.js", //dev-server环境不能使用chunkhash
        chunkFilename:"[name].[chunkhash].js"
    },
    devServer: {
        port: 8128,
        inline: true,
        hot: true,
        noInfo: false,
        historyApiFallback: true,
        overlay: {
            errors: true,
            warning: true
        },
        stats: {
            cached: false,
            colors: true
        }
    },
    devtool: "source-map",
    performance: { //文件大小检查
        hints: "warning",
        maxEntrypointSize: 400000,
        maxAssetSize: 10000000
    },
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
                test: /\.js$/,
                enforce: "pre",
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    fix: true
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ //抽离css文件
            filename: '[name]/style/index.css?[contenthash]',
            ignoreOrder: true
        }),
        new webpack.DllReferencePlugin({ //分离第三方库
            context: __dirname,
            manifest: require('./vendors-manifest.json')
        }),
        new webpack.ProvidePlugin({
            vue: "vue",
        }),
        new BabiliPlugin(), //压缩js文件--(会压缩require，对require.ensure有影响)
        new webpack.optimize.CommonsChunkPlugin({ //提取公共模块
            name: "commons",
            filename: "assets/js/commons.js",
            chunks:Object.keys(htmls)
        }),
        new webpack.HotModuleReplacementPlugin(), //热更新
        new webpack.NoEmitOnErrorsPlugin(),    //编译后将错误输出
        // new WriteFilePlugin({    //输出内存文件系统中的打包文件
        //     force: true,
        //     useHashIndex: false,
        // })
        // new CleanWebpackPlugin(Object.keys(htmls).concat("assets"), {  //清除文件夹
        //     root: path.resolve(__dirname, './dist'),
        //     verbose: true,
        //     dry: false,
        //     exclude: [path.resolve(__dirname, './dist/common')]
        // }),
    ],
};
// for (var key in htmls) { //配置config文件生成多页面的html文件
//     webapckConfig.plugins.push(new HtmlWebpackPlugin({
//         filename: `${key}/index.html`,
//         template: `${htmls[key][1]}/index.html`,
//         chunks: [key]
//     }));
// }
module.exports = webapckConfig;