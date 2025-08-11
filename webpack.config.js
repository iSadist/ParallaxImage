import path from 'path';

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
};
