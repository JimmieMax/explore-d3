const path = require('path');

module.exports = {
    //设置入口文件
    entry: {
        index: ['./src/app/index.js'],
    },
    //出口文件
    output: {
        //根据config模块得知是根目录下的dist文件夹
        path: path.join(__dirname, './src/dist'),
        filename: '[name].bundle.js',
    }, module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    mode: 'none',
    watch: true
};

