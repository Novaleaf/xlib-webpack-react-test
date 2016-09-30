//make a "webpak.dev.config.js" without uglifyJsPlugin minifier later

var webpack = require("webpack");

module.exports = {
    debug: true,
	entry: {
		app: "./src/index.tsx",
		xlib:["xlib"],
	},
    output: {
        filename: "./dist/bundle.js",
        //library: "xlib",
        //libraryTarget: "umd",
        //umdNamedDefine:true,
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    /**
    module.loaders

    A array of automatically applied loaders.

    Each item can have these properties:

    test: A condition that must be met
    exclude: A condition that must not be met
    include: A condition that must be met
    loader: A string of "!" separated loaders
    loaders: A array of loaders as string
    A condition can be a RegExp, an absolute path start, or an array of one of these combined with "and".

    exclude: [/bower_components/, /node_modules/] 
    */
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /.*node_modules.*/, //only process local files
			},   
			// no-op the source-map-support module, which provides proper loading/consumption of source maps (useful for typescript) on nodejs
			{
				test: /.*[/\\]source-map-support[/\\]source-map-support\.js$/,
				loader:"null-loader",
			},
            ////es2015 to es5.  see https://github.com/babel/babel-loader
            ////requires npm install babel-loader babel-core babel-preset-es2015 --save-dev
            //{
            //    test: /\.js$/,
            //    loader: 'babel-loader',
            //    query: {
            //        presets: ['es2015'],
            //        cacheDirectory: [true],
            //    },
            //    exclude: /.*node_modules.webpack.*/, //excludes webpack internal modules, which fail preloads
            //}
        ],
        preLoaders: [
            // All output '.js' files will have any sourcemaps re­processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader",
                //include:/.*xlib.*/,  //works, kinda.   only does sourcemaps for xlib.
                //exclude: /.*webpack.*/, //excludes everything, as they have the load pattern "webpack:///./~/module/subpath/file.js"
                //exclude:/.*\(webpack\).*/, //doesn't work
                //exclude: /.*node_modules.*/, //excludes everything
                //exclude: "/node_modules/", //doesn't work
                exclude: /.*node_modules.webpack.*/, //excludes webpack internal modules, which fail preloads
                //exclude: /.*node_modules\\webpack.*/, //works, BUT ONLY ON WINDOWS due to the forward slash.   excludes webpack internal modules                
            },
            { test: /\.json$/, loader: "json-loader" },
        ]
    },
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
		"react-dom": "ReactDOM",
    },
    ////enable these when we get webpack modules working properly
	//builtin plugins such as webpack.optimize.* can be found here: 	https://webpack.github.io/docs/list-of-plugins.html#optimize
	plugins: [

        //new uglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //}),

		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
		}),
		//vendor chunk
		new webpack.optimize.CommonsChunkPlugin({
			name: "xlib",
			filename: "dist/xlib.js",
			minChunks: Infinity,			
		}),
    ],
    //eslint: {
    //    configFile: '.eslintrc'
    //},
};