# ArkTS

## TypeScript 快速入门

### 基础类型

1. `boolean` : 布尔值 `true`/`false`
2. `number` : 数字，支持十进制、二进制、八进制、十六进制（全都是浮点数）
3. `string` : 字符串 `''`/`""`
4. `any` ：不确定类型，可以是任意类型

   ```ts
   let a: any = "jack";
   a = 21;
   ```

5. `union` ：联合类型，可以是多个指定类型中的一种

   ```ts
   let u: string | number | boolean = "rose";
   u = 18;
   ```

6. `[]` : 数组，如：`let list: number[] = [1, 2, 3]`

   ```ts
   let names: Array<string> = ["Jack", "Rose"];
   let ages: number[] = [21, 18];
   ```

7. 元组：元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。

   如：

   ```ts
   let x: [string, number];
   x = ["hello", 10]; // OK
   x = [10, "hello"]; // Error
   ```

8. 枚举：`enum` 类型是对 `JavaScript` 标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字。

   ```ts
   enum Color {
     Red,
     Green,
     Blue,
   }
   let c: Color = Color.Green;
   ```

9. 对象：

   ```ts
   let person = { name: "Bob", age: 18 };
   console.log(p.name);
   console.log(p["age"]);
   ```

### 条件控制

> `if`、`else if`、`else`、`switch`

#### if else

```ts
let num: number = 21;

if (num % 2 === 0) {
  console.log("偶数");
} else {
  console.log("奇数");
}

if (num > 0) {
  console.log("正数");
} else if (num < 0) {
  console.log("负数");
} else {
  console.log("零");
}
```

> [!TIP]
>
> 在 `TypeScript` 中，空字符串、数字0、`null`、`undefined` 都被认为是 `false`，其它值则为 `true`

#### switch

```ts
let num: number = 21;

switch (num) {
  case 0:
    console.log("零");
    break;
  case 1:
    console.log("一");
    break;
  default:
    console.log("其它");
}
```

### 循环迭代

TypeScript 支持 `for` 和 `while` 循环，并且为一些内置类型如 `Array` 等提供了快捷迭代语法。

#### for/while

```ts
// 普通for
for(let i = 1; i<=10；i++) {
    console.log('点赞' + i + '次')
}

// while
let i = 1
while(i <= 10) {
    console.log('点赞' + i + '次')
    i++
}
```

#### 迭代器

```ts
// 定义数组
let names: string[] = ["Jack", "Rose"];

// for in 迭代器，遍历得到数组角标
for (const i in names) {
  console.log(i + ":" + names[i]);
}

// for of 迭代器，直接得到元素
for (const name of names) {
  console.log(name);
}
```

### 函数

TypeScript 通常利用 `function` 关键字声明函数，并且支持可选参数、默认参数、箭头函数等特殊语法。

#### 无返函数

> void

```ts
// 无返回值函数，返回值 void 可以省略
function sayHi(name: string): void {
  console.log("你好，" + name + "！");
}
```

#### 有返函数

```ts
// 有返回值函数
function sum(x: number, y: number): number {
  return x + y;
}
```

#### 箭头函数

```ts
let sayHi = (name: string) => {
  console.log("你好，" + name + "！");
};
```

#### 可选参数

可选参数，在参数名后加 `?`，表示该参数是可选的

```ts
function sayHi(name?: string) {
  name = name ? name : "Unknow";
  console.log("你好，" + name + "！");
}

sayHello("Jack");
sayHello();
```

参数默认值，在参数后面赋值，表示参数默认值，如果调用者没有传参，则使用默认值。

```ts
function sayHi(name: string = "Unknow") {
  console.log("你好，" + name + "！");
}

sayHello("Jack");
sayHello();
```

### 类和接口

TypeScript 具备面向对象编程的基本语法，例如 `interface`、`class`、`enum` 等。也具备封装、月继承、多态等面向对象基本特征。

```ts
// 定义枚举
enum Msg{
    HI = 'Hi'
    HELLO = 'Hello'
}

// 定义接口，抽象方法接收枚举参数
interface A {
    say(msg: Msg): void
}

// 实现接口
class B implements A {
    say(msg: Msg): void {
        console.log(msg + ', I am B.')
    }
}

// 初始化对象
let a:A = new B()
// 调用方法，传递枚举参数
a.say(Msg.HI)
```

```ts
// 定义矩形类
class Rectangle {
  // 成员变量
  private width: number;
  private length: number;
  // 构造函数
  constructor(width: nunmber, length: number) {
    this.width = width;
    this.length = length;
  }
  // 成员方法
  public area(): nunmber {
    return this.width * this.length;
  }
}

// 定义正方形
class Square extends Rectangle {
  constructor(side: number) {
    // 调用父类构造
    super(side, side);
  }
}

let s = new Square(10);
consle.log("正方形面积为" + s.area());
```

### 模块开发

应用复杂时，我们可以把通用功能抽取到单独的 `ts` 文件中，每个文件都是一个模块（`module`）。

模块可以相互加载，提高代码复用性。

`rectangle.ts`：

```ts
// 定义矩形类，并通过 export 导出
class Rectangle {
  // 成员变量
  private width: number;
  private length: number;
  // 构造函数
  constructor(width: nunmber, length: number) {
    this.width = width;
    this.length = length;
  }
}

// 定义工具方法，求矩形面积，并通过 export 导出
export function area(rec: Rectangle): nunmber {
  return rec.width * rec.length;
}
```

`index.ts`：

```ts
// 通过 import 语法导入，from 后面写文件的地址
import {Rectangle, area} form '../rectangle'

// 创建 Retangle 对象
let r = new Rectangle(10, 20)

// 调用 area 方法
console.log('面积为：'+ area(r))
```
