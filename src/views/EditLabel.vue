<template>
  <!-- 使用 layout 包裹后，页面底部会有导航菜单  之前封装的，现在都忘记了。。。。。。 -->
  <Layout>
    <div class="navBar">
      <Icon name="arrowL" class="leftIcon" @click="goback"></Icon>
      <span class="title">编辑标签</span>
    </div>
    <div class="wrapper">
      <Notes name="标签名" placeholder="请输入标签名" class="notes" :value="tag.name" @update:value="updateLabel" />
      <div class="button-wrapper">
        <Button @click="remove" class="test">删除标签</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import LabelModel from "@/models/labelModel";
import Icon from "@/components/Icon.vue";
import Notes from "@/components/money/Notes.vue";
import Button from "@/components/money/Button.vue";

@Component({
  components: { Icon, Notes,Button },
  //在 script中无法访问，所以弃用，使用 getter setter
  // computed:{
  //   //当前tag
  //   tag(){
  //     return this.$store.state.currentTag
  //   }
  // }
})
export default class EditLabel extends Vue {
  //改为从 computed 取，这里就不用写了
  // tag?: { id: string; name: string }; //问号代表可以为空
  //钩子函数
  // 因为在这里不能访问到 computed中的变量，所以查阅 vue-class-component，这样写
  get tag(){
    return this.$store.state.currentTag
  }
  created() {
    //$route 获取路由信息
    // const id = this.$route.params.id;
    // 获取所有的标签
    // LabelModel.fetch();
    // const labels = LabelModel.data;
    // 找到 labels 中 id = id 的标签对象
    // const item = labels.filter(item => item.id === id)[0];
    //进入组件先获取数据，因为虽说是外部会传入数据到编辑列表，但是，如果用户
    //单独刷新这个页面的话，就没有了数据源
    //(我们是根据地址栏中的 id 来筛选这个数据源里的数据，显示在页面的)，就会报错
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag',this.$route.params.id);
    if (!this.tag) {
     // this.$router.push('/404');
      this.$router.replace("/404");
    } 
  }
  //当notes 中的input 改变时会触发 @update:value，然后执行这个方法
  // 传递来的参数是 $emit 的第二个参数
  updateLabel(value: string) {
    //调用model的修改方法
    if (this.tag) {
      // LabelModel.update(this.tag.id, value);
      //调用 store 中的修改
      this.$store.commit('updateTag',{id:this.tag.id,name:value})
    }
  }
  //删除
  remove() {
    // 调用 store 里的删除
    if (this.tag) {
      // if (LabelModel.remove(this.tag.id)) {
      //   this.$router.back();
      // } else {
      //   window.alert("删除失败");
      // }
      this.$store.commit('remove',this.tag.id);
    }
  }
  goback() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:-15px;
   background:rgb(207, 191, 140);
  > .title {
    flex: 1;
    text-align: center;
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
  }
}
::v-deep .wrapper {
  background:rgb(207, 191, 140);
  margin-top: 8px;
}
.button-wrapper{
 text-align: center;
}
.notes{
  background:white;
  margin:10px 0;
}

</style>
