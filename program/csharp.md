# C#

## 基本语法

### _using_ 关键字

在任何 C# 程序中的第一条语句都是：

```
using System;
```

**using** 关键字用于在程序中包含命名空间。一个程序可以包含多个 using 语句。

### _class_ 关键字

**class** 关键字用于声明一个类。

### C# 中的注释

注释是用于解释代码。编译器会忽略注释的条目。在 C# 程序中，多行注释以 **/\*** 开始，并以字符 **\*/** 终止，如下所示：

```
/* 这个程序演示
C# 的注释
使用 */
```

单行注释是用 **//** 符号表示。例如：

```
// 这一行是注释
```

### 成员变量

变量是类的属性或数据成员，用于存储数据。在上面的程序中，`Rectangle` 类有两个成员变量，名为 `length` 和 `width`。

### 成员函数

函数是一系列执行指定任务的语句。类的成员函数是在类内声明的。我们举例的类 `Rectangle` 包含了三个成员函数： `AcceptDetails`、`GetArea` 和 `Display`。

## 实例化一个类

在上面的程序中，类 `ExecuteRectangle` 是一个包含 _Main()_ 方法和实例化 _Rectangle_ 类的类。

### 标识符

标识符是用来识别类、变量、函数或任何其它用户定义的项目。在 C# 中，类的命名必须遵循如下基本规则：

- 标识符必须以字母、下划线或 **@** 开头，后面可以跟一系列的字母、数字（ 0 - 9 ）、下划线（ \_ ）、@。
- 标识符中的第一个字符不能是数字。
- 标识符必须不包含任何嵌入的空格或符号，比如 ? - +! # % ^ & \* ( ) [ ] { } . ; : " ' / \。
- 标识符不能是 C# 关键字。除非它们有一个 @ 前缀。 例如，@if 是有效的标识符，但 if 不是，因为 if 是关键字。
- 标识符必须区分大小写。大写字母和小写字母被认为是不同的字母。
- 不能与C#的类库名称相同。

## 数据类型

| 类型      | 描述                                 | 范围                                                    | 默认值 |
| :-------- | :----------------------------------- | :------------------------------------------------------ | :----- |
| `bool`    | 布尔值                               | True 或 False                                           | False  |
| `byte`    | 8 位无符号整数                       | 0 到 255                                                | 0      |
| `char`    | 16 位 Unicode 字符                   | U +0000 到 U +ffff                                      | '\0'   |
| `decimal` | 128 位精确的十进制值，28-29 有效位数 | (-7.9 x 1028 到 7.9 x 1028) / 100 到 28                 | 0.0M   |
| `double`  | 64 位双精度浮点型                    | (+/-)5.0 x 10-324 到 (+/-)1.7 x 10308                   | 0.0D   |
| `float`   | 32 位单精度浮点型                    | -3.4 x 1038 到 + 3.4 x 1038                             | 0.0F   |
| `int`     | 32 位有符号整数类型                  | -2,147,483,648 到 2,147,483,647                         | 0      |
| `long`    | 64 位有符号整数类型                  | -9,223,372,036,854,775,808 到 9,223,372,036,854,775,807 | 0L     |
| `sbyte`   | 8 位有符号整数类型                   | -128 到 127                                             | 0      |
| `short`   | 16 位有符号整数类型                  | -32,768 到 32,767                                       | 0      |
| `uint`    | 32 位无符号整数类型                  | 0 到 4,294,967,295                                      | 0      |
| `ulong`   | 64 位无符号整数类型                  | 0 到 18,446,744,073,709,551,615                         | 0      |
| `ushort`  | 16 位无符号整数类型                  | 0 到 65,535                                             | 0      |

如需得到一个类型或一个变量在特定平台上的准确尺寸，可以使用 `sizeof` 方法。表达式 `sizeof(type)` 产生以字节为单位存储对象或类型的存储尺寸。

```c#
using System;

namespace DataTypeApplication
{
   class Program
   {
      static void Main(string[] args)
      {
         Console.WriteLine("Size of int: {0}", sizeof(int));
         Console.ReadLine();
      }
   }
}
```

## 类型转换

### 隐式类型转换

隐式转换是不需要编写代码来指定的转换，编译器会自动进行。

隐式转换是指将一个较小范围的数据类型转换为较大范围的数据类型时，编译器会自动完成类型转换，这些转换是 C# 默认的以安全方式进行的转换, 不会导致数据丢失。

例如，从 `int` 到 `long`，从 `float` 到 `double` 等。

### 显式转换

显式类型转换，即强制类型转换，需要程序员在代码中明确指定。

显式转换是指将一个较大范围的数据类型转换为较小范围的数据类型时，或者将一个对象类型转换为另一个对象类型时，需要使用强制类型转换符号进行显示转换，强制转换会造成数据丢失。

```c#
double doubleValue = 3.14;
int intValue = (int)doubleValue; // 强制从 double 到 int，数据可能损失小数部分
```

## 变量

### 变量定义的语法

```c#
<data_type> <variable_list>;
```

如：

```c#
int i, j, k;
char c, ch;
float f, salary;
double d;
```

### 变量的命名规则

在 C# 中，变量的命名需要遵循一些规则：

- 变量名可以包含字母、数字和下划线。
- 变量名必须以字母或下划线开头。
- 变量名区分大小写。
- 避免使用 C# 的关键字作为变量名。

### 变量初始化

```c#
<data_type> <variable_name> = value;
```

如：

```c#
int d = 3, f = 5;    /* 初始化 d 和 f. */
byte z = 22;         /* 初始化 z. */
double pi = 3.14159; /* 声明 pi 的近似值 */
char x = 'x';        /* 变量 x 的值为 'x' */
```

## 常量

### 定义常量

常量是使用 **const** 关键字来定义的 。定义一个常量的语法如下：

```c#
const <data_type> <constant_name> = value;
```

### 实例

```c#
using System;

public class ConstTest
{
    class SampleClass
    {
        public int x;
        public int y;
        public const int c1 = 5;
        public const int c2 = c1 + 5;

        public SampleClass(int p1, int p2)
        {
            x = p1;
            y = p2;
        }
    }

    static void Main()
    {
        SampleClass mC = new SampleClass(11, 22);
        Console.WriteLine("x = {0}, y = {1}", mC.x, mC.y);
        Console.WriteLine("c1 = {0}, c2 = {1}", SampleClass.c1, SampleClass.c2);
    }
}
```

当上面的代码被编译和执行时，它会产生下列结果：

```
x = 11, y = 22
c1 = 5, c2 = 10
```

## 运算符

### 算术运算符

下表显示了 C# 支持的所有算术运算符。假设变量 **A** 的值为 10，变量 **B** 的值为 20，则：

| 运算符 | 描述                             | 实例              |
| :----- | :------------------------------- | :---------------- |
| `+`    | 把两个操作数相加                 | A + B 将得到 30   |
| `-`    | 从第一个操作数中减去第二个操作数 | A - B 将得到 -10  |
| `*`    | 把两个操作数相乘                 | A \* B 将得到 200 |
| `/`    | 分子除以分母                     | B / A 将得到 2    |
| `%`    | 取模运算符，整除后的余数         | B % A 将得到 0    |
| `++`   | 自增运算符，整数值增加 1         | A++ 将得到 11     |
| `--`   | 自减运算符，整数值减少 1         | A-- 将得到 9      |

### 关系运算符

下表显示了 C# 支持的所有关系运算符。假设变量 **A** 的值为 10，变量 **B** 的值为 20，则：

| 运算符 | 描述                                                           | 实例              |
| :----- | :------------------------------------------------------------- | :---------------- |
| `==`   | 检查两个操作数的值是否相等，如果相等则条件为真。               | (A == B) 不为真。 |
| `!=`   | 检查两个操作数的值是否相等，如果不相等则条件为真。             | (A != B) 为真。   |
| `>`    | 检查左操作数的值是否大于右操作数的值，如果是则条件为真。       | (A > B) 不为真。  |
| `<`    | 检查左操作数的值是否小于右操作数的值，如果是则条件为真。       | (A < B) 为真。    |
| `>=`   | 检查左操作数的值是否大于或等于右操作数的值，如果是则条件为真。 | (A >= B) 不为真。 |
| `<=`   | 检查左操作数的值是否小于或等于右操作数的值，如果是则条件为真。 | (A <= B) 为真。   |

### 逻辑运算符

下表显示了 C# 支持的所有逻辑运算符。假设变量 **A** 为布尔值 true，变量 **B** 为布尔值 false，则：

| 运算符 | 描述                                                                               | 实例                |
| :----- | :--------------------------------------------------------------------------------- | :------------------ |
| `&&`   | 称为逻辑与运算符。如果两个操作数都非零，则条件为真。                               | `(A && B)` 为假。   |
| `\|\|` | 称为逻辑或运算符。如果两个操作数中有任意一个非零，则条件为真。                     | `(A \|\| B)` 为真。 |
| `!`    | 称为逻辑非运算符。用来逆转操作数的逻辑状态。如果条件为真则逻辑非运算符将使其为假。 | `!(A && B)` 为真。  |

### 位运算符

位运算符作用于位，并逐位执行操作。`&`、`|` 和 `^` 的真值表如下所示：

| `p` | `q` | `p & q` | `p \| q` | `p ^ q` |
| :-- | :-- | :------ | :------- | :------ |
| 0   | 0   | 0       | 0        | 0       |
| 0   | 1   | 0       | 1        | 1       |
| 1   | 1   | 1       | 1        | 0       |
| 1   | 0   | 0       | 1        | 1       |

下表列出了 C# 支持的位运算符。假设变量 **A** 的值为 60，变量 **B** 的值为 13，则：

| 运算符 | 描述                                                                                     | 实例                                                             |
| :----- | :--------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `&`    | 如果同时存在于两个操作数中，二进制 AND 运算符复制一位到结果中。                          | (A & B) 将得到 12，即为 0000 1100                                |
| `\|`   | 如果存在于任一操作数中，二进制 OR 运算符复制一位到结果中。                               | (A \| B) 将得到 61，即为 0011 1101                               |
| `^`    | 如果存在于其中一个操作数中但不同时存在于两个操作数中，二进制异或运算符复制一位到结果中。 | (A ^ B) 将得到 49，即为 0011 0001                                |
| `~`    | 按位取反运算符是一元运算符，具有"翻转"位效果，即0变成1，1变成0，包括符号位。             | (~A ) 将得到 -61，即为 1100 0011，一个有符号二进制数的补码形式。 |
| `<<`   | 二进制左移运算符。左操作数的值向左移动右操作数指定的位数。                               | A << 2 将得到 240，即为 1111 0000                                |
| `>>`   | 二进制右移运算符。左操作数的值向右移动右操作数指定的位数。                               | A >> 2 将得到 15，即为 0000 1111                                 |

### 赋值运算符

| 运算符 | 描述                                                             | 实例                            |
| :----- | :--------------------------------------------------------------- | :------------------------------ |
| `=`    | 简单的赋值运算符，把右边操作数的值赋给左边操作数                 | C = A + B 将把 A + B 的值赋给 C |
| `+=`   | 加且赋值运算符，把右边操作数加上左边操作数的结果赋值给左边操作数 | C += A 相当于 C = C + A         |
| `-=`   | 减且赋值运算符，把左边操作数减去右边操作数的结果赋值给左边操作数 | C -= A 相当于 C = C - A         |
| `*=`   | 乘且赋值运算符，把右边操作数乘以左边操作数的结果赋值给左边操作数 | C _= A 相当于 C = C _ A         |
| `/=`   | 除且赋值运算符，把左边操作数除以右边操作数的结果赋值给左边操作数 | C /= A 相当于 C = C / A         |
| `%=`   | 求模且赋值运算符，求两个操作数的模赋值给左边操作数               | C %= A 相当于 C = C % A         |
| `<<=`  | 左移且赋值运算符                                                 | C <<= 2 等同于 C = C << 2       |
| `>>=`  | 右移且赋值运算符                                                 | C >>= 2 等同于 C = C >> 2       |
| `&=`   | 按位与且赋值运算符                                               | C &= 2 等同于 C = C & 2         |
| `^=`   | 按位异或且赋值运算符                                             | C ^= 2 等同于 C = C ^ 2         |
| `\|=`  | 按位或且赋值运算符                                               | C \|= 2 等同于 C = C \| 2       |

### 其他运算符

| 运算符     | 描述                                   | 实例                                                                          |
| :--------- | :------------------------------------- | :---------------------------------------------------------------------------- |
| `sizeof()` | 返回数据类型的大小。                   | sizeof(int)，将返回 4.                                                        |
| `typeof()` | 返回 class 的类型。                    | typeof(StreamReader);                                                         |
| `&`        | 返回变量的地址。                       | &a; 将得到变量的实际地址。                                                    |
| `*`        | 变量的指针。                           | \*a; 将指向一个变量。                                                         |
| `? :`      | 条件表达式                             | 如果条件为真 ? 则为 X : 否则为 Y                                              |
| `is`       | 判断对象是否为某一类型。               | If( Ford is Car) // 检查 Ford 是否是 Car 类的一个对象。                       |
| `as`       | 强制转换，即使转换失败也不会抛出异常。 | Object obj = new StringReader("Hello"); StringReader r = obj as StringReader; |

### 运算符优先级

**优先级简易概括**：有括号先括号，后乘除在加减，然后位移再关系，逻辑完后条件，最后一个逗号 `,`。

## 判断

### 判断语句

C# 提供了以下类型的判断语句。点击链接查看每个语句的细节。

#### if 语句

一个 `if` 语句由一个布尔表达式后跟一个或多个语句组成。

```c#
if(boolean_expression)
{
   /* 如果布尔表达式为真将执行的语句 */
}
```

#### if...else 语句

一个 `if` 语句后可跟一个可选的 `else` 语句，`else` 语句在布尔表达式为假时执行。

```c#
if(boolean_expression)
{
   /* 如果布尔表达式为真将执行的语句 */
}
else
{
  /* 如果布尔表达式为假将执行的语句 */
}
```

#### 嵌套 if 语句

在一个 `if` 或 `else if` 语句内使用另一个 `if` 或 `else if` 语句。

```c#
if( boolean_expression 1)
{
   /* 当布尔表达式 1 为真时执行 */
   if(boolean_expression 2)
   {
      /* 当布尔表达式 2 为真时执行 */
   }
}
```

#### switch 语句

一个 `switch` 语句允许测试一个变量等于多个值时的情况。

```c#
switch(expression){
    case constant-expression  :
       statement(s);
       break;
    case constant-expression  :
       statement(s);
       break;

    /* 您可以有任意数量的 case 语句 */
    default : /* 可选的 */
       statement(s);
       break;
}
```

#### 嵌套 switch 语句

在一个 `switch` 语句内使用另一个 `switch` 语句。

```c#
switch(ch1)
{
   case 'A':
      printf("这个 A 是外部 switch 的一部分" );
      switch(ch2)
      {
         case 'A':
            printf("这个 A 是内部 switch 的一部分" );
            break;
         case 'B': /* 内部 B case 代码 */
      }
      break;
   case 'B': /* 外部 B case 代码 */
}
```

### ? : 运算符

我们已经在前面的章节中讲解了条件运算符 `? :`，可以用来替代 `if...else` 语句。它的一般形式如下：

```
Exp1 ? Exp2 : Exp3;
```

其中，Exp1、Exp2 和 Exp3 是表达式。请注意，冒号的使用和位置。

`? ` 表达式的值是由 `Exp1` 决定的。如果 `Exp1` 为真，则计算 `Exp2` 的值，结果即为整个 `?` 表达式的值。如果 `Exp1` 为假，则计算 `Exp3` 的值，结果即为整个 `?` 表达式的值。

## 循环

### 循环类型

#### while 循环

当给定条件为真时，重复语句或语句组。它会在执行循环主体之前测试条件。

```c#
while (condition)
{
   statement(s);
}
```

#### for 循环

```c#
for ( init; condition; increment )
{
   statement(s);
}
```

`for` 循环的控制流：

1. `init` 会首先被执行，且只会执行一次。这一步允许您声明并初始化任何循环控制变量。您也可以不在这里写任何语句，只要有一个分号出现即可。
2. 接下来，会判断 `condition`。如果为真，则执行循环主体。如果为假，则不执行循环主体，且控制流会跳转到紧接着 `for` 循环的下一条语句。
3. 在执行完 `for` 循环主体后，控制流会跳回上面的 `increment` 语句。该语句允许您更新循环控制变量。该语句可以留空，只要在条件后有一个分号出现即可。
4. 条件再次被判断。如果为真，则执行循环，这个过程会不断重复（循环主体，然后增加步值，再然后重新判断条件）。在条件变为假时，`for` 循环终止。

```c#
using System;

namespace Loops
{

    class Program
    {
        static void Main(string[] args)
        {
            /* for 循环执行 */
            for (int a = 10; a < 20; a = a + 1)
            {
                Console.WriteLine("a 的值： {0}", a);
            }
            Console.ReadLine();
        }
    }
}
```

#### foreach 循环

C# 的 `foreach` 循环可以用来遍历集合类型，例如数组、列表、字典等。它是一个简化版的 for 循环，使得代码更加简洁易读。

```c#
foreach (var item in collection)
{
    // 循环
}
```

#### do...while 循环

```c#
do
{
   statement(s);

} while ( condition );
```

循环中的 `statement(s)` 会在条件被测试之前至少执行一次。

### 循环控制语句

| 控制语句   | 描述                                                                                   |
| :--------- | :------------------------------------------------------------------------------------- |
| `break`    | 终止 **loop** 或 **switch** 语句，程序流将继续执行紧接着 loop 或 switch 的下一条语句。 |
| `continue` | 跳过本轮循环，开始下一轮循环。                                                         |

## 封装

**封装** 被定义为"把一个或多个项目封闭在一个物理的或者逻辑的包中"。在面向对象程序设计方法论中，封装是为了防止对实现细节的访问。

抽象和封装是面向对象程序设计的相关特性。抽象允许相关信息可视化，封装则使开发者*实现所需级别的抽象*。

C# 封装根据具体的需要，设置使用者的访问权限，并通过 **访问修饰符** 来实现。

一个 **访问修饰符** 定义了一个类成员的范围和可见性。C# 支持的访问修饰符如下所示：

- `public`：所有对象都可以访问；
- `private`：对象本身在对象内部可以访问；
- `protected`：只有该类对象及其子类对象可以访问
- `internal`：同一个程序集的对象可以访问；
- `protected internal`：访问限于当前程序集或派生自包含类的类型。

## 可空类型

#### 单问号 ?

`?` 单问号用于对 `int`、`double`、`bool` 等无法直接赋值为 _null_ 的数据类型进行 _null_ 的赋值，意思是这个数据类型是 _Nullable_ 类型的。

```
int? i = 3;
```

等同于：

```
Nullable<int> i = new Nullable<int>(3);
int i; //默认值0
int? ii; //默认值null
```

#### 双问号 ??

`??` 双问号用于判断一个变量在为 _null_ 的时候返回一个指定的值。

## 数组（Array）

### 初始化数组

声明一个数组不会在内存中初始化数组。当初始化数组变量时，您可以赋值给数组。

数组是一个引用类型，所以您需要使用 **new** 关键字来创建数组的实例。

例如：

```c#
double[] balance = new double[10];
```

### 赋值给数组

您可以通过使用索引号赋值给一个单独的数组元素，比如：

```c#
double[] balance = new double[10];
balance[0] = 4500.0;
```

您可以在声明数组的同时给数组赋值，比如：

```c#
double[] balance = { 2340.0, 4523.69, 3421.0};
```

您也可以创建并初始化一个数组，比如：

```c#
int [] marks = new int[5]  { 99,  98, 92, 97, 95};
```

在上述情况下，你也可以省略数组的大小，比如：

```c#
int [] marks = new int[]  { 99,  98, 92, 97, 95};
```

您也可以赋值一个数组变量到另一个目标数组变量中。在这种情况下，目标和源会指向相同的内存位置：

```c#
int [] marks = new int[]  { 99,  98, 92, 97, 95};
int[] score = marks;
```

当您创建一个数组时，C# 编译器会根据数组类型隐式初始化每个数组元素为一个默认值。例如，`int` 数组的所有元素都会被初始化为 `0`。

### 访问数组元素

元素是通过带索引的数组名称来访问的。这是通过把元素的索引放置在数组名称后的方括号中来实现的。例如：

```c#
double salary = balance[9];
```

下面是一个实例，使用上面提到的三个概念，即声明、赋值、访问数组：

### 实例

```c#
using System;
namespace ArrayApplication
{
   class MyArray
   {
      static void Main(string[] args)
      {
         int []  n = new int[10]; /* n 是一个带有 10 个整数的数组 */
         int i,j;


         /* 初始化数组 n 中的元素 */
         for ( i = 0; i < 10; i++ )
         {
            n[ i ] = i + 100;
         }

         /* 输出每个数组元素的值 */
         for (j = 0; j < 10; j++ )
         {
            Console.WriteLine("Element[{0}] = {1}", j, n[j]);
         }
         Console.ReadKey();
      }
   }
}
```

## 结构体（Struct）

### 定义结构体

为了定义一个结构体，您必须使用 `struct` 语句。

`struct` 语句为程序定义了一个带有多个成员的新的数据类型。

例如，您可以按照如下的方式声明 `Book` 结构：

```c#
struct Books
{
   public string title;
   public string author;
   public string subject;
   public int book_id;
};
```

### 实例

```c#
using System;
using System.Text;

struct Books
{
   public string title;
   public string author;
   public string subject;
   public int book_id;
};

public class testStructure
{
   public static void Main(string[] args)
   {

      Books Book1;        /* 声明 Book1，类型为 Books */
      Books Book2;        /* 声明 Book2，类型为 Books */

      /* book 1 详述 */
      Book1.title = "C Programming";
      Book1.author = "Nuha Ali";
      Book1.subject = "C Programming Tutorial";
      Book1.book_id = 6495407;

      /* book 2 详述 */
      Book2.title = "Telecom Billing";
      Book2.author = "Zara Ali";
      Book2.subject =  "Telecom Billing Tutorial";
      Book2.book_id = 6495700;

      /* 打印 Book1 信息 */
      Console.WriteLine( "Book 1 title : {0}", Book1.title);
      Console.WriteLine("Book 1 author : {0}", Book1.author);
      Console.WriteLine("Book 1 subject : {0}", Book1.subject);
      Console.WriteLine("Book 1 book_id :{0}", Book1.book_id);

      /* 打印 Book2 信息 */
      Console.WriteLine("Book 2 title : {0}", Book2.title);
      Console.WriteLine("Book 2 author : {0}", Book2.author);
      Console.WriteLine("Book 2 subject : {0}", Book2.subject);
      Console.WriteLine("Book 2 book_id : {0}", Book2.book_id);

      Console.ReadKey();

   }
}
```

## 枚举（Enum）

### 声明 _enum_ 变量

声明枚举的一般语法：

```c#
enum <enum_name>
{
    enumeration list
};
```

其中，

- _enum_name_ 指定枚举的类型名称。
- _enumeration list_ 是一个用逗号分隔的标识符列表。

### 实例

```c#
using System;

public class EnumTest
{
    enum Day { Sun, Mon, Tue, Wed, Thu, Fri, Sat };

    static void Main()
    {
        int x = (int)Day.Sun;
        int y = (int)Day.Fri;
        Console.WriteLine("Sun = {0}", x);
        Console.WriteLine("Fri = {0}", y);
    }
}
```

## 类（Class）

### 基础

```c#
class Box
{
   public double length;   // 长度
   public double breadth;  // 宽度
   public double height;   // 高度
}
```

### 成员函数和封装

```c#
using System;
namespace BoxApplication
{
    class Box
    {
       private double length;   // 长度
       private double breadth;  // 宽度
       private double height;   // 高度
       public void setLength( double len )
       {
            length = len;
       }

       public void setBreadth( double bre )
       {
            breadth = bre;
       }

       public void setHeight( double hei )
       {
            height = hei;
       }
       public double getVolume()
       {
           return length * breadth * height;
       }
    }
    class Boxtester
    {
        static void Main(string[] args)
        {
            Box Box1 = new Box();        // 声明 Box1，类型为 Box
            Box Box2 = new Box();        // 声明 Box2，类型为 Box
            double volume;               // 体积


            // Box1 详述
            Box1.setLength(6.0);
            Box1.setBreadth(7.0);
            Box1.setHeight(5.0);

            // Box2 详述
            Box2.setLength(12.0);
            Box2.setBreadth(13.0);
            Box2.setHeight(10.0);

            // Box1 的体积
            volume = Box1.getVolume();
            Console.WriteLine("Box1 的体积： {0}" ,volume);

            // Box2 的体积
            volume = Box2.getVolume();
            Console.WriteLine("Box2 的体积： {0}", volume);

            Console.ReadKey();
        }
    }
}
```

### 构造函数

#### 默认构造函数

```c#
using System;
namespace LineApplication
{
   class Line
   {
      private double length;   // 线条的长度
      public Line()
      {
         Console.WriteLine("对象已创建");
      }

      public void setLength( double len )
      {
         length = len;
      }
      public double getLength()
      {
         return length;
      }

      static void Main(string[] args)
      {
         Line line = new Line();
         // 设置线条长度
         line.setLength(6.0);
         Console.WriteLine("线条的长度： {0}", line.getLength());
         Console.ReadKey();
      }
   }
}
```

#### 参数化构造函数

```c#
using System;
namespace LineApplication
{
   class Line
   {
      private double length;   // 线条的长度
      public Line(double len)  // 参数化构造函数
      {
         Console.WriteLine("对象已创建，length = {0}", len);
         length = len;
      }

      public void setLength( double len )
      {
         length = len;
      }
      public double getLength()
      {
         return length;
      }

      static void Main(string[] args)
      {
         Line line = new Line(10.0);
         Console.WriteLine("线条的长度： {0}", line.getLength());
         // 设置线条长度
         line.setLength(6.0);
         Console.WriteLine("线条的长度： {0}", line.getLength());
         Console.ReadKey();
      }
   }
}
```

### 析构函数

类的 **析构函数** 是类的一个特殊的成员函数，当类的对象超出范围时执行。

析构函数的名称是在类的名称前加上一个波浪形（~）作为前缀，它不返回值，也不带任何参数。

析构函数用于在结束程序（比如关闭文件、释放内存等）之前释放资源。析构函数不能继承或重载。

```c#
using System;
namespace LineApplication
{
   class Line
   {
      private double length;   // 线条的长度
      public Line()  // 构造函数
      {
         Console.WriteLine("对象已创建");
      }
      ~Line() //析构函数
      {
         Console.WriteLine("对象已删除");
      }

      public void setLength( double len )
      {
         length = len;
      }
      public double getLength()
      {
         return length;
      }

      static void Main(string[] args)
      {
         Line line = new Line();
         // 设置线条长度
         line.setLength(6.0);
         Console.WriteLine("线条的长度： {0}", line.getLength());
      }
   }
}
```

### 静态成员

使用 **static** 关键字把类成员定义为静态的。当我们声明一个类成员为静态时，意味着无论有多少个类的对象被创建，只会有一个该静态成员的副本。

关键字 **static** 意味着类中只有一个该成员的实例。静态变量用于定义常量，因为它们的值可以通过直接调用类而不需要创建类的实例来获取。静态变量可在成员函数或类的定义外部进行初始化。你也可以在类的定义内部初始化静态变量。

```c#
using System;
namespace StaticVarApplication
{
    class StaticVar
    {
       public static int num;
        public void count()
        {
            num++;
        }
        public int getNum()
        {
            return num;
        }
    }
    class StaticTester
    {
        static void Main(string[] args)
        {
            StaticVar s1 = new StaticVar();
            StaticVar s2 = new StaticVar();
            s1.count();
            s1.count();
            s1.count();
            s2.count();
            s2.count();
            s2.count();
            Console.WriteLine("s1 的变量 num： {0}", s1.getNum());
            Console.WriteLine("s2 的变量 num： {0}", s2.getNum());
            Console.ReadKey();
        }
    }
}
```

## 继承

### 基类和派生类

一个类可以继承自另一个类，被称为基类（父类）和派生类（子类）。

派生类会继承基类的成员（字段、方法、属性等），除非它们被明确地标记为私有（private）。

派生类可以通过关键字base来调用基类的构造函数和方法。

> [!TIP]
>
> 一个类可以继承多个接口，但只能继承自一个类。

```c#
<访问修饰符> class <基类>
{
 // ...
}
class <派生类> : <基类>
{
 // ...
}
```

```c#
using System;
namespace InheritanceApplication
{
   class Shape
   {
      public void setWidth(int w)
      {
         width = w;
      }
      public void setHeight(int h)
      {
         height = h;
      }
      protected int width;
      protected int height;
   }

   // 派生类
   class Rectangle: Shape
   {
      public int getArea()
      {
         return (width * height);
      }
   }

   class RectangleTester
   {
      static void Main(string[] args)
      {
         Rectangle Rect = new Rectangle();

         Rect.setWidth(5);
         Rect.setHeight(7);

         // 打印对象的面积
         Console.WriteLine("总面积： {0}",  Rect.getArea());
         Console.ReadKey();
      }
   }
}
```

### 基类的初始化

```c#
using System;
namespace RectangleApplication
{
   class Rectangle
   {
      // 成员变量
      protected double length;
      protected double width;
      public Rectangle(double l, double w)
      {
         length = l;
         width = w;
      }
      public double GetArea()
      {
         return length * width;
      }
      public void Display()
      {
         Console.WriteLine("长度： {0}", length);
         Console.WriteLine("宽度： {0}", width);
         Console.WriteLine("面积： {0}", GetArea());
      }
   }//end class Rectangle
   class Tabletop : Rectangle
   {
      private double cost;
      public Tabletop(double l, double w) : base(l, w)
      { }
      public double GetCost()
      {
         double cost;
         cost = GetArea() * 70;
         return cost;
      }
      public void Display()
      {
         base.Display();
         Console.WriteLine("成本： {0}", GetCost());
      }
   }
   class ExecuteRectangle
   {
      static void Main(string[] args)
      {
         Tabletop t = new Tabletop(4.5, 7.5);
         t.Display();
         Console.ReadLine();
      }
   }
}
```

### 继承接口

一个接口可以继承自一个或多个其他接口，派生接口继承了基接口的所有成员。

```c#
interface IBaseInterface
{
    void Method1();
}

interface IDerivedInterface : IBaseInterface
{
    void Method2();
}
```

```c#
using System;

// 定义一个基接口
interface IBaseInterface
{
    void Method1();
}

// 定义一个派生接口，继承自基接口
interface IDerivedInterface : IBaseInterface
{
    void Method2();
}

// 实现派生接口的类
class MyClass : IDerivedInterface
{
    public void Method1()
    {
        Console.WriteLine("Method1 implementation");
    }

    public void Method2()
    {
        Console.WriteLine("Method2 implementation");
    }
}

class Program
{
    static void Main(string[] args)
    {
        // 创建 MyClass 类的实例
        MyClass obj = new MyClass();

        // 调用继承自基接口的方法
        obj.Method1();

        // 调用派生接口新增的方法
        obj.Method2();
    }
}
```

### 多重继承

**C# 不支持多重继承**。但是，您可以使用接口来实现多重继承。下面的程序演示了这点：

```c#
using System;
namespace InheritanceApplication
{
   class Shape
   {
      public void setWidth(int w)
      {
         width = w;
      }
      public void setHeight(int h)
      {
         height = h;
      }
      protected int width;
      protected int height;
   }

   // 基类 PaintCost
   public interface PaintCost
   {
      int getCost(int area);

   }
   // 派生类
   class Rectangle : Shape, PaintCost
   {
      public int getArea()
      {
         return (width * height);
      }
      public int getCost(int area)
      {
         return area * 70;
      }
   }
   class RectangleTester
   {
      static void Main(string[] args)
      {
         Rectangle Rect = new Rectangle();
         int area;
         Rect.setWidth(5);
         Rect.setHeight(7);
         area = Rect.getArea();
         // 打印对象的面积
         Console.WriteLine("总面积： {0}",  Rect.getArea());
         Console.WriteLine("油漆总成本： ${0}" , Rect.getCost(area));
         Console.ReadKey();
      }
   }
}
```

## 多态性

多态是同一个行为具有多个不同表现形式或形态的能力。

**多态性**意味着有多重形式。在面向对象编程范式中，多态性往往表现为"一个接口，多个功能"。

### 静态多态性

在编译时，函数和对象的连接机制被称为早期绑定，也被称为静态绑定。C# 提供了两种技术来实现静态多态性。分别为：

- 函数重载
- 运算符重载

### 函数重载

在同一个范围内对相同的函数名有多个定义。函数的定义必须彼此不同，可以是参数列表中的参数类型不同，也可以是参数个数不同。不同重载只有返回类型不同的函数声明。

```c#
using System;
namespace PolymorphismApplication
{
    public class TestData
    {
        public int Add(int a, int b, int c)
        {
            return a + b + c;
        }
        public int Add(int a, int b)
        {
            return a + b;
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            TestData dataClass = new TestData();
            int add1 = dataClass.Add(1, 2);
            int add2 = dataClass.Add(1, 2, 3);

            Console.WriteLine("add1 :" + add1);
            Console.WriteLine("add2 :" + add2);
        }
    }
}
```

```c#
using System;
namespace PolymorphismApplication
{
   class Printdata
   {
      void print(int i)
      {
         Console.WriteLine("输出整型: {0}", i );
      }

      void print(double f)
      {
         Console.WriteLine("输出浮点型: {0}" , f);
      }

      void print(string s)
      {
         Console.WriteLine("输出字符串: {0}", s);
      }
      static void Main(string[] args)
      {
         Printdata p = new Printdata();
         // 调用 print 来打印整数
         p.print(1);
         // 调用 print 来打印浮点数
         p.print(1.23);
         // 调用 print 来打印字符串
         p.print("Hello Runoob");
         Console.ReadKey();
      }
   }
}
```

### 动态多态性

使用关键字 `abstract` 创建抽象类，用于提供接口的部分类的实现。当一个派生类继承自该抽象类时，实现即完成。**抽象类**包含抽象方法，抽象方法可被派生类实现。派生类具有更专业的功能。

请注意，下面是有关抽象类的一些规则：

- 您不能创建一个抽象类的实例。
- 您不能在一个抽象类外部声明一个抽象方法。
- 通过在类定义前面放置关键字 `sealed`，可以将类声明为**密封类**。当一个类被声明为 `sealed` 时，它不能被继承。抽象类不能被声明为 `sealed`。

```c#
using System;
namespace PolymorphismApplication
{
   abstract class Shape
   {
       abstract public int area();
   }
   class Rectangle:  Shape
   {
      private int length;
      private int width;
      public Rectangle( int a=0, int b=0)
      {
         length = a;
         width = b;
      }
      public override int area ()
      {
         Console.WriteLine("Rectangle 类的面积：");
         return (width * length);
      }
   }

   class RectangleTester
   {
      static void Main(string[] args)
      {
         Rectangle r = new Rectangle(10, 7);
         double a = r.area();
         Console.WriteLine("面积： {0}",a);
         Console.ReadKey();
      }
   }
}
```

当有一个定义在类中的函数需要在继承类中实现时，可以使用**虚方法**。

虚方法是使用关键字 `virtual` 声明的。

虚方法可以在不同的继承类中有不同的实现。

对虚方法的调用是在运行时发生的。

动态多态性是通过 **抽象类** 和 **虚方法** 实现的。

以下实例创建了 Shape 基类，并创建派生类 Circle、 Rectangle、Triangle， Shape 类提供一个名为 Draw 的虚拟方法，在每个派生类中重写该方法以绘制该类的指定形状。

```c#
using System;
using System.Collections.Generic;

public class Shape
{
    public int X { get; private set; }
    public int Y { get; private set; }
    public int Height { get; set; }
    public int Width { get; set; }

    // 虚方法
    public virtual void Draw()
    {
        Console.WriteLine("执行基类的画图任务");
    }
}

class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("画一个圆形");
        base.Draw();
    }
}
class Rectangle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("画一个长方形");
        base.Draw();
    }
}
class Triangle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("画一个三角形");
        base.Draw();
    }
}

class Program
{
    static void Main(string[] args)
    {
        // 创建一个 List<Shape> 对象，并向该对象添加 Circle、Triangle 和 Rectangle
        var shapes = new List<Shape>
        {
            new Rectangle(),
            new Triangle(),
            new Circle()
        };

        // 使用 foreach 循环对该列表的派生类进行循环访问，并对其中的每个 Shape 对象调用 Draw 方法
        foreach (var shape in shapes)
        {
            shape.Draw();
        }

        Console.WriteLine("按下任意键退出。");
        Console.ReadKey();
    }

}
```

## 运算符重载

可以重定义或重载 C# 中内置的运算符。因此，程序员也可以使用用户自定义类型的运算符。重载运算符是具有特殊名称的函数，是通过关键字* **operator** *后跟运算符的符号来定义的。与其他函数一样，重载运算符有返回类型和参数列表。\*

```c#
public static Box operator+ (Box b, Box c)
{
   Box box = new Box();
   box.length = b.length + c.length;
   box.breadth = b.breadth + c.breadth;
   box.height = b.height + c.height;
   return box;
}
```

_上面的函数为用户自定义的类 Box 实现了加法运算符（+）。它把两个 Box 对象的属性相加，并返回相加后的 Box 对象。_

### 运算符重载的实现

```c#
using System;

namespace OperatorOvlApplication
{
   class Box
   {
      private double length;      // 长度
      private double breadth;     // 宽度
      private double height;      // 高度

      public double getVolume()
      {
         return length * breadth * height;
      }
      public void setLength( double len )
      {
         length = len;
      }

      public void setBreadth( double bre )
      {
         breadth = bre;
      }

      public void setHeight( double hei )
      {
         height = hei;
      }
      // 重载 + 运算符来把两个 Box 对象相加
      public static Box operator+ (Box b, Box c)
      {
         Box box = new Box();
         box.length = b.length + c.length;
         box.breadth = b.breadth + c.breadth;
         box.height = b.height + c.height;
         return box;
      }

   }

   class Tester
   {
      static void Main(string[] args)
      {
         Box Box1 = new Box();         // 声明 Box1，类型为 Box
         Box Box2 = new Box();         // 声明 Box2，类型为 Box
         Box Box3 = new Box();         // 声明 Box3，类型为 Box
         double volume = 0.0;          // 体积

         // Box1 详述
         Box1.setLength(6.0);
         Box1.setBreadth(7.0);
         Box1.setHeight(5.0);

         // Box2 详述
         Box2.setLength(12.0);
         Box2.setBreadth(13.0);
         Box2.setHeight(10.0);

         // Box1 的体积
         volume = Box1.getVolume();
         Console.WriteLine("Box1 的体积： {0}", volume);

         // Box2 的体积
         volume = Box2.getVolume();
         Console.WriteLine("Box2 的体积： {0}", volume);

         // 把两个对象相加
         Box3 = Box1 + Box2;

         // Box3 的体积
         volume = Box3.getVolume();
         Console.WriteLine("Box3 的体积： {0}", volume);
         Console.ReadKey();
      }
   }
}
```

### 可重载和不可重载运算符

下表描述了 C# 中运算符重载的能力：

| 运算符                                                | 描述                                         |
| :---------------------------------------------------- | :------------------------------------------- | --- | ---------------------------------- |
| `+`, `-`, `!`, `~`, `++`, `--`                        | 这些一元运算符只有一个操作数，且可以被重载。 |
| `+`, `-`, `*`, `/`, `%`                               | 这些二元运算符带有两个操作数，且可以被重载。 |
| `==`, `!=`, `<`, `>`, `<=`, `>=`                      | 这些比较运算符可以被重载。                   |
| `&&`, `                                               |                                              | `   | 这些条件逻辑运算符不能被直接重载。 |
| `+=`, `-=`, `*=`, `/=`, `%=`                          | 这些赋值运算符不能被重载。                   |
| `=`, `.`, `?:`, `->`, `new`, `is`, `sizeof`, `typeof` | 这些运算符不能被重载。                       |

```c#
using System;

namespace OperatorOvlApplication
{
    class Box
    {
       private double length;      // 长度
       private double breadth;     // 宽度
       private double height;      // 高度

       public double getVolume()
       {
         return length * breadth * height;
       }
      public void setLength( double len )
      {
          length = len;
      }

      public void setBreadth( double bre )
      {
          breadth = bre;
      }

      public void setHeight( double hei )
      {
          height = hei;
      }
      // 重载 + 运算符来把两个 Box 对象相加
      public static Box operator+ (Box b, Box c)
      {
          Box box = new Box();
          box.length = b.length + c.length;
          box.breadth = b.breadth + c.breadth;
          box.height = b.height + c.height;
          return box;
      }

      public static bool operator == (Box lhs, Box rhs)
      {
          bool status = false;
          if (lhs.length == rhs.length && lhs.height == rhs.height
             && lhs.breadth == rhs.breadth)
          {
              status = true;
          }
          return status;
      }
      public static bool operator !=(Box lhs, Box rhs)
      {
          bool status = false;
          if (lhs.length != rhs.length || lhs.height != rhs.height
              || lhs.breadth != rhs.breadth)
          {
              status = true;
          }
          return status;
      }
      public static bool operator <(Box lhs, Box rhs)
      {
          bool status = false;
          if (lhs.length < rhs.length && lhs.height
              < rhs.height && lhs.breadth < rhs.breadth)
          {
              status = true;
          }
          return status;
      }

      public static bool operator >(Box lhs, Box rhs)
      {
          bool status = false;
          if (lhs.length > rhs.length && lhs.height
              > rhs.height && lhs.breadth > rhs.breadth)
          {
              status = true;
          }
          return status;
      }

      public static bool operator <=(Box lhs, Box rhs)
      {
          bool status = false;
          if (lhs.length <= rhs.length && lhs.height
              <= rhs.height && lhs.breadth <= rhs.breadth)
          {
              status = true;
          }
          return status;
      }

      public static bool operator >=(Box lhs, Box rhs)
      {
          bool status = false;
          if (lhs.length >= rhs.length && lhs.height
             >= rhs.height && lhs.breadth >= rhs.breadth)
          {
              status = true;
          }
          return status;
      }
      public override string ToString()
      {
          return String.Format("({0}, {1}, {2})", length, breadth, height);
      }

   }

   class Tester
   {
      static void Main(string[] args)
      {
        Box Box1 = new Box();          // 声明 Box1，类型为 Box
        Box Box2 = new Box();          // 声明 Box2，类型为 Box
        Box Box3 = new Box();          // 声明 Box3，类型为 Box
        Box Box4 = new Box();
        double volume = 0.0;   // 体积

        // Box1 详述
        Box1.setLength(6.0);
        Box1.setBreadth(7.0);
        Box1.setHeight(5.0);

        // Box2 详述
        Box2.setLength(12.0);
        Box2.setBreadth(13.0);
        Box2.setHeight(10.0);

       // 使用重载的 ToString() 显示两个盒子
        Console.WriteLine("Box1： {0}", Box1.ToString());
        Console.WriteLine("Box2： {0}", Box2.ToString());

        // Box1 的体积
        volume = Box1.getVolume();
        Console.WriteLine("Box1 的体积： {0}", volume);

        // Box2 的体积
        volume = Box2.getVolume();
        Console.WriteLine("Box2 的体积： {0}", volume);

        // 把两个对象相加
        Box3 = Box1 + Box2;
        Console.WriteLine("Box3： {0}", Box3.ToString());
        // Box3 的体积
        volume = Box3.getVolume();
        Console.WriteLine("Box3 的体积： {0}", volume);

        //comparing the boxes
        if (Box1 > Box2)
          Console.WriteLine("Box1 大于 Box2");
        else
          Console.WriteLine("Box1 不大于 Box2");
        if (Box1 < Box2)
          Console.WriteLine("Box1 小于 Box2");
        else
          Console.WriteLine("Box1 不小于 Box2");
        if (Box1 >= Box2)
          Console.WriteLine("Box1 大于等于 Box2");
        else
          Console.WriteLine("Box1 不大于等于 Box2");
        if (Box1 <= Box2)
          Console.WriteLine("Box1 小于等于 Box2");
        else
          Console.WriteLine("Box1 不小于等于 Box2");
        if (Box1 != Box2)
          Console.WriteLine("Box1 不等于 Box2");
        else
          Console.WriteLine("Box1 等于 Box2");
        Box4 = Box3;
        if (Box3 == Box4)
          Console.WriteLine("Box3 等于 Box4");
        else
          Console.WriteLine("Box3 不等于 Box4");

        Console.ReadKey();
      }
    }
}
```

## 接口

接口定义了所有类继承接口时应遵循的语法合同。接口定义了语法合同 **"是什么"** 部分，派生类定义了语法合同 **"怎么做"** 部分。

接口定义了属性、方法和事件，这些都是接口的成员。接口只包含了成员的声明。成员的定义是派生类的责任。接口提供了派生类应遵循的标准结构。

接口使得实现接口的类或结构在形式上保持一致。

抽象类在某种程度上与接口类似，但是，它们大多只是用在当只有少数方法由基类声明由派生类实现时。

接口本身并不实现任何功能，它只是和声明实现该接口的对象订立一个必须实现哪些行为的契约。

抽象类不能直接实例化，但允许派生出具体的，具有实际功能的类。

## 命名空间

**命名空间**的设计目的是提供一种让一组名称与其他名称分隔开的方式。在一个命名空间中声明的类的名称与另一个命名空间中声明的相同的类的名称不冲突。

### 定义命名空间

命名空间的定义是以关键字 **namespace** 开始，后跟命名空间的名称，如下所示：

```c#
namespace namespace_name
{
   // 代码声明
}
```

```c#
using System;
namespace first_space
{
   class namespace_cl
   {
      public void func()
      {
         Console.WriteLine("Inside first_space");
      }
   }
}
namespace second_space
{
   class namespace_cl
   {
      public void func()
      {
         Console.WriteLine("Inside second_space");
      }
   }
}
class TestClass
{
   static void Main(string[] args)
   {
      first_space.namespace_cl fc = new first_space.namespace_cl();
      second_space.namespace_cl sc = new second_space.namespace_cl();
      fc.func();
      sc.func();
      Console.ReadKey();
   }
}
```

### _using_ 关键字

`using` 关键字表明程序使用的是给定命名空间中的名称。例如，我们在程序中使用 `System` 命名空间，其中定义了类 `Console`。

```c#
using System;
using first_space;
using second_space;

namespace first_space
{
   class abc
   {
      public void func()
      {
         Console.WriteLine("Inside first_space");
      }
   }
}
namespace second_space
{
   class efg
   {
      public void func()
      {
         Console.WriteLine("Inside second_space");
      }
   }
}
class TestClass
{
   static void Main(string[] args)
   {
      abc fc = new abc();
      efg sc = new efg();
      fc.func();
      sc.func();
      Console.ReadKey();
   }
}
```

### 嵌套命名空间

```c#
namespace namespace_name1
{
   // 代码声明
   namespace namespace_name2
   {
     // 代码声明
   }
}

```

```c#
using System;
using SomeNameSpace;
using SomeNameSpace.Nested;

namespace SomeNameSpace
{
    public class MyClass
    {
        static void Main()
        {
            Console.WriteLine("In SomeNameSpace");
            Nested.NestedNameSpaceClass.SayHello();
        }
    }

    // 内嵌命名空间
    namespace Nested
    {
        public class NestedNameSpaceClass
        {
            public static void SayHello()
            {
                Console.WriteLine("In Nested");
            }
        }
    }
}
```

## 异常处理

异常是在程序执行期间出现的问题。C# 中的异常是对程序运行时出现的特殊情况的一种响应，比如尝试除以零。

异常提供了一种把程序控制权从某个部分转移到另一个部分的方式。C# 异常处理时建立在四个关键词之上的：`try`、`catch`、`finally` 和 `throw`。

- `try`：一个 `try` 块标识了一个将被激活的特定的异常的代码块。后跟一个或多个 `catch` 块。
- `catch`：程序通过异常处理程序捕获异常。`catch` 关键字表示异常的捕获。
- `finally`：`finally` 块用于执行给定的语句，不管异常是否被抛出都会执行。例如，如果您打开一个文件，不管是否出现异常文件都要被关闭。
- `throw`：当问题出现时，程序抛出一个异常。使用 `throw` 关键字来完成。

### 语法

```c#
try
{
   // 引起异常的语句
}
catch( ExceptionName e1 )
{
   // 错误处理代码
}
catch( ExceptionName e2 )
{
   // 错误处理代码
}
catch( ExceptionName eN )
{
   // 错误处理代码
}
finally
{
   // 要执行的语句
}
```

### 异常类

| 异常类                              | 描述                                           |
| :---------------------------------- | :--------------------------------------------- |
| `System.IO.IOException`             | 处理 I/O 错误。                                |
| `System.IndexOutOfRangeException`   | 处理当方法指向超出范围的数组索引时生成的错误。 |
| `System.ArrayTypeMismatchException` | 处理当数组类型不匹配时生成的错误。             |
| `System.NullReferenceException`     | 处理当依从一个空对象时生成的错误。             |
| `System.DivideByZeroException`      | 处理当除以零时生成的错误。                     |
| `System.InvalidCastException`       | 处理在类型转换期间生成的错误。                 |
| `System.OutOfMemoryException`       | 处理空闲内存不足生成的错误。                   |
| `System.StackOverflowException`     | 处理栈溢出生成的错误。                         |

### 异常处理

```c#
using System;
namespace ErrorHandlingApplication
{
    class DivNumbers
    {
        int result;
        DivNumbers()
        {
            result = 0;
        }
        public void division(int num1, int num2)
        {
            try
            {
                result = num1 / num2;
            }
            catch (DivideByZeroException e)
            {
                Console.WriteLine("Exception caught: {0}", e);
            }
            finally
            {
                Console.WriteLine("Result: {0}", result);
            }

        }
        static void Main(string[] args)
        {
            DivNumbers d = new DivNumbers();
            d.division(25, 0);
            Console.ReadKey();
        }
    }
}
```
