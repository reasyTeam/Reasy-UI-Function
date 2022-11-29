<template>
  <div class="v-col-list">
    <h2 class="title">单行两列布局</h2>
    <p class="info">
      两列布局可以设置左右两侧的插槽或者直接设置字符串；右侧的值可以设置数组进行换行显示；color用来设置右侧值的文字颜色；gap用来设置右侧值距离左侧的间距；align设置对齐方式；
      labelWidth和valueWidth用来设置宽度。
    </p>

    <v-collapse name="name3">
      <template v-slot:title>
        <div class="content">
          <v-col-layout>
            <template #label> 我的介绍 </template>
            <div>我的描述</div>
          </v-col-layout>
        </div>
        <div class="content">
          <v-col-layout color="pink" :value="value">
            <template #label> 我的介绍 </template>
          </v-col-layout>
        </div>
        <div class="content">
          <v-col-layout label="姓名" value="玛蒂尔达" :gap="20"></v-col-layout>
        </div>
        <div class="content">
          <v-col-layout
            :labelWidth="60"
            :valueWidth="200"
            align="top"
            label="个性签名"
            value="我聆听沉寂已久的心情清晰透明 就像美丽的风景"
          ></v-col-layout>
        </div>
      </template>
      <pre>
        <code>
        &lt;v-col-layout color="pink"&gt; 
          &lt;template #label&gt; 我的介绍&lt;/template&gt; 
          &lt;div&gt;我的描述&lt;/div&gt; 
        &lt;/v-col-layout&gt;
      </code>
      <br />
      <code>
        &lt;v-col-layout label="姓名" value="玛蒂尔达"
        color="pink"&gt;&lt;/v-col-layout&gt;
      </code>
      <br />
      <code>
        &lt;v-col-layout :labelWidth="60" :valueWidth="200" align="top"
        label="个性签名" value="我聆听沉寂已久的心情清晰透明 就像美丽的风景"
        &gt;&lt;/v-col-layout&gt;
      </code></pre>
    </v-collapse>

    <h2 class="title">多行两列布局</h2>
    <p class="info">
      和单行布局一样；color用来设置右侧值的文字颜色；gap用来设置右侧值距离左侧的间距；align设置对齐方式；
      labelWidth和valueWidth用来设置宽度。
    </p>
    <v-collapse name="name4">
      <template v-slot:title>
        <div class="content">
          <col-list :valueWidth="100" :space="20">
            <v-col-layout
              label="姓名"
              value="玛蒂尔达"
              color="purple"
            ></v-col-layout>
            <v-col-layout color="pink" :value="value">
              <template #label>
                <strong>兴趣爱好</strong>
              </template>
            </v-col-layout>
            <v-col-layout
              label="一句话介绍自己"
              :value="introduce"
              color="green"
            ></v-col-layout>
          </col-list>
        </div>
      </template>
      <pre>
        <code>
        &lt;col-list :valueWidth="100"&gt;
          &lt;v-col-layout
            label="姓名"
            value="玛蒂尔达"
            color="purple"
          &gt;&lt;/v-col-layout&gt;
          &lt;v-col-layout color="pink"&gt;
            &lt;template #label&gt;
              &lt;strong&gt;兴趣爱好&lt;/strong&gt;
            &lt;/template&gt;
            &lt;span&gt;{{ value.join(";") }}&lt;/span&gt;
          &lt;/v-col-layout&gt;
          &lt;v-col-layout
            label="一句话介绍自己"
            :value="introduce"
            color="green"
          &gt;&lt;/v-col-layout&gt;
        &lt;/col-list&gt;
      </code>
    </pre>
    </v-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ["a pretty girl", "a kind people", "good man"],
      introduce: "is life always this hard or is it just when you are a kid"
    };
  }
};
</script>
<style lang="scss">
.v-col-list {
  .v-collapse {
    position: relative;
    &__header {
      height: auto;
    }
    &__arrow {
      position: absolute;
      bottom: -46px;
      left: 0;
      right: 0;
    }
  }
  .title {
    font-size: 24px;
    color: #262626;
    margin: 55px 0 20px;
  }
  .info {
    font-size: 14px;
    color: #595959;
    line-height: 1.5em;
    margin: 14px 0;
  }
  .content {
    padding: 12px 0;
  }
}
</style>
