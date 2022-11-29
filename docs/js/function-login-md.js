(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["function-login-md"],{fb75:function(t,d,_){"use strict";_.r(d);var e=function(){var t=this,d=t._self._c;return d("section",{staticClass:"content reasy-doc"},[t._m(0),d("p",[t._v("用于登录页面配置项，支持配置用户名，密码，语言选择等。")]),t._m(1),t._m(2),t._m(3),d("p",[t._v("主要通过 formConfig 配置选项的处理。")]),d("p",[t._v("示例如下")]),d("demo-block",[d("template",{slot:"source"},[d("mo-demo0")],1),d("template",{slot:"highlight"},[d("pre",{pre:!0},[d("code",{pre:!0,attrs:{class:"html"}},[t._v('<Login\n  name="login"\n  text="login"\n  is-first\n  is-lang\n  autofocus\n  :formData="formData"\n  :formConfig="formConfig"\n  action="loginAuth"\n  :beforeSubmit="beforeSubmit"\n>\n</Login>\n\n<script>\n  export default {\n    data() {\n      return {\n        formData: {\n          user: "admin"\n        },\n        formConfig: {\n          username: {\n            field: "user",\n            placeholder: "请输入您的用户名",\n            maxlength: 5,\n            valid: { type: "byteLen", args: [3, 5] },\n            icon: "v-icon-add"\n          },\n          password: {\n            field: "pwd",\n            valid: [{ type: "byteLen", args: [3, 5] }]\n          }\n        }\n      };\n    },\n\n    methods: {\n      beforeSubmit(data) {\n        console.log(data);\n      }\n    }\n  };\n<\/script>\n')])])])],2),t._m(4),t._m(5),t._m(6),d("p",[t._v("对象中默认包含 username,password,passwordCfm 的配置。")]),d("p",[t._v("username 配置")]),t._m(7),d("p",[t._v("password 配置")]),t._m(8),d("p",[t._v("passwordCfm 配置")]),t._m(9),t._m(10),t._m(11),t._m(12),t._m(13),d("side-link")],1)},v=[function(){var t=this,d=t._self._c;return d("h2",{attrs:{id:"deng-lu"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#deng-lu"}},[t._v("¶")]),t._v(" 登录")])},function(){var t=this,d=t._self._c;return d("h2",{attrs:{id:"an-xu-yin-yong"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#an-xu-yin-yong"}},[t._v("¶")]),t._v(" 按需引用")])},function(){var t=this,d=t._self._c;return d("pre",[d("code",{staticClass:"language-js"},[t._v('import { Base, Login } from "@reasy-team/reasy-ui-function";\n\nVue.use(Base);\nVue.use(Login);\n')])])},function(){var t=this,d=t._self._c;return d("h2",{attrs:{id:"ji-ben-shi-li"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#ji-ben-shi-li"}},[t._v("¶")]),t._v(" 基本示例")])},function(){var t=this,d=t._self._c;return d("h2",{attrs:{id:"props"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#props"}},[t._v("¶")]),t._v(" Props")])},function(){var t=this,d=t._self._c;return d("table",[d("thead",[d("tr",[d("th",[t._v("参数")]),d("th",[t._v("说明")]),d("th",[t._v("类型")]),d("th",[t._v("可选值")]),d("th",[t._v("默认值")])])]),d("tbody",[d("tr",[d("td",[t._v("name")]),d("td",[t._v("组件 ID")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("login")])]),d("tr",[d("td",[t._v("isName")]),d("td",[t._v("是否需要用户名")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("true")])]),d("tr",[d("td",[t._v("isFirst")]),d("td",[t._v("是否首次登陆，是则显示确认密码框")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])]),d("tr",[d("td",[t._v("text")]),d("td",[t._v("登录按钮文本")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("登录")])]),d("tr",[d("td",[t._v("isLang")]),d("td",[t._v("是否支持语言切换")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])]),d("tr",[d("td",[t._v("langLabel")]),d("td",[t._v("语言选择框的 label")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("语言")])]),d("tr",[d("td",[t._v("formData")]),d("td",[t._v("用户名密码对象")]),d("td",[d("code",[t._v("Object")])]),d("td",[t._v("-")]),d("td",[t._v("{}")])]),d("tr",[d("td",[t._v("formConfig")]),d("td",[t._v("表单组件相关配置,")]),d("td",[d("code",[t._v("Object")])]),d("td",[t._v("-")]),d("td",[t._v("{}")])]),d("tr",[d("td",[t._v("size")]),d("td",[t._v("-")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("M")])]),d("tr",[d("td",[t._v("action")]),d("td",[t._v("-")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("encrypt")]),d("td",[t._v("登录请求地址 密码加密算法，默认提供 MD5 和 BASE64，支持自定义传空不加密")]),d("td",[d("code",[t._v("Function")]),t._v(" / "),d("code",[t._v("Object")]),t._v(" / "),d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("beforeSubmit")]),d("td",[t._v("-")]),d("td",[d("code",[t._v("Function")])]),d("td",[t._v("-")]),d("td",[t._v("-")])])])])},function(){var t=this,d=t._self._c;return d("h3",{attrs:{id:"formconfig-dui-xiang-can-shu-shuo-ming"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#formconfig-dui-xiang-can-shu-shuo-ming"}},[t._v("¶")]),t._v(" formConfig 对象参数说明")])},function(){var t=this,d=t._self._c;return d("table",[d("thead",[d("tr",[d("th",[t._v("参数")]),d("th",[t._v("说明")]),d("th",[t._v("类型")]),d("th",[t._v("可选值")]),d("th",[t._v("默认值")])])]),d("tbody",[d("tr",[d("td",[t._v("field")]),d("td",[t._v("登录的字段名")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("username")])]),d("tr",[d("td",[t._v("label")]),d("td",[t._v("标题文本")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("用户名")])]),d("tr",[d("td",[t._v("placeholder")]),d("td",[t._v("输入框提示")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("请输入用户名")])]),d("tr",[d("td",[t._v("maxlength")]),d("td",[t._v("标题文本")]),d("td",[d("code",[t._v("Number")])]),d("td",[t._v("-")]),d("td",[t._v("63")])]),d("tr",[d("td",[t._v("valid")]),d("td",[t._v("数据校验")]),d("td",[d("code",[t._v("Object/Array")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("icon")]),d("td",[t._v("前缀图标")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("disabled")]),d("td",[t._v("是否禁用")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])]),d("tr",[d("td",[t._v("autofocus")]),d("td",[t._v("是否聚焦")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])])])])},function(){var t=this,d=t._self._c;return d("table",[d("thead",[d("tr",[d("th",[t._v("参数")]),d("th",[t._v("说明")]),d("th",[t._v("类型")]),d("th",[t._v("可选值")]),d("th",[t._v("默认值")])])]),d("tbody",[d("tr",[d("td",[t._v("field")]),d("td",[t._v("登录的字段名")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("password")])]),d("tr",[d("td",[t._v("label")]),d("td",[t._v("标题文本")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("密码")])]),d("tr",[d("td",[t._v("placeholder")]),d("td",[t._v("输入框提示")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("请输入密码")])]),d("tr",[d("td",[t._v("maxlength")]),d("td",[t._v("标题文本")]),d("td",[d("code",[t._v("Number")])]),d("td",[t._v("-")]),d("td",[t._v("63")])]),d("tr",[d("td",[t._v("valid")]),d("td",[t._v("数据校验")]),d("td",[d("code",[t._v("Object/Array")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("icon")]),d("td",[t._v("前缀图标")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("disabled")]),d("td",[t._v("是否禁用")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])]),d("tr",[d("td",[t._v("autofocus")]),d("td",[t._v("是否聚焦")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])])])])},function(){var t=this,d=t._self._c;return d("table",[d("thead",[d("tr",[d("th",[t._v("参数")]),d("th",[t._v("说明")]),d("th",[t._v("类型")]),d("th",[t._v("可选值")]),d("th",[t._v("默认值")])])]),d("tbody",[d("tr",[d("td",[t._v("field")]),d("td",[t._v("登录的字段名")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("passwordCfm")])]),d("tr",[d("td",[t._v("label")]),d("td",[t._v("标题文本")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("确认密码")])]),d("tr",[d("td",[t._v("placeholder")]),d("td",[t._v("输入框提示")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("请确认输入密码")])]),d("tr",[d("td",[t._v("maxlength")]),d("td",[t._v("标题文本")]),d("td",[d("code",[t._v("Number")])]),d("td",[t._v("-")]),d("td",[t._v("63")])]),d("tr",[d("td",[t._v("valid")]),d("td",[t._v("数据校验")]),d("td",[d("code",[t._v("Object/Array")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("icon")]),d("td",[t._v("前缀图标")]),d("td",[d("code",[t._v("String")])]),d("td",[t._v("-")]),d("td",[t._v("-")])]),d("tr",[d("td",[t._v("disabled")]),d("td",[t._v("是否禁用")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])]),d("tr",[d("td",[t._v("autofocus")]),d("td",[t._v("是否聚焦")]),d("td",[d("code",[t._v("Boolean")])]),d("td",[t._v("-")]),d("td",[t._v("false")])])])])},function(){var t=this,d=t._self._c;return d("h2",{attrs:{id:"events"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#events"}},[t._v("¶")]),t._v(" Events")])},function(){var t=this,d=t._self._c;return d("table",[d("thead",[d("tr",[d("th",[t._v("事件名")]),d("th",[t._v("说明")]),d("th",[t._v("参数")])])]),d("tbody",[d("tr",[d("td",[t._v("submited")]),d("td",[t._v("提交处理")]),d("td",[t._v("-")])])])])},function(){var t=this,d=t._self._c;return d("h2",{attrs:{id:"slots"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#slots"}},[t._v("¶")]),t._v(" Slots")])},function(){var t=this,d=t._self._c;return d("table",[d("thead",[d("tr",[d("th",[t._v("slot 名称")]),d("th",[t._v("说明")]),d("th",[t._v("默认 slot 内容")])])]),d("tbody",[d("tr",[d("td",[t._v("default")]),d("td",[t._v("保存按钮上面密码下面的位置")]),d("td",[t._v("-")])])])])}],n=_("5530"),r={name:"component-doc",components:{"mo-demo0":function(){var t=function(){var t=this,d=t.$createElement,_=t._self._c||d;return _("div",[_("Login",{attrs:{name:"login",text:"login","is-first":"","is-lang":"",autofocus:"",formData:t.formData,formConfig:t.formConfig,action:"loginAuth",beforeSubmit:t.beforeSubmit}})],1)},d=[],_={data:function(){return{formData:{user:"admin"},formConfig:{username:{field:"user",placeholder:"请输入您的用户名",maxlength:5,valid:{type:"byteLen",args:[3,5]},icon:"v-icon-add"},password:{field:"pwd",valid:[{type:"byteLen",args:[3,5]}]}}}},methods:{beforeSubmit:function(t){console.log(t)}}};return Object(n["a"])({render:t,staticRenderFns:d},_)}()}},o=r,a=_("2877"),s=Object(a["a"])(o,e,v,!1,null,null,null);d["default"]=s.exports}}]);