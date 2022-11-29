<template>
  <section class="port-status">
    <!-- 内容 -->
    <table class="port-status__table">
      <!--  数字 -->
      <tr>
        <td class="port-status__title" v-for="index in indexArray" :key="index">
          {{ index }}
        </td>
      </tr>
      <!-- 图标 -->
      <tr>
        <td
          class="port-status__icon"
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'port-status__icon--active': item.status }"
        >
          <i :class="item.icon || icon"></i>
        </td>
      </tr>

      <!-- 名称 可能有多列合并显示 -->
      <tr>
        <td
          v-for="(item, i) in defaultNameArray"
          :key="i + item.name"
          :colspan="item.length"
        >
          <div
            class="port-status__default-name"
            :class="{ 'port-status__default-name-flex': item.length > 2 }"
          >
            <!-- 左边的线 -->
            <span
              class="port-status__line port-status__line--left"
              v-if="item.length > 2"
            ></span>
            <span class="port-status__text">{{ item.name }}</span>
            <!-- 右边的线 -->
            <span
              class="port-status__line port-status__line--right"
              v-if="item.length > 2"
            ></span>
          </div>
        </td>
      </tr>

      <!-- 底部 相对定位 偏移显示 -->
      <tr>
        <td class="port-status__name" v-for="name in nameArray" :key="name">
          <div class="port-status__name__line"></div>
          <span class="port-status__name__text">{{ name }}</span>
        </td>
      </tr>
    </table>
  </section>
</template>

<script>
export default {
  props: {
    // 开始的序号值
    startPortIndex: {
      type: Number,
      default: 1
    },
    // 通用的端口图标
    icon: {
      type: String,
      default: "icon-port"
    },
    // 端口详细配置项，数组对象，包含name，index，icon，status
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 是否有iptv ，如果有就放在最后一位
    hasIPTV: {
      type: Boolean,
      default: false
    },
    // 最小的wan的个数
    minWanNum: {
      type: Number,
      default: 1
    },
    // 最大的wan的个数
    maxWanNum: {
      type: Number,
      default: 3
    },
    //当前wan的个数 wanNum
    wanNum: {
      type: Number,
      default: 0
    }
  },
  computed: {
    indexArray() {
      let { list, startPortIndex } = this;
      return Array.from(list, (item, i) => item.index || +startPortIndex + i);
    },
    // 默认名称计算
    defaultNameArray() {
      let { list, minWanNum, maxWanNum, hasIPTV } = this;
      let length = list.length;
      let arr = list.map((item, index) => {
        // 没有名称 则使用计算方式 通过wan的个数根据当前显示计算
        if (!item.name) {
          let name = "LAN";
          if (index < minWanNum) {
            name = "WAN";
          } else if (index < maxWanNum) {
            name = "WAN/LAN";
          }

          // 最后一个可能是iptv
          if (index == length - 1 && hasIPTV) {
            name += "/IPTV";
          }
          return name;
        }
        return item.name;
      });

      // 计算重复个数以及最后的显示数组
      return this.countRepeat(arr);
    },
    // 实际名称计算
    nameArray() {
      let { list, wanNum, hasIPTV, indexArray } = this;
      let length = list.length;

      return list.map((item, index) => {
        // 通过wan的个数根据当前显示计算
        if (!item.name) {
          if (index < wanNum) {
            return "WAN" + indexArray[index];
          } else {
            // 最后一个可能是iptv
            return (
              (index == length - 1 && hasIPTV ? "IPTV" : "LAN") +
              indexArray[index]
            );
          }
        }

        return item.name + indexArray[index];
      });
    }
  },
  methods: {
    countRepeat(arr) {
      return arr.reduce((pre, next) => {
        let length = pre.length;
        // 和前一个不相等就新增
        if (length < 1 || next !== pre[length - 1].name) {
          pre.push({
            name: next,
            length: 1
          });
        } else {
          // 如果重复 就 ++
          pre[pre.length - 1].length++;
        }

        return pre;
      }, []);
    }
  }
};
</script>
<style lang="scss">
$border-color: #e8e9ec;
$item-width: 52px;
.port-status {
  white-space: nowrap;
  display: inline-block;
  text-align: center;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid $border-color;
  font-size: 12px;
  margin-bottom: 40px;

  &__title {
    color: #8b8c99;
  }

  &__icon {
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: #cbccd2;
    min-width: $item-width;
    &--active {
      color: #1db879;
    }
  }

  &__default-name {
    color: #8b8c99;
    &-flex {
      display: flex;
    }
  }
  &__line {
    flex: 1;
    height: 10px;
    border-bottom: 1px solid $border-color;
    position: relative;
    top: 0px;

    &--left {
      margin-left: $item-width * 0.5;
      margin-right: 8px;
      border-left: 1px solid $border-color;
    }

    &--right {
      margin-right: $item-width * 0.5;
      margin-left: 8px;
      border-right: 1px solid $border-color;
    }
  }

  &__name {
    position: relative;
    color: #676775;

    &__line {
      position: absolute;
      top: 16px;
      height: 16px;
      width: 1px;
      left: 0;
      right: 0;
      margin: auto;
      border-left: 1px solid $border-color;
    }

    &__text {
      position: absolute;
      top: 36px;
      left: 0;
      right: 0;
    }
  }
}
</style>
