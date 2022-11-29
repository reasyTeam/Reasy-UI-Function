export default [
  {
    name: "功能组件库",
    groups: [
      {
        groupName: "使用",
        path: "use",
        list: [
          {
            path: "start",
            title: "快速开始"
          }
        ]
      },
      {
        groupName: "webpack",
        path: "webpack",
        list: [
          {
            path: "webpackSet",
            title: "webpack 配置"
          },
          {
            path: "eslint",
            title: "eslint 配置"
          },
          {
            path: "prettier",
            title: "prettier 配置"
          }
        ]
      },
      {
        groupName: "mixin和http",
        path: "mixin",
        list: [
          {
            path: "page",
            title: "page-mixin"
          },
          {
            path: "table",
            suffix: "vue",
            title: "table-mixin"
          },
          {
            path: "http",
            title: "http 处理"
          }
        ]
      },
      {
        groupName: "通用组件",
        path: "common",
        list: [
          {
            path: "progress",
            title: "progress-bar 进度条"
          },
          {
            path: "twoColumns",
            title: "two-columns两栏布局"
          },
          {
            path: "b28n",
            title: "b28 语言翻译"
          }
          // {
          //   path: "v-form-item",
          //   title: "单个v-form-item"
          // }
        ]
      },
      {
        groupName: "校验和库",
        path: "valid-util",
        list: [
          {
            path: "valid",
            title: "valid 校验函数"
          },
          {
            path: "util",
            title: "util 库函数"
          }
        ]
      },
      {
        groupName: "功能组件",
        path: "function",
        list: [
          {
            path: "port",
            title: "port 端口展示"
          },
          {
            path: "login",
            title: "login 登录"
          },
          {
            path: "backup",
            title: "backup 配置备份"
          },
          {
            path: "reboot",
            title: "reboot-btn 重启按钮组件"
          },
          {
            path: "upgrade",
            title: "upgrade 配置备份与恢复（升级）"
          }
        ]
      }
    ]
  }
];
