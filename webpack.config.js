const HtmlWebPackPlugin = require("html-webpack-plugin"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const { loader } = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin'); 

module.exports = {
    output: {
        filename: 'main.[contenthash].js',
        clean: true 
    },
    optimization: {
        minimize: true, 
        minimizer: [new CssMinimizerPlugin(), new Terser()]
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/i, 
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true 
                        }
                    }
                ] 
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader, 
                        options: {
                            publicPath: "./"
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: "image-webpack-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            },
            {
                test: /\.(woff)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]"
                }
            }
        ]
    }, 
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[fullhash].css',
            ignoreOrder: false
        }),
    ]
}