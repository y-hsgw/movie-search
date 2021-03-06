const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  /** entry point */
  entry: path.resolve(__dirname, "../src/index.jsx"),
  /** output point */
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
    publicPath: ""
  },
  /** https://qiita.com/YoshinoriKanno/items/322ae6e53daa35059c15 */
  devtool: "eval-source-map",
  /** jsファイルへの変換処理  */
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader"
      },
      /** css ファイルは MiniCssExtractPlugin.loader と css-loader を使ってJSに変換 */
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: {} },
          "css-loader"
        ]
      },
      /** .png ファイルは url-loader を使ってJSに変換 */
      { test: /\.png$/, loader: "url-loader" }
    ]
  },

  /**
   * webpack には import する際に、指定されたモジュールを検索して該当するファイルを探す仕組み（モジュール解決  ）がある
   * resolve オプションはモジュール解決（モジュールの import を解決する仕組み）の設定を変更します。
   */
  resolve: {
    //  指定した拡張子のファイルは import の際に拡張子を省略することができる
    extensions: [".js", ".jsx"],
    //  エイリアスの指定 , 特定のモジュールをより簡単にインポートすることができる
    alias: {
      "~api": path.resolve(__dirname, "../src/api"),
      "~snackbar": path.resolve(__dirname, "../src/views/Providers/Snackbar"),
      "~assets": path.resolve(__dirname, "../src/assets"),
      "~redux": path.resolve(__dirname, "../src/views/Providers/Redux/"),
      "~@types": path.resolve(__dirname, "../src/@types"),
      "~views": path.resolve(__dirname, "../src/views"),
      "~utils": path.resolve(__dirname, "../src/utils"),
      "~src": path.resolve(__dirname, "../src")
    }
  },
  plugins: [
    /** CSSファイルをjsに含めるのではなく別ファイルで出力する */
    new MiniCssExtractPlugin({}),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      favicon: "./public/favicon.png"
    })
  ]
};

module.exports = config;
