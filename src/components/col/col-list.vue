<template>
  <div class="col-list">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "col-list",
  props: {
    // 列表间隔
    gap: {
      type: [Number, String],
      default: 24
    },
    // label的宽度
    labelWidth: {
      type: [Number, String],
      default: "auto"
    },
    // 值的宽度
    valueWidth: {
      type: [Number, String],
      default: "auto"
    },
    // 值的颜色
    color: {
      type: String,
      default: ""
    },
    //
    space: {
      type: [Number, String],
      default: 24
    },
    // 值的对齐方式
    align: {
      type: String,
      default: "middle"
    }
  }
};
</script>
