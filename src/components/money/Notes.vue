<template>
  <div>
    <label class="notes">
      <span class="name">{{this.name}}</span>
      <!-- <input type="text" :value ="value" @input="onInput" placeholder="在这里输入备注"> -->
      <input type="text" :value ="value"
        @input = "onValueChange($event.target.value)"
       :placeholder="this.placeholder" />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component, Watch } from "vue-property-decorator";
@Component
export default class Notes extends Vue {
  //为了该组件在editlabel页面的复用，接收两个参数 title和 placeHolder
  @Prop() name!: string;
  @Prop() placeholder?: string; // ?代表有可能不存在
  @Prop() readonly value!: string; // 获取用户输入的信息赋值到此变量,js通过 document.queyr.... 获取
  // onInput(event:KeyboardEvent){
  //   const button = event.target as HTMLInputElement;
  //   // @input 事件，
  //   this.value += button.value;
  // }
  //当value变化时传递给父组件
  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: block; // label 默认是行内元素
  font-size: 14px;
  // background:#f5f5f5; // 给整个 label 加背景色
  padding-left: 16px;
  display: flex;
  align-items: center; // 文字和input 垂直居中
  .name {
    padding-right: 16px;
  }
  input {
    padding: 16px 0; //让 input 框的高度撑满整个label容器
    flex: 1; // 自动撑满剩余空间的宽度
    border: none;
    background: transparent;
  }
}
</style>