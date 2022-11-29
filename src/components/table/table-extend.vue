<template>
  <div>
    <v-table-basic
      v-bind="$attrs"
      v-on="$listeners"
      :data="tableData"
      :name="name"
      :isPagination="isPagination"
      :headOperate="headOperate"
      :totalLength="totalLength"
      :buttons="mergeButtons"
      :row-buttons="mergeRowButttons"
      @getCheckOperateData="setCheckOperateData"
      @sort="sortTable"
      @search="search"
      @change-size="changeSize"
      @change-page="changePage"
    >
      <template #leftPrepend>
        <slot name="leftPrepend"></slot>
      </template>
      <template #left>
        <slot name="left"></slot>
      </template>
      <template #leftAppend>
        <slot name="leftAppend"></slot>
      </template>
      <template #rightPrepend>
        <slot name="rightPrepend"></slot>
      </template>
      <template #right>
        <slot name="right"></slot>
      </template>
      <template #rightAppend>
        <slot name="rightAppend"></slot>
      </template>

      <slot></slot>
      <template #form="{ formData }">
        <slot name="form" :formData="formData"></slot>
      </template>
    </v-table-basic>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "table"
    },
    modules: {
      //请求模块名称 对象为自定义
      type: [Object, String, Array],
      default: ""
    },
    formatFunction: {
      //格式化获取的表格数据
      type: Function
    },
    operateModule: {
      //表头操作项接口
      type: String,
      default: ""
    },
    // 左侧按钮配置
    buttons: {
      type: Array,
      default: () => []
    },
    // 操作项配置
    rowButtons: {
      type: Array,
      default: () => []
    },
    //导出接口
    exportUrl: {
      type: String
    },
    //定时获取
    intervalTime: {
      type: Number,
      default: 0
    },
    headOperate: {
      //是否存在表头操作项
      type: Boolean,
      default: false
    },
    isPagination: {
      //是否分页
      type: Boolean,
      default: false
    }
  },
  computed: {
    mergeButtons() {
      //默认按钮
      return this.handleDefault(this.BUTTONS_DEF, this.buttons);
    },
    mergeRowButttons() {
      //操作项
      return this.handleDefault(this.ROW_BUTTONS_DEF, this.rowButtons);
    },
    //是否自定义请求
    modulesCustom() {
      return Object.prototype.toString.call(this.modules) === "[Object Object]";
    },
    modulesArr() {
      return typeof this.modules === "string" ? [this.modules] : this.modules;
    },
    mergeModule() {
      //请求参数
      if (this.modulesCustom) return this.modules;
      //数组 取第一个元素
      let obj = {};
      this.modulesArr.forEach((item, index) => {
        obj[item] =
          this.isPagination && index == 0
            ? {
                size: this.pageSize,
                page: this.currentPage,
                sortType: this.sortType,
                sort: this.sortField,
                search: this.searchValue,
                searchRange: this.searchRange
              }
            : "";
      });
      return obj;
    },
    mergeOpeModule() {
      //表头操作项请求参数
      let module =
        typeof this.modules === "string" ? this.modules : this.modules[0];
      return this.operateModule || module;
    }
  },
  data() {
    //默认的按钮事件
    this.BUTTONS_DEF = [
      {
        type: "Add",
        submit: this.submit
      },
      {
        type: "Delete",
        submit: this.submitDelete
      },
      {
        type: "Export",
        submit: this.submitExport
      }
    ];
    //默认的操作栏事件
    this.ROW_BUTTONS_DEF = [
      {
        type: "Delete",
        submit: this.submitDelete
      },
      {
        type: "Edit",
        submit: this.submit
      }
    ];
    return {
      tableData: [], //表格数据
      selectedData: [], //勾选数据
      checkOperateData: [], //表头数据
      totalLength: 0, //总共条数
      currentPage: 0, //当前页
      pageSize: 10, //页码
      sortField: "", //排序字段
      sortType: "", //排序类型
      searchValue: "", //搜索值
      searchRange: [], //搜索范围
      interval: null
    };
  },
  mounted() {
    this.getData();
    this.getOperateData();

    this.intervalTime && this.startInterval();
  },
  methods: {
    //处理需要保留一部分默认值
    handleDefault(defaultData, newData) {
      return newData.map(item => {
        let data = defaultData.find(obj => obj.type == item.type);
        return data ? Object.assign(data, item) : item;
      });
    },
    //默认数据处理
    defaultFormat(data) {
      return this.formatFunction
        ? this.formatFunction(data)
        : data[this.modulesArr[0]];
    },
    //获取数据
    getData() {
      this.$getModules(this.mergeModule).then(res => {
        res = this.defaultFormat(res);
        //是否分页
        if (this.isPagination) {
          this.tableData = res.list;
          this.currentPage = res.page;
          this.totalLength = res.total;
        } else {
          this.tableData = res;
        }
      });
    },
    startInterval() {
      this.interval = setInterval(() => {
        this.getData();
      }, this.intervalTime);
    },
    endInterval() {
      clearInterval(this.interval);
    },
    //获取表头操作项数据
    getOperateData() {
      //存在表头操作项才执行请求
      this.headOperate &&
        this.$post("goform/getItems", { [this.mergeOpeModule]: "" }).then(
          res => {
            this.checkOperateData = res[this.operateModule];
          }
        );
    },
    //设置头部操作栏下拉框的勾选
    setCheckOperateData(data) {
      this.$post("goform/getItems", { [this.mergeOpeModule]: data }).then(
        () => {
          this.getOperateData();
        }
      );
    },

    changeCurrentPage(page = 0) {
      this.currentPage = page;
    },
    //排序
    async sortTable(sortField, sortType) {
      //如果父元素自定义函数则不处理
      if (this.$listeners.sort) return;
      this.changeCurrentPage();

      this.sortField = sortField;
      this.sortType = sortType;
      await this.getData();
    },
    //搜索
    async search(searchValue, searchRange) {
      //如果父元素自定义函数则不处理
      if (this.$listeners.search) return;
      this.changeCurrentPage();

      this.searchValue = searchValue;
      this.searchRange = searchRange;
      await this.getData();
    },
    //修改每页条数
    async changeSize(size) {
      //如果父元素自定义函数则不处理
      if (this.$listeners.changeSize) return;
      this.pageSize = size;
      await this.getData();
    },
    //修改当前页
    async changePage(page) {
      //如果父元素自定义函数则不处理
      if (this.$listeners.changePage) return;
      this.currentPage = page - 1;
      await this.getData();
    },

    //新增、编辑提交
    submit(submitData, isEdit) {
      //如果请求参数为对象 则不下发请求
      if (this.modulesCustom) return;
      submitData.action = isEdit ? "Edit" : "Add";

      return this.$setModules({ [this.modulesArr[0]]: [submitData] }).then(
        res => {
          // eslint-disable-next-line no-console
          console.log("保存成功");
          return Promise.resolve(res.errCode == 0);
        }
      );
    },
    //删除提交
    submitDelete(submitData) {
      //如果请求参数为对象 则不下发请求
      if (this.modulesCustom) return;
      submitData = Array.isArray(submitData) ? submitData : [submitData];
      submitData.forEach(element => {
        element.action = "Delete";
      });

      this.$setModules({ [this.modulesArr[0]]: submitData });
    },
    //导出提交
    submitExport() {
      //如果请求参数为对象 则不下发请求
      if (this.modulesCustom) return;
      window.location = `${this.exportUrl}&language=${window.B.getLang()}`;
    }
  },
  beforeDestroyed() {
    clearInterval(this.interval);
  },
  watch: {
    intervalTime() {
      this.intervalTime ? this.startInterval() : this.endInterval();
    }
  }
};
</script>
