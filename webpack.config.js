const pathModule = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: pathModule.resolve(__dirname, "dist"),
        assetModuleFilename: 'images/[name][ext]'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
        ],

    },
    plugins: [
        // https://webpack.js.org/plugins/html-webpack-plugin/#root
        new HtmlWebpackPlugin({title:'JS Packages Tools Lab'}),

        // https://webpack.js.org/plugins/css-minimizer-webpack-plugin/#root
        new CssMinimizerPlugin(),
        // https://webpack.js.org/plugins/mini-css-extract-plugin/#root
        new MiniCssExtractPlugin(),
        // https://webpack.js.org/plugins/image-minimizer-webpack-plugin/#root
        new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['mozjpeg', { quality: 60 }],
                    [
                        'svgo',
                        {
                            plugins: [
                                {
                                    removeViewBox: false,
                                },
                            ],
                        },
                    ],
                ],
            },
        }),
        new CleanWebpackPlugin()

    ],
    optimization: {
        minimize: true,
        minimizer: ['...']
    }
}