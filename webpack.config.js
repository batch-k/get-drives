const path 			= require('path');
const webpack 		= require('webpack');
const JsDocPlugin 	= require('jsdoc-webpack-plugin');

module.exports = {
    mode: "production",
    entry: { 'index': ["./index.js"] },
    output: {
        // publicPath: "/",
        library: {
			name: "GetDrives",
			type: "amd"
		},
        // libraryTarget: 'umd',

        // globalObject: 'this',
        filename: `[name].min.js`,

        path: path.join(__dirname, "public")
    },
    target: ["node-webkit", "es2015"],
    module: {
        rules: [
            {
                test: /\.mjs$|js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env'
                        ]
                    ]
                }
            }
        ]
    },
    resolve: {
        modules: [
            'node_modules',
        ]
    }
}