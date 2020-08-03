const path = require('path');

// 参见 vue-cli 文档，发现 config 就是 webpack 的 config
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/deploy-record-account/'
    : '/',
  lintOnSave: false,
  chainWebpack:config =>{
    //配置 处理 svg 的 loader,将 svg xml 文档转换为 symbol 对象，方便使用
    //当前svg 图片的绝对路径
    const dir = path.resolve(__dirname,'src/assets/icon')
    config.module
    .rule('svg-sprite')
    .test(/\.svg$/)
    .include.add(dir).end()  //指定文件夹下的 svg 使用下面的 loader
    .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract:false}).end()
    // .use('svgo-loader').loader('svgo-loader') 我先不安装了，内存不行了
    // .tap(options=>({...options,plugins:[{removeAttrs:{attrs:'fill'}}]})).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'),[{plainSprite:true}])
    config.module.rule('svg').exclude.add(dir) //  其他的 svg loader 排除掉这个目录，防止dir 下的svg 既走了我们定义的 loader 又走了其他定义的loader;
  }
}
