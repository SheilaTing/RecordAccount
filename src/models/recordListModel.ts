import clone from '@/lib/clone';
const localStorageKeyName = 'recordList';
const model = {
    data:[] as RecordItem[],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
        return this.data;
    },
    save(){
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data));
    },
    create(record: RecordItem){
        record.createAt = new Date().toISOString(); // 存入日期
        const newRecord = clone(record)
        this.data.push(newRecord);
        this.save();
    }
}

export default model;