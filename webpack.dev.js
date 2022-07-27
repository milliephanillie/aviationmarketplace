const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    entry: "./src/index.ts",
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
                use: "ts-loader",
            },
            {
                test: /\.css$/i,
                include: path.resolve(__dirname, "src"),
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/i,
                use: 'html-loader',
            }
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
    ],
    output: {
        publicPath: ASSET_PATH,
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
};
