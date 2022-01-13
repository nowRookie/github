import Vue from "vue";
import { treeToLinearArray } from "./utils";
Vue.directive("permission", {
  bind: function (el, binding, vnode) {
    let permissionList = sessionStorage.getItem("backend_permission")
      ? JSON.parse(sessionStorage.getItem("backend_permission"))
      : [];
    let linear = treeToLinearArray({ id: -1, children: [...permissionList] });
    let nameList = linear
      .filter((unit) => unit.id != -1)
      .map((unit) => unit.menuCode);
    let value = binding.value;
    if (nameList.indexOf(value) == -1) {
      el.style.display = "none";
    }
  },
});
