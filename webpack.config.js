const path = require('path');

module.exports = {

    entry: './frontend/index.jsx',
    output: {
        //path requires absolute path 
        path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js' //not sure if i need to specify this file yet
    },
    devtool: 'source-map',
    resolve: {
        extensions: [".js", ".jsx", "*"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env', 
                            '@babel/react',
                            {
                                plugins: ['@babel/plugin-proposal-class-properties'
                                 , '@babel/plugin-transform-runtime'],
                            },
                        ] //which presets to run
                    }
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        limit: 8192,
                        esModule: false,
                        }
                    }]
            }
        ]
    }


};