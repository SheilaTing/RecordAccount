<template>
  <Layout class-prefix="layout">
    <!-- vue 中带上冒号就意味着这个变量是动态的值 -->
    <!-- <Tags :data-source.sync="tags" @update:value="onUpdateTags" /> -->
    <!-- 现在每个组件的只都是从 store中取，无需父组件再传值过去了 -->
    <Tags :value.sync = 'record.tags'/>
    <div class="notesWrapper">
      <Notes @update:value="onUpdateNotes"  :value="record.notes"  name="备注" placeholder="请输入备注"/>
    </div>
    <!-- <Types @update:value="onUpdateType" :value="record.type" /> -->
    <!-- 改成 Tabs  传递默认值，以及数据源-->
    
    <Tabs :value.sync = record.type :data-source="typeList" />
    <NumberPad :value="record.amount" @update:value="onUpdateAmount" @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
import Tags from "@/components/money/Tags.vue";
import Notes from "@/components/money/Notes.vue";
import Types from "@/components/money/Types.vue";
import NumberPad from "@/components/money/NumberPad.vue";
import recordListModel from '@/models/recordListModel';
import LabelModel from '@/models/labelModel';
import clone from '@/lib/clone';
import store  from '@/store/index';
import Tabs from '@/components/Tabs.vue';
import typesList from '@/constants/Types';

// export default {
//   name: "money",
//   components:{Tags,Notes,Types,NumberPad},
//   // 可以在此处单独将组件引入，挂载使用，也可以在main.ts 文件总入口中统一引入，这样所有组件都可以使用，无需再次引入
//   data(){
//     return {
//       tags:['衣','食','住','行']
//     }
//   }
// };

// ts 写法
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

// const recordResult = recordListModel.fetch(); 变为从store中获取
// const recordList = store.state.recordList;
// const labelResult = LabelModel.fetch();


@Component({
  components: { Tags, Notes, Tabs, NumberPad },
  // computed:{
  //   recordList(){
  //     //获取初始值，前提是在 created 钩子中先调用 fetch 赋值
  //     return this.$store.state.recordList;
  //   }
  // }
})
export default class Money extends Vue {
  //获取 Tab 的数据源
   typeList = typesList;

created(){
  //调用 mutation 中的方法，使用 commit
  this.$store.commit('fetchRecords');
}

  // tags = ["衣", "食", "住", "行"];
  // tags = labelResult;
// 用来持久化的 record数组 ,最终做持久化（存入数据库或者 localstorage,）,这个值最开始应该从storage中读取，
//因为用户之前的记录应该被保留下来；
//由于之前存入 localStorage 数据就是数组，只不过存入后当做字符串了， 现在使用 parse转换为对象，自然也是数组
  // recordList:RecordItem[] = recordList; // 放入了 computed 中
  //收集各个组件传递来的值,也就是我们持久化的一个对象
  record: RecordItem = { tags: [], notes: "", type: "-", amount: 0,createAt:'' }; // 指定类型和初始值

  // 这个我不简化成 .sync了
  //解释下，父组件先传递type的值，子组件接收后只管使用，当用户切换type时,把新的 type，传递给父组件，
  //父组件监听子组件的函数，拿到这个新值，然后保存到 record 中，这种情况下，可以简写成 .sync的形式
  //哎，越简写，越迷糊，还是一步步流程清清楚楚的写好吧
  onUpdateType(type: string) {
    this.record.type = type;
  }
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateTags(value: []) {
    this.record.tags = value;
  }

 //不用传递来的值，我们有，那为什么不直接在它传递值的时候，持久化呢?，我觉得是可以的呀
 // 拆分功能，还是有必要的，不污染别的功能，单一的方法只做一件事情;
  saveRecord(){
    //因为每次我们会改变这个record对象中的数据，每次它都会把之前的数据ye改掉
    // 引用传值，所以我们每次存储之前，new 一个新对象;
    // this.record.createAt = new Date(); // 存入日期
    // const newRecord = JSON.parse(JSON.stringify(this.record));
    // this.recordList.push(newRecord);
    // recordListModel.save();
    //以上操作已封装到 model 中
    // recordListModel.create(this.record);  使用commit 调用 store 里的方法
    this.$store.commit('createRecord',this.record);
    this.record.notes = ''; // 清空备注
  }
}
</script>

<style>
/* 虽然我觉得没必要传值过去，再回来写，而是直接写全局的样式，
但你这么讲我就姑且这样写吧，应该还是有它的应用场景的 */
/* 控制 content的样式 */
.layout-content {
  display: flex;
  flex-direction: column;
}
.notesWrapper{
  padding:12px 0;
}
</style>

<style lang="scss" scoped>

</style>