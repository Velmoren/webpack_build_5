const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const path = require("path")

module.exports = merge(common, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name].css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "../",
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    runtimeChunk: {
      name: "runtime",
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
          },
          "sass-loader",
        ],
      },
    ],
  },
})
