const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    output: {

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
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
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
        new CopyPlugin({
            patterns: [
                { context: './src/', from: "**/*.html", to: "./", force: true },
                { from: "static", to: "static" }
            ],
        }),
        // new HtmlWebpackPlugin({
        //     template: "./src/admin/index.html",
        //     filename: "./src/admin/index.html",
        //     publicPath: './admin/',
        //     inject: true,
        // })
    ],
};
