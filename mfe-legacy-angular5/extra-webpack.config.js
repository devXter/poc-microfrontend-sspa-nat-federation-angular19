const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    polyfills: path.resolve(__dirname, 'src/polyfills.ts'),
    main: path.resolve(__dirname, 'src/main.single-spa.ts')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'mfe-legacy-angular5',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 4201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.single-spa.json'),
              transpileOnly: true  // Agrega esta opción para ignorar errores de tipo durante el desarrollo
            }
          },
          'angular2-template-loader'
        ],
        exclude: [/\.(spec|e2e-spec)\.ts$/, /node_modules/]
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.css$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve(__dirname, './src')
    )
  ],
  externals: {
    'rxjs': 'rxjs',
    '@angular/core': '@angular/core',
    '@angular/common': '@angular/common',
    '@angular/compiler': '@angular/compiler',
    '@angular/platform-browser': '@angular/platform-browser',
    '@angular/platform-browser-dynamic': '@angular/platform-browser-dynamic',
    '@angular/router': '@angular/router',
    'single-spa': 'single-spa'
  }
};
