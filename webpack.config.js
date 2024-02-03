const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts', // Adjust if your entry file is located elsewhere
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map', // Useful for debugging
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // Add this rule
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html', // Adjust if your HTML file is located elsewhere
        }),
    ],
    devServer: {
        // static: {
        //     directory: path.join(__dirname, 'dist'),
        // },
        // compress: true,
        // port: 9000, // You can choose any port
        static: './dist',
        hot: true, // Enable Hot Module Replacement
    },
};