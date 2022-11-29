<template>
  <div>
    <v-table
      v-bind="$attrs"
      v-on="$listeners"
      :name="name"
      :isPagination="isPagination"
      :headOperate="headOperate"
      @selection-change="selectionChange"
    >
      <!-- 左侧按钮 -->
      <template #btnLeft>
        <slot name="leftPrepend"></slot>
        <slot name="left">
          <v-table-btn
            v-for="item in mergeButtons"
            :key="item.type"
            :icon="item.icon"
            :name="name + item.type"
            :type="item.buttonType"
            :disabled="getDisabled(item.disabled)"
            @click="btnClick(item.type, item.click)"
            >{{ item.label }}</v-table-btn
          >
        </slot>
        <slot name="leftAppend"></slot>
      </template>
      <!-- 右侧按钮 -->
      <template #btnRight>
        <slot name="rightPrepend"></slot>
        <slot name="right"></slot>
        <slot name="rightAppend"></slot>
      </template>

      <!-- 表格内容填充 -->
      <slot></slot>
      <!-- todo review: 没有操作怎么处理 -->
      <v-table-col hide-in-operate prop="operate" label="操作">
        <template v-slot="slotProps">
          <v-operate-btn
            v-for="item in mergeRowBottons"
            :key="item.type"
            :icon="item.icon"
            :type="item.buttonType"
            :disabled="getDisabled(item.disabled, slotProps)"
            @click="btnClick(item.type, item.click, slotProps)"
            >{{ item.label }}</v-operate-btn
          >
        </template>
      </v-table-col>
    </v-table>
    <!-- 新增编辑弹窗 -->
    <v-dialog
      name="dialog"
      ref="dialog"
      :title="dialogTitle"
      :is-loading="isLoading"
      v-model="showDialog"
      :confirm-button-text="_('确定')"
      @confirm="submit"
      append-to-body
    >
      <slot name="form" :formData="formData"></slot>
    </v-dialog>
  </div>
</template>
<script>
// 按钮的默认配置
const BTN_CONFIG = [
    {
      type: "Add",
      label: "添加",
      buttonType: "primary"
    },
    {
      type: "Delete",
      label: "删除",
      buttonType: ""
    },
    {
      type: "Export",
      label: "导出",
      buttonType: ""
    }
  ],
  //操作栏的默认配置
  OPERATE_CONFIG = [
    {
      type: "Edit",
      icon: "v-icon-edit",
      label: "编辑"
    },
    {
      type: "Delete",
      icon: "v-icon-delete",
      label: "删除"
    }
  ];
export default {
  props: {
    name: {
      type: String
    },
    // 左侧按钮配置
    buttons: {
      type: Array,
      default: () => []
    },
    //操作按钮的配置
    rowButtons: {
      type: Array,
      default: () => []
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
      return this.handleDefault(BTN_CONFIG, this.buttons);
    },
    mergeRowBottons() {
      return this.handleDefault(OPERATE_CONFIG, this.rowButtons);
    },
    // todo 建议buttonsObj 和 rowButtonsObj 映射成一个对象。方便使用，即按钮type不必重复
    buttonsObj() {
      // todo review: 这个写法的意思是每次都复制上一次的对象吗？是不是可以直接赋值然后返回。或者不用reduce遍历
      return this.buttons.reduce((results, item) => {
        return {
          ...results,
          [item.type]: item.submit
        };
      }, {});
    },
    rowButtonsObj() {
      return this.rowButtons.reduce((results, item) => {
        return {
          ...results,
          [item.type]: item.submit
        };
      }, {});
    },
    dialogTitle() {
      return this.isEdit ? "编辑" : "新增";
    }
  },
  data() {
    // todo review：这里的函数映射，建议和BTN_CONFIG 放在一起
    this.CLICK_FUN = {
      Add: this.click,
      Edit: this.click,
      Delete: this.deleteClick,
      Export: this.exportClick
    };
    return {
      isEdit: false, //是否为编辑
      selectionData: [], //表格选中的数据
      isLoading: false, //弹窗按钮是否为loading状态
      showDialog: false, //是否显示弹窗
      formData: {} //表单的数据
    };
  },
  methods: {
    //表格单选框改变函数
    selectionChange(data) {
      this.selectionData = data;
    },
    // todo review：什么时候触发更新显示，如不能监听，建议有个触发更新的接口，可以手动触发按钮状态更新。
    getDisabled(func, data) {
      func = func || this.defaultFun;
      return func(data);
    },
    //默认函数
    defaultFun() {
      return false;
    },
    //处理需要保留一部分默认值
    handleDefault(defaultData, newData) {
      return newData.map(item => {
        let data = defaultData.find(obj => obj.type == item.type);
        // todo revierw： 会改变 data的值, 默认值应该是不可以修改的 建议Object.assign({},data, item)
        return data ? Object.assign(data, item) : item;
      });
    },
    //默认点击函数
    defaultClickFun() {
      return Promise.resolve(true);
    },
    //按钮点击事件
    btnClick(type, clickFunc, data) {
      //如果没有自定义函数则使用默认函数
      let click = clickFunc || this.defaultClickFun;
      //如果返回false，则不处理
      if (!click) return;
      // todo review：这里的click是beforclick的意思嘛，返回true 就执行默认函数，返回false就不执行嘛
      click(data).then(bool => {
        // todo review： bool 在每个默认函数里面都是 false 不执行的话，那在这里就可以进行判断了
        this.CLICK_FUN[type](bool, data);
      });
    },
    //校验是否选中数据
    validSelectedLen(data = this.selectedData, title = "请至少选择一条数据") {
      if (data.length < 1) {
        //  todo review ：$notify建议做成配置并统一
        this.$notify.error(title);
        return false;
      }
      return true;
    },
    //新增、编辑点击函数
    click(bool, data) {
      // todo review：这个在点击的时候就可以判断了。
      this.isEdit = data ? true : false;
      this.formData = data || {};
      this.showDialog = bool;
    },
    //删除点击函数
    deleteClick(bool, data) {
      // todo review： data 不是数组吧，但是validSelectedLen函数里面会校验data.length 会不会有问题
      if (this.validSelectedLen(data || this.selectionData)) {
        bool &&
          this.$confirm("确定要删除数据吗？").then(() => {
            this.submitDelete(data || this.selectionData);
          });
      }
    },
    //导出点击函数
    exportClick(bool) {
      bool &&
        this.$confirm("确定要导出数据吗？", "导出").then(() => {
          this.submitExport(this.selectionData);
        });
    },
    //新增、编辑提交
    submit() {
      let submitFunc = this.isEdit
        ? this.rowButtonsObj.Edit
        : this.buttonsObj.Add;

      // 获取弹窗表单 // todo review：这里获取表单容易有问题,建议明确说明，或者另外的方式获取
      let form = this.$refs.dialog.$children[0];
      let valid = form.checkValidate();

      if (valid) {
        //状态laoding
        this.isLoading = true;
        //获取表单数据
        let submitData = form.getSubmitData();

        submitFunc(submitData, this.isEdit)?.then(bool => {
          this.isLoading = false;
          this.showDialog = bool;
        });
      } else {
        //  todo review ：$message建议做成配置
        this.$message.error("请检查错误信息");
      }
    },
    //删除提交
    submitDelete(data) {
      let submitFunc = Array.isArray(data)
        ? this.buttonsObj.Delete
        : this.rowButtonsObj.Delete;

      submitFunc(data);
    },
    //导出提交
    submitExport(data) {
      let submitFunc = this.buttonsObj.Export;

      submitFunc(data);
    }
  }
};
</script>
