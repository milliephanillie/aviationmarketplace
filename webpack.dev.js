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
                exclude: /node_modules/,
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
                {
                    context: './src/',
                    from: "**/*.html", to: "./",
                    force: true,
                    transform(content, absoluteFrom) {
                        return content
                            .toString()
                            .replace(/_SITE_URL_/g, "http://localhost:8080/");
                    },
                },
                {
                    from: "static",
                    to: "static",
                },
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
