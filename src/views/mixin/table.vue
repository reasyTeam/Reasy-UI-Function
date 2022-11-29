<template>
  <v-table-extend
    :name="name"
    modules="wirelessClient"
    operateModule="wirelessClient"
    is-pagination
    head-operate
    :buttons="buttons"
    :rowButtons="rowButtons"
    export-url="/cgi-bin/UploadCfg"
  >
    <v-table-col type="selection"></v-table-col>
    <v-table-col-extend
      v-for="col in tableCols"
      :key="col.prop"
      :label="col.label"
      :prop="col.prop"
      :format="col.format"
      :transformSpeed="col.transformSpeed"
      :arrow="col.arrow"
      :unit="col.unit"
      :transformTime="col.transformTime"
      :transformStatus="col.transformStatus"
      :dot="col.dot"
      is-search
      is-sort
      :isDefaultValue="col.isDefaultValue"
      :default-sort-type="col.sort"
    ></v-table-col-extend>

    <!-- 新增编辑 -->
    <template #form="{ formData }">
      <v-form ref="form" :rules="rules">
        <v-form-item label="终端名称" prop="hostname">
          <v-input name="hostname" v-model="formData.hostname"></v-input>
        </v-form-item>
        <v-form-item label="终端类型" prop="staType">
          <v-input name="staType" v-model="formData.staType"></v-input>
        </v-form-item>
        <v-form-item label="IP地址" prop="staIP">
          <v-input-group
            type="ip"
            name="staIP"
            v-model="formData.staIP"
          ></v-input-group>
        </v-form-item>
        <v-form-item label="MAC地址" prop="staMac">
          <v-input-group
            type="mac"
            name="staMac"
            v-model="formData.staMac"
          ></v-input-group>
        </v-form-item>
        <v-form-item label="关联设备" prop="upperDeviceModel">
          <v-input
            name="upperDeviceModel"
            v-model="formData.upperDeviceModel"
          ></v-input>
        </v-form-item>
      </v-form>
    </template>
  </v-table-extend>
</template>
<script>
export default {
  data() {
    this.tableCols = [
      {
        label: "终端名称",
        prop: "hostname"
      },
      {
        label: "终端备注",
        prop: "remark"
      },
      {
        label: "IP地址",
        prop: "staIP",
        sort: "asc",
        isDefaultValue: false
      },
      {
        label: "MAC地址",
        prop: "staMac",
        isDefaultValue: false
      },
      {
        label: "关联设备",
        prop: "upperDeviceModel",
        isDefaultValue: false
      },
      {
        label: "关联设备备注",
        prop: "upperDeviceRemark",
        isDefaultValue: false
      },
      {
        label: "关联设备IP",
        prop: "upperDeviceIP",
        isDefaultValue: false
      },
      {
        label: "关联设备MAC",
        prop: "upperDeviceMac",
        isDefaultValue: false
      },
      {
        label: "关联SSID",
        prop: "upperDeviceSsid"
      },
      {
        label: "实时上传",
        prop: "upSpeed",
        transformSpeed: "b",
        arrow: "up",
        unit: true
      },
      {
        label: "实时下载",
        prop: "downSpeed",
        transformSpeed: "b",
        arrow: "down",
        unit: true
      },
      {
        label: "总上传",
        prop: "uploadTotal",
        isDefaultValue: false
      },
      {
        label: "总下载",
        prop: "downloadTotal",
        isDefaultValue: false
      },
      {
        label: "频段",
        prop: "radioBind"
      },
      {
        label: "在线时长",
        prop: "onlineTime",
        transformTime: "s"
      },
      {
        label: "类型",
        prop: "staType",
        transformStatus: {
          nvr: { text: "摄像头", color: "green" },
          iptv: { text: "电视", color: "red" }
        },
        dot: true
      }
    ];
    this.rules = {
      hostname: { type: "vlanName" },
      staType: { type: "vlanName" },
      staIP: { type: "ip" },
      staMac: { type: "mac" },
      upperDeviceModel: { type: "ssid" }
    };
    this.buttons = [
      { type: "Add", disabled: this.disabled },
      { type: "Delete" },
      { type: "Export" }
    ];
    this.rowButtons = [{ type: "Edit" }, { type: "Delete" }];
    return {
      name: "demo-table",
      exportObj: {
        name: "asd",
        data: "data123"
      }
    };
  },
  methods: {
    disabled() {
      return true;
    }
  }
};
</script>
