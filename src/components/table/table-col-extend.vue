<template>
  <v-table-col v-bind="$attrs" v-on="$listeners">
    <template v-if="isCustom" v-slot="slotProps">
      <div v-if="transformSpeed">
        <i
          v-if="arrow"
          class="margin-right--8"
          :class="arrow == 'up' ? 'v-icon-sort-up' : 'v-icon-sort-down'"
        ></i>
        <span
          >{{ formatSpeed(slotProps[$attrs.prop], transformSpeed)
          }}<i v-if="unit">/s</i></span
        >
      </div>
      <div v-else-if="transformTime">
        <span>{{
          formatSeconds(
            slotProps[$attrs.prop],
            transformTime.toLocaleLowerCase() === "s"
          )
        }}</span>
      </div>
      <div
        v-else-if="transformStatus"
        :style="{
          color: transformStatus[slotProps[$attrs.prop]]?.color
        }"
      >
        <i v-if="dot" class="dot margin-right--8"></i>
        <span>{{
          transformStatus[slotProps[$attrs.prop]]?.text ||
          slotProps[$attrs.prop]
        }}</span>
      </div>
      <div v-else>
        {{ slotProps[$attrs.prop] }}
      </div>
    </template>
  </v-table-col>
</template>
<script>
import { formatSpeed, formatSeconds } from "../utils/utils";
export default {
  props: {
    transformSpeed: {
      type: String,
      default: ""
    },
    arrow: {
      type: String,
      default: ""
    },
    unit: {
      type: Boolean,
      default: false
    },
    transformTime: {
      type: [Boolean, String],
      default: false
    },
    transformStatus: {
      type: Object
    },
    dot: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isCustom() {
      return this.transformSpeed || this.transformTime || this.transformStatus;
    }
  },
  methods: {
    formatSpeed,
    formatSeconds
  }
};
</script>
<style lang="scss" scoped>
.dot {
  display: inline-block;
  width: 4px;
  height: 4px;
  border: 2px solid;
  vertical-align: middle;
  border-radius: 4px;
}
.margin-right--8 {
  margin-right: 8px;
}
</style>
