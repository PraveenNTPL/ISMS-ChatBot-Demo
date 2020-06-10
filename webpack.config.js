const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main.ts',
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@': path.resolve(__dirname, 'src/app/'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },

            // workaround for warning: System.import() is deprecated and will be removed soon. Use import() instead.
            {
                test: /[\/\\]@angular[\/\\].+\.js$/,
                parser: { system: true }
            },
            {
                test: /\.css$/i,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                // loader: 'file-loader?name=images/[name].[hash].[ext]'
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'static/img',
                        esModule: false // <- here
                      }
                    }
                  ]
            }
        ]
       
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.DefinePlugin({
            // global app config object
            config: JSON.stringify({
                apiUrl: 'http://localhost:4000'
            })
        }),

        // workaround for warning: Critical dependency: the request of a dependency is an expression
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            path.resolve(__dirname, 'src')
        ),
        // new CopyPlugin({
        //     patterns: [
        //       { from: 'src/images', to: './images' },
        //     ],
        //   }),
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    //     runtimeChunk: true
    // },
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: process.env.PORT || 8010
    }
}