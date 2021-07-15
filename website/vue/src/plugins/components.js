/* const context=require.content(需要搜索的目录,是否搜索子目录,匹配文件的正则表达式)
context.resolve()、context.keys()、context.id
*/
const files = require.context("../components", false, /\.vue$/);
const components = {};
files.keys().forEach((url) => {
  let urlKey = url.replace(/\.\/(.*)\.vue$/, "$1"); //文件名作为key
  let fileDefault = files(url).default; //export default 文件内容
  components[urlKey] = fileDefault;
});
export default components;
