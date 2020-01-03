const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module:{
        rules:[
            
        ]
    },
    devServer: {
        port: 8001,
        contentBase: path.join(__dirname, './dist'),
        host: 'localhost',
        hot: true,
        open: true
    }
}