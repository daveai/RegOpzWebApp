module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1', 'react-hmre']
                }
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            {
               test: /\.(jpe?g|gif|png)$/,
               loader: 'file-loader?emitFile=false&name=[path][name].[ext]'
            }
        ],
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
