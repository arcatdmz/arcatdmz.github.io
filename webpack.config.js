const path = require("path");
const glob = require("glob");

const files = glob.sync("./src/javascripts/views/!(library).js");

const filesMap = {};
for (const file of files) {
  filesMap[path.basename(file, ".js")] = file;
}

module.exports = {
  mode: "production",
  entry: filesMap,

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "javascripts/views/[name].js",
    chunkFilename: "javascripts/views/[name].[hash].js",
    publicPath: "/",
  },

  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "src")],
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "minify",
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: ["last 2 versions"],
                  },
                },
              ],
            ],
            plugins: [
              require("@babel/plugin-proposal-class-properties"),
              require("@babel/plugin-syntax-dynamic-import"),
            ],
          },
        },
      },
    ],
  },

  resolve: {
    alias: {
      clipboard$: path.resolve(
        __dirname,
        "node_modules/clipboard/dist/clipboard.min.js"
      ),
    },
  },
};
