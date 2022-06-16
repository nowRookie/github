/* const context=require.content() 参数：@params需要搜索的目录 @params是否搜索子目录 @params匹配文件的正则表达式
context.resolve()、context.keys()、context.id
*/
import '@/assets/less/index.less'

const VueFiles = require.context('../packages', true, /\.vue$/)
const JsFiles = require.context('../packages', true, /\.comp\.js$/)

const content = {}
const components = {}

VueFiles.keys().forEach((url) => {
  const vueFile = url.replace(/.*\/(.*)\.vue$/, '$1') // 文件名作为key
  const vueFileDefault = VueFiles(url).default // export default 的文件内容
  content[vueFile] = vueFileDefault
})

JsFiles.keys().forEach((url) => {
  const jsFile = url.replace(/.*\/(.*)\.comp\.js$/, '$1') // 文件名作为key
  const jsFileDefault = JsFiles(url).default // export default 的文件内容
  components[jsFile] = jsFileDefault
})

const install = (Vue) => {
  for (const name in content) {
    Vue.component(name, content[name])
  }
}
export default install
export { content, components }
