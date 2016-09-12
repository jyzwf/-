var path = require('path'),
	webpack = require('webpack');
	
module.exports = {
	entry:{
		build:'./src/app.js',
		loading:'./src/loading.js'
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'[name].js',
		publicPath:'/dist/'
	},

	module:{
		loaders:[
			{test:/\.js$/,loader:'babel',exclude:/node_modules/},
			{test:/\.scss$/,loader:'style!css!sass!autoprefixer'},
			{
                // edit this for additional asset file types
                test: /\.(png|jpg|svg)$/,
                loader: 'file?name=./asset/imgs/[name].[ext]'
            },
            {test:/\.html$/,loader:'html'}
		]
	},
	babel:{
		presets:['es2015']
	},
	resolve:{
		extensions:['','.js','.css','.scss','.html']
	}
}


if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ]
} else {
    module.exports.devtool = '#source-map'
}