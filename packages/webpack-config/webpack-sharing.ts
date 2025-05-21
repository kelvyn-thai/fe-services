import "dotenv/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

const isEnvProduction = process.env.NODE_ENV === "production";
const isEnvDevelopment = process.env.NODE_ENV === "development";
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === "true";
const sourceMap = isEnvProduction ? shouldUseSourceMap : isEnvDevelopment;
const shouldBundleAnalyzer = process.env.BUNDLE_ANALYZER === "true";
const shouldGenerateHTML = process.env.GENERATE_HTML === "true";

const mode = isEnvProduction ? "production" : "development";

// common function to get style loaders
const getStyleLoaders = (preProcessor?: any, cssLoader?: any) => {
  const loaders = [
    isEnvProduction && MiniCssExtractPlugin.loader,
    isEnvDevelopment && "style-loader", // https://www.npmjs.com/package/style-loader
    cssLoader ? cssLoader : "css-loader",
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(preProcessor);
  }
  return loaders;
};

const sassLoader = getStyleLoaders({
  loader: "sass-loader",
  options: {
    sourceMap,
  },
});

const cssLoader = getStyleLoaders();

const lessLoader = getStyleLoaders({
  loader: "less-loader",
  options: {
    sourceMap,
    lessOptions: {
      env: mode,
      javascriptEnabled: true,
    },
  },
});

const lessModuleLoader = getStyleLoaders(
  {
    loader: "less-loader",
    options: {
      sourceMap,
      lessOptions: {
        env: mode,
        javascriptEnabled: true,
      },
    },
  },
  {
    loader: "css-loader",
    options: {
      importLoaders: 3,
      sourceMap,
      modules: {
        mode: "local",
        auto: true,
        localIdentName: "[name]__[local]--[hash:base64:5]",
      },
    },
  },
);

module.exports = {
  getStyleLoaders,
  sourceMap,

  isEnvDevelopment,
  isEnvProduction,
  shouldUseSourceMap,
  mode,

  cssRegex,
  cssModuleRegex,

  sassRegex,
  sassModuleRegex,

  lessRegex,
  lessModuleRegex,

  cssLoader,

  sassLoader,

  lessLoader,
  lessModuleLoader,

  shouldBundleAnalyzer,
  shouldGenerateHTML,
};
