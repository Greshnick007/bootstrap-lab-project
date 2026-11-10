const path = require('node:path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'app/dist'),
        filename: 'bundle.js',
        publicPath: './',
        clean: true
    },
    module: {
        rules: [{
            test: /\.scss$/i,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('autoprefixer')()]
                        }
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: {
                            silenceDeprecations: [
                                'import',
                                'global-builtin',
                                'color-functions',
                                'if-function'
                            ]
                        }
                    }
                }
            ]
        }]
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'styles.css' })],
    devServer: {
        static: { directory: path.resolve(__dirname, 'app') },
        devMiddleware: { publicPath: '/dist/' },
        watchFiles: ['app/**/*.html'],
        port: 8080,
        open: true
    }
};