/**
 * Created by Hunter on 5/11/2016.
 */

var webpack = require('webpack');

/*
 npm run "test:watch"
 webpack-dev-server
 */

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './src/index.jsx'
    ],
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader?presets[]=es2015,presets[]=react']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {'react/lib/ReactMount': 'react-dom/lib/ReactMount'}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};