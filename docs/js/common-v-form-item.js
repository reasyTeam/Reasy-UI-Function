(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["common-v-form-item"],{"57f6":function(t,i,e){"use strict";e.r(i);var s=function(){var t=this,i=t._self._c;return i("v-page",{attrs:{pageTitle:"单个v-form-item"}},[i("v-form-item",{ref:"ip",attrs:{label:"ip",prop:"ip",valid:{type:"ip"}},on:{submit:t.submitData}},[i("v-input",{attrs:{name:"ip"},model:{value:t.ip,callback:function(i){t.ip=i},expression:"ip"}})],1),i("v-form-item",[i("v-button",{on:{click:t.submit}},[t._v(t._s(t._("Save")))])],1)],1)},a=[],n={data:function(){return{ip:""}},methods:{submit:function(){this.$refs.ip.submitItem()},submitData:function(t){this.$message.success("进行提交处理"),this.$setModule({aaa:t})}}},o=n,u=e("2877"),p=Object(u["a"])(o,s,a,!1,null,null,null);i["default"]=p.exports}}]);