import path, { dirname } from "path";
import { fileURLToPath } from "url";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import babelConfig from "../babel.config.json" assert { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

const common = {
  entry: {
    app: path.resolve(__dirname, "../src/layout/index.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  optimization: {
    runtimeChunk: "single",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/layout/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.json$/,
        use: "json-loader",
      },
      {
        test: /\.styles.scss$/,
        exclude: /node_modules/,
        use: [
          "sass-to-string",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.(css|s[ac]ss|less)$/i,
        exclude: [/\.styles.scss$/, /node_modules/],
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|ico|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
    ],
  },
};

function babelLoader(browserslist) {
  if (browserslist) {
    babelConfig.presets[0][1].targets = browserslist;
  }

  return {
    test: /\.(js|jsx)$/,
    exclude: (modulePath) => {
      return /node_modules/.test(modulePath);
    },
    use: {
      loader: "babel-loader",
      options: {
        cacheDirectory: true,
        ...babelConfig,
      },
    },
  };
}

export { common, babelLoader };
