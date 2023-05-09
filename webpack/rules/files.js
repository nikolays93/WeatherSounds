module.exports = (config) => {
    return [
        {
            test: /\.(jpe?g|png|gif|svg|webp)$/,
            type: 'asset/resource',
            generator: {
                filename: "images/[name][ext]?[hash]",
            },
        },
        {
            test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9-]+)?$/,
            type: 'asset/resource',
            generator: {
                filename: "fonts/[name][ext]?[hash]",
            },
        }
    ];
}
