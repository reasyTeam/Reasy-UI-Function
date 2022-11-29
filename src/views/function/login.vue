<template>
  <v-page pageTitle="login页面">
    <Login
      name="login"
      text="login"
      is-first
      is-lang
      autofocus
      :formData="formData"
      :formConfig="formConfig"
      action="loginAuth"
      :beforeSubmit="beforeSubmit"
    ></Login
  ></v-page>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        user: "admin"
      },
      formConfig: {
        username: {
          field: "user",
          placeholder: "请输入您的用户名",
          maxlength: 5,
          valid: { type: "byteLen", args: [3, 5] },
          icon: "v-icon-add"
        },
        password: {
          field: "pwd",
          valid: [{ type: "byteLen", args: [3, 5] }]
        }
      }
    };
  },

  methods: {
    beforeSubmit() {
      // console.log(data);
    }
  }
};
</script>
