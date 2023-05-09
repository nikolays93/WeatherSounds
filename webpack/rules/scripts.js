module.exports = (config) => {
    return [
        {
            test: /\.([cm]?ts|tsx)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}]
                        ],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                },
                {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true, // For hot reloading,
                        experimentalWatchApi: true
                    }
                }
            ]
        }
    ];
}
