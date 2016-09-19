module.exports = {
  devtool: 'inline-source-map',
  entry : "./public",
  output: {
  		filename: "public/bundle.js"
  	},
  module: {
    loaders:[
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=react,presets[]=es2015']
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap' ]
      }
    ]
  }
};
