<template>
  <nav>
    <router-link class="item" active-class="selected" to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    
  <router-link class="item" active-class="selected" to="/label">
     <Icon name="mark"/>
    标签</router-link>

    <router-link class="item" active-class="selected" to="/statistics">
     <Icon name="statistics"/>
    统计</router-link>
  </nav>
</template>

<script lang="ts">
// import x from '@/assets/icon/money.svg';
// console.log("x------"+x)

import Icon from '@/components/Icon.vue';
export default {
  name: "Nav",
  components:{Icon}
};
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
nav{
  @extend %outerShadow;
  display:flex;
  border:1px solid #ccc;
  padding:5px;
  justify-content:space-around; // 或者单独设置每一个 item 的宽度像下面一样
  
  >.item{
    // width:33.333333%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color:rgb(87,96,105);
     .icon{
       width:30px;
       height:30px;
     }
  }
  .item.selected{
    color:rgb(35, 31, 32);
  }
}
</style>