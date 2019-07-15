'use strict';
let webpack = require('webpack');
let path = require('path');
let nodeModulesPath = path.join(__dirname, 'node_modules');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let exp = []; // multiple exports array

const envChk = process.env.NODE_ENV;
let customizePlugins = [];
const stats = {
  hash: false,
  version: false,
  timings: false,
  assets: false,
  chunks: false,
  modules: false,
  reasons: false,
  children: false,
  source: false,
  errors: true,
  errorDetails: false,
  warnings: false,
  publicPath: false,
  colors: {
    green: '\u001b[32m',
  },
};
if(envChk === "production") {
    customizePlugins = [
            new ExtractTextPlugin({
                filename: 'css/app.css'
            }),
            new webpack.optimize.UglifyJsPlugin({
                compressor: { warnings: false }
            })
        ];
} else {
    customizePlugins = [
        new ExtractTextPlugin({
            filename: 'css/app.css'
        })
    ]
}

// Exports configs for each language
let configs = [
    {
        name: 'min',
        entry: './src/index.js',
        scssRule: {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: { minimize: envChk === "production" ? true:false },
                },
                {
                    loader: "sass-loader",
                    options: { minimize: envChk === "production" ? true:false },
                },
                ],
                fallback: "style-loader"
            }),
        }
    }
];

// Generate exports module for each config
for (let c of configs) {
    var e = {
        context: __dirname,
        watch: envChk === "production" ? false:true,
        entry: c.entry,
        output: {
            path: path.resolve(__dirname, 'html/'),
            //pathinfo: true,
            filename: "js/app.js"
        },
        module: {
            rules: [{
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "jshint-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader",
                        options: { 
                            minimize: envChk === "production" ? true:false 
                        },
                    }],
                    fallback: "style-loader"
                }),
            },
            c.scssRule,
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '../[path].[ext]',
                    publicPath: '../',
                    emitFile: false
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                    name: '../[path].[ext]',
                    publicPath: '../',
                    emitFile: false
                },
            }
            ]
        },
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        plugins:customizePlugins,
        stats: stats,
        devServer: {
            stats:stats
        }
    }
    exp.push(e);
}

module.exports = exp;