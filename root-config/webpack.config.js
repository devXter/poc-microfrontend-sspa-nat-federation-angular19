const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "banco";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    outputSystemJS: true,
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  // Crear una configuración personalizada que incluya el nuevo punto de entrada
  const modifiedConfig = {
    // Modificar los puntos de entrada para incluir iframe-loader.js
    entry: {
      // Mantener el punto de entrada original
      [orgName + "-root-config"]: defaultConfig.entry,
      // Añadir el nuevo punto de entrada para el iframe loader
      "iframe-loader": "./src/iframe-loader.js",
    },
    // Asegurar que cada archivo de entrada genere su propio bundle
    output: {
      ...defaultConfig.output,
      filename: "[name].js",
    },
    // Mantener los plugins existentes
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  };

  // Combinar todas las configuraciones
  return merge(defaultConfig, modifiedConfig);
};