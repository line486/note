# C 语言

## 一、C 语言概述

C 语言诞生于 1972 年，由丹尼斯·里奇在贝尔实验室研发。这门语言设计初衷既简洁又高效，既注重底层硬件的直接操作，也不失良好的结构化编程风格；因此，它被广泛应用于操作系统、嵌入式系统和高性能应用程序的开发。  
C 语言的特点体现在以下几个方面：

- **简洁高效**：编译后的代码运行迅速，适合对性能要求极高的场合。
- **灵活性强**：允许直接操作内存，支持指针运算和位操作，给程序员极大自由度。
- **跨平台性**：得益于其标准化，C 语言代码可以在多种平台上编译运行。

## 二、数据类型与变量

C 语言中，数据类型可以说是语言的基石，它们决定了变量在内存中的存储方式和运算规则。变量既可以存储数值、字符，也可以存储复杂结构的数据。

### 1. 基本数据类型

- **整型（int）**：存储整数。  
  示例：
  ```c
  int a = 10;
  int b = -20;
  ```
- **浮点型（float、double）**：分别存储单精度和双精度浮点数。  
  示例：
  ```c
  float pi_f = 3.14f;
  double pi_d = 3.141592653589793;
  ```
- **字符型（char）**：通常占 1 字节，用于存储单个字符。  
  示例：
  ```c
  char ch = 'A';
  ```
- **布尔型（\_Bool 或通过 stdbool.h 的 bool）**：存储逻辑值。  
  示例：
  ```c
  #include <stdbool.h>
  bool flag = true;
  ```

### 2. 派生数据类型

- **数组**：同一类型元素的集合，内存中连续存储。  
  示例：
  ```c
  int arr[5] = {1, 2, 3, 4, 5};
  ```
- **指针**：存储变量地址的变量，可实现动态内存管理与数据传递。  
  示例：
  ```c
  int x = 100;
  int *p = &x;  // p 存储 x 的地址
  ```
- **结构体（struct）**：将不同类型的数据组合在一起，形成新的复合数据类型。  
  示例：
  ```c
  struct Person {
      char name[50];
      int age;
  };
  struct Person p1 = {"张三", 30};
  ```
- **联合体（union）**：多个成员共用同一内存区域，只能同时存储其中一个数据。  
  示例：
  ```c
  union Data {
      int i;
      float f;
      char str[20];
  };
  union Data data;
  data.i = 10;
  ```
- **枚举（enum）**：为一组具名整数常量赋予名称，提高代码可读性。  
  示例：
  ```c
  enum Weekday { MON, TUE, WED, THU, FRI, SAT, SUN };
  enum Weekday today = WED;
  ```

## 三、运算符与表达式

C 语言中的运算符种类繁多，能够完成算术、逻辑、位运算等多种任务。

- **算术运算符**：`+`、`-`、`*`、`/`、`%`；例如：
  ```c
  int sum = 10 + 20;
  int mod = 20 % 3;
  ```
- **关系运算符**：如 `==`、`!=`、`>`、`<` 等，用于比较数值。
  ```c
  if (a != b) {
      // 条件成立时执行的代码
  }
  ```
- **逻辑运算符**：`&&`、`||`、`!`，用于构造复合条件判断。  
  示例：
  ```c
  if ((a > 0) && (b > 0)) {
      // 当 a 和 b 均大于零时执行
  }
  ```
- **位运算符**：用于操作整数的二进制表示，如 `&`、`|`、`^`、`<<`、`>>`。  
  示例：
  ```c
  int bits = 5 << 1;  // 将 5 的二进制左移一位，相当于乘以 2
  ```
- **赋值运算符**：`=` 及其复合运算符如 `+=`、`-=` 等。  
  示例：
  ```c
  int num = 10;
  num += 5;  // num 变为 15
  ```

## 四、控制结构

控制结构使程序能够根据不同条件执行不同的代码块，同时实现循环和分支，赋予程序灵活的控制流。

### 1. 条件语句

- **if-else 语句**：对条件表达式的真假进行判断，从而执行不同代码段。  
  示例：
  ```c
  int score = 85;
  if (score >= 90) {
      printf("优秀\n");
  } else if (score >= 80) {
      printf("良好\n");
  } else {
      printf("需要努力\n");
  }
  ```
- **switch 语句**：适用于多分支选择，可以更清晰地表示多个条件判断。  
  示例：
  ```c
  int choice = 2;
  switch (choice) {
      case 1:
          printf("选项 1\n");
          break;
      case 2:
          printf("选项 2\n");
          break;
      default:
          printf("其他选项\n");
          break;
  }
  ```

### 2. 循环语句

- **for 循环**：适用于循环次数已知的情况，结构紧凑。  
  示例：
  ```c
  for (int i = 0; i < 5; i++) {
      printf("计数：%d\n", i);
  }
  ```
- **while 循环**：条件控制的循环，先判断后执行。  
  示例：
  ```c
  int count = 0;
  while (count < 5) {
      printf("计数：%d\n", count);
      count++;
  }
  ```
- **do-while 循环**：先执行后判断，保证循环体至少执行一次。  
  示例：
  ```c
  int num = 0;
  do {
      printf("当前数字：%d\n", num);
      num++;
  } while (num < 5);
  ```

## 五、函数与作用域

函数是 C 语言中组织代码、实现模块化的重要手段。它不仅能减少重复代码，而且使程序逻辑更加清晰。

### 1. 函数定义与调用

定义函数需要指定返回类型、函数名和参数列表，同时函数体内可以包含任意逻辑。  
示例：

```c
#include <stdio.h>

// 定义一个求和函数
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(10, 20);
    printf("10 + 20 = %d\n", result);
    return 0;
}
```

在这个例子中，`add()` 函数负责计算两个整数的和，`main()` 函数调用了它，整个程序结构层次分明。

### 2. 变量作用域

- **局部变量**：仅在声明它的函数或代码块内有效。  
  示例：
  ```c
  void func() {
      int localVar = 100;
      printf("局部变量：%d\n", localVar);
  }
  ```
- **全局变量**：在所有函数中均可访问，但滥用可能导致命名冲突。  
  示例：

  ```c
  int globalVar = 200;

  void printGlobal() {
      printf("全局变量：%d\n", globalVar);
  }
  ```

- **静态变量**：局部静态变量保留其值，全局静态变量仅限当前文件可见。  
  示例：
  ```c
  void countCalls() {
      static int callCount = 0;
      callCount++;
      printf("调用次数：%d\n", callCount);
  }
  ```
- **寄存器变量**：建议存储在 CPU 寄存器中以加快访问速度，不过现代编译器优化使其作用有限。  
  示例：
  ```c
  void demo() {
      register int fastVar = 10;
      printf("寄存器变量：%d\n", fastVar);
  }
  ```

## 六、指针与内存管理

指针是 C 语言的灵魂所在，它使程序可以直接操作内存，也因此赋予程序极高的灵活性与效率。

### 1. 指针的基本用法

指针变量存储另一个变量的地址。使用 `&` 运算符获取地址，使用 `*` 运算符解引用。  
示例：

```c
#include <stdio.h>

int main() {
    int var = 50;
    int *ptr = &var;

    printf("变量 var 的值：%d\n", var);
    printf("通过指针访问的值：%d\n", *ptr);
    return 0;
}
```

这段代码展示了如何定义指针、获取变量地址，并通过指针访问变量值，短小而精炼。

### 2. 动态内存分配

在 C 语言中，堆内存的动态分配主要通过库函数 `malloc()`、`calloc()` 和 `realloc()` 实现，而 `free()` 用于释放不再需要的内存。  
示例：

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    // 分配 10 个 int 类型大小的内存空间
    int *array = (int *)malloc(10 * sizeof(int));
    if (array == NULL) {
        printf("内存分配失败！\n");
        return 1;
    }

    // 初始化数组
    for (int i = 0; i < 10; i++) {
        array[i] = i * i;
    }

    // 打印数组内容
    for (int i = 0; i < 10; i++) {
        printf("array[%d] = %d\n", i, array[i]);
    }

    // 释放分配的内存
    free(array);
    return 0;
}
```

这个例子不仅展示了如何动态分配数组，还通过循环进行初始化和输出，最后正确释放内存，体现了良好的内存管理习惯。

## 七、文件操作

文件操作使得程序能够读写外部数据，C 语言通过 `stdio.h` 提供了一系列的标准函数来实现文件操作。

### 1. 打开、读取与写入文件

- **打开文件**：使用 `fopen()` 打开文件，支持不同模式（如只读、写入、追加等）。
- **读取文件**：使用 `fgetc()`、`fscanf()` 或 `fread()`。
- **写入文件**：使用 `fputc()`、`fprintf()` 或 `fwrite()`。
- **关闭文件**：使用 `fclose()`，释放文件资源。

示例代码：

```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("example.txt", "w");  // 以写模式打开文件
    if (fp == NULL) {
        printf("无法打开文件！\n");
        return 1;
    }

    // 写入数据到文件
    fprintf(fp, "Hello, C 语言文件操作！\n");

    fclose(fp);  // 关闭文件

    // 以读模式重新打开文件
    fp = fopen("example.txt", "r");
    if (fp == NULL) {
        printf("无法打开文件！\n");
        return 1;
    }

    char ch;
    // 按字符读取文件内容，直到文件末尾
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    fclose(fp);  // 再次关闭文件
    return 0;
}
```

这段代码不仅展示了如何写入文件，还说明了如何读取文件，构成一个完整的文件操作流程。

## 八、预处理指令

预处理指令在编译前对源代码进行宏替换、条件编译和文件包含操作，是构建灵活代码的重要工具。

- **宏定义**：`#define` 用于定义常量或宏函数。  
  示例：
  ```c
  #define PI 3.14159
  #define SQUARE(x) ((x) * (x))
  ```
- **文件包含**：`#include` 将其他文件内容包含进当前文件，常用于包含标准库或自定义头文件。  
  示例：
  ```c
  #include <stdio.h>
  #include "myheader.h"
  ```
- **条件编译**：`#ifdef`、`#ifndef` 等用于根据条件编译代码，有助于跨平台开发。  
  示例：
  ```c
  #ifdef DEBUG
  #define DEBUG_PRINT(x) printf("DEBUG: %s\n", x)
  #else
  #define DEBUG_PRINT(x)
  #endif
  ```

## 九、深入实例解析

为了帮助你更好地理解 C 语言中各个概念如何协同工作，下面提供一个较为完整的实例，该实例涉及函数调用、指针操作、动态内存分配及文件操作，整体逻辑连贯且条理分明。

### 实例：学生成绩管理系统（简化版）

功能说明：

- 动态创建学生信息数组。
- 通过文件读写保存和加载学生数据。
- 实现查找、排序等简单操作。

示例代码：

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NAME_LEN 50

// 定义学生结构体
typedef struct {
    char name[NAME_LEN];
    int score;
} Student;

// 函数声明
void inputStudents(Student *students, int count);
void printStudents(const Student *students, int count);
int compareStudents(const void *a, const void *b);
void saveStudentsToFile(const char *filename, const Student *students, int count);
int loadStudentsFromFile(const char *filename, Student **students);

int main() {
    int n;
    printf("请输入学生数量：");
    scanf("%d", &n);

    // 动态分配内存
    Student *students = (Student *)malloc(n * sizeof(Student));
    if (students == NULL) {
        printf("内存分配失败！\n");
        return 1;
    }

    inputStudents(students, n);

    // 排序：按成绩降序排列
    qsort(students, n, sizeof(Student), compareStudents);

    printStudents(students, n);

    // 保存数据到文件
    saveStudentsToFile("students.dat", students, n);

    // 释放内存
    free(students);

    // 从文件加载数据
    Student *loadedStudents = NULL;
    int loadedCount = loadStudentsFromFile("students.dat", &loadedStudents);
    if (loadedCount > 0) {
        printf("\n从文件加载的学生数据：\n");
        printStudents(loadedStudents, loadedCount);
        free(loadedStudents);
    }

    return 0;
}

// 输入学生信息
void inputStudents(Student *students, int count) {
    for (int i = 0; i < count; i++) {
        printf("请输入第 %d 个学生的姓名：", i + 1);
        scanf("%s", students[i].name);
        printf("请输入 %s 的成绩：", students[i].name);
        scanf("%d", &students[i].score);
    }
}

// 打印学生信息
void printStudents(const Student *students, int count) {
    printf("\n学生信息：\n");
    for (int i = 0; i < count; i++) {
        printf("姓名：%s, 成绩：%d\n", students[i].name, students[i].score);
    }
}

// 比较函数，用于排序（按成绩降序）
int compareStudents(const void *a, const void *b) {
    const Student *s1 = (const Student *)a;
    const Student *s2 = (const Student *)b;
    return s2->score - s1->score;
}

// 将学生数据保存到文件
void saveStudentsToFile(const char *filename, const Student *students, int count) {
    FILE *fp = fopen(filename, "wb");
    if (fp == NULL) {
        printf("无法打开文件 %s\n", filename);
        return;
    }
    fwrite(&count, sizeof(int), 1, fp);
    fwrite(students, sizeof(Student), count, fp);
    fclose(fp);
    printf("数据已保存到文件 %s\n", filename);
}

// 从文件加载学生数据
int loadStudentsFromFile(const char *filename, Student **students) {
    FILE *fp = fopen(filename, "rb");
    if (fp == NULL) {
        printf("无法打开文件 %s\n", filename);
        return 0;
    }
    int count;
    fread(&count, sizeof(int), 1, fp);
    *students = (Student *)malloc(count * sizeof(Student));
    if (*students == NULL) {
        printf("内存分配失败！\n");
        fclose(fp);
        return 0;
    }
    fread(*students, sizeof(Student), count, fp);
    fclose(fp);
    return count;
}
```

在这份实例代码中，我们从头到尾展示了如何：

- 动态申请内存并释放内存，防止内存泄漏；
- 利用函数将不同功能模块化；
- 使用 `qsort()` 结合自定义比较函数实现排序；
- 利用二进制文件操作保存和加载数据，确保数据持久化。整个过程既有逻辑判断，又有循环控制，丰富的指针操作使程序既高效又灵活。
