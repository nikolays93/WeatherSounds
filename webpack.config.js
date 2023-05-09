const path = require('path');
const config = require('./webpack/config');

module.exports = (env, opts) => {
    config.isProduction = !opts.mode || opts.mode === "production";

    const rules = {
        files: require('./webpack/rules/files')(config),
        html: require('./webpack/rules/html')(config),
        scripts: require('./webpack/rules/scripts')(config),
        styles: require('./webpack/rules/styles')(config),
    };

    const plugins = {
        html: require('./webpack/plugins/html')(config),
        uglify: require('./webpack/plugins/uglify')(config),
        extractStyles: require('./webpack/plugins/extract-styles')(config),
    };

    return {
        mode: config.isProduction ? "production" : "development",
        entry: {
            app: config.PATH_SOURCE + "/app.ts",
        },
        output: {
            path: path.resolve(__dirname, config.PATH_PUBLIC),
            filename: '[name].js',
        },
        module: {
            rules: [
                ...rules.files,
                ...rules.html,
                ...rules.scripts,
                ...rules.styles,
            ]
        },
        resolve: {
            alias: {
                "@assets": path.resolve(__dirname, 'source/assets/')
            },
            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: [".ts", ".tsx", ".js"],
        },
        plugins: [
            plugins.html,
            plugins.extractStyles,
        ],
        devtool: !config.isProduction ? "inline-source-map" : false,
        devServer: config.devServer,
        optimization: {
            minimizer: [plugins.uglify],
        },
    };
}
