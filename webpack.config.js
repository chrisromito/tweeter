// Docs: https://webpack.js.org/guides/asset-management/
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const BASE_DIR = path.resolve(__dirname, 'client')

const SRC_DIR = path.join(BASE_DIR, '/src')
const DIST_DIR = path.join(BASE_DIR, '/dist')
const STATS_DIR = path.join(BASE_DIR, '/stats')

const isDev = process.env.NODE_ENV !== 'production'



// Module export
module.exports = {
    cache: {
        type: 'filesystem'
    },
    context: __dirname,
    entry: {
        tweeter: `${SRC_DIR}/index.js`
    },
    mode: isDev ? 'development' : 'production',
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader?cacheDirectory'
            }
        },
            //-- SASS
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                fiber: require('fibers')
                            }
                        },
                    },
                ],
            },
            // SCSS
            {
                test: [
                    /\.scss$/,
                    /\.css$/
                ],
                use: [{
                    loader: 'vue-style-loader'
                },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            // Chunk-ify async module imports
            // Eg. import('./my_file')  - 'my_file.js' gets its own chunk
            chunks: 'async'
        }
    },
    //-- Compilation destination resolution
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].[id].[hash].bundle.js',
        path: DIST_DIR,
        publicPath: '/'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].[hash].bundle.css',
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    recordsPath: path.join(STATS_DIR, 'records.json'),
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'common': path.resolve(SRC_DIR, 'common')
        }
    },
    watchOptions: {
        ignored: ['/node_modules/', '/private', '.*', 'node_modules/**']
    }
}
