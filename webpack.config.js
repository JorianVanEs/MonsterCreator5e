var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
    filename: "main.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: ['./assets/src/js/main.es6', './assets/src/main.scss'],
    output: {
        path: __dirname + '/assets/dist',
        filename: 'main.js'
    },
    module: {
        loaders: [{
            test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['react','env']
            }
        },
        {
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],

                fallback: "style-loader"
            })
        },
        {
            test: /\.(png|jpg|gif|svg)$/i,
            loader: 'file-loader',
            options: {
                outputPath: 'img'
            }
        }]
    },
    plugins: [
        new BrowserSyncPlugin({
          host: 'localhost',
          server: { baseDir: ['./'] }
        }),
        extractSass
      ]
};
