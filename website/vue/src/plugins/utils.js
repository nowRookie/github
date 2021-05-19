import axios from "axios";
import _ from "lodash";
import { Loading } from "element-ui";

import moment from "moment";

const api = process.env.VUE_APP_API_URL;

export default {
  resize(fn) {
    fn();
    window.addEventListener("resize", fn, false);
  },
  firstUpperCase(str) {
    return str.replace(str.substr(0, 1), str.substr(0, 1).toUpperCase());
  },
  dynamicPX(px) {
    return (
      (px / 192) *
      parseFloat(
        getComputedStyle(document.getElementsByTagName("html")[0]).fontSize
      )
    );
  },
  requestAnimationFrame(callback) {
    return (
      window.requestAnimationFrame(callback) ||
      window.mozRequestAnimationFrame(callback) ||
      window.webkitRequestAnimationFrame(callback) ||
      window.msRequestAnimationFrame(callback) ||
      function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() {
          callback((lastTime = nextTime));
        }, nextTime - now);
      }.bind(this)(callback)
    );
  },
  dateFormat(date, format) {
    format = format || "yyyy-MM-dd";
    date = typeof date == "string" ? new Date(date) : date;
    const formats = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S+": date.getMilliseconds(),
    };
    if (/(y+)/i.test(format))
      format = format.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in formats) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? formats[k]
            : ("00" + formats[k]).substr(("" + formats[k]).length)
        );
      }
    }
    return format;
  },
  downloadBlob,
  upload,
  treeToLinearArray,
};

let isLoading;
export function loading(boolean) {
  boolean
    ? (isLoading = Loading.service({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        // background: 'rgba(0, 0, 0, 0.7)'
      }))
    : isLoading
    ? isLoading.close()
    : null;
}

// 下载二进制文件
export function downloadBlob({
  name,
  ieName,
  url,
  method,
  data,
  params,
  type,
} = {}) {
  const options =
    method === "get"
      ? getOptions({
          method: "get",
          url,
          responseType: "blob",
          params,
        })
      : getOptions({
          method: "post",
          url,
          responseType: "blob",
          data,
        });
  return new Promise((resolve, reject) => {
    axios(options)
      .then((res) => {
        //这里res.data是返回的blob对象,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        var blob = new Blob([res.data], {
          type:
            type ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        });
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        if (navigator.msSaveBlob) {
          navigator.msSaveBlob(blob, name || ieName);
        } else {
          downloadElement.download = ieName || name; //下载后文件名
        }
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// xhr下载blob文件：url请求路径、params参数、name文件名、type文件类型(.xlsx等)
export function downloadBlobXhr({ url, params, name, type }) {
  return new Promise((resolve, reject) => {
    var requstUrl = url + "?";
    for (var key in params) {
      requstUrl += `${key}=${params[key]}&`;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("post", requstUrl, true);
    xhr.setRequestHeader("token", window.sessionStorage.getItem("token"));
    xhr.responseType = "blob";
    xhr.onload = function() {
      try {
        var blob = this.response;
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, name);
        } else {
          var downloadElement = document.createElement("a");
          downloadElement.href = window.URL.createObjectURL(blob);
          document.body.appendChild(downloadElement);
          downloadElement.download = name + type;
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(downloadElement.href);
          resolve();
        }
        callback && callback();
      } catch (err) {
        console.log("下载文件错误:", err);
        reject(err);
      }
    };
    xhr.send(null);
  });
}

// 手动上传文件，data必须为[File]数组
export function upload({ url, data, params, name, headers }) {
  return new Promise((resolve, reject) => {
    let fileData = new FormData();
    _.map(data, (unit) => {
      fileData.append(name || "files", unit);
    });
    _.map(params, (value, key) => {
      fileData.append(key, value);
    });
    axios({
      url: url ? api + url : api + "/fileUpload/carriersBusinessLicense",
      method: "post",
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
      data: fileData,
    })
      .then((res) => {
        resolve({
          success: true,
          error: false,
          message: "请求成功",
          res: res,
          data: res.data.data,
        });
      })
      .catch((err) => {
        reject({ success: false, error: true, message: "请求错误" });
      });
  });
}

// 判断是否为对象
export function isObject(value) {
  return value === Object(value);
}

// 类型判断(可以细致区分date、array等等)
export function typeOf(value) {
  let str = Object.prototype.toString.call(value);
  return str.match(/\[object (.*?)\]/)[1].toLowerCase();
}

// 获取axios请求配置
export function getOptions(options) {
  return {
    ...options,
    url: api + options.url,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/Json; charset=UTF-8",
      "X-Authorization": "Bearer" + sessionStorage.getItem("token"),
    },
  };
}

export function formatDate({ value, format }) {
  let formater = format || "YYYY-MM-DD";
  return moment(value).format(formater);
}

// 获取样式
export function getStyle(element, attr) {
  if (getComputedStyle) {
    return getComputedStyle(element, null)[attr];
  }
  return element.currentStyle[attr] || element.style[attr];
}

// 随机数范围
export function randomScope(start, end) {
  return start + Math.random() * (end - start);
}

// 范围以外随机数：boundary边界距离
export function outerScope(start, end, boundary) {
  boundary = boundary || 100;
  return Math.random() < 0.5
    ? Math.random() * randomScope(start - boundary, start)
    : randomScope(end, end + boundary);
}

// 随机颜色
export function randomColor() {
  return (
    "#" +
    Math.random()
      .toString(16)
      .substr(2, 6)
      .toUpperCase()
  );
}

// 防抖 dom.addEventListenter("click",debounce(handle,delay))
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

// 节流 dom.addEventListenter("click",throttle(handle,delay))
export function throttle(fn, delay) {
  let prev = Date.now();
  return function() {
    let now = Date.now();
    if (now - prev > delay) {
      fn && fn.apply(this, arguments);
      prev = Date.now();
    }
  };
}

// 一维数组转树形结构[{id:1},{parentId:1,id:2},{parentId:1,id:3}]
export function linearArrayToTree(list, topId) {
  let arr = [];
  _.forEach(list, (unit) => {
    unit.children = [];
  });
  _.forEach(list, (unit) => {
    if (!unit.parentId || unit.parentId == topId) {
      arr.push(unit);
    } else {
      // 找到父级的index
      let index = _.findIndex(list, (item) => {
        return item.id == unit.parentId;
      });
      list[index].children.push(unit);
    }
  });
  return arr;
}

// 树形结构转一维数组{id:1,children:[{id:2,parentId:1}]}
export function treeToLinearArray(obj) {
  let result = [];
  result.push(obj);
  if (obj.children && obj.children.length) {
    (function deep(arr) {
      _.forEach(arr, (unit) => {
        result.push(unit);
        if (unit.children && unit.children.length) {
          deep(unit.children);
        }
      });
    })(obj.children);
  }
  return result;
}

// 格式化json，参数必须为json，不能是字符串
/* 需要配合设置css样式
pre { word-break: break-all;}
.string {color: green;}
.number {color: darkorange;}
.boolean {color: blue;}
.null {color: magenta;}
.key {color: red;}
 */
export function formatJson(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
  let result = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function(match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
  return `<div class="jsonText"><pre>${result}</pre></div>`;
}

// 优化onresize事件
(function() {
  var throttle = function(type, name, obj) {
    obj = obj || window;
    var running = false;
    var func = function() {
      if (running) {
        return;
      }
      running = true;
      requestAnimationFrame(function() {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };
    obj.addEventListener(type, func);
  };
  throttle("resize", "optimizedResize");
})();

function getTranslate(node, sty) {
  //获取transform值
  var translates = document.defaultView
    .getComputedStyle(node, null)
    .transform.substring(7);
  var result = translates.match(/\(([^)]*)\)/); // 正则()内容
  var matrix = result ? result[1].split(",") : translates.split(",");
  if (sty == "x" || sty == undefined) {
    return matrix.length > 6 ? parseFloat(matrix[12]) : parseFloat(matrix[4]);
  } else if (sty == "y") {
    return matrix.length > 6 ? parseFloat(matrix[13]) : parseFloat(matrix[5]);
  } else if (sty == "z") {
    return matrix.length > 6 ? parseFloat(matrix[14]) : 0;
  } else if (sty == "rotate") {
    return matrix.length > 6
      ? getRotate([
          parseFloat(matrix[0]),
          parseFloat(matrix[1]),
          parseFloat(matrix[4]),
          parseFloat(matrix[5]),
        ])
      : getRotate(matrix);
  }
}
function getRotate(matrix) {
  var aa = Math.round((180 * Math.asin(matrix[0])) / Math.PI);
  var bb = Math.round((180 * Math.acos(matrix[1])) / Math.PI);
  var cc = Math.round((180 * Math.asin(matrix[2])) / Math.PI);
  var dd = Math.round((180 * Math.acos(matrix[3])) / Math.PI);
  var deg = 0;
  if (aa == bb || -aa == bb) {
    deg = dd;
  } else if (-aa + bb == 180) {
    deg = 180 + cc;
  } else if (aa + bb == 180) {
    deg = 360 - cc || 360 - dd;
  }
  return deg >= 360 ? 0 : deg;
}
