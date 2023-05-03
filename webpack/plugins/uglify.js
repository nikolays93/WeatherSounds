const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = (config) => {
    return new UglifyJSPlugin({
        uglifyOptions: {
            keep_classnames: true,
            keep_fnames: true,
        }
    });
};