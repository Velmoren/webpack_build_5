const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const scriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin")

module.exports = {
  entry: {
    app: "./src/index.js",
    critical: "./src/critical-scripts.js",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.join(__dirname, "../src/static/"), to: "" },
        { from: path.join(__dirname, "../src/images/"), to: "images" },
      ],
    }),

    new HtmlWebpackPlugin({
      meta: {},
      template: "./src/index.html",
      title: "Development",
      filename: "index.html",
      favicon: "./src/static/favicon.ico",
      manifest: "",
      minify: false,
      inject: "head",
      scriptLoading: "blocking",
    }),

    new HtmlWebpackPlugin({
      meta: {},
      template: "./src/news.html",
      title: "News",
      filename: "news.html",
      favicon: "./src/static/favicon.ico",
      manifest: "",
      minify: false,
      inject: "head",
      scriptLoading: "blocking",
    }),
    //определение типа подключения скриптов
    new scriptExtHtmlWebpackPlugin({
      defer: ["app.js", "runtime.js"],
      defaultAttribute: "sync",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: (pathData) => {
            return pathData.filename.substr(4)
          },
        },
        use: [
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
              pngquant: {
                quality: [0.6, 0.9],
                speed: 1,
              },
              svgo: {
                removeTitle: true,
                convertColors: true,
                convertPathData: false,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: (pathData) => {
            return pathData.filename.substr(4)
          },
        },
      },
    ],
  },
}
