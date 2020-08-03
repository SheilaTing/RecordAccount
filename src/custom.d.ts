//全局声明类型文件
//声明一个类型
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createAt: string | undefined; // json 不支持 date
  };

  type Tag={
    id: string;
    name: string;
}

type RootStateType = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
  