import createId from '@/lib/createId';
//label.vue 的model 数据
//由于在model中单独不好指定类型，然后就为整个 model创建一个 type
type LabelModel = {
    data: Label[];
    fetch: () => Label[];
    createLabel: (name: string) => 'success' | 'duplicated';  // success 成功，duplicated 重复。。。。。
    save: () => void;
    update: (id: string,name: string) => "success"| 'not Fund' | 'duplicated';
    remove: (id: string) => boolean;
}
type Label={
    id: string;
    name: string;
}

const localStorageKeyName = 'labelList';
const model: LabelModel = {
    // 自己维护数据，否则外部保存时，传参要传递整个列表，妙,为了删除时的数据有id，我们制定data的数据类型为Label 包含id。
    data:[], 
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    createLabel(value) {
        const id = createId().toString();
        const labels = this.data.map(item=>item.name);
        if (labels.indexOf(value) > -1) {
            return "duplicated";
        }
        this.data.push({id,name:value});  //保存时，将标签名当做 id
        this.save();
        return 'success';
    },
    // 更新
    update(id,name){
        const id_list = this.data.map(item =>item.id);
        const names = this.data.map(item =>item.name);
        const idIndex= id_list.indexOf(id);
        if(idIndex>-1){
            // 如果id 存在，找到id对应的name 修改为name 后 保存
            //先判断是否已经存在这样的name，如果出现，提示重复
            if(names.indexOf(name)>-1){
                return 'duplicated';
            }else{
                //找到这个 id 所属的对象
                const item = this.data[idIndex];
                // item.id = item.name = name; //保持 id 和 name 一致
                item.name = name;
                this.save();
                return 'success';
            }
        }else{
            return 'not Fund';
        }
    },
    //删除
    remove(id){
        let index =1;
        for(let i =0;i<this.data.length;i++){
            if(this.data[i].id === id){
                index =i;
                break;
            }
        }
        this.data.splice(index,1);
        this.save();
        return true;
    }
}

export default model;
