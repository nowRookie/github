/* const context=require.content() 参数：@params需要搜索的目录 @params是否搜索子目录 @params匹配文件的正则表达式
context.resolve()、context.keys()、context.id
*/
const files = require.context("../packages", true, /\.vue$/);
const components = {};
files.keys().forEach((url) => {
  let fileName = url.replace(/.*\/(.*)\.vue$/, "$1"); //文件名作为key
  let fileDefault = files(url).default; //export default 文件内容
  components[fileName] = fileDefault;
});

const install = (Vue) => {
  for (let name in components) {
    Vue.component(name, components[name]);
  }
};
export default install;
