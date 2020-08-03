<template>
  <Layout>
    <div class="topTitle">收支明细</div>
    <!-- //收入支出选项卡 -->
    <Tabs :data-source="typesList" :value.sync="typeVal" class-prefix="types"></Tabs>
    <!-- 改造 types 使它可以接受多个参数     -->
    <!-- 不能直接写字面量 day，要提取成变量 -->
    <!-- 统计年月日选项卡 -->
    <!-- 从入门到放弃 2020 0707 最后给去掉了 -->
    <!-- <Tabs class-prefiex = "interval" :data-source="intervalList" :value.sync = "interval"></Tabs> -->
    <div></div>
    <!-- 改造成了数组 [{title:'',items:[]}] -->
    <div class="noData" v-if="!res">暂无数据</div>
    <ol v-if="res">
      <!-- 结果是 {{title:[]}} -->

      <li v-for="group in res" :key="group.title">
        <h3 class="title">
          {{group.title}}
          <span>￥{{group.total}}</span>
        </h3>
        <ol>
          <li class="record" v-for="item in group.items" :key="item.createAt">
            <span>{{tagString(item.tags)}}</span>
            <!-- li 使用了 flex布局，所以margin-right :auto,会占据右侧空间，向左考齐 -->
            <!-- <span :style="{marginRight:'auto'}">{{items.notes}}</span> -->
            <!-- 抽成class  -->
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
// import Types from '@/components/money/Types.vue';
import { Prop, Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/IntervalList.ts";
import typesList from "@/constants/Types";
import dayjs from "dayjs";
import clone from "@/lib/clone";

@Component({
  components: { Tabs }
})
export default class Statistics extends Vue {
  typeVal = "-";
  interval = "day";

  intervalList = intervalList;
  typesList = typesList;

  // 钩子函数
  created() {
    this.$store.commit("fetchRecords");
  }
  //将 tags 转换为字符串
  tagString(tags: Tag[]) {
    // tags.toString() tags.join(',')
    // if(tags.length>0){
    //       let res:string[] = [];
    //   tags.map(item=>res.push(item.name));
    //   return res.join(',');
    // }else{
    //   return "无";
    // }
    // .map 返回的是一个数组 啊啊啊
    return tags.length === 0 ? "无" : tags.map(item => item.name).join(",");
  }
  //获取 recordList
  get recordList() {
    return (this.$store.state as RootStateType).recordList;
  }
  //引入 dayjs 来处理日期

  // string 是一个 ISO 时间字符串
  beautify(value: string) {
    const day = dayjs(value);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      //如果是今年的日期就省略掉年份
      return day.format("M月D日");
    } else {
      return day.format("YYYY年MM月DD日");
    }
  }
  //计算属性
  //将数据源按照不同的条件拆分
  // get result(){
  //   // 啊啊啊啊，指定类型好麻烦啊啊啊啊啊！
  //   const {recordList} = this;
  //   type Items = RecordItem[];
  //   type HashTableValue = {title:string,items:Items};
  //   //指定 hashTable的类型 除了是一个对象，也可以是一个数组，hashTable 中的每个属性值都是一个 RecordItem的数组;
  //   // 给对象新增属性的方法可以直接. 也可以使用[],此处就是用中括号
  //   const hashTable:{[key:string]:HashTableValue}={};
  //   // const hashTable1:{[key:string]:RecordItem[]}={};
  //   for(let i =0;i<recordList.length;i++){
  //    const [date,time]= recordList[i].createAt!.split('T');
  //    //我们要构建一个以日期分割的数组
  //   //初始化 hashTable[date] 让它等于一个数组，一半写成，等于他自己或一个数组，表示如果
  //   // 他为空，则初始化为一个空数组，它们都这么写
  //   // 本来是一个数组，{[]} 后来发现少了 标题变为 {{title,[值]}}
  //   hashTable[date] = hashTable[date] || {title:date,items:[]};
  //   hashTable[date].items.push(recordList[i]);
  //   }
  //   return hashTable;
  // }

  // 改造 hashTable 成数组，方便排序，因为对象的 key是无序的
  get res() {
    const { recordList } = this;
    //判断 recordList 的长度，如果为空就直接return了，不用执行了
    if (recordList.length === 0) {
      return;
    }
    type HashTableValue = { titile: string; items: RecordItem[] }[];
    //对 recordlist按照创建时间倒序排列
    // 由于 sort会改变源数组，为了不影响，clone后 操作
    //这个过滤厉害了，只需要过滤出与当前 选中的标签的值相等的元素即可，厉害了
    const newList = clone(recordList)
      .filter(item => item.type === this.typeVal)
      .sort(
        (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
      );
    if (newList.length === 0) {
      return;
    }
    type Result = { title: string; total?: number; items: RecordItem[] }[]; // 定义一个类型,total 可以不存在
    // 终于，困扰我昨天的问题在今天有了答案，哈哈哈哈哈,来吧，写代码
    // 将recordList 中的数据按照日期进行分类 最终结果为 [{title:'a',items:[]},{},{}]
    // 如果 recordList 的长度不为0,那肯定有第一项，取出第一项的对象的 items的createAt date
    const resultArray: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        items: [newList[0]]
      }
    ];
    // 处理了 recordList 的第一项后，处理其他的
    for (let i = 1; i < newList.length; i++) {
      //当前遍历的对象
      const current = newList[i];
      // x的最后一项
      const last = resultArray[resultArray.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        //判断当前遍历的对象的日期与 resultArray 中最后一项的日期是否是同一天，如果是就放进去
        last.items.push(newList[i]);
      } else {
        //不是同一天，new 一个新对象,push 到 resultArray 中，成为最后一项
        resultArray.push({
          title: dayjs(newList[i].createAt).format("YYYY-MM-DD"),
          items: [current]
        });
      }
    }
    //计算支出或者收入的总和(其实这属于后端的计算，现在做本地的就自己做喽)
    resultArray.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return resultArray;
  }
}
</script>

<style scoped lang="scss">
// 控制 tab的样式
::v-deep .types-tabs-item {
  $bg: rgb(207, 191, 140);

  background: white;
  &.selected {
    //  background:#c4c4c4;
    background: darken($bg, 10%);
  }
  &.selected::after {
    display: none;
  }
}
::v-deep .interval-tabs-item {
  height: 48x;
}

//控制列表的样式
%item {
  padding: 0 16px;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.title {
  @extend %item;
  font-size: 18px;
  font-weight: 550;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
.noData {
  font-size: 20px;
  color: #ccc;
  text-align: center;
  padding: 15px;
}
.topTitle {
  padding: 5px;
  color: darkcyan;
  text-align: center;
  font-size: 20px;
}
</style>