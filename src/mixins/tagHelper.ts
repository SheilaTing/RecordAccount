
// 该 mixin 作用是抽离出，label.vue 页面和 tags.vue 页面中 新建标签使用同一个方法的问题，为了避免写两次
// 官网 vue class component 有对使用 mixin 的说明文档
//调用该类中的方法，组件需要继承 mixins 而非 vue;
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class TagHelper extends Vue  {
    createTag(){
        const name = window.prompt('请输入标签名');
        console.log(name)
        if(name){
          // name 不为空的情况下
          this.$store.commit('createTag',name)
        }
      }
}