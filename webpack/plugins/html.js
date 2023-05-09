const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (config) => {
    return new HtmlWebpackPlugin({
        hash: true,
        filename: 'index.html',
        template: config.PATH_SOURCE + '/index.html'
    })
}
