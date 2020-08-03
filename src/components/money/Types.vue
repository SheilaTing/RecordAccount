<template>
  <ul class="types">
    <!-- 两种写法 -->
    <!-- <li @click="selecteType('+')" :class="value =='+' && 'selected'">收入</li>
    <li @click="selecteType('-')" :class="value =='-' ? 'selected':''">支出</li>-->
   <!-- 使用 classPrefix 改造 一个控制样式，一个新增一个样式-->

    <li @click="selecteType('+')" :class="{[classPrefix+'-item']:classPrefix,selected:value==='+'}">收入</li>
    <li @click="selecteType('-')" :class="{[classPrefix+'-item']: classPrefix,selected:value==='-'}">支出</li>
  </ul>
</template>


// <script lang="ts">
// js 版本的 export vue对象    写法
//     export default {
//         pops:['x'],
//         name:'Types',
//         data(){
//           return {
//             type:'-'
//           }
//         },
//         methods:{
//           selectType(type){
//             this.type=type;
//           }
//         }
//     }
// typeScript 版本
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
// props 要写在外面 。。。。 这是 vue-component 官方文档写的
// @Component({
//   props:{
//     propMessage: String
//   }
// })

@Component
export default class Types extends Vue {
  // vue-property-decorator 中的使用方式
  @Prop(Number) propA: number | undefined; // 小括号中的类型是运行时检查用，：后的类型是编译时检查用
  //为了精确控制元素的样式，可以使用前缀的方式精确控制样式
 @Prop(String) classPrefix?: string; // ? 代表可能为空

  @Prop() value!: string; // 感叹号作用，不再检查该数据的初始值（讲真，ts太严格了）
  //不需要了，父组件会传递过来  type="-"; //相当于 data() 中的属性，ts-vue会自动加 data() 包裹
  selecteType(type: string) {
    // :strin  指定参数类型 ts 特有语法
    if (type !== "+" && type !== "-") {
      throw new Error("type is unknown");
    }
    this.$emit("update:value", type);
    //不需要了 this.type = type;
    //可以在这里使用$emit 触发事件 传递数据给父组件，但假如用户点了收入两次，那么
    //也会触发事件，浪费资源，所以我们可以使用 vue 的watch 只在数据发生变化时执行
  }

  //不需要了
  // @Watch('type')
  // onTypeChanged(value:string){
  //   this.$emit('update:value',value)
  // }
}
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  font-size: 24px;
  text-align: center;
  > li {
    width: 50%;
    height: 64px;
    display: flex; //让li 中的文字 垂直水平居中，文字在 li里面要给 li设置 flex
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: ""; // 使用 伪元素给 li 选这个呢状态加下划线
      display: block;
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 4px;
      background: #000;
    }
  }
}
</style>