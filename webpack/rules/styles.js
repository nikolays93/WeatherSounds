const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = (config) => {
    return [
        {
            test: /\.scss$/,
            use: [
                {
                    // Creates style nodes from JS strings
                    loader: config.isProduction ? MiniCSSExtractPlugin.loader : 'style-loader'
                },
                // Translates CSS into CommonJS
                'css-loader',
                // Translates SCSS to CSS
                'sass-loader',
            ],
        },
    ];
}
