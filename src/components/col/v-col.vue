<template>
  <div class="v-col">
    <!-- 左侧文字 -->
    <div class="col-td" :style="labelStyle">
      <slot name="label"
        ><span>{{ label }}</span></slot
      >
    </div>
    <!-- 右侧值 -->
    <div class="col-td" :style="valueStyle">
      <div :style="rightWidth">
        <slot>
          <span
            v-for="(item, index) in getValue"
            :key="index"
            class="col-td__value"
          >
            {{ item }}
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "v-col-layout",
  props: {
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Array],
      default: ""
    },
    // 值的宽度
    gap: {
      type: [Number, String],
      default: 24
    },
    labelWidth: {
      type: [Number, String],
      default: ""
    },
    valueWidth: {
      type: [Number, String],
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      parent: null
    };
  },
  mounted() {
    // todo review： 这个怎么保证父级就是col-list呢
    this.parent = this.$parent;
  },
  computed: {
    getValue() {
      let arr = [];
      return arr.concat(this.value);
    },
    labelStyle() {
      let style = {
        width: this.formatValue(this.labelWidth),
        verticalAlign: this.align,
        paddingBottom: this.formatValue(this.space)
      };
      let $parent = this.parent;

      while ($parent) {
        if ($parent.$options.name === "ColList") {
          style.width = style.width || this.formatValue($parent.labelWidth);
          style.verticalAlign = this.align || $parent.align;
          style.paddingBottom = this.formatValue($parent.space);
          break;
        }
        $parent = $parent.$parent;
      }
      return style;
    },
    rightWidth() {
      let style = { width: this.formatValue(this.valueWidth) };
      let $parent = this.parent;
      while ($parent) {
        if ($parent.$options.name === "ColList") {
          style.width = style.width || this.formatValue($parent.valueWidth);
          break;
        }
        $parent = $parent.$parent;
      }
      return style;
    },
    valueStyle() {
      let style = {
        color: this.color,
        paddingLeft: this.formatValue(this.gap)
      };
      let $parent = this.parent;
      while ($parent) {
        if ($parent.$options.name === "ColList") {
          style.color = this.color || $parent.color;
          style.paddingLeft =
            this.formatValue(this.gap) || this.formatValue($parent.gap);
          style.paddingBottom = this.formatValue($parent.space);
          break;
        }
        $parent = $parent.$parent;
      }
      return style;
    }
  },
  methods: {
    formatValue(value) {
      return typeof value === "number" ? value + "px" : value;
    }
  }
};
</script>
<style scoped lang="scss">
.v-col {
  display: table-row;
  text-align: left;
}
// todo reviews: 这个没有用到
// .tr {
//   display: table-row;
// }
.col-td {
  display: table-cell;
  word-break: break-all;
  vertical-align: middle;
  line-height: 22px;
  span {
    display: block;
  }
}
</style>
