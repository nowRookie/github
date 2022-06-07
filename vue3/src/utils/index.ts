// 数组去重
export const filterRepeat = ({ arr = [], key }) => {
  return arr;
};

/* ******************** 基础类型 ******************** */

const b: { name: string } = { name: "5" };

const a: ReadonlyArray<object> = [
  { title: "姓名", key: "name" },
  { title: "性别", key: "gender" },
  function () {},
];

const createSquare = (config: SquareFace): { area: number } => {
  return { area: 0 };
};

createSquare({ width: 10, courlor: "red" });

/* ******************** 接口 ******************** */

interface SquareFace {
  color?: string;
  width?: number;
  [propName: string]: any; //索引签名
}

// 构造器签名
interface ConstructorFace {
  new (arr: object[], key: string);
}

// 调用签名
interface UIElementEventFace {
  addEventListener(eventType: string, callback: (e: Event) => void): void;
}

// 类：实现接口(只会校验实例部分)
class createNode implements UIElementEventFace {
  constructor(readonly tagName: string, protected options?: object) {
    // 静态部分
    this.options = options;
  }
  addEventListener(callback) {
    callback && callback(this.tagName);
  }
}
const div = new createNode("div", {
  class: "container",
  style: { color: "red", width: "100px", height: "50px" },
  children: [new createNode("span")],
});
console.log("创建元素div=", div);

// 混合类型
interface MixtureFace {
  checked: string[];
  init(options: object): object;
  reset(): void;
}

/* ******************** 类 ******************** */
// 基类
abstract class AbstractClass {
  private alias: "abstract-class";
  readonly options: object;
}

class Parent extends AbstractClass {
  pedigree: []; //血统、族谱
  firstName: "parent";
  secondName: "ParentName";
  getFamily() {}
}

class Son extends Parent {
  pedigree: []; //血统、族谱
  secondName: "sonName";
  getFamily() {}
  sickHistory() {}
}

const parent = new Parent();
const son = new Son();

console.log(
  "类：",
  Object.keys(son),
  Object.getOwnPropertyNames(son),
  Reflect.ownKeys(son)
);

/* ******************** 泛型 ******************** */

// 泛型：<T>泛型类型：表示类型变量
function echo<T>(arg: T): T {
  return arg;
}

// 使用 调用签名(对象字面量) 定义泛型函数
let execute: { <T>(arg: T): T } = echo;

// 泛型接口
// 1、(其实就是对象字面量)
interface echoFace1 {
  <T>(arg: T): T;
}
// 2、将类型参数作用在接口上
interface echoFace2<T> {
  (arg: T): T;
}

// 泛型类
class counter<T> {
  initial: T;
  add: (prev: T, next: T) => T;
}

// 泛型约束
function echo2<T extends { length: number }>(arg: T) {
  return arg.length;
}
echo2([1, 2, 3, 4, 5, 6]);

// 在泛型约束中使用类型参数
function getProperty<ObjType, KeyType extends keyof ObjType>(
  obj: ObjType,
  key: KeyType
) {
  return obj[key];
}

console.log("泛型约束：", getProperty({ name: "zhang", age: 14 }, "name"));

/* ******************** 兼容性处理(感觉是介绍了ts里面一些机制导致的结果) ******************** */

// 赋值时，ts做了函数参数的比较
let fewParamsFun = (name) => {};
let muchParamsFun = (name, age) => {};
muchParamsFun = fewParamsFun;
//  赋值时，ts做了函数返回值的比较
let fewParamsResultFun = () => ({ name: "" });
let muchParamsResultFun = () => ({ name: "", age: 17 });
muchParamsResultFun = fewParamsResultFun;

/* ******************** 高级类型 ******************** */

// 交叉类型(将多个类型合并为一个类型，它包含了所需的所有类型的属性)
function tsExtend<S, T>(source: S, target: T) {
  let result = <S & T>{};
  for (let key in source) {
    (<any>result)[key] = source[key];
  }
  for (let key in target) {
    if (!result.hasOwnProperty(key)) {
      (<any>result)[key] = target[key];
    }
  }
  return result;
}
console.log(
  "交叉类型：",
  tsExtend({ name: "zhang", age: 15 }, { age: 22, color: "red" })
);

// 联合类型
// 1、联合类型表示一个值可以是几种类型之一
function setWidth(width: number | string) {
  if (typeof width === "number") {
    return width + "px";
  } else {
    return width;
  }
}
console.log("联合类型：", setWidth(12));
// 2、如果一个值是联合类型，只能访问此联合类型的所有类型里共有的成员
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  return <any>{};
}

let pet = getSmallPet();
pet.layEggs && pet.layEggs(); // okay
pet.swim && pet.swim(); // errors

// 类型保护与区分类型
// 1、用户自定义的(使用is谓语)
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
// 2、typeof、instanceof类型保护
function indicator(val) {
  if (typeof val === "number") {
    return val;
  } else if (val instanceof Array) {
    return val[0];
  } else {
    return parseInt(val);
  }
}

// 手动去除null(添加!后缀，目前没有发现有啥用)
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + ". the " + epithet; // error, 'name' is possibly null
  }
  name = name || "Bob";
  return postfix("great");
}
console.log("手动去除null", broken(null));

// 类型别名
type StringTypeAlias1 = string;
type StringTypeAlias2 = () => string;
type StringTypeAlias3 = StringTypeAlias1 | StringTypeAlias2;
type Container<T> = { value: T };//类型别名也可以是泛型
type TreeType<T> = {
  root: T;
  left: TreeType<T>;
};
