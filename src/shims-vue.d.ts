declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

// 处理 js 中引用 svg 报红线的问题
declare module '*.svg' {
  const content: string;
  export default content;
}
