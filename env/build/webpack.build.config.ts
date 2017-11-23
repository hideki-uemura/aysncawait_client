import {glob} from 'glob';
import * as path from 'path';
import * as webpack from 'webpack';
// const {GlobCopyWebpackPlugin, BaseHrefWebpackPlugin} = require('@angular/cli/plugins/webpack');
import {GlobCopyWebpackPlugin, BaseHrefWebpackPlugin} from '@angular/cli/plugins/webpack';
// import {HtmlWebpackPlugin} from 'html-webpack-plugin';

// import * as bootstrapwebpack from 'bootstrap-webpack';


//{test: /\.html$/, loader: 'html-loader'},
declare var __dirname: any;
const config: webpack.Configuration = {
    context: path.resolve(__dirname, "../../"),
    entry: {
        app:    "./src/app.ts" ,
        vendor: ['jquery', 'underscore','createjs-module', 'bootstrap','bootstrap/dist/css/bootstrap.css'],
        // ,
        // html: "./src/index.html"
        // ,
        // simpleimg: glob.sync("./src/**/*.png")
    },

    output: {
        path: path.resolve(__dirname, "../../www"),
        //        publicPath: "/"
        filename: '[name].js'
    },
    module: {
        rules: [
            { test: /\.ts/, use: "awesome-typescript-loader?configFileName=env/build/tsconfig.build.json" },
            { test: /bootstrap\.js/, loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' },
            // { test: /index.html$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
            { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
            // { test: /si1mple.*\.png$/, loader: 'file-loader?name=img/simple/[name].[ext]'  },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            chunks:['app','vendor','createjs-module'],
            filename: "vendor.js",
        }),
        new webpack.ProvidePlugin({
            JQueryStatic: "jquery",
            jQuery: "jquery",
            $: "jquery",
            jquery: 'jquery',
            _: "underscore"
        })
        // ,
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     }
        // })
        ,
        new GlobCopyWebpackPlugin({
            "patterns": [
              "assets",
              "favicon.ico",
              "music",
              "font",
              "img",
              "index.html"
            ],
            "globOptions": {
              "cwd": path.join(process.cwd(), "src"),
              "dot": true,
              "ignore": "**/.gitkeep"
            }
          })
      

    ],
    devtool: 'source-map',
    // devServer: {
    //     contentBase: false,
    //     port: 8080,
    //     open: true,
    //     headers: {
    //         "Access-Control-Allow-Origin": "*"
    //     },
    //     openPage: ""
    // },
};
export default config;



