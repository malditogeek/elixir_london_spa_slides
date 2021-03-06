var ET = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      './web/static/js/app.js'
    ]
  },
  output: {
    path: 'priv/static',
    filename: 'js/[name].js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      {test: /\.js/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.jpg|\.png/, loader: 'file-loader', query: {name: 'images/[hash].[ext]'}},
      {test: /\.less|\.css/, loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!less-loader!postcss-loader'}
    ]
  },
  postcss: [
    autoprefixer({browsers: ['last 2 version']})
  ],
  plugins: [
    new ET('css/[name].css')
  ],
  resolve: {
    alias: {
      phoenix: `${__dirname}/deps/phoenix/web/static/js/phoenix.js`
    }
  }
}

module.exports = config
