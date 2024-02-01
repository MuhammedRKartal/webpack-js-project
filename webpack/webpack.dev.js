import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import FriendlyErrors from "@soda/friendly-errors-webpack-plugin";
import { common, babelLoader } from "./webpack.common.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.WEBPACK_DEV_PORT || 3000;
const browserslist = [
  "last 2 Chrome versions",
  "last 2 Firefox versions",
  "last 2 Safari versions",
  "last 2 iOS versions",
  "last 2 Edge versions",
];

export default merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  module: {
    rules: [babelLoader(browserslist)],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "./../public"),
    },
    port: port,
    open: true,
    hot: false,
    compress: true,
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  plugins: [new CleanWebpackPlugin(), new FriendlyErrors()],
});
