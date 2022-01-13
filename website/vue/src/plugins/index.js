import util, { loading } from "./utils";
import _ from "lodash";
import axios from "./axios";
import components from "./components";
import requests from "./requests";
import elementMsg from "./elementMsg";
import "./vue-echarts"

import { Message, MessageBox, Notification } from "element-ui";
import moment from "moment";
import REGEXP from "@/assets/js/reg";

import "./directive";

function shortcut(vue, component) {
  const Constructor = vue.extend(component);
  const instance = new Constructor();
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);
  return instance;
}

util.resize(function() {
  document.documentElement.style.fontSize =
    document.documentElement.clientWidth / 10 + "px";
});

export default {
  install(Vue) {
    if (this.install.installed) return;
    this.install.installed = true;
    //
    // Vue.prototype.$msg = function (params) {
    //   const instance = shortcut(Vue, MsgBox)
    //   instance.init(params)
    //   return instance
    // }
    // Vue.prototype.$echartsInit = function () {
    //   return echartsConfig.init(this)
    // }
    //
    _.extend(Vue.prototype, {
      // $echarts: echarts,
      $loading: loading,
      $util: util,
      $axios: axios,
      $requests: { ...requests },
      $message: Message,
      $alert: MessageBox.alert,
      $confirm: MessageBox.confirm,
      $notify: Notification,
      $prompt: MessageBox.prompt,
      $moment: moment,
      $REGEXP: REGEXP,
    });

    for (let name in components) {
      Vue.component(name, components[name]);
    }
    Vue.use(elementMsg);
  },
};
