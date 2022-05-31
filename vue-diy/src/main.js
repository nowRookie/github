import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";

Vue.use(ElementUI);

import VueDiy from "../lib/vue-diy.common";
// import VueDiy from "./components/index";
Vue.use(VueDiy);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
