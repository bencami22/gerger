require('webpack');
//const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextPlugin({ // define where to save the file (css)
    filename: 'public/compiled_css/[name].bundle.css',
    allChunks: true
})
module.exports = {
    entry: //{
        //clientjs: './scripts/client.js',
        //sitecss: './scss/site.scss'
        ['./scripts/client.js', './scss/site.scss']
        //}
        ,
    output: {
        filename: 'public/compiled_js/bundle.js',
        path: __dirname,
        publicPath: '/'
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=es2015,presets[]=stage-0'],
                //loaders: ["react-hot", 'babel-loader'],
                //query: {
                //    presets : ['es2015', 'react']
                //}
            },
            {
                test: /\.html$/,
                loaders: "file?name=[name].[ext]"
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        extractSass
    ]
};
