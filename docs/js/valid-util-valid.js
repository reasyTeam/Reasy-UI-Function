(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["valid-util-valid"],{4807:function(a,e,t){"use strict";t.r(e);var o=function(){var a=this,e=a._self._c;return e("v-page",{attrs:{pageTitle:"valid校验函数"}},[e("v-form",{staticClass:"valid-form",attrs:{rules:a.rules}},[e("h3",[a._v("基础包含")]),e("v-form-item",{attrs:{label:"通用",prop:"validType"}},[e("v-radio",{attrs:{options:a.options1},on:{change:a.changeType},model:{value:a.formData.validType,callback:function(e){a.$set(a.formData,"validType",e)},expression:"formData.validType"}})],1),e("v-form-item",{attrs:{label:"业务",prop:"validType"}},[e("v-radio",{attrs:{options:a.options2},on:{change:a.changeType},model:{value:a.formData.validType,callback:function(e){a.$set(a.formData,"validType",e)},expression:"formData.validType"}})],1),e("v-form-item",{attrs:{label:"网络",prop:"validType"}},[e("v-radio",{attrs:{options:a.options3},on:{change:a.changeType},model:{value:a.formData.validType,callback:function(e){a.$set(a.formData,"validType",e)},expression:"formData.validType"}})],1),e("v-form-item",{attrs:{label:"字符限制",prop:"validType"}},[e("v-radio",{attrs:{options:a.options4},on:{change:a.changeType},model:{value:a.formData.validType,callback:function(e){a.$set(a.formData,"validType",e)},expression:"formData.validType"}})],1),e("v-form-item",{attrs:{label:"组合特殊使用",prop:"validType"}},[e("v-radio",{attrs:{options:a.options5},on:{change:a.changeType},model:{value:a.formData.validType,callback:function(e){a.$set(a.formData,"validType",e)},expression:"formData.validType"}})],1),e("h3",[a._v("单独引用")]),e("v-form-item",{attrs:{label:"单独引入",prop:"validType"}},[e("v-radio",{attrs:{options:a.options6},on:{change:a.changeType},model:{value:a.formData.validType,callback:function(e){a.$set(a.formData,"validType",e)},expression:"formData.validType"}})],1),e("h3",[a._v("校验函数参数说明")]),e("v-form-item",{attrs:{label:"参数说明",prop:"validArgs",required:!1}},[e("div",[a._v(a._s(a.text.label))]),e("pre",[a._v(a._s(a.text.args))])]),e("h3",[a._v("验证测试")]),e("v-form-item",{attrs:{label:"自定义校验参数",prop:"validArgs",required:!1,description:"参数逗号分隔 数组等参数可以json格式"}},[e("v-input",{model:{value:a.formData.validArgs,callback:function(e){a.$set(a.formData,"validArgs",e)},expression:"formData.validArgs"}})],1),e("v-form-item",{attrs:{label:"自定义校验",prop:"valid",valid:a.typeValid}},[e("v-input",{model:{value:a.formData.valid,callback:function(e){a.$set(a.formData,"valid",e)},expression:"formData.valid"}})],1),e("v-form-item")],1)],1)},i=[],r=(t("ac1f"),t("5319"),t("5b81"),t("4dbd")),l={data:function(){return{formData:{validType:"email",validArgs:"1, 3",valid:""},rules:{fei:{type:"fei"}},options1:["len","byteLen","num","even","float","ascii","hex","noSpace"],options2:["domain","mask","email","phone","port","url","dateTime","ssid","ssidPwd","wep"],options3:["ip","mac","ipv6","ipv6Header","ipv6Value","ipv6Prefix","ipv6LocalLink"],options4:["password","userPwd","uniqueCode","numAndLetter","vlanName","normarlChars","normarlChars1","normarlChars2","notSpecialChars"],options5:["sameStr","validOrArrs","ipCompare"],options6:["tree","asciiDisplayChar","onlySpecific","allBlank","noBlank","ips","macs","phones","ports","nMultiple"],argsDefaultTest:{len:"1,7",byteLen:"1,7",num:"[1,[3,5],7]",even:"[1,[3,5],7]",float:"[1.2, 23.2, 3, 4, [8, 10]]",hex:"3,3",nMultiple:"5",notSpecialChars:"-",sameStr:"555,不能一样",validOrArrs:'[{ "type":"ip"}, {"type":"domain"}],"请输入有效的域名"',ipCompare:'"192.168.2.3"'},argsText:r["default"]}},computed:{typeValid:function(){var a=this.formData,e=a.validType,t=a.validArgs;try{t=JSON.parse("["+t+"]")}catch(o){console.log("解析参数出错"),t=t.split(",")}return{type:e,args:t}},text:function(){var a=this.argsText[this.formData.validType]||{};return a.args&&(a.args=a.args.replaceAll(/(\/\*\*\n|\*\/|\*)/g,"")),a}},methods:{changeType:function(a){this.formData.validArgs=this.argsDefaultTest[a]||""}}},s=l,p=(t("bd65"),t("2877")),n=Object(p["a"])(s,o,i,!1,null,null,null);e["default"]=n.exports},"98d7":function(a,e,t){},bd65:function(a,e,t){"use strict";t("98d7")}}]);