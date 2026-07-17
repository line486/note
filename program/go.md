# Go 语言

> - [Go 语言编程](https://golang.org/doc/)

## 主要特征

1. 自动立即回收。
2. 更丰富的内置类型。
3. 函数多返回值。
4. 错误处理。
5. 匿名函数和闭包。
6. 类型和接口。
7. 并发编程。
8. 反射。
9. 语言交互性。

## 语言命名

### 命名规则

> 函数、变量、常量、自定义类型、包`(package)`的命名方式

1. 首字符可以是任意的Unicode字符或者下划线
2. 剩余字符可以是Unicode字符、下划线、数字
3. 字符长度不限

### 25个关键字

```go
	break        default      func         interface    select
    case         defer        go           map          struct
    chan         else         goto         package      switch
    const        fallthrough  if           range        type
    continue     for          import       return       var
```

### 37个保留字

```go
    Constants:    true  false  iota  nil

    Types:    int  int8  int16  int32  int64
              uint  uint8  uint16  uint32  uint64  uintptr
              float32  float64  complex128  complex64
              bool  byte  rune  string  error

    Functions:   make  len  cap  new  append  copy  close  delete
                 complex  real  imag
                 panic  recover
```

### 可见性

1. 声明在函数内部，是函数的本地值，类似 `private`；
2. 声明在函数外部，是对当前包可见(包内所有 `.go` 文件都可见)的全局值，类似 `protect`；
3. 声明在函数外部且首字母大写是所有包可见的全局值，类似 `public`；

## 语言声明

> 四种主要声明方式

| 关键字  | 作用     |
| ------- | -------- |
| `var`   | 声明变量 |
| `const` | 声明常量 |
| `type`  | 声明类型 |
| `func`  | 声明函数 |

## 内置类型

### 值类型

```go
    bool
    int(32 or 64), int8, int16, int32, int64
    uint(32 or 64), uint8(byte), uint16, uint32, uint64
    float32, float64
    string
    complex64, complex128
    array   // 固定长度的数组
```

### 引用类型

> 指针类型

| 关键字  | 作用             |
| ------- | ---------------- |
| `slice` | 序列数组(最常用) |
| `map`   | 映射             |
| `chan`  | 管道             |

## 内置函数

Go 语言拥有一些不需要进行导入操作就可以使用的内置函数。它们有时可以针对不同的类型进行操作，例如：`len`、`cap` 和 `append`，或必须用于系统级的操作，例如：`panic`。因此，它们需要直接获得编译器的支持。

| 函数               | 作用                                                                             |
| ------------------ | -------------------------------------------------------------------------------- |
| `append`           | 用来追加元素到数组、`slice中`，返回修改后的数组、`slice`                         |
| `close`            | 主要用来关闭 `channel`                                                           |
| `delete`           | 从 `map` 中删除 `key` 对应的 `value`                                             |
| `panic`            | 停止常规的 `goroutine`（`panic` 和 `recover`：用来做错误处理）                   |
| `recover`          | 允许程序定义 `goroutine` 的 `panic` 动作                                         |
| `imag`             | 返回 `complex` 的实部（`complex`、`real imag`：用于创建和操作复数）              |
| `real`             | 返回 `complex` 的虚部                                                            |
| `make`             | 用来分配内存，返回 `Type` 本身(只能应用于 `slice`，`map`， `channel`)            |
| `new`              | 用来分配内存，主要用来分配值类型，比如 `int`、`struct`。返回指向 `Type` 的指针。 |
| `cap`              | `capacity` 是容量的意思，用于返回某个类型的最大容量（只能用于切片和 `map`）      |
| `copy`             | 用于复制和连接 `slice`，返回复制的数目                                           |
| `len`              | 来求长度，比如 `string`、`array`、`slice`、`map`、`channel`，返回长度            |
| `print`、`println` | 底层打印函数，在部署环境中建议使用 `fmt` 包                                      |

## 内置接口 error

```go
type error interface {  //只要实现了Error()函数，返回值为String的都实现了err接口
    Error()    String
}
```

## Init 函数和 main 函数

### init 函数

> go 语言中 `init` 函数用于包`(package)`的初始化，该函数是 go 语言的一个重要特性。

1. `init` 函数是用于程序执行前做包的初始化的函数，比如初始化包里的变量等
2. 每个包可以拥有多个 `init` 函数
3. 包的每个源文件也可以拥有多个 `init` 函数
4. 同一个包中多个 `init` 函数的执行顺序 `go` 语言没有明确的定义(说明)
5. 不同包的 `init` 函数按照包导入的依赖关系决定该初始化函数的执行顺序
6. `init` 函数不能被其他函数调用，而是在 `main` 函数执行之前，自动被调用

### main 函数

Go 语言程序的默认入口函数(主函数)：`func main()`

> 函数体用｛｝一对括号包裹。

```go
func main(){
    //函数体
}
```

### 异同

1. 相同点：
   两个函数在定义时不能有任何的参数和返回值，且 Go 程序自动调用。
2. 不同点：
   `init` 可以应用于任意包中，且可以重复定义多个。
   `main` 函数只能用于 `main` 包中，且只能定义一个。

### 执行顺序

1. 对同一个 go 文件的 `init()` 调用顺序是从上到下的。

2. 对同一个 `package` 中不同文件是按文件名字符串比较“从小到大”顺序调用各文件中的 `init()` 函数。

3. 对于不同的 `package`，如果不相互依赖的话，按照 `main` 包中，先 `import` 的后调用"的顺序调用其包中的 `init()`，如果 `package` 存在依赖，则先调用最早被依赖的 `package` 中的 `init()`，最后调用 `main` 函数。

> [!WARNING]
>
> 如果 `init` 函数中使用了 `println()` 或者 `print()` 你会发现在执行过程中这两个不会按照你想象中的顺序执行。这两个函数官方只推荐在测试环境中使用，对于正式环境不要使用。

## 命令

| 命令           | 操作                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| `go env`       | 用于打印Go语言的环境信息。                                                                             |
| `go run`       | 编译并运行命令源码文件。                                                                               |
| `go get`       | 根据要求和实际情况从互联网上下载或更新指定的代码包及其依赖包，并对它们进行编译和安装。                 |
| `go build`     | 用于编译我们指定的源码文件或代码包以及它们的依赖包。                                                   |
| `go install`   | 用于编译并安装指定的代码包及它们的依赖包。                                                             |
| `go clean`     | 删除掉执行其它命令时产生的一些文件和目录。                                                             |
| `go doc`       | 打印附于Go语言程序实体上的文档。我们可以通过把程序实体的标识符作为该命令的参数来达到查看其文档的目的。 |
| `go test`      | 用于对Go语言编写的程序进行测试。                                                                       |
| `go list`      | 列出指定的代码包的信息。                                                                               |
| `go fix`       | 把指定代码包的所有Go语言源码文件中的旧版本代码修正为新版本的代码。                                     |
| `go vet`       | 用于检查Go语言源码中静态错误的简单工具。                                                               |
| `go tool prof` | 来交互式的访问概要文件的内容。                                                                         |

## 运算符

### 算数运算符

| 运算符 | 描述 |
| ------ | ---- |
| `+`    | 相加 |
| `-`    | 相减 |
| `*`    | 相乘 |
| `/`    | 相除 |
| `%`    | 求余 |

> [!WARNING]
>
> `++`（自增）和 `--`（自减）在Go语言中是单独的语句，并不是运算符。

### 关系运算符

| 运算符 | 描述                                                           |
| ------ | -------------------------------------------------------------- |
| `==`   | 检查两个值是否相等，如果相等返回 True 否则返回 False。         |
| `!=`   | 检查两个值是否不相等，如果不相等返回 True 否则返回 False。     |
| `>`    | 检查左边值是否大于右边值，如果是返回 True 否则返回 False。     |
| `>=`   | 检查左边值是否大于等于右边值，如果是返回 True 否则返回 False。 |
| `<`    | 检查左边值是否小于右边值，如果是返回 True 否则返回 False。     |
| `<=`   | 检查左边值是否小于等于右边值，如果是返回 True 否则返回 False。 |

### 逻辑运算符

| 运算符 | 描述                                                                    |
| ------ | ----------------------------------------------------------------------- |
| `&&`   | 逻辑 AND 运算符。 如果两边的操作数都是 True，则为 True，否则为 False。  |
| `ll`   | 逻辑 OR 运算符。 如果两边的操作数有一个 True，则为 True，否则为 False。 |
| `!`    | 逻辑 NOT 运算符。 如果条件为 True，则为 False，否则为 True。            |

### 位运算符

运算符对整数在内存中的二进制位进行操作。

| 运算符 | 描述                                                                                     |
| ------ | ---------------------------------------------------------------------------------------- |
| `&`    | 参与运算的两数各对应的二进位相与。（两位均为1才为1）                                     |
| `l`    | 参与运算的两数各对应的二进位相或。（两位有一个为1就为1）                                 |
| `^`    | 参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为1。（两位不一样则为1） |
| `<<`   | 左移n位就是乘以2的n次方。“a<<b”是把a的各二进位全部左移b位，高位丢弃，低位补0。           |
| `>>`   | 右移n位就是除以2的n次方。“a>>b”是把a的各二进位全部右移b位。                              |

### 赋值运算符

| 运算符 | 描述                                           |
| ------ | ---------------------------------------------- |
| `=`    | 简单的赋值运算符，将一个表达式的值赋给一个左值 |
| `+=`   | 相加后再赋值                                   |
| `-=`   | 相减后再赋值                                   |
| `*=`   | 相乘后再赋值                                   |
| `/=`   | 相除后再赋值                                   |
| `%=`   | 求余后再赋值                                   |
| `<<=`  | 左移后赋值                                     |
| `>>=`  | 右移后赋值                                     |
| `&=`   | 按位与后赋值                                   |
| `l=`   | 按位或后赋值                                   |
| `^=`   | 按位异或后赋值                                 |

## 下划线

“\_” 是特殊标识符，用来忽略结果。

### 在 import 中

`import` 下划线（如：`import  _ "hello/imp"`）的作用：当导入一个包时，该包下的文件里所有 `init()` 函数都会被执行，然而，有些时候我们并不需要把整个包都导入进来，仅仅是是希望它执行 `init()` 函数而已。这个时候就可以使用 `import _` 引用该包。即使用【`import` \_ 包路径】只是引用该包，仅仅是为了调用 `init()` 函数，所以无法通过包名来调用包中的其他函数。

示例：

`main.go`：

```go
package main

import _ "./hello"

func main() {
    // hello.Print()
    //编译报错：./main.go:6:5: undefined: hello
}
```

`hello.go`：

```go
package hello

import "fmt"

func init() {
    fmt.Println("imp-init() come here.")
}

func Print() {
    fmt.Println("Hello!")
}
```

输出结果：

```txt
imp-init() come here.
```

### 在代码中

```go
package main

import (
    "os"
)

func main() {
    buf := make([]byte, 1024)
    f, _ := os.Open("/Users/Desktop/text.txt")
    defer f.Close()
    for {
        n, _ := f.Read(buf)
        if n == 0 {
            break

        }
        os.Stdout.Write(buf[:n])
    }
}
```

#### 作用一

下划线意思是忽略这个变量，比如 `os.Open`，返回值为 `*os.File`，`error`，普通写法是`f, err := os.Open("xxxxxxx")`，如果此时不需要知道返回的错误值，就可以用`f,  _ := os.Open("xxxxxx")`，如此则忽略了 `error` 变量。

#### 作用二

占位符，意思是那个位置本应赋给某个值，但是咱们不需要这个值。
所以就把该值赋给下划线，意思是丢掉不要。
这样编译器可以更好的优化，任何类型的单个值都可以丢给下划线。
这种情况是占位用的，方法返回两个结果，而你只想要一个结果。
那另一个就用 `_` 占位，而如果用变量的话，不使用，编译器是会报错的。

## 变量

### 变量声明

> Go 语言中的每一个变量都有自己的类型，并且变量必须经过声明才能开始使用。

#### 标准声明

Go 语言的变量声明格式为：

```go
var 变量名 变量类型
```

变量声明以关键字`var`开头，变量类型放在变量的后面，行尾无需分号。 举个例子：

```go
var name string
var age int
var isOk bool
```

#### 批量声明

每声明一个变量就需要写 `var` 关键字会比较繁琐， Go 语言中还支持批量变量声明：

```go
var (
    a string
    b int
    c bool
    d float32
)
```

### 变量的初始化

Go语言在声明变量的时候，会自动对变量对应的内存区域进行初始化操作。每个变量会被初始化成其类型的默认值，例如：整型和浮点型变量的默认值为 `0`。 字符串变量的默认值为空字符串。 布尔型变量默认为 `false`。 切片、函数、指针变量的默认为 `nil`。

当然我们也可在声明变量的时候为其指定初始值。变量初始化的标准格式如下：

```go
var 变量名 类型 = 表达式
```

举个例子：

```go
var name string = "pprof.cn"
var sex int = 1
```

或者一次初始化多个变量

```go
var name, sex = "pprof.cn", 1
```

#### 类型推导

有时候我们会将变量的类型省略，这个时候编译器会根据等号右边的值来推导变量的类型完成初始化。

```go
var name = "pprof.cn"
var sex = 1
```

#### 短变量声明

在函数内部，可以使用更简略的 `:=` 方式声明并初始化变量。

```go
package main

import (
    "fmt"
)
// 全局变量m
var m = 100

func main() {
    n := 10
    m := 200 // 此处声明局部变量m
    fmt.Println(m, n)
}
```

#### 匿名变量

在使用多重赋值时，如果想要忽略某个值，可以使用`匿名变量（anonymous variable）`。 匿名变量用一个下划线\_表示，例如：

```go
func foo() (int, string) {
    return 10, "Q1mi"
}
func main() {
    x, _ := foo()
    _, y := foo()
    fmt.Println("x=", x)
    fmt.Println("y=", y)
}
```

匿名变量不占用命名空间，不会分配内存，所以匿名变量之间不存在重复声明。 (在Lua等编程语言里，匿名变量也被叫做哑元变量。)

> [!WARNING]
>
> 1. 函数外的每个语句都必须以关键字开始（`var`、`const`、`func` 等）
> 2. `:=` 不能使用在函数外。
> 3. `_` 多用于占位，表示忽略值。

## 常量

相对于变量，常量是恒定不变的值，多用于定义程序运行期间不会改变的那些值。 常量的声明和变量声明非常类似，只是把 `var` 换成了`const`，常量在定义的时候必须赋值。

```go
const pi = 3.1415
const e = 2.7182
```

多个常量也可以一起声明：

```go
const (
    pi = 3.1415
    e = 2.7182
)
```

`const`同时声明多个常量时，如果省略了值则表示和上面一行的值相同。 例如：

```go
const (
    n1 = 100
    n2
    n3
)
```

上面示例中，常量 `n1、n2、n3` 的值都是 `100`。

## iota

`iota `是 `go` 语言的常量计数器，只能在常量的表达式中使用。 `iota` 在 `const` 关键字出现时将被重置为 `0`。`const` 中每新增一行常量声明将使 `iota` 计数一次(`iota`可理解为 `const` 语句块中的行索引)。 使用 `iota` 能简化定义，在定义枚举时很有用。

举个例子：

```go
const (
    n1 = iota //0
    n2        //1
    n3        //2
    n4        //3
)
```

示例：

使用 `_` 跳过某些值

```go
const (
    n1 = iota //0
    n2        //1
    _
    n4        //3
)
```

`iota` 声明中间插队

```go
const (
    n1 = iota //0
    n2 = 100  //100
    n3 = iota //2
    n4        //3
)
const n5 = iota //0
```

定义数量级 （这里的 `<<` 表示左移操作，`1<<10` 表示将 `1` 的二进制表示向左移 `10` 位，也就是由 `1` 变成了 `10000000000`，也就是十进制的 `1024`。同理 `2<<2` 表示将 `2` 的二进制表示向左移 `2` 位，也就是由 `10` 变成了 `1000`，也就是十进制的`8`。）

```go
const (
    _  = iota
    KB = 1 << (10 * iota)
    MB = 1 << (10 * iota)
    GB = 1 << (10 * iota)
    TB = 1 << (10 * iota)
    PB = 1 << (10 * iota)
)
```

多个 `iota` 定义在一行

```go
const (
    a, b = iota + 1, iota + 2 //1,2
    c, d                      //2,3
    e, f                      //3,4
)
```

## 基本类型

Golang 更明确的数字类型命名，支持 Unicode，支持常用数据结构。

| 类型          | 长度(字节) | 默认值 | 说明                                      |
| ------------- | ---------- | ------ | ----------------------------------------- |
| bool          | 1          | false  |                                           |
| byte          | 1          | 0      | uint8                                     |
| rune          | 4          | 0      | Unicode Code Point, int32                 |
| int, uint     | 4或8       | 0      | 32 或 64 位                               |
| int8, uint8   | 1          | 0      | -128 ~ 127, 0 ~ 255，byte是uint8 的别名   |
| int16, uint16 | 2          | 0      | -32768 ~ 32767, 0 ~ 65535                 |
| int32, uint32 | 4          | 0      | -21亿~ 21亿, 0 ~ 42亿，rune是int32 的别名 |
| int64, uint64 | 8          | 0      |                                           |
| float32       | 4          | 0.0    |                                           |
| float64       | 8          | 0.0    |                                           |
| complex64     | 8          |        |                                           |
| complex128    | 16         |        |                                           |
| uintptr       | 4或8       |        | 以存储指针的 uint32 或 uint64 整数        |
| array         |            |        | 值类型                                    |
| struct        |            |        | 值类型                                    |
| string        |            | ""     | UTF-8 字符串                              |
| slice         |            | nil    | 引用类型                                  |
| map           |            | nil    | 引用类型                                  |
| channel       |            | nil    | 引用类型                                  |
| interface     |            | nil    | 接口                                      |
| function      |            | nil    | 函数                                      |

支持八进制、 六进制，以及科学记数法。标准库 math 定义了各数字类型取值范围。

```go
a, b, c, d := 071, 0x1F, 1e9, math.MinInt16
```

空指针值 `nil`，而非C/C++ `NULL`。

### 整型

整型分为以下两个大类： 按长度分为：`int8`、`int16`、`int32`、`int64`对应的无符号整型：`uint8`、`uint16`、`uint32`、`uint64`

其中，`uint8`就是我们熟知的`byte`型，`int16`对应C语言中的`short`型，`int64`对应C语言中的`long`型。

### 浮点型

Go语言支持两种浮点型数：`float32` 和 `float64` 。这两种浮点型数据格式遵循 `IEEE 754` 标准： `float32` 的浮点数的最大范围约为`3.4e38 `，可以使用常量定义：`math.MaxFloat32`。 `float64` 的浮点数的最大范围约为 `1.8e308`，可以使用一个常量定义：`math.MaxFloat64`。

### 复数

> `complex64` 和 `complex128`

复数有实部和虚部，`complex64`的实部和虚部为32位，`complex128`的实部和虚部为64位。

### 布尔值

Go语言中以`bool`类型进行声明布尔型数据，布尔型数据只有`true`和`false`两个值。

> [!WARNING]
>
> 1. 布尔类型变量的默认值为 `false`。
> 2. Go 语言中不允许将整型强制转换为布尔型。
> 3. 布尔型无法参与数值运算，也无法与其他类型进行转换。

### 字符串

Go语言中的字符串以原生数据类型出现，使用字符串就像使用其他原生数据类型（`int`、`bool`、`float32`、`float64` 等）一样。 Go 语言里的字符串的内部实现使用 `UTF-8` 编码。 字符串的值为双引号(")中的内容，可以在Go语言的源码中直接添加非`ASCII`码字符，例如：

```go
s1 := "hello"
s2 := "你好"
```

### 字符串转义符

Go 语言的字符串常见转义符包含回车、换行、单双引号、制表符等，如下表所示。

| 转义 | 含义                               |
| ---- | ---------------------------------- |
| \r   | 回车符（返回行首）                 |
| \n   | 换行符（直接跳到下一行的同列位置） |
| \t   | 制表符                             |
| \'   | 单引号                             |
| \"   | 双引号                             |
| \    | 反斜杠                             |

举个例子，我们要打印一个 Windows 平台下的一个文件路径：

```go
package main
import (
    "fmt"
)
func main() {
    fmt.Println("str := \"c:\\pprof\\main.exe\"")
}
```

### 多行字符串

Go语言中要定义一个多行字符串时，就必须使用`反引号`字符：

```go
s1 := `第一行
第二行
第三行
`
fmt.Println(s1)
```

反引号间换行将被作为字符串中的换行，但是所有的转义字符均无效，文本将会原样输出。

### 字符串的常用操作

| 方法                                     | 介绍           |
| ---------------------------------------- | -------------- |
| `en(str)`                                | 求长度         |
| `+` 或 `fmt.Sprintf`                     | 拼接字符串     |
| `strings.Split`                          | 分割           |
| `strings.Contains`                       | 判断是否包含   |
| `strings.HasPrefix`，`strings.HasSuffix` | 前缀/后缀判断  |
| `strings.Index()`，`strings.LastIndex()` | 子串出现的位置 |
| `strings.Join(a[]string, sep string)`    | join操作       |

### byte和rune类型

组成每个字符串的元素叫做“字符”，可以通过遍历或者单个获取字符串元素获得字符。 字符用单引号 `’` 包裹起来，如：

```go
var a := '中'
var b := 'x'
```

Go 语言的字符有以下两种：

1. `uint8` 类型，或者叫 `byte` 型，代表了 `ASCII` 码的一个字符。

2. `rune` 类型，代表一个 `UTF-8` 字符。

当需要处理中文、日文或者其他复合字符时，则需要用到 `rune` 类型。`rune` 类型实际是一个 `int32`。 Go 使用了特殊的 `rune` 类型来处理 `Unicode`，让基于 `Unicode` 的文本处理更为方便，也可以使用 `byte` 型进行默认字符串处理，性能和扩展性都有照顾

```go
// 遍历字符串
func traversalString() {
    s := "pprof.cn博客"
    for i := 0; i < len(s); i++ { //byte
        fmt.Printf("%v(%c) ", s[i], s[i])
    }
    fmt.Println()
    for _, r := range s { //rune
        fmt.Printf("%v(%c) ", r, r)
    }
    fmt.Println()
}
```

输出：

```txt
112(p) 112(p) 114(r) 111(o) 102(f) 46(.) 99(c) 110(n) 229(å) 141() 154() 229(å) 174(®) 162(¢)
112(p) 112(p) 114(r) 111(o) 102(f) 46(.) 99(c) 110(n) 21338(博) 23458(客)
```

因为UTF8编码下一个中文汉字由`3~4`个字节组成，所以我们不能简单的按照字节去遍历一个包含中文的字符串，否则就会出现上面输出中第一行的结果。

字符串底层是一个 `byte` 数组，所以可以和 `[]byte` 类型相互转换。字符串是不能修改的 字符串是由 `byte` 字节组成，所以字符串的长度是 `byte` 字节的长度。 `rune` 类型用来表示 `utf8` 字符，一个 `rune` 字符由一个或多个 `byte` 组成。

### 修改字符串

要修改字符串，需要先将其转换成 `[]rune` 或 `[]byte`，完成后再转换为 `string`。无论哪种转换，都会重新分配内存，并复制字节数组。

```go
func changeString() {
    s1 := "hello"
    // 强制类型转换
    byteS1 := []byte(s1)
    byteS1[0] = 'H'
    fmt.Println(string(byteS1))

    s2 := "博客"
    runeS2 := []rune(s2)
    runeS2[0] = '狗'
    fmt.Println(string(runeS2))
}
```

### 类型转换

Go语言中只有强制类型转换，没有隐式类型转换。该语法只能在两个类型之间支持相互转换的时候使用。

强制类型转换的基本语法如下：

```go
T(表达式)
```

其中，`T` 表示要转换的类型。表达式包括变量、复杂算子和函数返回值等.

比如计算直角三角形的斜边长时使用 `math` 包的 `Sqrt()` 函数，该函数接收的是 `float64` 类型的参数，而变量 `a` 和 `b` 都是 `int` 类型的，这个时候就需要将 `a` 和 `b` 强制类型转换为 `float64` 类型。

```go
func sqrtDemo() {
    var a, b = 3, 4
    var c int
    // math.Sqrt()接收的参数是float64类型，需要强制转换
    c = int(math.Sqrt(float64(a*a + b*b)))
    fmt.Println(c)
}
```

## 数组

Golang Array 和以往认知的数组有很大不同：

1. 数组：是同一种数据类型的固定长度的序列。

2. 数组定义：`var a [len]int`，比如：`var a [5]int`，数组长度必须是常量，且是类型的组成部分。一旦定义，长度不能变。

3. 长度是数组类型的一部分，因此，`var a[5] int` 和 `var a[10]int` 是不同的类型。

4. 数组可以通过下标进行访问，下标是从0开始，最后一个元素下标是：`len-1`

   ```go
   for i := 0; i < len(a); i++ {
   }
   for index, v := range a {
   }
   ```

5. 访问越界，如果下标在数组合法范围之外，则触发访问越界，会 `panic`。
6. 数组是值类型，赋值和传参会复制整个数组，而不是指针。因此改变副本的值，不会改变本身的值。
7. 支持 `==`、`!=` 操作符，因为内存总是被初始化过的。
8. 指针数组 `[n]*T`，数组指针 `*[n]T`。

### 数组初始化

#### 一维数组

```go
package main

import (
    "fmt"
)

var arr0 [5]int = [5]int{1, 2, 3}
var arr1 = [5]int{1, 2, 3, 4, 5}
var arr2 = [...]int{1, 2, 3, 4, 5, 6}
var str = [5]string{3: "hello world", 4: "tom"}

func main() {
    a := [3]int{1, 2}           // 未初始化元素值为 0。
    b := [...]int{1, 2, 3, 4}   // 通过初始化值确定数组长度。
    c := [5]int{2: 100, 4: 200} // 使用引号初始化元素。
    d := [...]struct {
        name string
        age  uint8
    }{
        {"user1", 10}, // 可省略元素类型。
        {"user2", 20}, // 别忘了最后一行的逗号。
    }
    fmt.Println(arr0, arr1, arr2, str)
    fmt.Println(a, b, c, d)
}
```

输出结果:

```txt
[1 2 3 0 0] [1 2 3 4 5] [1 2 3 4 5 6] [   hello world tom]
[1 2 0] [1 2 3 4] [0 0 100 0 200] [{user1 10} {user2 20}]
```

#### 多维数组

```go
package main

import (
    "fmt"
)

var arr0 [5][3]int
var arr1 [2][3]int = [...][3]int{{1, 2, 3}, {7, 8, 9}}

func main() {
    a := [2][3]int{{1, 2, 3}, {4, 5, 6}}
    b := [...][2]int{{1, 1}, {2, 2}, {3, 3}} // 第 2 纬度不能用 "..."。
    fmt.Println(arr0, arr1)
    fmt.Println(a, b)
}
```

输出结果：

```
[[0 0 0] [0 0 0] [0 0 0] [0 0 0] [0 0 0]] [[1 2 3] [7 8 9]]
[[1 2 3] [4 5 6]] [[1 1] [2 2] [3 3]]
```

值拷贝行为会造成性能问题，通常会建议使用 `slice`，或数组指针。

```go
package main

import (
    "fmt"
)

func test(x [2]int) {
    fmt.Printf("x: %p\n", &x)
    x[1] = 1000
}

func main() {
    a := [2]int{}
    fmt.Printf("a: %p\n", &a)

    test(a)
    fmt.Println(a)
}
```

输出结果:

```
a: 0xc42007c010
x: 0xc42007c030
[0 0]
```

内置函数 len 和 cap 都返回数组长度 (元素数量)。

```go
package main

func main() {
    a := [2]int{}
    println(len(a), cap(a))
}
```

输出结果：

```
2 2
```

#### 多维数组遍历

```go
package main

import (
    "fmt"
)

func main() {

    var f [2][3]int = [...][3]int{{1, 2, 3}, {7, 8, 9}}

    for k1, v1 := range f {
        for k2, v2 := range v1 {
            fmt.Printf("(%d,%d)=%d ", k1, k2, v2)
        }
        fmt.Println()
    }
}
```

输出结果：

```
(0,0)=1 (0,1)=2 (0,2)=3
(1,0)=7 (1,1)=8 (1,2)=9
```

### 数组拷贝和传参

```go
package main

import "fmt"

func printArr(arr *[5]int) {
    arr[0] = 10
    for i, v := range arr {
        fmt.Println(i, v)
    }
}

func main() {
    var arr1 [5]int
    printArr(&arr1)
    fmt.Println(arr1)
    arr2 := [...]int{2, 4, 6, 8, 10}
    printArr(&arr2)
    fmt.Println(arr2)
}
```

## 切片

> [!WARNING]
>
> 需要说明，slice 并不是数组或数组指针。它通过内部指针和相关属性引用数组片段，以实现变长方案。

1. 切片：切片是数组的一个引用，因此切片是引用类型。但自身是结构体，值拷贝传递。
2. 切片的长度可以改变，因此，切片是一个可变的数组。
3. 切片遍历方式和数组一样，可以用 `len()` 求长度。表示可用元素数量，读写操作不能超过该限制。
4. `cap` 可以求出 `slice` 最大扩张容量，不能超出数组限制。`0 <= len(slice) <= len(array)`，其中 `array` 是 `slice` 引用的数组。
5. 切片的定义：`var` 变量名 `[]` 类型，比如 `var str []string` ， `var arr []int`。
6. 如果 `slice == nil`，那么 `len`、`cap` 结果都等于 `0`。

### 创建切片

```go
package main

import "fmt"

func main() {
   //1.声明切片
   var s1 []int
   if s1 == nil {
      fmt.Println("是空")
   } else {
      fmt.Println("不是空")
   }
   // 2.:=
   s2 := []int{}
   // 3.make()
   var s3 []int = make([]int, 0)
   fmt.Println(s1, s2, s3)
   // 4.初始化赋值
   var s4 []int = make([]int, 0, 0)
   fmt.Println(s4)
   s5 := []int{1, 2, 3}
   fmt.Println(s5)
   // 5.从数组切片
   arr := [5]int{1, 2, 3, 4, 5}
   var s6 []int
   // 前包后不包
   s6 = arr[1:4]
   fmt.Println(s6)
}
```

### 切片初始化

```go
package main

import (
    "fmt"
)

var arr = [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
var slice0 []int = arr[2:8]
var slice1 []int = arr[0:6]        //可以简写为 var slice []int = arr[:end]
var slice2 []int = arr[5:10]       //可以简写为 var slice[]int = arr[start:]
var slice3 []int = arr[0:len(arr)] //var slice []int = arr[:]
var slice4 = arr[:len(arr)-1]      //去掉切片的最后一个元素
func main() {
    fmt.Printf("全局变量：arr %v\n", arr)
    fmt.Printf("全局变量：slice0 %v\n", slice0)
    fmt.Printf("全局变量：slice1 %v\n", slice1)
    fmt.Printf("全局变量：slice2 %v\n", slice2)
    fmt.Printf("全局变量：slice3 %v\n", slice3)
    fmt.Printf("全局变量：slice4 %v\n", slice4)
    fmt.Printf("-----------------------------------\n")
    arr2 := [...]int{9, 8, 7, 6, 5, 4, 3, 2, 1, 0}
    slice5 := arr[2:8]
    slice6 := arr[0:6]         //可以简写为 slice := arr[:end]
    slice7 := arr[5:10]        //可以简写为 slice := arr[start:]
    slice8 := arr[0:len(arr)]  //slice := arr[:]
    slice9 := arr[:len(arr)-1] //去掉切片的最后一个元素
    fmt.Printf("局部变量： arr2 %v\n", arr2)
    fmt.Printf("局部变量： slice5 %v\n", slice5)
    fmt.Printf("局部变量： slice6 %v\n", slice6)
    fmt.Printf("局部变量： slice7 %v\n", slice7)
    fmt.Printf("局部变量： slice8 %v\n", slice8)
    fmt.Printf("局部变量： slice9 %v\n", slice9)
}
```

输出结果：

```
全局变量：arr [0 1 2 3 4 5 6 7 8 9]
全局变量：slice0 [2 3 4 5 6 7]
全局变量：slice1 [0 1 2 3 4 5]
全局变量：slice2 [5 6 7 8 9]
全局变量：slice3 [0 1 2 3 4 5 6 7 8 9]
全局变量：slice4 [0 1 2 3 4 5 6 7 8]
-----------------------------------
局部变量： arr2 [9 8 7 6 5 4 3 2 1 0]
局部变量： slice5 [2 3 4 5 6 7]
局部变量： slice6 [0 1 2 3 4 5]
局部变量： slice7 [5 6 7 8 9]
局部变量： slice8 [0 1 2 3 4 5 6 7 8 9]
局部变量： slice9 [0 1 2 3 4 5 6 7 8]
```

### 通过 make 来创建切片

```
var slice []type = make([]type, len)
slice  := make([]type, len)
slice  := make([]type, len, cap)
```

```go
package main

import (
    "fmt"
)

var slice0 []int = make([]int, 10)
var slice1 = make([]int, 10)
var slice2 = make([]int, 10, 10)

func main() {
    fmt.Printf("make全局slice0 ：%v\n", slice0)
    fmt.Printf("make全局slice1 ：%v\n", slice1)
    fmt.Printf("make全局slice2 ：%v\n", slice2)
    fmt.Println("--------------------------------------")
    slice3 := make([]int, 10)
    slice4 := make([]int, 10)
    slice5 := make([]int, 10, 10)
    fmt.Printf("make局部slice3 ：%v\n", slice3)
    fmt.Printf("make局部slice4 ：%v\n", slice4)
    fmt.Printf("make局部slice5 ：%v\n", slice5)
}
```

输出结果：

```
make全局slice0 ：[0 0 0 0 0 0 0 0 0 0]
make全局slice1 ：[0 0 0 0 0 0 0 0 0 0]
make全局slice2 ：[0 0 0 0 0 0 0 0 0 0]
--------------------------------------
make局部slice3 ：[0 0 0 0 0 0 0 0 0 0]
make局部slice4 ：[0 0 0 0 0 0 0 0 0 0]
make局部slice5 ：[0 0 0 0 0 0 0 0 0 0]
```

读写操作实际目标是底层数组，只需注意索引号的差别。

```go
package main

import (
    "fmt"
)

func main() {
    data := [...]int{0, 1, 2, 3, 4, 5}

    s := data[2:4]
    s[0] += 100
    s[1] += 200

    fmt.Println(s)
    fmt.Println(data)
}
```

输出:

```
    [102 203]
    [0 1 102 203 4 5]
```

可直接创建 `slice` 对象，自动分配底层数组。

```go
package main

import "fmt"

func main() {
    s1 := []int{0, 1, 2, 3, 8: 100} // 通过初始化表达式构造，可使用索引号。
    fmt.Println(s1, len(s1), cap(s1))

    s2 := make([]int, 6, 8) // 使用 make 创建，指定 len 和 cap 值。
    fmt.Println(s2, len(s2), cap(s2))

    s3 := make([]int, 6) // 省略 cap，相当于 cap = len。
    fmt.Println(s3, len(s3), cap(s3))
}
```

输出结果:

```
    [0 1 2 3 0 0 0 0 100] 9 9
    [0 0 0 0 0 0] 6 8
    [0 0 0 0 0 0] 6 6
```

使用 `make` 动态创建 `slice`，避免了数组必须用常量做长度的麻烦。还可用指针直接访问底层数组，退化成普通数组操作。

```go
package main

import "fmt"

func main() {
    s := []int{0, 1, 2, 3}
    p := &s[2] // *int, 获取底层数组元素指针。
    *p += 100

    fmt.Println(s)
}
```

输出结果:

```
[0 1 102 3]
```

至于 [][]T，是指元素类型为 []T 。

```go
package main

import (
    "fmt"
)

func main() {
    data := [][]int{
        []int{1, 2, 3},
        []int{100, 200},
        []int{11, 22, 33, 44},
    }
    fmt.Println(data)
}
```

输出结果：

```
[[1 2 3] [100 200] [11 22 33 44]]
```

可直接修改 `struct array/slice` 成员。

```go
package main

import (
    "fmt"
)

func main() {
    d := [5]struct {
        x int
    }{}

    s := d[:]

    d[1].x = 10
    s[2].x = 20

    fmt.Println(d)
    fmt.Printf("%p, %p\n", &d, &d[0])

}
```

输出结果:

```
[{0} {10} {20} {0} {0}]
0xc4200160f0, 0xc4200160f0
```

### append 内置函数操作切片

```go
package main

import (
    "fmt"
)

func main() {

    var a = []int{1, 2, 3}
    fmt.Printf("slice a : %v\n", a)
    var b = []int{4, 5, 6}
    fmt.Printf("slice b : %v\n", b)
    c := append(a, b...)
    fmt.Printf("slice c : %v\n", c)
    d := append(c, 7)
    fmt.Printf("slice d : %v\n", d)
    e := append(d, 8, 9, 10)
    fmt.Printf("slice e : %v\n", e)

}
```

输出结果：

```
slice a : [1 2 3]
slice b : [4 5 6]
slice c : [1 2 3 4 5 6]
slice d : [1 2 3 4 5 6 7]
slice e : [1 2 3 4 5 6 7 8 9 10]
```

append ：向 slice 尾部添加数据，返回新的 slice 对象。

```go
package main

import (
    "fmt"
)

func main() {

    s1 := make([]int, 0, 5)
    fmt.Printf("%p\n", &s1)

    s2 := append(s1, 1)
    fmt.Printf("%p\n", &s2)

    fmt.Println(s1, s2)

}
```

输出结果：

```
0xc42000a060
0xc42000a080
[] [1]
```

### 超出原 slice.cap 限制

超出原 `slice.cap` 限制就会重新分配底层数组，即便原数组并未填满

```go
package main

import (
    "fmt"
)

func main() {

    data := [...]int{0, 1, 2, 3, 4, 10: 0}
    s := data[:2:3]

    s = append(s, 100, 200) // 一次 append 两个值，超出 s.cap 限制。

    fmt.Println(s, data)         // 重新分配底层数组，与原数组无关。
    fmt.Println(&s[0], &data[0]) // 比对底层数组起始指针。

}
```

输出结果:

```
[0 1 100 200] [0 1 2 3 4 0 0 0 0 0 0]
0xc4200160f0 0xc420070060
```

从输出结果可以看出，`append` 后的 `s` 重新分配了底层数组，并复制数据。如果只追加一个值，则不会超过 `s.cap` 限制，也就不会重新分配。 通常以 `2` 倍容量重新分配底层数组。在大批量添加数据时，建议一次性分配足够大的空间，以减少内存分配和数据复制开销。或初始化足够长的 `len` 属性，改用索引号进行操作。及时释放不再使用的 `slice` 对象，避免持有过期数组，造成 GC 无法回收。

### slice 中 cap 重新分配规律

```go
package main

import (
    "fmt"
)

func main() {

    s := make([]int, 0, 1)
    c := cap(s)

    for i := 0; i < 50; i++ {
        s = append(s, i)
        if n := cap(s); n > c {
            fmt.Printf("cap: %d -> %d\n", c, n)
            c = n
        }
    }

}
```

输出结果:

```
cap: 1 -> 2
cap: 2 -> 4
cap: 4 -> 8
cap: 8 -> 16
cap: 16 -> 32
cap: 32 -> 64
```

### 切片拷贝

```go
package main

import (
    "fmt"
)

func main() {

    s1 := []int{1, 2, 3, 4, 5}
    fmt.Printf("slice s1 : %v\n", s1)
    s2 := make([]int, 10)
    fmt.Printf("slice s2 : %v\n", s2)
    copy(s2, s1)
    fmt.Printf("copied slice s1 : %v\n", s1)
    fmt.Printf("copied slice s2 : %v\n", s2)
    s3 := []int{1, 2, 3}
    fmt.Printf("slice s3 : %v\n", s3)
    s3 = append(s3, s2...)
    fmt.Printf("appended slice s3 : %v\n", s3)
    s3 = append(s3, 4, 5, 6)
    fmt.Printf("last slice s3 : %v\n", s3)

}
```

输出结果：

```
slice s1 : [1 2 3 4 5]
slice s2 : [0 0 0 0 0 0 0 0 0 0]
copied slice s1 : [1 2 3 4 5]
copied slice s2 : [1 2 3 4 5 0 0 0 0 0]
slice s3 : [1 2 3]
appended slice s3 : [1 2 3 1 2 3 4 5 0 0 0 0 0]
last slice s3 : [1 2 3 1 2 3 4 5 0 0 0 0 0 4 5 6]
```

`copy`：函数 `copy` 在两个 `slice` 间复制数据，复制长度以 `len` 小的为准。两个 `slice` 可指向同一底层数组，允许元素区间重叠。

```go
package main

import (
    "fmt"
)

func main() {

    data := [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
    fmt.Println("array data : ", data)
    s1 := data[8:]
    s2 := data[:5]
    fmt.Printf("slice s1 : %v\n", s1)
    fmt.Printf("slice s2 : %v\n", s2)
    copy(s2, s1)
    fmt.Printf("copied slice s1 : %v\n", s1)
    fmt.Printf("copied slice s2 : %v\n", s2)
    fmt.Println("last array data : ", data)

}
```

输出结果:

```
array data :  [0 1 2 3 4 5 6 7 8 9]
slice s1 : [8 9]
slice s2 : [0 1 2 3 4]
copied slice s1 : [8 9]
copied slice s2 : [8 9 2 3 4]
last array data :  [8 9 2 3 4 5 6 7 8 9]
```

应及时将所需数据 `copy` 到较小的 `slice`，以便释放超大号底层数组内存。

### slice 遍历

```go
package main

import (
    "fmt"
)

func main() {

    data := [...]int{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
    slice := data[:]
    for index, value := range slice {
        fmt.Printf("inde : %v , value : %v\n", index, value)
    }

}
```

输出结果：

```
inde : 0 , value : 0
inde : 1 , value : 1
inde : 2 , value : 2
inde : 3 , value : 3
inde : 4 , value : 4
inde : 5 , value : 5
inde : 6 , value : 6
inde : 7 , value : 7
inde : 8 , value : 8
inde : 9 , value : 9
```

### 切片 resize

> 调整大小

```go
package main

import (
    "fmt"
)

func main() {
    var a = []int{1, 3, 4, 5}
    fmt.Printf("slice a : %v , len(a) : %v\n", a, len(a))
    b := a[1:2]
    fmt.Printf("slice b : %v , len(b) : %v\n", b, len(b))
    c := b[0:3]
    fmt.Printf("slice c : %v , len(c) : %v\n", c, len(c))
}
```

输出结果：

```
slice a : [1 3 4 5] , len(a) : 4
slice b : [3] , len(b) : 1
slice c : [3 4 5] , len(c) : 3
```

## 指针

> [!TIP]
>
> 区别于C/C++中的指针，Go语言中的指针不能进行偏移和运算，是安全指针。

Go语言中的函数传参都是值拷贝，当我们想要修改某个变量的时候，我们可以创建一个指向该变量地址的指针变量。传递数据使用指针，而无须拷贝数据。类型指针不能进行偏移和运算。Go语言中的指针操作非常简单，只需要记住两个符号：`&`（取地址）和`*`（根据地址取值）。

### 指针地址和指针类型

每个变量在运行时都拥有一个地址，这个地址代表变量在内存中的位置。Go语言中使用`&`字符放在变量前面对变量进行“取地址”操作。 Go语言中的值类型（`int`、`float`、`bool`、`string`、`array`、`struct`）都有对应的指针类型，如：`*int`、`*int64`、`*string` 等。

取变量指针的语法如下：

```
ptr := &v    // v的类型为T
```

其中：

```
v:代表被取地址的变量，类型为T
ptr:用于接收地址的变量，ptr的类型就为*T，称做T的指针类型。*代表指针。
```

举个例子：

```go
func main() {
    a := 10
    b := &a
    fmt.Printf("a:%d ptr:%p\n", a, &a) // a:10 ptr:0xc00001a078
    fmt.Printf("b:%p type:%T\n", b, b) // b:0xc00001a078 type:*int
    fmt.Println(&b)                    // 0xc00000e018
}
```

我们来看一下`b := &a`的图示：

![image-20240717172816450](assets/image-20240717172816450.png)

### 指针取值

在对普通变量使用&操作符取地址后会获得这个变量的指针，然后可以对指针使用`*`操作，也就是指针取值，代码如下。

```go
func main() {
    //指针取值
    a := 10
    b := &a // 取变量a的地址，将指针保存到b中
    fmt.Printf("type of b:%T\n", b)
    c := *b // 指针取值（根据指针去内存取值）
    fmt.Printf("type of c:%T\n", c)
    fmt.Printf("value of c:%v\n", c)
}
```

输出如下：

```
type of b:*int
type of c:int
value of c:10
```

总结： 取地址操作符&和取值操作符`*`是一对互补操作符，`&`取出地址，`*`根据地址取出地址指向的值。

变量、指针地址、指针变量、取地址、取值的相互关系和特性如下：

1. 对变量进行取地址（&）操作，可以获得这个变量的指针变量。
2. 指针变量的值是指针地址。
3. 对指针变量进行取值（\*）操作，可以获得指针变量指向的原变量的值。

指针传值示例：

```go
func modify1(x int) {
    x = 100
}

func modify2(x *int) {
    *x = 100
}

func main() {
    a := 10
    modify1(a)
    fmt.Println(a) // 10
    modify2(&a)
    fmt.Println(a) // 100
}
```

### 空指针

- 当一个指针被定义后没有分配到任何变量时，它的值为 `nil`
- 空指针的判断

```go
package main

import "fmt"

func main() {
    var p *string
    fmt.Println(p)
    fmt.Printf("p的值是%s/n", p)
    if p != nil {
        fmt.Println("非空")
    } else {
        fmt.Println("空值")
    }
}
```

### new

`new` 是一个内置的函数，它的函数签名如下：

```go
func new(Type) *Type
```

其中，

1. `Type` 表示类型，`new` 函数只接受一个参数，这个参数是一个类型；
2. `*Type` 表示类型指针，`new` 函数返回一个指向该类型内存地址的指针。

`new` 函数不太常用，使用 `new` 函数得到的是一个类型的指针，并且该指针对应的值为该类型的零值。举个例子：

```go
func main() {
    a := new(int)
    b := new(bool)
    fmt.Printf("%T\n", a) // *int
    fmt.Printf("%T\n", b) // *bool
    fmt.Println(*a)       // 0
    fmt.Println(*b)       // false
}
```

### make

`make` 也是用于内存分配的，区别于 `new`，它只用于 `slice`、`map` 以及 `chan` 的内存创建，而且它返回的类型就是这三个类型本身，而不是他们的指针类型，因为这三种类型就是引用类型，所以就没有必要返回他们的指针了。`make` 函数的函数签名如下：

```go
func make(t Type, size ...IntegerType) Type
```

`make` 函数是无可替代的，我们在使用 `slice`、`map` 以及 `channel` 的时候，都需要使用 `make` 进行初始化，然后才可以对它们进行操作。这个我们在上一章中都有说明，关于 `channel` 我们会在后续的章节详细说明。

本节开始的示例中 `var b map[string]int` 只是声明变量b是一个 `map` 类型的变量，需要像下面的示例代码一样使用 `make` 函数进行初始化操作之后，才能对其进行键值对赋值：

```go
func main() {
    var b map[string]int
    b = make(map[string]int, 10)
    b["测试"] = 100
    fmt.Println(b)
}
```

### new 与 make 的区别

1. 二者都是用来做内存分配的。
2. make只用于slice、map以及channel的初始化，返回的还是这三个引用类型本身。
3. 而new用于类型的内存分配，并且内存对应的值为类型零值，返回的是指向类型的指针。

## Map

`map` 是一种无序的基于 `key-value` 的数据结构，Go语言中的 `map` 是引用类型，必须初始化才能使用。

### 定义

Go语言中 `map` 的定义语法如下

```
map[KeyType]ValueType
```

其中，

`KeyType`：表示键的类型。

`ValueType`：表示键对应的值的类型。

`map` 类型的变量默认初始值为nil，需要使用 `make()` 函数来分配内存。语法为：

```
make(map[KeyType]ValueType, [cap])
```

其中 `cap` 表示 `map` 的容量，该参数虽然不是必须的，但是我们应该在初始化 `map` 的时候就为其指定一个合适的容量。

### 基本使用

`map` 中的数据都是成对出现的，`map` 的基本使用示例代码如下：

```go
func main() {
    scoreMap := make(map[string]int, 8)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    fmt.Println(scoreMap)
    fmt.Println(scoreMap["小明"])
    fmt.Printf("type of a:%T\n", scoreMap)
}
```

输出：

```
    map[小明:100 张三:90]
    100
    type of a:map[string]int
```

`map` 也支持在声明的时候填充元素，例如：

```go
func main() {
    userInfo := map[string]string{
        "username": "pprof.cn",
        "password": "123456",
    }
    fmt.Println(userInfo) //
}
```

### 判断某个键是否存在

Go语言中有个判断 `map` 中键是否存在的特殊写法，格式如下:

```
    value, ok := map[key]
```

举个例子：

```go
func main() {
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    // 如果key存在ok为true,v为对应的值；不存在ok为false,v为值类型的零值
    v, ok := scoreMap["张三"]
    if ok {
        fmt.Println(v)
    } else {
        fmt.Println("查无此人")
    }
}
```

### map的遍历

Go语言中使用 `for range` 遍历 `map`。

```go
func main() {
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    scoreMap["王五"] = 60
    for k, v := range scoreMap {
        fmt.Println(k, v)
    }
}
```

但我们只想遍历 `key` 的时候，可以按下面的写法：

```go
func main() {
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    scoreMap["王五"] = 60
    for k := range scoreMap {
        fmt.Println(k)
    }
}
```

注意： 遍历map时的元素顺序与添加键值对的顺序无关。

### 使用delete()函数删除键值对

使用 `delete()` 内建函数从 `map` 中删除一组键值对，`delete()` 函数的格式如下：

```
    delete(map, key)
```

其中，

```
    map:表示要删除键值对的map

    key:表示要删除的键值对的键
```

示例代码如下：

```go
func main(){
    scoreMap := make(map[string]int)
    scoreMap["张三"] = 90
    scoreMap["小明"] = 100
    scoreMap["王五"] = 60
    delete(scoreMap, "小明")//将小明:100从map中删除
    for k,v := range scoreMap{
        fmt.Println(k, v)
    }
}
```

### 按照指定顺序遍历map

```go
 func main() {
    rand.Seed(time.Now().UnixNano()) //初始化随机数种子

    var scoreMap = make(map[string]int, 200)

    for i := 0; i < 100; i++ {
        key := fmt.Sprintf("stu%02d", i) //生成stu开头的字符串
        value := rand.Intn(100)          //生成0~99的随机整数
        scoreMap[key] = value
    }
    //取出map中的所有key存入切片keys
    var keys = make([]string, 0, 200)
    for key := range scoreMap {
        keys = append(keys, key)
    }
    //对切片进行排序
    sort.Strings(keys)
    //按照排序后的key遍历map
    for _, key := range keys {
        fmt.Println(key, scoreMap[key])
    }
}
```

### 元素为map类型的切片

下面的代码演示了切片中的元素为 `map` 类型时的操作：

```go
func main() {
    var mapSlice = make([]map[string]string, 3)
    for index, value := range mapSlice {
        fmt.Printf("index:%d value:%v\n", index, value)
    }
    fmt.Println("after init")
    // 对切片中的map元素进行初始化
    mapSlice[0] = make(map[string]string, 10)
    mapSlice[0]["name"] = "王五"
    mapSlice[0]["password"] = "123456"
    mapSlice[0]["address"] = "红旗大街"
    for index, value := range mapSlice {
        fmt.Printf("index:%d value:%v\n", index, value)
    }
}
```

### 值为切片类型的map

下面的代码演示了 `map` 中值为切片类型的操作：

```go
func main() {
    var sliceMap = make(map[string][]string, 3)
    fmt.Println(sliceMap)
    fmt.Println("after init")
    key := "中国"
    value, ok := sliceMap[key]
    if !ok {
        value = make([]string, 0, 2)
    }
    value = append(value, "北京", "上海")
    sliceMap[key] = value
    fmt.Println(sliceMap)
}
```

## 结构体

Go 语言中没有“类”的概念，也不支持“类”的继承等面向对象的概念。Go 语言中通过结构体的内嵌再配合接口比面向对象具有更高的扩展性和灵活性。

### 自定义类型

在Go语言中有一些基本的数据类型，如 `string`、整型、浮点型、布尔等数据类型，Go语言中可以使用 `type` 关键字来定义自定义类型。

自定义类型是定义了一个全新的类型。我们可以基于内置的基本类型定义，也可以通过 `struct` 定义。例如：

```go
//将MyInt定义为int类型
type MyInt int
```

通过 `Type` 关键字的定义，`MyInt` 就是一种新的类型，它具有 `int` 的特性。

### 类型别名

> Go >= 1.9

类型别名规定：`TypeAlias` 只是 `Type` 的别名，本质上 `TypeAlias` 与 `Type` 是同一个类型。就像一个孩子小时候有小名、乳名，上学后用学名，英语老师又会给他起英文名，但这些名字都指的是他本人。

```go
type TypeAlias = Type
```

我们之前见过的rune和byte就是类型别名，他们的定义如下：

```go
type byte = uint8
type rune = int32
```

### 两者的区别

类型别名与类型定义表面上看只有一个等号的差异，我们通过下面的这段代码来理解它们之间的区别。

```go
//类型定义
type NewInt int

//类型别名
type MyInt = int

func main() {
    var a NewInt
    var b MyInt

    fmt.Printf("type of a:%T\n", a) //type of a:main.NewInt
    fmt.Printf("type of b:%T\n", b) //type of b:int
}
```

结果显示 `a` 的类型是 `main.NewInt`，表示main包下定义的 `NewInt` 类型。`b` 的类型是 `int`。`MyInt` 类型只会在代码中存在，编译完成时并不会有 `MyInt` 类型。

### 结构体的定义

使用 `type` 和 `struct` 关键字来定义结构体，具体代码格式如下：

```go
type 类型名 struct {
    字段名 字段类型
    字段名 字段类型
    …
}
```

其中：

1. 类型名：标识自定义结构体的名称，在同一个包内不能重复。
2. 字段名：表示结构体字段名。结构体中的字段名必须唯一。
3. 字段类型：表示结构体字段的具体类型。

举个例子，我们定义一个 `Person`（人）结构体，代码如下：

```go
type person struct {
    name string
    city string
    age  int8
}
```

同样类型的字段也可以写在一行，

```go
type person1 struct {
    name, city string
    age        int8
}
```

这样我们就拥有了一个person的自定义类型，它有 `name`、`city`、`age` 三个字段，分别表示姓名、城市和年龄。这样我们使用这个`person` 结构体就能够很方便的在程序中表示和存储人信息了。

语言内置的基础数据类型是用来描述一个值的，而结构体是用来描述一组值的。比如一个人有名字、年龄和居住城市等，本质上是一种聚合型的数据类型

### 结构体实例化

只有当结构体实例化时，才会真正地分配内存。也就是必须实例化后才能使用结构体的字段。

结构体本身也是一种类型，我们可以像声明内置类型一样使用 `var` 关键字声明结构体类型。

```
var 结构体实例 结构体类型
```

### 基本实例化

```go
type person struct {
    name string
    city string
    age  int8
}

func main() {
    var p1 person
    p1.name = "pprof.cn"
    p1.city = "北京"
    p1.age = 18
    fmt.Printf("p1=%v\n", p1)  //p1={pprof.cn 北京 18}
    fmt.Printf("p1=%#v\n", p1) //p1=main.person{name:"pprof.cn", city:"北京", age:18}
}
```

我们通过 `.` 来访问结构体的字段（成员变量），例如 `p1.name` 和 `p1.age` 等。

### 匿名结构体

在定义一些临时数据结构等场景下还可以使用匿名结构体。

```go
package main

import (
    "fmt"
)

func main() {
    var user struct{Name string; Age int}
    user.Name = "pprof.cn"
    user.Age = 18
    fmt.Printf("%#v\n", user)
}
```

#### 创建指针类型结构体

我们还可以通过使用 `new` 关键字对结构体进行实例化，得到的是结构体的地址。 格式如下：

```
    var p2 = new(person)
    fmt.Printf("%T\n", p2)     //*main.person
    fmt.Printf("p2=%#v\n", p2) //p2=&main.person{name:"", city:"", age:0}
```

从打印的结果中我们可以看出 `p2` 是一个结构体指针。

需要注意的是在 Go 语言中支持对结构体指针直接使用.来访问结构体的成员。

```go
var p2 = new(person)
p2.name = "测试"
p2.age = 18
p2.city = "北京"
fmt.Printf("p2=%#v\n", p2) //p2=&main.person{name:"测试", city:"北京", age:18}
```

#### 取结构体的地址实例化

使用 `&` 对结构体进行取地址操作相当于对该结构体类型进行了一次 `new` 实例化操作。

```go
p3 := &person{}
fmt.Printf("%T\n", p3)     //*main.person
fmt.Printf("p3=%#v\n", p3) //p3=&main.person{name:"", city:"", age:0}
p3.name = "博客"
p3.age = 30
p3.city = "成都"
fmt.Printf("p3=%#v\n", p3) //p3=&main.person{name:"博客", city:"成都", age:30}
```

`p3.name = "博客"` 其实在底层是 `(*p3).name = "博客"`，这是 Go 语言帮我们实现的语法糖。

### 结构体初始化

```go
type person struct {
    name string
    city string
    age  int8
}

func main() {
    var p4 person
    fmt.Printf("p4=%#v\n", p4) //p4=main.person{name:"", city:"", age:0}
}
```

#### 使用键值对初始化

使用键值对对结构体进行初始化时，键对应结构体的字段，值对应该字段的初始值。

```go
p5 := person{
    name: "pprof.cn",
    city: "北京",
    age:  18,
}
fmt.Printf("p5=%#v\n", p5) //p5=main.person{name:"pprof.cn", city:"北京", age:18}
```

也可以对结构体指针进行键值对初始化，例如：

```go
p6 := &person{
    name: "pprof.cn",
    city: "北京",
    age:  18,
}
fmt.Printf("p6=%#v\n", p6) //p6=&main.person{name:"pprof.cn", city:"北京", age:18}
```

当某些字段没有初始值的时候，该字段可以不写。此时，没有指定初始值的字段的值就是该字段类型的零值。

```go
p7 := &person{
    city: "北京",
}
fmt.Printf("p7=%#v\n", p7) //p7=&main.person{name:"", city:"北京", age:0}
```

#### 使用值的列表初始化

始化结构体的时候可以简写，也就是初始化的时候不写键，直接写值：

```go
p8 := &person{
    "pprof.cn",
    "北京",
    18,
}
fmt.Printf("p8=%#v\n", p8) //p8=&main.person{name:"pprof.cn", city:"北京", age:18}
```

> [!WARNING]
>
> 使用这种格式初始化时，需要注意：
>
> 1. 必须初始化结构体的所有字段。
> 2. 初始值的填充顺序必须与字段在结构体中的声明顺序一致。
> 3. 该方式不能和键值初始化方式混用。

### 结构体内存布局

```go
type test struct {
    a int8
    b int8
    c int8
    d int8
}
n := test{
    1, 2, 3, 4,
}
fmt.Printf("n.a %p\n", &n.a)
fmt.Printf("n.b %p\n", &n.b)
fmt.Printf("n.c %p\n", &n.c)
fmt.Printf("n.d %p\n", &n.d)
```

输出：

```
n.a 0xc0000a0060
n.b 0xc0000a0061
n.c 0xc0000a0062
n.d 0xc0000a0063
```

## 流程控制

### 条件语句 if

#### 语法

1. 可省略条件表达式括号。
2. 持初始化语句，可定义代码块局部变量。
3. 代码块左 括号必须在条件表达式尾部。

```go
if 布尔表达式 {
/* 在布尔表达式为 true 时执行 */
}
```

#### 示例

```go
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var a int = 10
   /* 使用 if 语句判断布尔表达式 */
   if a < 20 {
       /* 如果条件为 true 则执行以下语句 */
       fmt.Printf("a 小于 20\n" )
   }
   fmt.Printf("a 的值为 : %d\n", a)
}
```

以上代码执行结果为：

```
a 小于 20
a 的值为 : 10
```

### if...else 语句

#### 语法

```go
if 布尔表达式 {
   /* 在布尔表达式为 true 时执行 */
} else {
  /* 在布尔表达式为 false 时执行 */
}
```

`if` 在布尔表达式为 `true` 时，其后紧跟的语句块执行，如果为 `false` 则执行 `else` 语句块。

#### 示例

```go
package main

import "fmt"

func main() {
   /* 局部变量定义 */
   var a int = 100
   /* 判断布尔表达式 */
   if a < 20 {
       /* 如果条件为 true 则执行以下语句 */
       fmt.Printf("a 小于 20\n" )
   } else {
       /* 如果条件为 false 则执行以下语句 */
       fmt.Printf("a 不小于 20\n" )
   }
   fmt.Printf("a 的值为 : %d\n", a)

}
```

以上代码执行结果为：

```
a 不小于 20
a 的值为 : 100
```

### switch 语句

#### 语法

```go
switch var1 {
    case val1:
        ...
    case val2:
        ...
    default:
        ...
}
```

变量 `var1` 可以是任何类型，而 `val1` 和 `val2` 则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式。 您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：`case val1`，`val2`， `val3`。

#### 示例

```go
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var grade string = "B"
   var marks int = 90

   switch marks {
      case 90: grade = "A"
      case 80: grade = "B"
      case 50,60,70 : grade = "C"
      default: grade = "D"
   }

   switch {
      case grade == "A" :
         fmt.Printf("优秀!\n" )
      case grade == "B", grade == "C" :
         fmt.Printf("良好\n" )
      case grade == "D" :
         fmt.Printf("及格\n" )
      case grade == "F":
         fmt.Printf("不及格\n" )
      default:
         fmt.Printf("差\n" )
   }
   fmt.Printf("你的等级是 %s\n", grade )
}
```

以上代码执行结果为：

```
优秀!
你的等级是 A
```

### Type Switch

`switch` 语句还可以被用于 `type-switch` 来判断某个 `interface` 变量中实际存储的变量类型。

#### 语法

```go
switch x.(type){
    case type:
       statement(s)
    case type:
       statement(s)
    /* 你可以定义任意个数的case */
    default: /* 可选 */
       statement(s)
}
```

#### 示例

```go
package main

import "fmt"

func main() {
    var x interface{}
    //写法一：
    switch i := x.(type) { // 带初始化语句
    case nil:
        fmt.Printf(" x 的类型 :%T\r\n", i)
    case int:
        fmt.Printf("x 是 int 型")
    case float64:
        fmt.Printf("x 是 float64 型")
    case func(int) float64:
        fmt.Printf("x 是 func(int) 型")
    case bool, string:
        fmt.Printf("x 是 bool 或 string 型")
    default:
        fmt.Printf("未知型")
    }
    //写法二
    var j = 0
    switch j {
    case 0:
    case 1:
        fmt.Println("1")
    case 2:
        fmt.Println("2")
    default:
        fmt.Println("def")
    }
    //写法三
    var k = 0
    switch k {
    case 0:
        println("fallthrough")
        fallthrough
        /*
            Go的switch非常灵活，表达式不必是常量或整数，执行的过程从上至下，直到找到匹配项；
            而如果switch没有表达式，它会匹配true。
            Go里面switch默认相当于每个case最后带有break，
            匹配成功后不会自动向下执行其他case，而是跳出整个switch,
            但是可以使用fallthrough强制执行后面的case代码。
        */
    case 1:
        fmt.Println("1")
    case 2:
        fmt.Println("2")
    default:
        fmt.Println("def")
    }
    //写法三
    var m = 0
    switch m {
    case 0, 1:
        fmt.Println("1")
    case 2:
        fmt.Println("2")
    default:
        fmt.Println("def")
    }
    //写法四
    var n = 0
    switch { //省略条件表达式，可当 if...else if...else
    case n > 0 && n < 10:
        fmt.Println("i > 0 and i < 10")
    case n > 10 && n < 20:
        fmt.Println("i > 10 and i < 20")
    default:
        fmt.Println("def")
    }
}
```

以上代码执行结果为：

```
x 的类型 :<nil>
fallthrough
1
1
def
```

### 条件语句 select

#### 语法

```go
select {
    case communication clause  :
       statement(s);
    case communication clause  :
       statement(s);
    /* 你可以定义任意数量的 case */
    default : /* 可选 */
       statement(s);
}
```

1. 每个 `case` 都必须是一个通信
2. 所有 `channel` 表达式都会被求值
3. 所有被发送的表达式都会被求值
4. 如果任意某个通信可以进行，它就执行；其他被忽略。
5. 如果有多个 `case` 都可以运行，`Select` 会随机公平地选出一个执行。其他不会执行。
6. 如果有 `default` 子句，则执行该语句。
7. 如果没有 `default` 字句，`select` 将阻塞，直到某个通信可以运行；Go不会重新对 `channel` 或值进行求值。

#### 示例

```go
package main

import "fmt"

func main() {
   var c1, c2, c3 chan int
   var i1, i2 int
   select {
      case i1 = <-c1:
         fmt.Printf("received ", i1, " from c1\n")
      case c2 <- i2:
         fmt.Printf("sent ", i2, " to c2\n")
      case i3, ok := (<-c3):  // same as: i3, ok := <-c3
         if ok {
            fmt.Printf("received ", i3, " from c3\n")
         } else {
            fmt.Printf("c3 is closed\n")
         }
      default:
         fmt.Printf("no communication\n")
   }
}
```

以上代码执行结果为：

```
no communication
```

`select` 可以监听 `channel` 的数据流动

`select` 的用法与 `switch` 语法非常类似，由 `select` 开始的一个新的选择块，每个选择条件由 `case` 语句来描述

与 `switch` 语句可以选择任何使用相等比较的条件相比，`select` 由比较多的限制，其中最大的一条限制就是每个 `case` 语句里必须是一个 `IO` 操作

```go
select { //不停的在这里检测
    case <- chanl : //检测有没有数据可以读
    //如果chanl成功读取到数据，则进行该case处理语句
    case chan2 <- 1 : //检测有没有可以写
    //如果成功向chan2写入数据，则进行该case处理语句


    //假如没有default，那么在以上两个条件都不成立的情况下，就会在此阻塞//一般default会不写在里面，select中的default子句总是可运行的，因为会很消耗CPU资源
    default:
    //如果以上都没有符合条件，那么则进行default处理流程
}
```

在一个 `select` 语句中，Go 会按顺序从头到尾评估每一个发送和接收的语句。

如果其中的任意一个语句可以继续执行（即没有被阻塞），那么就从那些可以执行的语句中任意选择一条来使用。 如果没有任意一条语句可以执行（即所有的通道都被阻塞），那么有两种可能的情况： ①如果给出了 `default` 语句，那么就会执行`default` 的流程，同时程序的执行会从 `select` 语句后的语句中恢复。 ②如果没有 `default` 语句，那么 `select` 语句将被阻塞，直到至少有一个 `case` 可以进行下去。

#### 用法 - 超时判断

比如在下面的场景中，使用全局 `resChan` 来接受 `response`，如果时间超过 `3S`，`resChan` 中还没有数据返回，则第二条 `case` 将执行。

```go
var resChan = make(chan int)
// do request
func test() {
    select {
    case data := <-resChan:
        doData(data)
    case <-time.After(time.Second * 3):
        fmt.Println("request time out")
    }
}

func doData(data int) {
    //...
}
```

#### 用法 - 退出

```go
// 主线程（协程）中如下：
var shouldQuit=make(chan struct{})
fun main(){
    {
        // loop
    }
    // ...out of the loop
    select {
        case <-c.shouldQuit:
            cleanUp()
            return
        default:
        }
    // ...
}

// 再另外一个协程中，如果运行遇到非法操作或不可处理的错误，就向shouldQuit发送数据通知程序停止运行
close(shouldQuit)
```

#### 用法 - 判断channel是否阻塞

```go
// 在某些情况下是存在不希望channel缓存满了的需求的，可以用如下方法判断
ch := make (chan int, 5)
// ...
data：=0
select {
case ch <- data:
default:
    // 做相应操作，比如丢弃data。视需求而定
}
```

### 循环语句for

#### 语法

Go语言的 `For` 循环有三种形式，只有其中的一种使用分号。

```go
for init; condition; post { }
for condition { }
for { }
```

- `init`： 一般为赋值表达式，给控制变量赋初值；
- `condition`： 关系表达式或逻辑表达式，循环控制条件；
- `post`： 一般为赋值表达式，给控制变量增量或减量。

`for` 语句执行过程如下：1. 先对表达式 `init` 赋初值；2. 判别赋值表达式 `init` 是否满足给定 `condition` 条件，若其值为真，满足循环条件，则执行循环体内语句，然后执行 `post`，进入第二次循环，再判别 `condition`；否则判断 `condition` 的值为假，不满足条件，就终止 `for` 循环，执行循环体外语句。

```go
s := "abc"

for i, n := 0, len(s); i < n; i++ { // 常见的 for 循环，支持初始化语句。
    println(s[i])
}

n := len(s)
for n > 0 {                // 替代 while (n > 0) {}
    println(s[n])        // 替代 for (; n > 0;) {}
    n--
}

for {                    // 替代 while (true) {}
    println(s)            // 替代 for (;;) {}
}
```

不要期望编译器能理解你的想法，在初始化语句中计算出全部结果是个好主意。

```go
package main

func length(s string) int {
    println("call length.")
    return len(s)
}

func main() {
    s := "abcd"

    for i, n := 0, length(s); i < n; i++ {     // 避免多次调用 length 函数。
        println(i, s[i])
    }
}
```

输出:

```
call length.
0 97
1 98
2 99
3 100
```

#### 示例

```go
package main

import "fmt"

func main() {

   var b int = 15
   var a int

   numbers := [6]int{1, 2, 3, 5}

   /* for 循环 */
   for a := 0; a < 10; a++ {
      fmt.Printf("a 的值为: %d\n", a)
   }

   for a < b {
      a++
      fmt.Printf("a 的值为: %d\n", a)
      }

   for i,x:= range numbers {
      fmt.Printf("第 %d 位 x 的值 = %d\n", i,x)
   }
}
```

以上实例运行输出结果为:

```
a 的值为: 0
a 的值为: 1
a 的值为: 2
a 的值为: 3
a 的值为: 4
a 的值为: 5
a 的值为: 6
a 的值为: 7
a 的值为: 8
a 的值为: 9
a 的值为: 1
a 的值为: 2
a 的值为: 3
a 的值为: 4
a 的值为: 5
a 的值为: 6
a 的值为: 7
a 的值为: 8
a 的值为: 9
a 的值为: 10
a 的值为: 11
a 的值为: 12
a 的值为: 13
a 的值为: 14
a 的值为: 15
第 0 位 x 的值 = 1
第 1 位 x 的值 = 2
第 2 位 x 的值 = 3
第 3 位 x 的值 = 5
第 4 位 x 的值 = 0
第 5 位 x 的值 = 0
```

### 循环嵌套

在 `for` 循环中嵌套一个或多个 `for` 循环

#### 语法

以下为 Go 语言嵌套循环的格式：

```go
for [condition |  ( init; condition; increment ) | Range]
{
   for [condition |  ( init; condition; increment ) | Range]
   {
      statement(s)
   }
   statement(s)
}
```

#### 示例

以下实例使用循环嵌套来输出 2 到 100 间的素数：

```go
package main

import "fmt"

func main() {
   /* 定义局部变量 */
   var i, j int

   for i=2; i < 100; i++ {
      for j=2; j <= (i/j); j++ {
         if(i%j==0) {
            break // 如果发现因子，则不是素数
         }
      }
      if(j > (i/j)) {
         fmt.Printf("%d  是素数\n", i)
      }
   }
}
```

### 循环语句range

`Golang range` 类似迭代器操作，返回 (索引, 值) 或 (键, 值)。

`for` 循环的 `range` 格式可以对 `slice`、`map`、数组、字符串等进行迭代循环。

#### 语法

```go
for key, value := range oldMap {
    newMap[key] = value
}
```

|               | 第一个值  | 第二个值   |                   |
| ------------- | --------- | ---------- | ----------------- |
| `string`      | `index`   | `s[index]` | `unicode`, `rune` |
| `array/slice` | `index`   | `s[index]` |                   |
| `map`         | `key`     | `m[key]`   |                   |
| `channel`     | `element` |            |                   |

可忽略不想要的返回值，或 `"_"` 这个特殊变量。

#### 示例

```go
package main

func main() {
    s := "abc"
    // 忽略 2nd value，支持 string/array/slice/map。
    for i := range s {
        println(s[i])
    }
    // 忽略 index。
    for _, c := range s {
        println(c)
    }
    // 忽略全部返回值，仅迭代。
    for range s {

    }

    m := map[string]int{"a": 1, "b": 2}
    // 返回 (key, value)。
    for k, v := range m {
        println(k, v)
    }
}
```

输出结果：

```
97
98
99
97
98
99
a 1
b 2
```

> [!WARNING]
>
> `range` 会复制对象。

```go
package main

import "fmt"

func main() {
    a := [3]int{0, 1, 2}

    for i, v := range a { // index、value 都是从复制品中取出。

        if i == 0 { // 在修改前，我们先修改原数组。
            a[1], a[2] = 999, 999
            fmt.Println(a) // 确认修改有效，输出 [0, 999, 999]。
        }

        a[i] = v + 100 // 使用复制品中取出的 value 修改原数组。

    }

    fmt.Println(a) // 输出 [100, 101, 102]。
}
```

输出结果：

```
[0 999 999]
[100 101 102]
```

建议改用引用类型，其底层数据不会被复制。

```go
package main

func main() {
    s := []int{1, 2, 3, 4, 5}

    for i, v := range s { // 复制 struct slice { pointer, len, cap }。

        if i == 0 {
            s = s[:3]  // 对 slice 的修改，不会影响 range。
            s[2] = 100 // 对底层数据的修改。
        }

        println(i, v)
    }
}
```

输出结果:

```
0 1
1 2
2 100
3 4
4 5
```

另外两种引用类型 `map`、`channel` 是指针包装，而不像 `slice` 是 `struct`。

### Goto、Break、Continue

1. 三个语句都可以配合标签(`label`)使用
2. 标签名区分大小写，定以后若不使用会造成编译错误
3. `continue`、`break` 配合标签(`label`)可用于多层循环跳出
4. `goto` 是调整执行位置，与 `continue`、`break` 配合标签(`label`)的结果并不相同

## 函数

### 函数特点

- 无需声明原型。
- 支持不定 变参。
- 支持多返回值。
- 支持命名返回参数。
- 支持匿名函数和闭包。
- 函数也是一种类型，一个函数可以赋值给变量。
- 不支持嵌套 (`nested`) 一个包不能有两个名字一样的函数。
- 不支持重载 (`overload`)
- 不支持默认参数 (`default parameter`)。

### 函数参数

函数定义时指出，函数定义时有参数，该变量可称为函数的形参。形参就像定义在函数体内的局部变量。

但当调用函数，传递过来的变量就是函数的实参，函数可以通过两种方式来传递参数：

1. 值传递：指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数。

   ```go
   func swap(x, y int) int {
      ... ...
   }
   ```

2. 引用传递：是指在调用函数时将实际参数的地址传递到函数中，那么在函数中对参数所进行的修改，将影响到实际参数。

   ```go
   package main

   import (
       "fmt"
   )

   /* 定义相互交换值的函数 */
   func swap(x, y *int) {
       var temp int

       temp = *x /* 保存 x 的值 */
       *x = *y   /* 将 y 值赋给 x */
       *y = temp /* 将 temp 值赋给 y*/

   }

   func main() {
       var a, b int = 1, 2
       /*
           调用 swap() 函数
           &a 指向 a 指针，a 变量的地址
           &b 指向 b 指针，b 变量的地址
       */
       swap(&a, &b)

       fmt.Println(a, b)
   }
   ```

   输出结果：

   ```
   2 1
   ```

在默认情况下，Go 语言使用的是值传递，即在调用过程中不会影响到实际参数。

> [!WARNING]
>
> 1. 无论是值传递，还是引用传递，传递给函数的都是变量的副本，不过，值传递是值的拷贝。引用传递是地址的拷贝，一般来说，地址拷贝更为高效。而值拷贝取决于拷贝的对象大小，对象越大，则性能越低。
> 2. `map`、`slice`、`chan`、指针、`interface` 默认以引用的方式传递。

不定参数传值 就是函数的参数不是固定的，后面的类型是固定的。（可变参数）

Golang 可变参数本质上就是 slice。只能有一个，且必须是最后一个。

在参数赋值时可以不用用一个一个的赋值，可以直接传递一个数组或者切片，特别注意的是在参数后加上 `…` 即可。

```go
func myfunc(args ...int) {    //0个或多个参数
}

func add(a int, args…int) int {    //1个或多个参数
}

func add(a int, b int, args…int) int {    //2个或多个参数
}
```

> [!TIP]
>
> 其中 `args` 是一个 `slice`，我们可以通过 `arg[index]` 依次访问所有参数,通过 `len(arg)` 来判断传递参数的个数.

任意类型的不定参数： 就是函数的参数和每个参数的类型都不是固定的。

用 `interface{}` 传递任意类型数据是 Go 语言的惯例用法，而且 `interface{}` 是类型安全的。

```go
func myfunc(args ...interface{}) {
  }
```

代码：

```go
package main

import (
    "fmt"
)

func test(s string, n ...int) string {
    var x int
    for _, i := range n {
        x += i
    }

    return fmt.Sprintf(s, x)
}

func main() {
    println(test("sum: %d", 1, 2, 3))
}
```

输出结果：

```
sum: 6
```

使用 `slice` 对象做变参时，必须展开。`（slice...）`

```go
package main

import (
    "fmt"
)

func test(s string, n ...int) string {
    var x int
    for _, i := range n {
        x += i
    }

    return fmt.Sprintf(s, x)
}

func main() {
    s := []int{1, 2, 3}
    res := test("sum: %d", s...)    // slice... 展开slice
    println(res)
}
```

### 函数返回值

`_` 标识符，用来忽略函数的某个返回值

Go 的返回值可以被命名，并且就像在函数体开头声明的变量那样使用。

返回值的名称应当具有一定的意义，可以作为文档使用。

没有参数的 `return` 语句返回各个返回变量的当前值。这种用法被称作“裸”返回。

直接返回语句仅应当用在像下面这样的短函数中。在长的函数中它们会影响代码的可读性。

```go
package main

import (
    "fmt"
)

func add(a, b int) (c int) {
    c = a + b
    return
}

func calc(a, b int) (sum int, avg int) {
    sum = a + b
    avg = (a + b) / 2

    return
}

func main() {
    var a, b int = 1, 2
    c := add(a, b)
    sum, avg := calc(a, b)
    fmt.Println(a, b, c, sum, avg)
}
```

输出结果：

```
1 2 3 3 1
```

Golang返回值不能用容器对象接收多返回值。只能用多个变量，或 `_` 忽略。

```go
package main

func test() (int, int) {
    return 1, 2
}

func main() {
    // s := make([]int, 2)
    // s = test()   // Error: multiple-value test() in single-value context

    x, _ := test()
    println(x)
}
```

输出结果：

```
1
```

多返回值可直接作为其他函数调用实参。

```go
package main

func test() (int, int) {
    return 1, 2
}

func add(x, y int) int {
    return x + y
}

func sum(n ...int) int {
    var x int
    for _, i := range n {
        x += i
    }

    return x
}

func main() {
    println(add(test()))
    println(sum(test()))
}
```

输出结果：

```
3
3
```

命名返回参数可看做与形参类似的局部变量，最后由 return 隐式返回。

```go
package main

func add(x, y int) (z int) {
    z = x + y
    return
}

func main() {
    println(add(1, 2))
}
```

输出结果：

```
3
```

命名返回参数可被同名局部变量遮蔽，此时需要显式返回。

```go
func add(x, y int) (z int) {
    { // 不能在一个级别，引发 "z redeclared in this block" 错误。
        var z = x + y
        // return   // Error: z is shadowed during return
        return z // 必须显式返回。
    }
}
```

命名返回参数允许 defer 延迟调用通过闭包读取和修改。

```go
package main

func add(x, y int) (z int) {
    defer func() {
        z += 100
    }()

    z = x + y
    return
}

func main() {
    println(add(1, 2))
}
```

输出结果：

```
103
```

显式 return 返回前，会先修改命名返回参数。

```go
package main

func add(x, y int) (z int) {
    defer func() {
        println(z) // 输出: 203
    }()

    z = x + y
    return z + 200 // 执行顺序: (z = z + 200) -> (call defer) -> (return)
}

func main() {
    println(add(1, 2)) // 输出: 203
}
```

输出结果：

```
203
203
```

### 匿名函数

在Go里面，函数可以像普通变量一样被传递或使用，Go语言支持随时在代码里定义匿名函数。

匿名函数由一个不带函数名的函数声明和函数体组成。匿名函数的优越性在于可以直接使用函数内的变量，不必申明。

```go
package main

import (
    "fmt"
    "math"
)

func main() {
    getSqrt := func(a float64) float64 {
        return math.Sqrt(a)
    }
    fmt.Println(getSqrt(4))
}
```

输出结果：

```
2
```

上面先定义了一个名为 `getSqrt` 的变量，初始化该变量时和之前的变量初始化有些不同，使用了 `func`，`func` 是定义函数的，可是这个函数和上面说的函数最大不同就是没有函数名，也就是匿名函数。这里将一个函数当做一个变量一样的操作。

### 闭包

```go
package main

import (
    "fmt"
)

func a() func() int {
    i := 0
    b := func() int {
        i++
        fmt.Println(i)
        return i
    }
    return b
}

func main() {
    c := a()
    c()
    c()
    c()

    a() //不会输出i
}
```

输出结果：

```
1
2
3
```

闭包复制的是原对象指针，这就很容易解释延迟引用现象。

```go
package main

import "fmt"

func test() func() {
    x := 100
    fmt.Printf("x (%p) = %d\n", &x, x)

    return func() {
        fmt.Printf("x (%p) = %d\n", &x, x)
    }
}

func main() {
    f := test()
    f()
}
```

输出:

```
x (0xc42007c008) = 100
x (0xc42007c008) = 100
```

在汇编层 ，`test` 实际返回的是 `FuncVal` 对象，其中包含了匿名函数地址、闭包对象指针。当调 匿名函数时，只需以某个寄存器传递该对象即可。

```
FuncVal { func_address, closure_var_pointer ... }
```

外部引用函数参数局部变量

```go
package main

import "fmt"

// 外部引用函数参数局部变量
func add(base int) func(int) int {
    return func(i int) int {
        base += i
        return base
    }
}

func main() {
    tmp1 := add(10)
    fmt.Println(tmp1(1), tmp1(2))
    // 此时tmp1和tmp2不是一个实体了
    tmp2 := add(100)
    fmt.Println(tmp2(1), tmp2(2))
}
```

返回2个闭包

```go
package main

import "fmt"

// 返回2个函数类型的返回值
func test01(base int) (func(int) int, func(int) int) {
    // 定义2个函数，并返回
    // 相加
    add := func(i int) int {
        base += i
        return base
    }
    // 相减
    sub := func(i int) int {
        base -= i
        return base
    }
    // 返回
    return add, sub
}

func main() {
    f1, f2 := test01(10)
    // base一直是没有消
    fmt.Println(f1(1), f2(2))
    // 此时base是9
    fmt.Println(f1(3), f2(4))
}
```

### 递归函数

递归，就是在运行的过程中调用自己。 一个函数调用自己，就叫做递归函数。

构成递归需具备的条件：

1. 子问题须与原始问题为同样的事，且更为简单。
2. 不能无限制地调用本身，须有个出口，化简为非递归状况处理。

#### 数字阶乘

一个正整数的阶乘（`factorial`）是所有小于及等于该数的正整数的积，并且 `0` 的阶乘为 `1`。自然数 `n` 的阶乘写作 `n!`。1808年，基斯顿·卡曼引进这个表示法。

```go
package main

import "fmt"

func factorial(i int) int {
    if i <= 1 {
        return 1
    }
    return i * factorial(i-1)
}

func main() {
    var i int = 7
    fmt.Printf("Factorial of %d is %d\n", i, factorial(i))
}
```

输出结果：

```
Factorial of 7 is 5040
```

#### 斐波那契数列

这个数列从第 `3` 项开始，每一项都等于前两项之和。

```go
package main

import "fmt"

func fibonaci(i int) int {
    if i == 0 {
        return 0
    }
    if i == 1 {
        return 1
    }
    return fibonaci(i-1) + fibonaci(i-2)
}

func main() {
    var i int
    for i = 0; i < 10; i++ {
        fmt.Printf("%d\n", fibonaci(i))
    }
}
```

输出结果：

```
0
1
1
2
3
5
8
13
21
34
```

### 延迟调用

> defer

#### defer 特性

1. 关键字 `defe`r 用于注册延迟调用。
2. 这些调用直到 `return` 前才被执。因此，可以用来做资源清理。
3. 多个 `defe` r语句，按先进后出的方式执行。
4. `defer` 语句中的变量，在 `defer` 声明时就决定了。

#### defer 用途

1. 关闭文件句柄
2. 锁资源释放
3. 数据库连接释放

同时 `defer` 是先进后出

这个很自然,后面的语句会依赖前面的资源，因此如果先前面的资源先释放了，后面的语句就没法执行了。

```go
package main

import "fmt"

func main() {
    var whatever [5]struct{}

    for i := range whatever {
        defer fmt.Println(i)
    }
}
```

输出结果：

```
4
3
2
1
0
```

#### defer 碰上闭包

```go
package main

import "fmt"

func main() {
    var whatever [5]struct{}
    for i := range whatever {
        defer func() { fmt.Println(i) }()
    }
}
```

输出结果：

```
    4
    4
    4
    4
    4
```

其实 `go` 说的很清楚：

Each time a "defer" statement executes, the function value and parameters to the call are evaluated as usualand saved a new but the actual function is not invoked.

也就是说函数正常执行，由于闭包用到的变量 `i` 在执行的时候已经变成 `4`，所以输出全都是 `4`。

#### defer f.Close

这个大家用的都很频繁，但是 go 语言编程举了一个可能一不小心会犯错的例子.

```go
package main

import "fmt"

type Test struct {
    name string
}

func (t *Test) Close() {
    fmt.Println(t.name, " closed")
}
func main() {
    ts := []Test{{"a"}, {"b"}, {"c"}}
    for _, t := range ts {
        defer t.Close()
    }
}
```

输出结果：

```
c  closed
c  closed
c  closed
```

这个输出并不会像我们预计的输出 `c b a`，而是输出 `c c c`。

可是按照前面的 `go spec` 中的说明,应该输出 `c b a` 才对啊。

那我们换一种方式来调用一下：

```go
package main

import "fmt"

type Test struct {
    name string
}

func (t *Test) Close() {
    fmt.Println(t.name, " closed")
}
func Close(t Test) {
    t.Close()
}
func main() {
    ts := []Test{{"a"}, {"b"}, {"c"}}
    for _, t := range ts {
        defer Close(t)
    }
}
```

输出结果：

```
c  closed
b  closed
a  closed
```

这个时候输出的就是 `c b a`

当然,如果你不想多写一个函数，也很简单，可以像下面这样，同样会输出 `c b a`：

```go
package main

import "fmt"

type Test struct {
    name string
}

func (t *Test) Close() {
    fmt.Println(t.name, " closed")
}
func main() {
    ts := []Test{{"a"}, {"b"}, {"c"}}
    for _, t := range ts {
        t2 := t
        defer t2.Close()
    }
}
```

输出结果：

```
c  closed
b  closed
a  closed
```

通过以上例子，结合

Each time a "defer" statement executes, the function value and parameters to the call are evaluated as usualand saved anew but the actual function is not invoked.

这句话。可以得出下面的结论：

`defer` 后面的语句在执行的时候，函数调用的参数会被保存起来，但是不执行。也就是复制了一份。但是并没有说 `struct` 这里的 `this` 指针如何处理，通过这个例子可以看出 `go` 语言并没有把这个明确写出来的 `this` 指针当作参数来看待。

#### 多个 defer 注册

按 FILO 次序执行 ( 先进后出 )。哪怕函数或某个延迟调用发生错误，这些调用依旧会被执行。

```go
package main

func test(x int) {
    defer println("a")
    defer println("b")

    defer func() {
        println(100 / x) // div0 异常未被捕获，逐步往外传递，最终终止进程。
    }()

    defer println("c")
}

func main() {
    test(0)
}
```

输出结果:

```
c
b
a
panic: runtime error: integer divide by zero
```

延迟调用参数在注册时求值或复制，可用指针或闭包 "延迟" 读取。

```go
package main

func test() {
    x, y := 10, 20

    defer func(i int) {
        println("defer:", i, y) // y 闭包引用
    }(x) // x 被复制

    x += 10
    y += 100
    println("x =", x, "y =", y)
}

func main() {
    test()
}
```

输出结果:

```
x = 20 y = 120
defer: 10 120
```

> [!WARNING]
>
> 滥用 `defer` 可能会导致性能问题，尤其是在一个 "大循环" 里。
>
> ```go
> package main
>
> import (
>     "fmt"
>     "sync"
>     "time"
> )
>
> var lock sync.Mutex
>
> func test() {
>     lock.Lock()
>     lock.Unlock()
> }
>
> func testdefer() {
>     lock.Lock()
>     defer lock.Unlock()
> }
>
> func main() {
>     func() {
>         t1 := time.Now()
>
>         for i := 0; i < 10000; i++ {
>             test()
>         }
>         elapsed := time.Since(t1)
>         fmt.Println("test elapsed: ", elapsed)
>     }()
>     func() {
>         t1 := time.Now()
>
>         for i := 0; i < 10000; i++ {
>             testdefer()
>         }
>         elapsed := time.Since(t1)
>         fmt.Println("testdefer elapsed: ", elapsed)
>     }()
>
> }
> ```
>
> 输出结果：
>
> ```
> test elapsed:  223.162µs
> testdefer elapsed:  781.304µs
> ```

#### 陷阱 - defer 与 closure

```go
package main

import (
    "errors"
    "fmt"
)

func foo(a, b int) (i int, err error) {
    defer fmt.Printf("first defer err %v\n", err)
    defer func(err error) { fmt.Printf("second defer err %v\n", err) }(err)
    defer func() { fmt.Printf("third defer err %v\n", err) }()
    if b == 0 {
        err = errors.New("divided by zero!")
        return
    }

    i = a / b
    return
}

func main() {
    foo(2, 0)
}
```

输出结果：

```
third defer err divided by zero!
second defer err <nil>
first defer err <nil>
```

解释：如果 `defer` 后面跟的不是一个 `closure` 最后执行的时候我们得到的并不是最新的值。

#### 陷阱 - defer 与 return

```go
package main

import "fmt"

func foo() (i int) {

    i = 0
    defer func() {
        fmt.Println(i)
    }()

    return 2
}

func main() {
    foo()
}
```

输出结果：

```
2
```

解释：在有具名返回值的函数中（这里具名返回值为 `i`），执行 `return 2` 的时候实际上已经将 `i` 的值重新赋值为 `2`。所以 `defer` `closure` 输出结果为 `2` 而不是 `1`。

#### 陷阱 - defer nil 函数

```go
package main

import (
    "fmt"
)

func test() {
    var run func() = nil
    defer run()
    fmt.Println("runs")
}

func main() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println(err)
        }
    }()
    test()
}
```

输出结果：

```
runs
runtime error: invalid memory address or nil pointer dereference
```

解释：名为 `test` 的函数一直运行至结束，然后 `defer` 函数会被执行且会因为值为 `nil` 而产生 `panic` 异常。然而值得注意的是，`run()` 的声明是没有问题，因为在 `test` 函数运行完成后它才会被调用。

#### 陷阱 - 在错误的位置使用 defer

当 `http.Get` 失败时会抛出异常。

```go
package main

import "net/http"

func do() error {
    res, err := http.Get("http://www.google.com")
    defer res.Body.Close()
    if err != nil {
        return err
    }

    // ..code...

    return nil
}

func main() {
    do()
}
```

输出结果：

```
panic: runtime error: invalid memory address or nil pointer dereference
```

因为在这里我们并没有检查我们的请求是否成功执行，当它失败的时候，我们访问了 `Body` 中的空变量 `res`，因此会抛出异常

解决方案：

总是在一次成功的资源分配下面使用 `defer` ，对于这种情况来说意味着：当且仅当 `http.Get` 成功执行时才使用 `defer`

```go
package main

import "net/http"

func do() error {
    res, err := http.Get("http://xxxxxxxxxx")
    if res != nil {
        defer res.Body.Close()
    }

    if err != nil {
        return err
    }

    // ..code...

    return nil
}

func main() {
    do()
}
```

在上述的代码中，当有错误的时候，`err` 会被返回，否则当整个函数返回的时候，会关闭 `res.Body` 。

解释：在这里，你同样需要检查 `res` 的值是否为 `nil`，这是 `http.Get` 中的一个警告。通常情况下，出错的时候，返回的内容应为空并且错误会被返回，可当你获得的是一个重定向 `error` 时， `res` 的值并不会为 `nil`，但其又会将错误返回。上面的代码保证了无论如何 `Body` 都会被关闭，如果你没有打算使用其中的数据，那么你还需要丢弃已经接收的数据。

### 异常处理

Golang 没有结构化异常，使用 `panic` 抛出错误，`recover` 捕获错误。

异常的使用场景简单描述：Go中可以抛出一个 `panic` 的异常，然后在 `defer` 中通过 `recover` 捕获这个异常，然后正常处理。

`panic`：

1. 内置函数
2. 假如函数F中书写了 `panic` 语句，会终止其后要执行的代码，在 `panic` 所在函数F内如果存在要执行的 `defer` 函数列表，按照 `defer` 的逆序执行
3. 返回函数F的调用者 `G`，在 `G` 中，调用函数F语句之后的代码不会执行，假如函数 `G` 中存在要执行的 `defer` 函数列表，按照 `defer` 的逆序执行
4. 直到 `goroutine` 整个退出，并报告错误

`recover`：

1. 内置函数
2. 用来控制一个 `goroutine` 的 `panicking` 行为，捕获 `panic`，从而影响应用的行为
3. 一般的调用建议：
   1. 在 `defer` 函数中，通过 `recever` 来终止一个 `goroutine` 的 `panicking` 过程，从而恢复正常代码的执行
   2. 可以获取通过 `panic` 传递的 `error`

> [!WARNING]
>
> 1. 利用 `recover` 处理 `panic` 指令，`defer` 必须放在 `panic` 之前定义，另外 > `recover` 只有在 `defer` 调用的函数中才有效。否则当 `panic` 时，`recover` 无法捕获> 到 `panic`，无法防止 `panic` 扩散。
> 2. `recover` 处理异常后，逻辑并不会恢复到 `panic` 那个点去，函数跑到 `defer` 之后的那> 个点。
> 3. 多个 `defer` 会形成 `defer` 栈，后定义的 `defer` 语句会被最先调用。

```go
package main

func main() {
    test()
}

func test() {
    defer func() {
        if err := recover(); err != nil {
            println(err.(string)) // 将 interface{} 转型为具体类型。
        }
    }()

    panic("panic error!")
}
```

输出结果：

```
panic error!
```

由于 `panic`、`recover` 参数类型为 `interface{}`，因此可抛出任何类型对象。

```go
func panic(v interface{})
func recover() interface{}
```

向已关闭的通道发送数据会引发 `panic`

```go
package main

import (
    "fmt"
)

func main() {
    defer func() {
        if err := recover(); err != nil {
            fmt.Println(err)
        }
    }()

    var ch chan int = make(chan int, 10)
    close(ch)
    ch <- 1
}
```

输出结果：

```
send on closed channel
```

延迟调用中引发的错误，可被后续延迟调用捕获，但仅最后一个错误可被捕获。

```go
package main

import "fmt"

func test() {
    defer func() {
        fmt.Println(recover())
    }()

    defer func() {
        panic("defer panic")
    }()

    panic("test panic")
}

func main() {
    test()
}
```

输出:

```
defer panic
```

捕获函数 `recover` 只有在延迟调用内直接调用才会终止错误，否则总是返回 `nil`。任何未捕获的错误都会沿调用堆栈向外传递。

```go
package main

import "fmt"

func test() {
    defer func() {
        fmt.Println(recover()) //有效
    }()
    defer recover()              //无效！
    defer fmt.Println(recover()) //无效！
    defer func() {
        func() {
            println("defer inner")
            recover() //无效！
        }()
    }()

    panic("test panic")
}

func main() {
    test()
}
```

输出:

```
defer inner
<nil>
test panic
```

使用延迟匿名函数或下面这样都是有效的。

```go
package main

import (
    "fmt"
)

func except() {
    fmt.Println(recover())
}

func test() {
    defer except()
    panic("test panic")
}

func main() {
    test()
}
```

输出结果：

```
test panic
```

如果需要保护代码 段，可将代码块重构成匿名函数，如此可确保后续代码被执 。

```go
package main

import "fmt"

func test(x, y int) {
    var z int

    func() {
        defer func() {
            if recover() != nil {
                z = 0
            }
        }()
        panic("test panic")
        z = x / y
        return
    }()

    fmt.Printf("x / y = %d\n", z)
}

func main() {
    test(2, 1)
}
```

输出结果：

```
x / y = 0
```

除用 `panic` 引发中断性错误外，还可返回 `error` 类型错误对象来表示函数调用状态。

```go
type error interface {
    Error() string
}
```

标准库 `errors.New` 和 `fmt.Errorf` 函数用于创建实现 `error` 接口的错误对象。通过判断错误对象实例来确定具体错误类型。

```go
package main

import (
    "errors"
    "fmt"
)

var ErrDivByZero = errors.New("division by zero")

func div(x, y int) (int, error) {
    if y == 0 {
        return 0, ErrDivByZero
    }
    return x / y, nil
}

func main() {
    defer func() {
        fmt.Println(recover())
    }()
    switch z, err := div(10, 0); err {
    case nil:
        println(z)
    case ErrDivByZero:
        panic(err)
    }
}
```

输出结果：

```
division by zero
```

Go 实现类似 `try catch` 的异常处理

```go
package main

import "fmt"

func Try(fun func(), handler func(interface{})) {
    defer func() {
        if err := recover(); err != nil {
            handler(err)
        }
    }()
    fun()
}

func main() {
    Try(func() {
        panic("test panic")
    }, func(err interface{}) {
        fmt.Println(err)
    })
}
```

输出结果：

```
test panic
```
