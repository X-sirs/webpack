const glob = require("glob");
const path = require("path");
exports.getEntries = function(globPath) { //获取所有文件入口
    let files = glob.sync(globPath),
        entries = {};
    files.forEach(function (filePath) {
        let name = filePath.substr(0, filePath.lastIndexOf("/"));
        let names = name.substring(name.lastIndexOf("/") + 1, name.length);
        entries[names] = path.resolve(__dirname, name);
    });
    return entries;
}