// function clone(data:any){
//     return JSON.parse(JSON.stringify(data))
// }

// 为 clone 指定返回值类型
function clone<T>(data: T): T{
    return JSON.parse(JSON.stringify(data))
}


export default clone;