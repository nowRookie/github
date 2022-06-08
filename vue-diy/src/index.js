import Vue from "vue";
import App from "./index.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import VueDiy from "../packages/index"

Vue.use(ElementUI);
Vue.use(VueDiy);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
