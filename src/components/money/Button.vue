<template>
    <!-- 将 button 改为组件后，点击 label页面的Butotn  发现没有执行相应的方法，因为
    我们点击的其实是Button 组件内部的 小 button，也就是这个button 为了解决这个问题，
    我们在这个button 接收到 点击事件后传递给父组件 Button ,执行即可 -->
      <button @click = "$emit('click',$event)" class="button">
          <slot></slot>
      </button>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';
    @Component
    export default class Button extends Vue {
        
    }
</script>

<style lang="scss" scoped>
  .button{
    background:#767676;
    color:white;
    border:none;
    border-radius:4px;
    padding:0 16px;
    height:40px;
    &-wrapper{
      text-align: center;
      margin-top:44-16px;
    }
  }
</style>