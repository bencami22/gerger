require('webpack');
const path = require('path');
module.exports = {
    entry: './client.js',
    output: {
        filename:'bundle.js',
        path: path.join(__dirname, 'client/js')
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
                //loaders: ["react-hot", 'babel-loader'],
                //query: {
                //    presets : ['es2015', 'react']
                //}
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
              test: /\.sass$/,
              include: paths.appSrc,
              loaders: ["style", "css", "sass"]
            },
        ]
    }
};