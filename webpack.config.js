import path from 'path';
import webpack from 'webpack';

export default {
  entry: './src/index.ts',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    library: 'ParalaxImage', // Ensure the library name is correctly set
    libraryTarget: 'umd', // Explicitly set the library target to UMD
    libraryExport: 'default', // Export the default export of the module
    globalObject: 'globalThis', // Use globalThis for compatibility across environments
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
