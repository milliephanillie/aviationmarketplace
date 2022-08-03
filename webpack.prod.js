const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

let htmlPageNames = ['page', 'single', 'login', 'logout', 'turboprops', 'jets', 'pistons', 'helicopters', 'profile', 'sellaircraft', 'sellrealestate', 'sell', 'settings', 'promotion', 'profile', 'accountlistings'];

let multipleHtmlPlugins = htmlPageNames.map(name => {
    return new HtmlWebpackPlugin({
        template: `./src/${name}.html`, // relative path to the HTML files
        filename: `${name}.html`, // output HTML files
        chunks: [`${name}`] // respective JS files
    })
});


const path = require("path");

const ASSET_PATH = process.env.ASSET_PATH || '';

module.exports = (env) => {
    // Use env.<YOUR VARIABLE> here:
    console.log('Env: ', env); // true
    console.log("Env two: ", process.env.NODE_ENV);

    return {
        entry: {
            index: "./src/index.ts",
            accountlistings: "./src/accountlistings.ts",
            page: "./src/page.ts",
            single: "./src/single.ts",
            login: "./src/login.ts",
            profile: "./src/profile.ts",
            sellaircraft: "./src/sellaircraft.ts",
            sellrealestate: "./src/sellrealestate.ts",
            sell: "./src/sell.ts",
            settings: "./src/settings.ts",
            promotion:  "./src/promotion.ts",
            jets: "./src/jets.ts",
            turboprops: "./src/turboprops.ts",
            helicopters: "./src/helicopters.ts",
            login: "./src/login.ts",
            logout: "./src/logout.ts",
        },
        mode: "production",
        devtool: "inline-source-map",
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
                    test: /\.(js|ts|tsx)$/,
                    enforce: "pre",
                    use: ["source-map-loader"],
                },
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
                    test: /\.(gif|jpg|jpeg|png)$/,
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
    }
};
