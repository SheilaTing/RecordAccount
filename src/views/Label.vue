<template>
   <Layout>
    <div class="labels">
      <!-- 如果在 main.ts中全局引入了这个 icon，就不用再挂载，引入了； -->
      <!-- 因为我们要跳转的是路由，所以使用 router-link -->
      <router-link 
      class="item"
      v-for="item in labels" :key="item.id"
      :to="`/labels/edit/${item.id}`"
      > {{item.name}} <Icon name="arrowR"/></router-link>
    </div>
    <div class="createLabel-wrapper">
      <Button @click = "createTag" class="createLabel">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang = "ts">
import Vue from 'vue';
import Icon from '@/components/Icon.vue';
import LabelModel from '@/models/labelModel';
import {Component,Prop, Mixins} from 'vue-property-decorator';
import Button from '@/components/money/Button.vue';
import store  from '@/store/index';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/tagHelper';

const labelResult = LabelModel.fetch(); //获取 localStorage 中 label数据

@Component({
  components: { Icon,Button},
  computed:{
    labels(){
      return this.$store.state.tagList
    }
  }
})
// 为了使用 mixins 需要继承 mixins 并指定要mix的代码所在的文件
export default class Label extends mixins(TagHelper) {
  //钩子函数，fetch，给
  beforeCreate(){
    this.$store.commit('fetchTags');
  }
  // 改为从 store中获取
    // labels = LabelModel.data;  // 执行 fetch 后获取
    //改为从 mixins 文件中调用，这样在执行 createTag时，就会去 tagHelper中找

  // createLabel(){
  //   const name = window.prompt('请输入标签名');
  //   if(!name){
  //     // name 不为空的情况下
  //     this.$store.commit('createTag',name)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.labels{
  margin:-1px;
  background:white;
  font-size:16px;
  padding-left:16px;
  > .item{
    min-height: 44px;
    display:flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #e6e6e6;
    margin-right: 5px;
    svg{
      color:#666;
      margin-right:16px;
      width:18px;
      height:18px;
    }
  }
}
.createLabel-wrapper{
  text-align:center;
  margin-top:20px;
}
</style>