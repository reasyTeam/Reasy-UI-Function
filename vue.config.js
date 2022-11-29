const sassLoader = require.resolve("sass-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const path = require("path");

let proxy_url = "http://localhost:9999";

function resolve(dir) {
  // eslint-disable-next-line no-undef
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "src/main.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "功能组件",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    }
    // intercept: {
    //   entry: "src/main.js",
    //   template: "public/intercept.html",
    //   filename: "intercept.html",
    //   title: "IPOS",
    //   chunks: ["chunk-vendors", "chunk-common", "index"]
    // },
    // login: {
    //   // page 的入口
    //   entry: "src/login.js",
    //   // 模板来源
    //   template: "public/index.html",
    //   // 在 dist/index.html 的输出
    //   filename: "login.html",
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //   title: "IPOS",
    //   // 在这个页面中包含的块，默认情况下会包含
    //   // 提取出来的通用 chunk 和 vendor chunk。
    //   chunks: ["chunk-vendors", "chunk-common", "login"]
    // }
  },
  publicPath: "/",
  devServer: {
    proxy: {
      "/*": {
        target: proxy_url,
        changeOrigin: true,
        secure: false,
        bypass: function (req, res) {
          if (req.method == "GET") {
            // console.log("Skipping proxy for browser request.");
            return res.url;
          }
        }
      }
    },
    stats: "errors-only",
    progress: false
  },
  outputDir: "docs",
  css: {
    extract: {
      filename: "css/[name].css",
      chunkFilename: "css/[name].css?[contenthash:8]"
    },
    loaderOptions: {
      scss: {
        prependData: '@import "./src/common/css/variables.scss";'
      },
      postcss: {
        plugins: [
          require("autoprefixer")({ overrideBrowserslist: ["ie >= 10"] })
        ]
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.output.chunkFilename = "js/[name].js?[contenthash:8]";
      config.optimization.splitChunks = {
        // todo 再拆
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial"
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "all",
            reuseExistingChunk: true,
            enforce: true
          }
        }
      };
      // 解决dark-scss icon 图标问题
      // 回退icon的图标转换 不转换成双字节字符
      config.module.rules
        .filter(rule => {
          return rule.test.toString().indexOf("scss") !== -1;
        })
        .forEach(rule => {
          rule.oneOf.forEach(oneOfRule => {
            const sassLoaderIndex = oneOfRule.use.findIndex(
              item => item.loader === sassLoader
            );
            oneOfRule.use.splice(sassLoaderIndex, 0, {
              loader: require.resolve("css-unicode-loader")
            });
          });
        });
    } else {
      // 为开发环境修改配置...
      config.devtool = "source-map";
      config.output.devtoolModuleFilenameTemplate = info => {
        const resPath = info.resourcePath;
        if (/node_modules/.test(resPath) || /\.js$/.test(resPath)) {
          return `webpack:///${resPath.replace(/^(\.\/)?src/, "my-code/src")}`;
        } else if (/\.vue$/.test(resPath)) {
          if (!/type=script/.test(info.identifier)) {
            return `webpack:///${resPath.replace(
              /^(\.\/)?src/,
              "my-code/src"
            )}`;
          }
        }

        return `webpack:///${resPath}?${info.hash}`;
      };
    }
    config.plugins.push(new ProgressBarPlugin());
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "./src/assets/lang/",
            to: "./lang/",
            toType: "dir"
            // globOptions: {
            //   //ignore: ['**/b28n.*'],
            // }
          }
        ]
      })
    );
  },
  chainWebpack: config => {
    // 删除预加载 todo 采取按需预加载
    config.plugins.delete("prefetch-index");
    config.plugins.delete("preload-index");

    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    config.resolve.alias.set("@", resolve("src"));

    config.module
      .rule("md")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use(path.resolve(__dirname, "./build/md-loader/index.js"))
      .loader(path.resolve(__dirname, "./build/md-loader/index.js"))
      .end();

    // 压缩图片
    config.module.rule("fonts").use("url-loader").loader("url-loader").options({
      limit: 1000,
      name: "fonts/[name].[ext]?[contenthash:8]"
    }),
      svgRule.use("url-loader").loader("url-loader").options({
        limit: 1000,
        name: "fonts/[name].[ext]?[contenthash:8]"
      }),
      config.module
        .rule("images")
        .use("url-loader")
        .loader("url-loader")
        .options({
          limit: 1000,
          name: "img/[name].[ext]?[contenthash:8]"
        }),
      config.output.filename("js/[name].js?[hash:8]").end();
  }
};
