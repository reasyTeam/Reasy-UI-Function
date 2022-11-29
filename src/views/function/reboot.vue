<template>
  <!-- 须知： 必须引入progress-bar组件 -->
  <v-page pageTitle="重启/恢复出厂">
    <reboot-btn action="goform/setModules" :postData="postData"></reboot-btn>
  </v-page>
</template>
<script>
export default {
  data() {
    return {
      postData: {
        reboot: true
      }
    };
  }
};
</script>
