<template>
  <div id="app">
    <!-- // 頁面的入口 -->
    <div id="nav">
     
    </div>
    <!-- router-view 就是指定渲染路由中指定路徑下顯示組件的地方 -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app{
  max-width:500px;
  margin:0 auto;
}
@import '~@/assets/style/reset.scss';
body{
  font-size:16px;
  color:#333;
  line-height: 1.5;
  font-family: -apple-system, "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Source Han Sans CN", "Source Han Sans SC", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  // background:white
  // background:darksalmon
  // background:#f3956f;
  background:rgb(207, 191, 140);
}
.qrcode{
  position:fixed;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);
  display:flex;
  flex-direction: column;
  font-size:20px;
  text-align: center;
  color:brown;
}
</style>
