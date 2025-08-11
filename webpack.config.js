import path from 'path';
import webpack from 'webpack';

export default {
  entry: './src/index.ts',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: 'ParallaxImage', // Ensure the library name is correctly set
    libraryTarget: 'umd', // Explicitly set the library target to UMD
    globalObject: 'this', // Ensure compatibility for UMD builds
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    static: './dist',
    port: 3000,
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      self: 'globalThis', // Define `self` as `globalThis` for compatibility
    }),
  ],
};
