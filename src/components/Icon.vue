<template>
  <svg class="icon" @click="$emit('click',$event)">
    <use :xlink:href="'#'+name" />
  </svg>
</template>

<script lang="ts">
// 引入单个 svg 对象
// import money from  '@assets/icon/money.svg';
//引入 svg 目录
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);

try{
  importAll(require.context('../assets/icon',true,/\.svg$/));
}catch(error){
  console.log(error)
}

export default {
  name: "Icon",
  props:['name'] //接受一个 name属性
};
</script>

<style lang="scss" scoped>
// iconfont 官网 抄回来的
.icon{
    width:1em;height:1em;
    vertical-align: -0.15em;
    // background:red;
    fill:currentColor;
    overflow: hidden;
}
</style>