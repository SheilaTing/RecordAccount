<template>
  <div id="app">
    <!-- // 頁面的入口 -->
    <div id="nav">
     
      <router-link to="/money">money</router-link> |
      <router-link to="/label">label</router-link>|
      <router-link to="/statistics">statistics</router-link>
    </div>
    <!-- router-view 就是指定渲染路由中指定路徑下顯示組件的地方 -->
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
