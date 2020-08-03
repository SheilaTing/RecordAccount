<template>
  <div>
    <h1 class="header">{{name}}</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      name: ""
    };
  },
  created() {
    this.name = this.$route.name;
  }
};
</script>

<style lang="scss" scoped>
.header {
  text-align: center;
  padding: 10px;
  font-size: 25px;
  color:white;
}
</style>