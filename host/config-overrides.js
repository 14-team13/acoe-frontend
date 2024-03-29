var path = require("path");
const { dependencies } = require("./package.json");
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;
const { override, addWebpackAlias, babelInclude } = require("customize-cra");
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = function (config, env) {
  config.plugins.push(
    new ModuleFederationPlugin(
      (module.exports = {
        name: "host",
        remotes: {
          remote:
          isDevelopment ?
            'remote@http://localhost:3001/remoteEntry.js' :
            'remote@https://acoe-remote.vercel.app/remoteEntry.js'
        },
        exposes: {
          "./atoms": "./src/store/atoms",
        },
        filename: "remoteEntry.js",
        shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },

        },
      })
    ),
  );
  config.output.publicPath = "auto";
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../remote/src/components"),
      ]),
      addWebpackAlias({
        "@pages": path.resolve(__dirname, "src/pages"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@api": path.resolve(__dirname, "src/api")
      }),
      
    )(config, env)
  );
};
