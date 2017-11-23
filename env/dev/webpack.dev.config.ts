import * as path from 'path';
import * as webpack from 'webpack';
import {glob} from 'glob';
import {GlobCopyWebpackPlugin, BaseHrefWebpackPlugin} from '@angular/cli/plugins/webpack';

declare var __dirname: any;
const config: webpack.Configuration = {
    context: path.resolve(__dirname, "../../"),
    entry: {
        app: "./src/app.ts",
        vendor: ['jquery', 'underscore','createjs-module', 'bootstrap','bootstrap/dist/css/bootstrap.css'],
        // html: "./src/index.html",
        // simpleimg: glob.sync("./src/**/*.png")
    },
    output: {
        path: path.resolve(__dirname, "www"),
        filename: "[name].js",
        //        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.ts/, use: "awesome-typescript-loader?configFileName=env/dev/tsconfig.dev.json" },
            { test: /bootstrap\.js/, loader: 'imports-loader?jQuery=jquery,$=jquery,this=>window' },
            { test: /index.html$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
            { test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml' },
            // { test: /\.mp3/, loader: 'url-loader?mimetype=audio/mp3' },
            { test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff' },
            { test: /\.png$/, loader: 'url-loader?mimetype=image/png' },
            // { test: /simple.*\.png$/, loader: 'file-loader?name=img/simple/[name].[ext]'  },
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
        }),
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
          }),

          new webpack.HotModuleReplacementPlugin()  
          
    ],
    devServer: {
        contentBase: false,
        port: 8080,
        open: true,
        // headers: {
        //     "Access-Control-Allow-Origin": "*"
        // },
        inline: true,
        hot: true,
        openPage: ""
    },
    devtool: 'source-map',
};
export default config;



