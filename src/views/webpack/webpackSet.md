# webpack文档配置

主要记录一些`webpack`的常用配置说明以及`vue`项目中直接配置`vue.config.js`的常用配置说明。

最后有附录，当前常用的完整配置文件。

## webpack配置

若要查看详细文档请看\[官网]\([https://v4.webpack.docschina.org/concepts/](https://v4.webpack.docschina.org/concepts/ "https://v4.webpack.docschina.org/concepts/"))



环境： `webpack4+` ，`node >= v12.13.0`,  `webpack >= v4.37.0`



## - 入口配置

1.  entry

    > **入口起点(entry point)**指示 webpack 应该使用哪个模块，来作为构建其内部 [*依赖图(dependency graph)*](https://v4.webpack.docschina.org/concepts/dependency-graph/ "依赖图(dependency graph)") 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。

    可以配置多个或单个。

    ```javascript
    module.exports = {
      entry: './path/to/my/entry/file.js'
    };
    // 多个写法
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }

    ```

2.  output

    > **output** 属性告诉 webpack 在哪里输出它所创建的 *bundle*，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中。

    多个入口的时候output 也是1个，需要注意区分生成文件

    ```javascript
    output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'my-first-webpack.bundle.js'
    }
    // 多个写法
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }

    ```



## - 模式(mode)&#x20;

> 通过选择 `development`, `production` 或 `none` 之中的一个，来设置 `mode` 参数，你可以启用 webpack 内置在相应环境下的优化。其默认值为 `production`。

一般不需要单独配置,根据使用的打包命令去配置模式，若需要在不同模式的时候有不同的处理，

写法如下：

```javascript
const isProd = process.env.NODE_ENV === "production"
//isProd  就是判断是否时生产模式

if (isProd) {
  // 可以生产模式再做特殊处理
  webpackConfig.externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    "highlight.js": "hljs"
  };
}

```



## - 本地服务器（devServer）配置

> `webpack-dev-server` 为你提供了一个基本的 web server，并且具有 live reloading(实时重新加载) 功能

&#x20;常用配置解析：

```javascript
 devServer: {
    host: "127.0.0.1", // 默认127.0.0.1，注意 0.0.0.0 时才可以被外部其他主机访问到本地的地址
    compress: true, // 是否启用一切服务都启用 gzip 压缩： 尝试使用压缩是否提升速度,默认为 false
    lazy: true, // 懒加载是否开启 默认为 false
    port: 9000, //端口 默认8080
    publicPath: "/", //此路径下的打包文件可在浏览器中访问。
    // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js。
    // 默认 devServer.publicPath 是 '/'，所以你的包(bundle)可以通过 
    // http://localhost:8080/bundle.js 访问。
  }
```

有时候可能需要再服务器上做一些处理，或使用代理请求，就使用`proxy`

```javascript
devServer: {
    proxy:{
      '/api': 'http://localhost:3000',
      '/api1': {
        // 代理请求的地址
        target: 'http://localhost:3000',
        // 代理请求转换路径 重写路径
        pathRewrite: { '^/api': '' },
        // 也可以对请求进行过滤不使用代理
        bypass: function (req, res) {
          if (req.method == "GET") {
            console.log("Skipping proxy for browser request.");
            return res.url;
          }
        }
      },
    },
    // 多个代理到同一个地址的时候，可以使用数组配置方式
    proxy: [
      {
        // 正则匹配的路径
        context: ['/auth', '/api'],
        // 代理请求的地址
        target: 'http://localhost:3000',
      },
    ],
  }
```



## - 解析（resolve）配置

这些选项能设置模块如何被解析。`webpack` 基本已经提供合理的默认值。

但是有时候还是会需要修改下细节，常用配置如下：

```javascript
resolve: {
  extensions: [".js", ".vue", ".json"],  // 引用时不写后缀的文件查询顺序 默认[".js", ".vue"]
  // 配置 import 或 require 的别名，来确保模块引入变得更简单
  alias: {
    "@": path.resolve(__dirname, "../src"),
    packages: path.resolve(__dirname, "../packages"),
    demo: path.resolve(__dirname, "../demo")
  },
  // 告诉 webpack 解析模块时应该搜索的目录。默认["node_modules"]
  modules: ["./src/components","node_modules"]
}
```



## - loader 配置

> webpack 只能理解 JavaScript 和 JSON 文件。**loader** 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用。

我们一般需要转换的就是`vue`，`es6`，`scss`，图片等

### - - loader的配置格式

```javascript
 module: {
    rules: [
       // 单个loader的配置
      { 
        test: /\.(jsx?|babel|es6)$/,  // 正则匹配文件
        // include: process.cwd(), 
        include: /node_modules\/highlight.js/, // 包换的文件
        exclude: /node_modules/,  // 排除的文件
        loader: "babel-loader", // 使用的loader
        //loader的配置项和参数，根据loader自身的定义来
        options: {  
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: 3,
                // caller.target 等于 webpack 配置的 target 选项
                targets: { ie: "11" }
              }
            ]
          ]
        }
      },
      // 多个loader的配置
      {
        test: /\.(scss|css)$/,
        // 使用use 数组 进行多个loader的配置
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              prependData: variables //`@import "src/scss/varibles.scss";`
            }
          }
        ]
    ]
}
```



> 注意：`loader` 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在上面面的示例中，从 `sass-loader` 开始执行，然后继续执行 `css-loader`，最后以 `style-loader` 为结束



### - - 常用loader集合



#### 语法转换

*   [babel-loader](https://webpack.docschina.org/loaders/babel-loader "babel-loader") 使用 [Babel](https://babeljs.io/ "Babel") 加载 ES2015+ 代码并将其转换为 ES5。

*   [ts-loader](https://github.com/TypeStrong/ts-loader "ts-loader") 像加载 JavaScript 一样加载 [TypeScript](https://www.typescriptlang.org/ "TypeScript") 2.0+。



#### 模板

*   [html-loader](https://webpack.docschina.org/loaders/html-loader "html-loader") 将 HTML 导出为字符串，需要传入静态资源的引用路径。

*   [markdown-loader](https://github.com/peerigon/markdown-loader "markdown-loader") 将 Markdown 编译为 HTML。



#### 样式

*   [style-loader](https://webpack.docschina.org/loaders/style-loader "style-loader") 将模块导出的内容作为样式并添加到 DOM 中。

*   [css-loader](https://webpack.docschina.org/loaders/css-loader "css-loader") 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码。

*   [postcss-loader](https://webpack.docschina.org/loaders/postcss-loader "postcss-loader") 使用 [PostCSS](http://postcss.org/ "PostCSS") 加载并转换 CSS/SSS 文件。 使用时还需安装postcss，在 `css-loader` 和 `style-loader` **之前**使用它，但是在其他预处理器（例如：`sass|less|stylus-loader`）**之后**使用

*   [less-loader](https://webpack.docschina.org/loaders/less-loader "less-loader") 加载并编译 LESS 文件。

*   [sass-loader](https://webpack.docschina.org/loaders/sass-loader "sass-loader") 加载并编译 SASS/SCSS 文件。

*   [stylus-loader](https://webpack.docschina.org/loaders/stylus-loader/ "stylus-loader") 加载并编译 Stylus 文件。



#### 框架

*   [vue-loader](https://vue-loader-v14.vuejs.org/zh-cn/options.html "vue-loader") 加载并编译 [Vue 组件](https://vuejs.org/v2/guide/components.html "Vue 组件")。需要配合`VueLoaderPlugin` 使用。



#### 图片

*   [url-loader](https://github.com/TheLarkInn/angular2-template-loader "url-loader") 加载并编译组件，可以配置limit，在文件大小（单位为字节）低于指定的限制时，可以返回一个 DataURL。v5后不使用该`loader`,使用[asset module](https://webpack.docschina.org/guides/asset-modules/ "asset module")来配置使用。

*   `svg-sprite-loader`  将svg图片以雪碧图的方式在项目中加载。



#### 其他

*   [cache-loader](https://webpack.docschina.org/loaders/cache-loader/ "cache-loader") 允许缓存到（默认）磁盘或数据库 ，在一些性能开销较大的 loader 之前添加 cache-loader，以便将结果缓存到磁盘里。

*   `eslint-loader` ，v5版本已弃用，推荐使用`eslint-webpack-plugin`

*   `file-loader`解析文件地址并加载。

## - 插件plugins 配置

> 📌Plugin 用于扩展 Webpack 功能，各种各样的 Plugin 几乎让 Webpack 可以做任何构建相关的事情。



### - - 配置 Plugin

Plugin 的配置很简单，`plugins` 配置项接受一个数组，数组里每一项都是一个要使用的 `Plugin` 的`实例`，`Plugin` 需要的参数通过`构造函数`传入。

```javascript
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  plugins: [
    // 所有页面都会用到的公共代码提取到 common 代码块中
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    }),
  ]
};
```



### - - 常用插件集合



#### HTML

*   [HtmlWebpackPlugin](https://v4.webpack.docschina.org/plugins/html-webpack-plugin "HtmlWebpackPlugin")简单创建 HTML 文件，用于服务器访问。

*   `PreloadPlugin` 自动获取异步js模块文件，并通过`<link rel='preload'>`或者`<link rel='preload'>`的方式引入到页面中



#### CSS 相关

*   [MiniCssExtractPlugin](https://v4.webpack.docschina.org/plugins/mini-css-extract-plugin "MiniCssExtractPlugin")为每个引入 CSS 的 JS 文件创建一个 CSS 文件。

*   [ExtractTextWebpackPlugin](https://v4.webpack.docschina.org/plugins/extract-text-webpack-plugin "ExtractTextWebpackPlugin")从 bundle 中提取文本（CSS）到单独的文件。

*   [OptimizeCSSAssetsPlugin](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/ "OptimizeCSSAssetsPlugin")[ ](https://webpack.docschina.org/plugins/css-minimizer-webpack-plugin/ " ")使用 [cssnano](https://cssnano.co/ "cssnano") 优化和压缩 CSS。



#### 优化

*   [HotModuleReplacementPlugin](https://v4.webpack.docschina.org/plugins/hot-module-replacement-plugin "HotModuleReplacementPlugin")启用模块热更新替换(Enable Hot Module Replacement - HMR)

*   [BabelMinifyWebpackPlugin](https://v4.webpack.docschina.org/plugins/babel-minify-webpack-plugin "BabelMinifyWebpackPlugin")使用 [babel-minify](https://github.com/babel/minify "babel-minify")进行压缩优化

*   [DllPlugin](https://v4.webpack.docschina.org/plugins/dll-plugin "DllPlugin")为了极大减少构建时间，进行分离打包。

*   [DefinePlugin](https://v4.webpack.docschina.org/plugins/define-plugin "DefinePlugin")允许在编译时(compile time)配置的全局常量,，我们可以在模块当中直接使用这些变量，无需作任何声明。

*   [IgnorePlugin](https://v4.webpack.docschina.org/plugins/ignore-plugin "IgnorePlugin")从 bundle 中排除某些模块。

*   [CommonsChunkPlugin](https://v4.webpack.docschina.org/plugins/commons-chunk-plugin "CommonsChunkPlugin")提取 chunks 之间共享的通用模块。

*   [LimitChunkCountPlugin](https://v4.webpack.docschina.org/plugins/limit-chunk-count-plugin "LimitChunkCountPlugin")设置 chunk 的最小/最大限制，以微调和控制 chunk。

*   [MinChunkSizePlugin](https://v4.webpack.docschina.org/plugins/min-chunk-size-plugin "MinChunkSizePlugin")确保 chunk 大小超过指定限制。

*   [SourceMapDevToolPlugin](https://v4.webpack.docschina.org/plugins/source-map-dev-tool-plugin "SourceMapDevToolPlugin")对 source map 进行更细粒度的控。

*   [EvalSourceMapDevToolPlugin](https://v4.webpack.docschina.org/plugins/eval-source-map-dev-tool-plugin "EvalSourceMapDevToolPlugin")对 eval source map 进行更粒度的控制。

*   `HappyPack`   能让 webpack 把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程当项目较小时，多线程打包反而会使打包速度变慢**。**

*   [ZopfliWebpackPlugin](https://v4.webpack.docschina.org/plugins/zopfli-webpack-plugin "ZopfliWebpackPlugin")通过 node-zopfli 将资源预先压缩的版本。



#### 其他

*   [NpmInstallWebpackPlugin](https://v4.webpack.docschina.org/plugins/npm-install-webpack-plugin "NpmInstallWebpackPlugin")在开发环境下自动安装缺少的依赖。

*   [CopyWebpackPlugin](https://v4.webpack.docschina.org/plugins/copy-webpack-plugin "CopyWebpackPlugin")将单个文件或整个目录复制到构建目录【版本@6.1.1】。

*   [ProgressPlugin](https://v4.webpack.docschina.org/plugins/progress-plugin "ProgressPlugin")报告编译进度，显示编译进度。

*   [UglifyjsWebpackPlugin](https://v4.webpack.docschina.org/plugins/uglifyjs-webpack-plugin "UglifyjsWebpackPlugin")对于js文件进行压缩, 它使用的是单线程压缩代码，打包时间较慢，所以可以在开发环境将其关闭，生产环境部署时再把它打开。

*   `ParallelUglifyPlugin` 多线程 使用[UglifyjsWebpackPlugin](https://v4.webpack.docschina.org/plugins/uglifyjs-webpack-plugin "UglifyjsWebpackPlugin") 加快压缩。

*   `VueLoaderPlugin` 配合`vue-loader`使用。

*   `clean-webpack-plugin` 用于在打包前清理上一次项目生成的 bundle 文件。



部分webpack插件查询链接：

[webpack 插件合集](http://www.febeacon.com/webpack-plugins-docs-cn/ "webpack 插件合集")



## - 优化配置

不同的模式默认会执行一些不同的优化

这是部分优化配置

```javascript
module.exports = {
  //...
  optimization: {
    //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer定义的插件压缩 bundle。
    minimize: false,
    //允许你通过提供一个或多个定制过的 TerserPlugin 实例，覆盖默认压缩工具(minimizer)。
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
    // 将 optimization.runtimeChunk 设置为 true 或 'multiple'，
    // 会为每个入口添加一个只含有 runtime 的额外 chunk
    runtimeChunk: {
      name: 'runtime',
    },
    //根据以下条件自动拆分 chunks
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```



其他

*   修改调试文件的目录\[这个正常情况可以不需要，若调试无法快速找到文件可以加上该配置]

```javascript
 output: {
    devtoolModuleFilenameTemplate: info => {
      // 调试文件查找，
      const resPath = info.resourcePath;
      if (/node_modules/.test(resPath) || /\.js$/.test(resPath)) {
        return `webpack:///${resPath.replace(/^(\.\/)?src/, "my-code/src")}`;
      } else if (/\.vue$/.test(resPath)) {
        if (!/type=script/.test(info.identifier)) {
          return `webpack:///${resPath.replace(/^(\.\/)?src/, "my-code/src")}`;
        }
      }
      return `webpack:///${resPath}?${info.hash}`;
    }
  },
```



## vue.config.js配置

***

> Vue3.0不在有`webpack.config.js`的配置；但是不可避免,在项目开发中我们肯定会存在一些特殊的需求需要调整`webpack`, 这个时候，在Vue3.0的项目当中，我们就需要在根目录创建`vue.config.js`去完成`webpack`的一些特殊配置,默认它会被 `@vue/cli-service` 自动加载

配置文档：[https://cli.vuejs.org/zh/config/](https://cli.vuejs.org/zh/config/ "https://cli.vuejs.org/zh/config/")



## - 审查项目的 webpack 配置

该命令会将解析出来的 webpack 配置、包括链式访问规则和插件的提示打印。

```javascript
vue inspect > output.js
```

注意它输出的并不是一个有效的 webpack 配置文件，而是一个用于审查的被序列化的格式。

## - 入口配置

```javascript
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js'
  }
}
```



## - 本地服务器（devServer）配置

基本和webpack一致, 参考webpack的配置即可

```javascript
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000'
  }
}
```



## - 解析配置

在`chainWebpack`  或`configureWebpack`  都可以使用&#x20;

```javascript
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
        .set('@', resolve('src')) 
        .set('api', resolve('src/apis'))
        .set('common', resolve('src/common'))
  }
}

```



## - loader配置



#### 1. css的loader可以直接配置

```javascript
  css: {
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
```

#### 2. chainWebpack 修改loader方式

&#x20;新增loader

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('graphql')
      .test(/\.graphql$/)
      .use('graphql-tag/loader')
        .loader('graphql-tag/loader')
        .end()
      // 你还可以再添加一个 loader
      .use('other-loader')
        .loader('other-loader')
        .end()
  }
}
```

修改loader

```javascript
// 修改loader
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}


```

删除和替换loader

```javascript
module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    // 添加要替换的 loader
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  }
}
```

#### 3. configureWebpack 添加 【新增建议使用这个】

```javascript
configureWebpack: (config) => {
    config.module.rules.push({
      // 处理jquery
      test: require.resolve('jquery'),
      use: [{
        loader: 'expose-loader',
        options: 'jquery'
      }, {
        loader: 'expose-loader',
        options: '$'
      }, {
        loader: 'expose-loader',
        options: 'jQuery'
      }]
    })
  }
```

## - plugins 配置

### - - chainWebpack修改plugin

新增

```javascript
chainWebpack: (config) => {
    // 新增一个`hot-hash-webpack-plugin`
    // 注意：这里use的时候不需要使用`new HotHashWebpackPlugin()`
    config.plugin('hotHash')
          .use(HotHashWebpackPlugin, [{ version: '1.0.0' }]);
}

```

编辑

```javascript
// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        return [/* 传递给 html-webpack-plugin's 构造函数的新参数 */]
      })
  }
}
```

删除

```javascript
 chainWebpack: (config) => {
    // vue-cli3.X 会自动进行模块分割抽离，如果不需要进行分割,可以手动删除
    config.optimization.delete('splitChunks'); 
 }

```

### - - configureWebpack修改plugin

```javascript
module.exports = {
  configureWebpack: {
    plugins: [
      new MyAwesomeWebpackPlugin()
    ]
  }
}
```



其他

*   解决dark-scss icon 图标显示乱码问题

```javascript
  configureWebpack: config => {
  // 解决dark-scss icon 图标问题 需要试验下 1.39.0+ 版本已经解决了这个问题
  // 回退icon的图标转换 不转换成双字节字符
  // 只有生产环境需要
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
  },

```

*   开发环境配置原始文件路径【不能快速找到原始路径时使用】

```javascript
  configureWebpack: config => {
  // 为开发环境修改配置...  这个正常情况可以不需要，若调试无法快速找到文件可以加上该配置
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
```

## 附：webpack和vue.config.js

## - 常用webpack配置

```javascript
// 解析路径
const path = require("path"); 
const webpack = require("webpack");
// 为每个引入 CSS 的 JS 文件创建一个 CSS 文件。
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 用于在打包前清理上一次项目生成的 bundle 文件。
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 简单创建 HTML 文件，用于服务器访问。
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 显示打包构建进度的插件
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// 配合vue-loader使用。
const VueLoaderPlugin = require("vue-loader/lib/plugin");
// 使用 cssnano 优化和压缩 CSS。
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 对于js文件进行压缩, 
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 将单个文件或整个目录复制到构建目录。
const CopyPlugin = require("copy-webpack-plugin");
// isProd 判断是否是 生产模式 
const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  // 根据打包命令来
  mode: process.env.NODE_ENV,
  // 入口，单个
  entry: "./demo/index.js",
  // 输出
  output: {
    path: path.resolve(process.cwd(), "./docs/"),
    filename: "[name].[hash:7].js",
    // 生产时加上hash
    chunkFilename: isProd ? "page/[name].[hash:7].js" : "[name].js",
  },
  // 解析配置
  resolve: {
    // 引用时不写后缀的文件查询顺序 默认[".js", ".vue"]
    extensions: [".js", ".vue", ".json"],
    // 配置 import 或 require 的别名，来确保模块引入变得更简单
    alias: {
      "@": path.resolve(__dirname, "../src"),
      packages: path.resolve(__dirname, "../packages"),
      demo: path.resolve(__dirname, "../demo")
    }
  },
  devServer: {
    // 默认127.0.0.1，注意 0.0.0.0 时才可以被外部其他主机访问到本地的地址
    host: "127.0.0.1",
    //端口 默认8080
    port: 10001,
    //此路径下的打包文件可在浏览器中访问。
    publicPath: "/",
    // 代理配置
    proxy: [
      {
        // 正则匹配的路径
        context: ['/auth', '/api'],
        // 代理请求的地址
        target: 'http://localhost:3000',
      },
    ],
  },
  module: {
    rules: [
      {
        // 优先级 可能的值有："pre" | "post"指定 loader 种类。没有值表示是普通 loader。
        // Pitching 阶段: loader 上的 pitch 方法，
        // 按照 后置(post)、行内(inline)、普通(normal)、前置(pre) 的顺序调用。
        // Normal 阶段: loader 上的 常规方法，
        //按照 前置(pre)、普通(normal)、行内(inline)、后置(post) 的顺序调用。
        enforce: "pre",
        // 正则匹配文件
        test: /\.(vue|js)$/,
        // 排除的文件
        exclude: /node_modules|docs|src/,
        // 使用的loader
        loader: "eslint-loader"
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        // include: process.cwd(),
        include: /node_modules\/highlight.js/,
        exclude: /node_modules/,
        loader: "babel-loader",
        //loader的配置项和参数，根据loader自身的定义来
        options: {
          presets: [
            [
              // 一些转换的默认配置，必须配置
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                corejs: 3,
                // caller.target 等于 webpack 配置的 target 选项
                targets: { ie: "11" }
              }
            ]
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            // 设置为 false，模版中 HTML 标签之间的空格将会被忽略。
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          // 生产时进行css压缩打包优化
          isProd
            ? {
               // 生成环境使用 css抽离的plgin待的loader
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: "../"
                }
              }
            : "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // 共享全局变量配置  注意：sass-loader 版本 = 8
              prependData: `@import "src/scss/varibles.scss";`
            }
          }
        ]
      },
      {
        // 添加图片等不识别的路径处理
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: "url-loader?limit=8192&name=font/[hash:8].[name].[ext]"
      }
    ]
  },
  plugins: [
    // 开启热更新
    new webpack.HotModuleReplacementPlugin(),
    // 使用模板文件生成最终文件
    new HtmlWebpackPlugin({
      template: "./demo/index.tpl",
      filename: "./index.html",
      favicon: "./public/favicon.ico",
      title: "reasy-ui"
    }),
    // 配置打包进度显示
    new ProgressBarPlugin(),
    // 配合vue-loader使用。 有vue时必须使用
    new VueLoaderPlugin(),
    // 定义宏，可以在代码中使用,如果代码中没有宏可以不用处理
    new webpack.DefinePlugin({
      "process.env.FAAS_ENV": JSON.stringify(process.env.FAAS_ENV),
      "process.env.THEME": JSON.stringify(process.env.THEME)
    }),
  ],
  // 配置source map
  devtool: "#eval-source-map"
};
// 判断是否为生产模式
// 部分优化只在生产模式中运行
if (isProd) {
  // 使用外部扩展，打包的时候，需要过滤的bundle ， 正常项目中一般不用配置此项，直接打包成bundle
  webpackConfig.externals = {
    vue: "Vue",
    "vue-router": "VueRouter",
    "highlight.js": "hljs"
  };
  
  webpackConfig.plugins.push(
    // 增加清用于在打包前清理上一次项目生成的 bundle 文件。
    new CleanWebpackPlugin(),
    // 配置抽离css的插件，并配置css的名称
    new MiniCssExtractPlugin({
      // 指定输出的每个 CSS 文件的名称。增加内容hash 只有内容变化才会生成新的hash
      filename: "css/[name].[contenthash:7].css"
    }),
    // 复制文件到指定位置
    new CopyPlugin({
      patterns: [{ 
          // 解析完整路径
          from: path.resolve(process.cwd(), "./img/"), 
          // 复制到指定位置
          to: "img" 
       }]
    })
  );
  // 启用并配置js压缩插件的打包处理
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      // 启用文件缓存 如果是路径 则是 启用文件缓存并缓存到固定的路径
      cache: true,
      // 使用多进程并行运行以提高构建速度
      parallel: true,
      // 使用源映射将错误信息位置映射到模块（这将会减慢编译速度）
      sourceMap: false
    }),
    // 启用css优化压缩插件
    new OptimizeCSSAssetsPlugin({})
  );
  // 分离chunk
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      // 生成的chunk的key
      lang: {
        // 正则匹配路径
        test: /lang.js/,
        // 生成chunk的名称
        name: "lang"
      },
      vendor: {
        test: /[\\/]src[\\/]/,
        name: "reasy-ui",
        // chunks这表明将选择哪些 chunk 进行优化。有效值为 all，async 和 initial。
        // 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享。
        chunks: "all"
      }
    }
  };
  // 生产环境下 不需要开发工具，即不用生成map文件
  webpackConfig.devtool = false;
}

module.exports = webpackConfig;
```

## - 常用vue.config.js配置

需安装plugin

```javascript
npm i copy-webpack-plugin@6.1.1 -D
npm i @reasy-team/reasy-ui -D
npm i axios -D

```

```javascript
//vue.config.js
// 解析sass文件
const sassLoader = require.resolve("sass-loader");
// 将单个文件或整个目录复制到构建目录。 注意版本 6.1.1 
const CopyWebpackPlugin = require("copy-webpack-plugin");
// 显示打包构建进度的插件
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// 解析当前路径
const path = require("path");

function resolve(dir) {
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
      title: "Tenda",
      // 在这个页面中包含的块，默认情况下会包含提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    login: {
      entry: "src/login.js",
      template: "public/index.html",
      filename: "login.html",
      title: "Tenda",
      chunks: ["chunk-vendors", "chunk-common", "login"]
    }
  },
  publicPath: "/",
  devServer: {
    proxy: {
      // 模板页面 10002
      "/ad/*": {
        target: "http://localhost:10002",
        // 重写路径
        pathRewrite: { "^/ad": "" },
        // 代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
        changeOrigin: true,
        // 默认将不接受在 HTTPS 上运行且证书无效的后端服务器，若需要的话，则关闭此项
        secure: false
      },
      "/*": {
        target: "http://localhost:8888",
        changeOrigin: true,
        secure: false,
        bypass: function (req, res) {
          if (req.method == "GET") {
            return res.url;
          }
        }
      }
    },
    // 修改打印只显示错误，不显示警告
    stats: "errors-only",
    progress: false
  },
  css: {
    // 配置 css 的输出文件配置，实际配置的就是MiniCssExtractPlugin 
    extract: {
      filename: "css/[name].css",
      chunkFilename: "css/[name].css?[contenthash:8]"
    },
    // 配置css的解析loader
    loaderOptions: {
      scss: {
        // 共享全局变量配置
        prependData: '@import "./src/common/css/variables.scss";'
      },
      postcss: {
        plugins: [
          // 根据兼容情况，自动添加前缀。
          require("autoprefixer")({ overrideBrowserslist: ["ie >= 11"] })
        ]
      }
    }
  },
  configureWebpack: config => {
    // 判断生产环境
    if (process.env.NODE_ENV === "production") {
      // 修改出口文件哈希
      config.output.chunkFilename = "js/[name].js?[contenthash:8]";
      
      // 分割文件配置
      config.optimization.splitChunks = {
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
    } else {
      // 配置 source-map
      config.devtool = "source-map";
    }
    
    // 添加plugin
    config.plugins.push(
      // 复制文件到指定位置
      new CopyWebpackPlugin({
        patterns: [
          {
            // 原始路径
            from: "./src/assets/lang/",
            // 复制到指定路径
            to: "./lang/",
            // 复制方式 整个文件夹
            toType: "dir",
            globOptions: {
              //ignore: ['**/b28n.*'],
            }
          }
        ]
      })
    );
  },
  chainWebpack: config => {
    // 设置 @
    config.resolve.alias.set("@", resolve("src"));
    // 设置svg 的解析处理
    const svgRule = config.module.rule("svg");
    // 用于 url-loader 小于1000kb的都生产dataURL
    let urlLoaderOptions = { 
      limit: 1000,
      name: "fonts/[name].[ext]?[contenthash:8]"
    };
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    // 压缩图片
    config.module
      .rule("fonts")
      .use("url-loader")
      .loader("url-loader")
      .options(urlLoaderOptions),
      svgRule.use("url-loader").loader("url-loader").options(urlLoaderOptions),
      config.module
        .rule("images")
        .use("url-loader")
        .loader("url-loader")
        .options(urlLoaderOptions),
      config.output.filename("js/[name].js?[hash:8]").end();
  }
};


```

