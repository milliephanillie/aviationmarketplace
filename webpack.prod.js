const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

let htmlPageNames = ['page', 'single'];

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`, // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
        chunks: [`${name}`] // respective JS files
    })
});


const path = require("path");

const ASSET_PATH = process.env.ASSET_PATH || '';

module.exports = {
    entry: {
        index: "./src/index.ts",
        page: "./src/page.ts",
        single: "./src/single.ts",
    },
    mode: "production",
    devServer: {
        watchFiles: ["src/**/*"],
        proxy: {
            '/*.html': {
                target: 'http://localhost/',
            },
        },

    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: [
                    process.env.NODE_ENV === 'production'
                        ? {
                            loader:MiniCssExtractPlugin.loader,
                        }
                        : 'style-loader',
                    "css-loader",
                    "postcss-loader"],
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: { filename: '[name][ext]', publicPath: '../static/images/' },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: { filename: 'fonts/[name][ext]', publicPath: '../' },
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new WebpackManifestPlugin(),
        ...((process.env.NODE_ENV  !== 'production') ? [] : [new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
        })].concat(multipleHtmlPlugins)),
        ...((process.env.NODE_ENV  !== 'production') ? [] : [new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash].css',
        })]),
        ...((process.env.NODE_ENV  !== 'production') ? [] : [new CopyPlugin({
            patterns: [
                { from: "static", to: "static" }
            ],
        })]),
    ],
    output: {
        publicPath: ASSET_PATH,
        filename: "[id].bundle_[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
};
