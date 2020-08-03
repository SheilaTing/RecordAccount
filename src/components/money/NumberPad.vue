<template>
  <div class="numberPad">
    <div class="outPut">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">ok</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
// 实现功能为 点击数字键盘将数字显示到 outPut中,
// 为每一个 button 绑定输入方法，将输入内容绑定到output中
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
@Component
export default class NumberPad extends Vue {
  @Prop() readonly value!: number; // 感叹号作用，不再检查该数据的初始值（讲真，ts太严格了）
  output: string = this.value.toString() // 输出框默认为0
  inputContent(event: MouseEvent) {
    //为了避免很多非空判断，强制将类型转换为 button
   const button = event.target as HTMLButtonElement;
   //逻辑判断,不能存在多个小数点
   const text = button.textContent as string;
   if(this.output.length===16){
     return;
   }
   if(this.output==='0'){
     // 感叹号为了避免非空判断，强制指定它不为空 或者写成 as string 
   if('0123456789'.indexOf(text!)>-1){
     //如果是0-9之间数字，替换
      this.output = text;
     }else{
       this.output += text; //小数点的情况
     }
     return;
    }
   if(this.output.indexOf('.')>-1 && text==='.'){
    return;
   }
   this.output+= text;
  }

  remove(){
    // 删除；  截取0到最后一位 slice(起始标记，结束标记（不包括）-1代表最后一个，-2代表倒数第二个)
    if(this.output.length ===1){
      this.output = '0';
    }else{
      this.output = this.output.slice(0,-1);
    }
  }
  clear(){
    this.output = '0';
  }
  ok(){
    // 用户点击确定时，传递数据给父组件
    this.$emit('update:value',this.output);
    //用户点击 ok的同时，把整个组件的数据存入 localStorage中 做持久化
    this.$emit('submit',this.output); // 父组件中监听该 submit事件，做存储操作；
    //清空 output
    this.output = '0';
  }
}


</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .outPut {
    @extend %innerShadow;
    text-align: right;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%;
      height: 64px; // 根据设计稿来的尺寸，也可以计算一下该元素在整个设计稿中的尺寸（占据设计稿的百分比）设置 vw 和 vh
      float: left;
      background: transparent;
      border: none;

      &.ok {
        float: right;
        height: 64px * 2;
      }
      &.zero {
        width: 25% * 2;
      }
      // $bg: #f2f2f2;
      $bg: rgb(207, 191, 140);

      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>