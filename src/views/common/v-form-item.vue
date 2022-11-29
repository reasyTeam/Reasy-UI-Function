<template>
  <v-page pageTitle="单个v-form-item">
    <!-- 语言切换 -->
    <v-form-item
      ref="ip"
      label="ip"
      prop="ip"
      :valid="{ type: 'ip' }"
      @submit="submitData"
    >
      <v-input v-model="ip" name="ip"></v-input>
    </v-form-item>

    <v-form-item>
      <v-button @click="submit">{{ _("Save") }}</v-button>
    </v-form-item>
  </v-page>
</template>

<script>
export default {
  data() {
    return {
      ip: ""
    };
  },
  methods: {
    submit() {
      this.$refs.ip.submitItem();
    },
    submitData(val) {
      this.$message.success("进行提交处理");
      this.$setModule({ aaa: val });
    }
  }
};
</script>
