<template>
  <v-button
    :type="type"
    size="S"
    :name="name"
    :disabled="disabled"
    @click="click"
    ><slot></slot
  ></v-button>
</template>

<script>
export default {
  name: "v-table-btn",
  props: {
    name: {
      type: String,
      default: ""
    },
    type: String,
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
      if (this.disabled) {
        return;
      }
      this.$emit("click");
    }
  }
};
</script>
