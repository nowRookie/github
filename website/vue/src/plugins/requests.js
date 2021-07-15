const files = require.context("../requests", false, /\.js$/); //参数1：目录，参数2：是否搜索子目录，参数3：匹配文件的正则表达式
const requests = {};
files.keys().forEach((url) => {
  let urlKey = url.replace(/\.\/(.*)\.js$/, "$1"); //文件名作为key
  let fileDefault = files(url).default; //export default 文件内容
  requests[urlKey] = fileDefault;
});
export default requests;
