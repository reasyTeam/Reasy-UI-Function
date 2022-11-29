<template>
  <v-page pageTitle="b28n">
    <!-- 语言切换 -->
    <v-form>
      <v-form-item label="语言切换">
        <v-select
          v-model="lang"
          :options="options"
          @change="changeLang"
        ></v-select>
      </v-form-item>
      <v-form-item>
        {{ _("Save") }}
      </v-form-item>
    </v-form>
  </v-page>
</template>

<script>
export default {
  data() {
    return {
      lang: this.B.getLang(),
      options: this.B.getOptions()
    };
  },
  methods: {
    changeLang(val) {
      this.B.setPageLang(val);
      window.location.reload();
    }
  }
};
</script>
