// import
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    // 경로 별칭
    alias: {
      '~': path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
    },
  },

  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  // 결과물(번들)을 반환하는 설정
  output: {
    // node.js의 절대경로로 넣어줘야한다.
    // path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js',
    // 기존 빌드 폴더를 지우고 다시 만든다.
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.s?css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader',
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
    new VueLoaderPlugin(),
  ],

  devServer: {
    host: 'localhost',
  },
};
