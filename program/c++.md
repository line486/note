# C++ 学习笔记

## 1. 基础语法

### 1.1 Hello World 程序

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

- `#include <iostream>`：包含输入输出流库
- `std::cout`：标准输出流对象
- `std::endl`：插入换行并刷新缓冲区

### 1.2 命名空间

使用 `using namespace std;` 可以避免每次写 `std::`，但建议在大型项目中显式使用 `std::` 以避免命名冲突。

```cpp
using namespace std;
cout << "Hello" << endl;
```

### 1.3 变量与数据类型

C++ 内置基本数据类型包括：

- 整型：`int`, `short`, `long`, `long long`
- 浮点型：`float`, `double`, `long double`
- 字符型：`char`, `wchar_t`, `char16_t`, `char32_t`
- 布尔型：`bool`
- 无符号类型：`unsigned int`, `unsigned char` 等

示例：

```cpp
int age = 25;
double price = 19.99;
char grade = 'A';
bool isPassed = true;
```

### 1.4 常量

使用 `const` 或 `constexpr` 定义常量：

```cpp
const double PI = 3.14159;
constexpr int MAX_SIZE = 100; // 编译期常量
```

## 2. 控制结构

### 2.1 条件语句

```cpp
if (condition) {
    // ...
} else if (another_condition) {
    // ...
} else {
    // ...
}
```

三元运算符：

```cpp
int max = (a > b) ? a : b;
```

### 2.2 循环语句

**for 循环**

```cpp
for (int i = 0; i < 10; ++i) {
    std::cout << i << std::endl;
}
```

**while 循环**

```cpp
int i = 0;
while (i < 10) {
    std::cout << i << std::endl;
    ++i;
}
```

**do-while 循环**

```cpp
int i = 0;
do {
    std::cout << i << std::endl;
    ++i;
} while (i < 10);
```

## 3. 函数

### 3.1 函数定义与声明

```cpp
// 声明
int add(int a, int b);

// 定义
int add(int a, int b) {
    return a + b;
}
```

### 3.2 默认参数

```cpp
void greet(std::string name = "Guest") {
    std::cout << "Hello, " << name << "!" << std::endl;
}

greet();          // 输出: Hello, Guest!
greet("Alice");   // 输出: Hello, Alice!
```

### 3.3 函数重载

允许同名函数具有不同参数列表：

```cpp
void print(int i) {
    std::cout << "Integer: " << i << std::endl;
}

void print(double d) {
    std::cout << "Double: " << d << std::endl;
}
```

## 4. 数组与字符串

### 4.1 C 风格数组

```cpp
int arr[5] = {1, 2, 3, 4, 5};
char str[] = "Hello";
```

### 4.2 std::array（C++11）

固定大小的容器，更安全：

```cpp
#include <array>
std::array<int, 5> arr = {1, 2, 3, 4, 5};
```

### 4.3 std::vector（动态数组）

```cpp
#include <vector>
std::vector<int> vec = {1, 2, 3};
vec.push_back(4);
```

### 4.4 字符串处理

使用 `std::string` 而非 C 风格字符串：

```cpp
#include <string>
std::string s1 = "Hello";
std::string s2 = "World";
std::string s3 = s1 + " " + s2; // 拼接
```

## 5. 指针与引用

### 5.1 指针

```cpp
int x = 10;
int* ptr = &x;      // ptr 指向 x 的地址
std::cout << *ptr;  // 解引用，输出 10
```

### 5.2 引用

引用是变量的别名：

```cpp
int x = 10;
int& ref = x;       // ref 是 x 的引用
ref = 20;           // x 变为 20
```

### 5.3 指针 vs 引用

- 引用必须初始化，指针可以为空
- 引用不能重新绑定，指针可以重新赋值
- 引用更安全、语义更清晰

## 6. 类与对象

### 6.1 类定义

```cpp
class Rectangle {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}

    double area() const {
        return width * height;
    }

    void setWidth(double w) { width = w; }
    double getWidth() const { return width; }
};
```

### 6.2 构造函数与析构函数

- 构造函数：初始化对象
- 析构函数：清理资源（如释放内存）

```cpp
class MyClass {
public:
    MyClass() { std::cout << "构造函数调用\n"; }
    ~MyClass() { std::cout << "析构函数调用\n"; }
};
```

### 6.3 访问控制

- `public`：可被外部访问
- `private`：仅类内部可访问
- `protected`：派生类也可访问

## 7. 继承与多态

### 7.1 继承

```cpp
class Shape {
public:
    virtual double area() const = 0; // 纯虚函数
};

class Circle : public Shape {
private:
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() const override {
        return 3.14159 * radius * radius;
    }
};
```

### 7.2 多态

通过基类指针或引用调用派生类方法：

```cpp
Shape* shape = new Circle(5.0);
std::cout << shape->area() << std::endl; // 输出圆的面积
delete shape;
```

### 7.3 虚函数与 override

- 使用 `virtual` 声明虚函数
- 使用 `override` 显式标注重写（C++11）

## 8. 模板

### 8.1 函数模板

```cpp
template <typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    std::cout << max(3, 5) << std::endl;        // int
    std::cout << max(3.14, 2.71) << std::endl;  // double
}
```

### 8.2 类模板

```cpp
template <typename T>
class Box {
private:
    T value;
public:
    Box(T v) : value(v) {}
    T getValue() const { return value; }
};

Box<int> intBox(42);
Box<std::string> strBox("Hello");
```

## 9. STL（标准模板库）

### 9.1 容器

- **序列容器**：`vector`, `list`, `deque`
- **关联容器**：`set`, `map`, `unordered_set`, `unordered_map`

示例：

```cpp
std::vector<int> v = {1, 2, 3};
std::map<std::string, int> ages = {{"Alice", 30}, {"Bob", 25}};
```

### 9.2 算法

STL 提供大量通用算法，如 `sort`, `find`, `accumulate`：

```cpp
#include <algorithm>
#include <numeric>

std::vector<int> nums = {3, 1, 4, 1, 5};
std::sort(nums.begin(), nums.end()); // 排序
int sum = std::accumulate(nums.begin(), nums.end(), 0); // 求和
```

### 9.3 迭代器

用于遍历容器：

```cpp
for (auto it = v.begin(); it != v.end(); ++it) {
    std::cout << *it << " ";
}
// 或使用范围 for（C++11）
for (const auto& x : v) {
    std::cout << x << " ";
}
```

## 10. 智能指针（C++11 起）

### 10.1 unique_ptr

独占所有权，不可复制：

```cpp
#include <memory>
std::unique_ptr<int> ptr = std::make_unique<int>(42);
```

### 10.2 shared_ptr

共享所有权，引用计数：

```cpp
std::shared_ptr<int> p1 = std::make_shared<int>(10);
std::shared_ptr<int> p2 = p1; // 引用计数变为 2
```

### 10.3 weak_ptr

解决 shared_ptr 的循环引用问题：

```cpp
std::weak_ptr<int> wp = p1;
if (auto sp = wp.lock()) {
    std::cout << *sp << std::endl;
}
```

## 11. 异常处理

```cpp
try {
    throw std::runtime_error("出错了！");
} catch (const std::exception& e) {
    std::cerr << "异常: " << e.what() << std::endl;
}
```

## 12. C++11/14/17/20 新特性（简要）

- **auto**：自动类型推导
  ```cpp
  auto x = 42; // x 是 int
  ```
- **范围 for 循环**
  ```cpp
  for (const auto& item : container) { ... }
  ```
- **Lambda 表达式**
  ```cpp
  auto square = [](int x) { return x * x; };
  ```
- **移动语义与右值引用**（`&&`）
- **结构化绑定**（C++17）
  ```cpp
  std::map<std::string, int> m = {{"a", 1}};
  for (const auto& [key, value] : m) {
      std::cout << key << ": " << value << std::endl;
  }
  ```

## 13. 编译与构建

常用编译命令（使用 GCC）：

```bash
g++ -std=c++17 -O2 -Wall -Wextra main.cpp -o program
```

- `-std=c++17`：指定 C++ 标准
- `-O2`：优化级别
- `-Wall -Wextra`：启用更多警告

## 14. 最佳实践

- 优先使用 `std::vector` 而非原始数组
- 使用智能指针管理动态内存
- 避免裸 `new`/`delete`
- 尽量使用 `const` 和 `constexpr`
- 函数参数传递大对象时使用 `const &`
- 启用编译器警告并认真对待
