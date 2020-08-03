import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex); // 在加载数据时，将$store 挂载到 vue.prototype上，这样我们就可以全局使用$store 了



const localStorageKeyName = 'recordList';
const tagsKeyName = 'labelList';
const store =  new Vuex.Store({
  state: {
    recordList:[] as RecordItem[],
    tagList:[] as Tag[] ,// 在 .d.ts中声明了，ts语法
    currentTag: undefined
  } as RootStateType, // 指定类型
  mutations: {
    fetchRecords(state){
     state.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    },
      //同步数据加载
      createRecord(state,record: RecordItem) {
        record.createAt = new Date().toISOString(); // 存入日期
        const newRecord = clone(record)
        state.recordList.push(newRecord);
        store.commit('save');  //显式声明一下 store,才能调用
        window.alert('记录成功！')
        record={ tags: [], notes: "", type: "-", amount: 0,createAt:undefined }
      },
      save(state){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(state.recordList));
    },
    // label,tag 相关 api
    fetchTags(state){
       state.tagList = JSON.parse(window.localStorage.getItem(tagsKeyName) || '[]');
    },
    createTag(state,newTag: string){
       const id = createId().toString();
        const names = state.tagList.map(item=>item.name);
        if (names.indexOf(newTag) > -1) {
           window.alert('标签名重复了')
        }
        state.tagList.push({id,name:newTag});  //保存时，将标签名当做 id
        store.commit('saveTag');
        window.alert('添加成功');
    },
    saveTag(state){
      window.localStorage.setItem(tagsKeyName, JSON.stringify(state.tagList));
    },
    //editLabel.vue
    setCurrentTag(state,id: string){
     state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    //只能接收两个参数，所以把第二个参数改造成一个对象
    updateTag(state,object: {id: string;name: string}){
      const {id,name} = object;
      const id_list = state.tagList.map(item =>item.id);
      const names = state.tagList.map(item =>item.name);
      const idIndex= id_list.indexOf(id);
      if(idIndex>-1){
          // 如果id 存在，找到id对应的name 修改为name 后 保存
          //先判断是否已经存在这样的name，如果出现，提示重复
          if(names.indexOf(name)>-1){
             window.alert('标签名已经存在')
          }else{
              //找到这个 id 所属的对象
              const item = state.tagList[idIndex];
              // item.id = item.name = name; //保持 id 和 name 一致
              item.name = name;
              store.commit('saveTag');
          }
      }
    },
    remove(state,id){
      let index =1;
      for(let i =0;i<state.tagList.length;i++){
          if(state.tagList[i].id === id){
              index =i;
              break;
          }
      }
      if(index>-1){
        state.tagList.splice(index,1);
        store.commit('saveTag');
        //$router 是在 Vue.prototype上的，所以可以全局使用,
        //但还是报错了，哈哈哈，此时引入这个 router 文件即可;
        router.back();
        window.alert('删除成功');
      }else{
        window.alert('删除失败!')
      }

    
  }
  },
  actions: {
  },
  modules: {
  }
})

export default store;
