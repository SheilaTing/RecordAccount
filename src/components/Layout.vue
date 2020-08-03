<template>
    <div class="wrapper">
      <Header/>
      <div class="content" :class="classPrefix && `${classPrefix}-content` ">
      <!-- vue 插槽 将内容插入到该模板中 -->
      <slot></slot>
      </div>
      <Nav />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
export default {
  props:['classPrefix'],
  name: "Layout",
   components:{Header}
};
</script>

<style lang="scss" scoped>
.wrapper {
 border:1px solid #ccc;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  overflow: auto;
  flex: 1;
  margin:4px;
}
</style>