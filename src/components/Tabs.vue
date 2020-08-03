<template>
  <ul class="tabs">
    <li
      v-for="item in dataSource"
      :key="item.id"
      @click="select(item)"
      :class="liClass(item)"
      class="tabs-item"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
type DataSourceItem = {
  value: string;
  text: string;
};

@Component
export default class Tabs extends Vue {
  //指明这个数组是一个对象数组，包含 text 和 value
  @Prop({ required: true, type: Array })
  dataSource!: DataSourceItem[];
  @Prop() value!: string;
  @Prop(String) classPrefix?: string;
  //封装 class
  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
      selected: this.value === item.value
    };
  }

  select(item: DataSourceItem) {
    //修改父组件的值
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  text-align: center;
  // > li {
  &-item {
    // 给 li 加一个固定的 class,这样 统计页面可以控制这个 class
    width: 50%;
    height: 64px;
    display: flex; //让li 中的文字 垂直水平居中，文字在 li里面要给 li设置 flex
    justify-content: center;
    align-items: center;
    position: relative;
    background: white;
    &.selected {
      //  background:#c4c4c4;
      $bg: rgb(207, 191, 140);
      background: darken($bg, 10%);
    }
    // &.selected::after {
    //   content: ""; // 使用 伪元素给 li 选这个呢状态加下划线
    //   display: block;
    //   position: absolute;
    //   bottom: 0px;
    //   width: 100%;
    //   height: 4px;
    //   background: #000;
    // }
  }
}
</style>