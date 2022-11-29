<template>
  <v-page pageTitle="端口">
    <v-form>
      <v-form-item label="端口个数">
        <v-input v-model="formData.portNums"></v-input>
      </v-form-item>

      <v-form-item label="icon">
        <v-radio
          v-model="formData.icon"
          :options="['icon-port', 'icon-port2']"
        ></v-radio>
      </v-form-item>

      <v-form-item label="startPortIndex">
        <v-input v-model="formData.startPortIndex"></v-input>
      </v-form-item>
      <v-form-item label="是否有iptv" description="iptv默认在最后一个">
        <v-radio v-model="formData.hasIPTV" :options="[true, false]"></v-radio>
      </v-form-item>
      <v-form-item label="最小wan的个数">
        <v-input v-model="formData.minWanNum"></v-input>
      </v-form-item>
      <v-form-item label="最大wan的个数">
        <v-input v-model="formData.maxWanNum"></v-input>
      </v-form-item>
    </v-form>

    <port
      :list="list"
      :icon="formData.icon"
      :startPortIndex="formData.startPortIndex"
      :hasIPTV="formData.hasIPTV"
      :minWanNum="+formData.minWanNum"
      :maxWanNum="+formData.maxWanNum"
    ></port>
  </v-page>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        portNums: 5,
        icon: "icon-port",
        startPortIndex: 1,
        hasIPTV: true,
        minWanNum: 1,
        maxWanNum: 4
      }
    };
  },
  computed: {
    list() {
      return Array.from({ length: this.formData.portNums }, () => {
        return { status: Math.random() > 0.5 };
      });
    }
  }
};
</script>
