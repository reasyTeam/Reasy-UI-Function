(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["function-port"],{f39d:function(a,t,o){"use strict";o.r(t);var r=function(){var a=this,t=a._self._c;return t("v-page",{attrs:{pageTitle:"端口"}},[t("v-form",[t("v-form-item",{attrs:{label:"端口个数"}},[t("v-input",{model:{value:a.formData.portNums,callback:function(t){a.$set(a.formData,"portNums",t)},expression:"formData.portNums"}})],1),t("v-form-item",{attrs:{label:"icon"}},[t("v-radio",{attrs:{options:["icon-port","icon-port2"]},model:{value:a.formData.icon,callback:function(t){a.$set(a.formData,"icon",t)},expression:"formData.icon"}})],1),t("v-form-item",{attrs:{label:"startPortIndex"}},[t("v-input",{model:{value:a.formData.startPortIndex,callback:function(t){a.$set(a.formData,"startPortIndex",t)},expression:"formData.startPortIndex"}})],1),t("v-form-item",{attrs:{label:"是否有iptv",description:"iptv默认在最后一个"}},[t("v-radio",{attrs:{options:[!0,!1]},model:{value:a.formData.hasIPTV,callback:function(t){a.$set(a.formData,"hasIPTV",t)},expression:"formData.hasIPTV"}})],1),t("v-form-item",{attrs:{label:"最小wan的个数"}},[t("v-input",{model:{value:a.formData.minWanNum,callback:function(t){a.$set(a.formData,"minWanNum",t)},expression:"formData.minWanNum"}})],1),t("v-form-item",{attrs:{label:"最大wan的个数"}},[t("v-input",{model:{value:a.formData.maxWanNum,callback:function(t){a.$set(a.formData,"maxWanNum",t)},expression:"formData.maxWanNum"}})],1)],1),t("port",{attrs:{list:a.list,icon:a.formData.icon,startPortIndex:a.formData.startPortIndex,hasIPTV:a.formData.hasIPTV,minWanNum:+a.formData.minWanNum,maxWanNum:+a.formData.maxWanNum}})],1)},n=[],m=(o("a630"),o("3ca3"),{data:function(){return{formData:{portNums:5,icon:"icon-port",startPortIndex:1,hasIPTV:!0,minWanNum:1,maxWanNum:4}}},computed:{list:function(){return Array.from({length:this.formData.portNums},(function(){return{status:Math.random()>.5}}))}}}),e=m,s=o("2877"),i=Object(s["a"])(e,r,n,!1,null,null,null);t["default"]=i.exports}}]);