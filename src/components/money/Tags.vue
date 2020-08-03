<template>
       <div class="tags">
         <ul class="current">
           <!-- for循环遍历 -->
         <li v-for='tag in tagList' :key="tag.id"
          @click="toggle(tag)"
          :class = '{selected:selectedTags.indexOf(tag)>=0}'
          >{{tag.name}}</li>
         </ul>
         <div class="new">
           <button @click="createTag">新增标签</button>
         </div>
       </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Prop,Component} from 'vue-property-decorator';
import TagHelper from '../../mixins/tagHelper';
import {mixins} from 'vue-class-component';
@Component({
  // computed:{
  //   //从store中获取，但要在执行完fetchdata后
  //   tagList(){
  //     return this.$store.state.tagList;
  //   }
  // }
})
export default class Tags extends mixins(TagHelper){
  // @Prop(Array)
  // 不用了，从store中获取
  //dataSource :string[] | undefined; // 之所以不给空数组作为原始值，是因为这个数据是外部传递过来的，给外部数据赋值不太合理
  // tags:string[]=[];
     //默认原始的数组,也就是服务器获得的用户之前的数据
//，所以应该是传递到该组件来的
//使用 computed
get  tagList(){
      return this.$store.state.tagList;
    }
//钩子函数
created(){
  // 执行 store中的 fetch,为taglist赋值
  this.$store.commit('fetchTags');
}

  selectedTags: string []=[]; // 用户选中的tags
  //用户点击tag选中事件，将选中的tag放入到selectedTags 中
  toggle(tag: string){
    //如果这个 tag已经被选中，再次点击取消选中
    const index = this.selectedTags.indexOf(tag);
    if(index >-1){
      //删除
      this.selectedTags.splice(index,1);
    }else{
      this.selectedTags.push(tag);
    }
    // 将数据传递给父组件
    this.$emit('update:value',this.selectedTags);
  }

  // createNewTag(){
  //   const name = window.prompt('请输入标签名');
  //   if(!name){
  //     // name 不为空的情况下
  //     this.$store.commit('createTag',name)
  //   }
  // }
}
</script> 

<style lang="scss" scoped>
.tags{
    font-size:14px;
    padding:16px;
    flex:1;  // 父容器 content 为 flex
    display:flex;
    flex-direction: column;
    > .current{
      flex:1;  //父容器 tags 为 flex;
      display:flex;
      flex-wrap: wrap;
      align-items: flex-end;
      > li{
        $bg:#d9d9d9;
        $h: 24px;
        height:$h;
        background:$bg;
        border-radius:$h/2;  // 或者这样写(24px/2)
        padding:0 16px;
        margin-right:22px;
        display:flex;
        justify-content: center;
        align-items: center;
        &.selected{
          background:darken($bg,50%);
          color:white;
        }
      }
    }
    > .new{
      padding-top:16px;
      button{
        background:transparent;
        border:none;
        border-bottom:1px solid;
        color:#999;
        padding: 0 4px;
        color:black;
      }
    }
}
</style>