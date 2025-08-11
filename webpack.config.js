import path from 'path';
import webpack from 'webpack';

export default {
  entry: './src/index.ts',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: {
      name: 'ParallaxImage',
      type: 'umd',
    },
    clean: true,
    globalObject: 'this', // Ensure compatibility for UMD builds
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
