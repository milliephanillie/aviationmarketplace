const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, "./dist"),
        publicPath: path.resolve(__dirname, "/admin"),
    },
    mode: "development",
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
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         { context: './src/', from: "**/*.html", to: "./", force: true },
        //         { from: "static", to: "static" }
        //     ],
        // }),
        new HtmlWebpackPlugin({
            template: "./src/admin/index.html",
            inject: true,
        })
    ],
};
