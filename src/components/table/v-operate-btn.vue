<template>
  <span
    @click="click"
    class="operate-icon"
    :class="{ 'is-disabled': disabled }"
  >
    <i class="operate-icon__i" :class="[icon]"></i>
    <slot>{{ text }}</slot>
  </span>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    click() {
      if (!this.disabled) {
        this.$emit("click");
      }
    }
  }
};
</script>
<style scoped lang="scss">
.operate-icon {
  padding-left: 20px;
  line-height: 16px;
  position: relative;
  &__i:before {
    font-size: 16px;
    margin-right: 4px;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 16px;
    height: 16px;
  }
  &.is-disabled {
    color: #b2cfff;
  }
}
</style>
