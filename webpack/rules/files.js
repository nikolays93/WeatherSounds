module.exports = (config) => {
    return [
        {
            test: /\.(png|jpe?g|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        // publicPath: PATH_PUBLIC,
                        outputPath: config.PATH_IMAGES,
                    }
                }
            ]
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        // publicPath: PATH_PUBLIC,
                        outputPath: config.PATH_FONTS,
                    }
                }
            ]
        },
    ];
}
