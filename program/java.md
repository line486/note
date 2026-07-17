# Java 学习笔记

## 一、Java 基础语法

### 1.1 第一个 Java 程序

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

- 文件名必须与 `public class` 名一致。
- `main` 方法是程序入口点。

### 1.2 数据类型

基本数据类型分为四类八种：

- **整数类型**：`byte`（1字节）、`short`（2字节）、`int`（4字节）、`long`（8字节，需加 L 后缀）
- **浮点类型**：`float`（4字节，需加 F）、`double`（8字节，默认浮点类型）
- **字符类型**：`char`（2字节，Unicode 编码）
- **布尔类型**：`boolean`（值为 `true` 或 `false`）

引用类型包括：类、接口、数组。

### 1.3 变量与常量

- 变量：`int age = 20;`
- 常量：使用 `final` 修饰，如 `final double PI = 3.14159;`

### 1.4 运算符

- 算术运算符：`+ - * / % ++ --`
- 关系运算符：`== != > < >= <=`
- 逻辑运算符：`&& || !`
- 位运算符：`& | ^ ~ << >> >>>`
- 赋值运算符：`= += -= *= /= %=`

### 1.5 控制流程

- 条件语句：`if-else`、`switch-case`（支持 String 从 Java 7 起）
- 循环语句：`for`、`while`、`do-while`
- 跳转语句：`break`、`continue`、`return`

## 二、面向对象编程（OOP）

### 2.1 类与对象

```java
class Car {
    String brand;
    void start() {
        System.out.println(brand + " started.");
    }
}

Car myCar = new Car();
myCar.brand = "Toyota";
myCar.start();
```

### 2.2 四大特性

- **封装**：通过 `private` 隐藏属性，提供公共方法访问。
- **继承**：使用 `extends`，子类继承父类非私有成员。
- **多态**：父类引用指向子类对象，方法调用在运行时决定。
- **抽象**：通过 `abstract class` 或 `interface` 定义规范。

### 2.3 构造方法

- 与类同名，无返回类型。
- 可重载。
- 使用 `this()` 调用本类其他构造器，`super()` 调用父类构造器（必须在第一行）。

### 2.4 static 关键字

- `static` 成员属于类本身，可通过类名直接访问。
- 静态代码块在类加载时执行一次。

### 2.5 final 关键字

- 修饰类：不可被继承。
- 修饰方法：不可被重写。
- 修饰变量：成为常量（引用不可变，但对象内部状态可变）。

## 三、异常处理

### 3.1 异常分类

- **Error**：系统级错误，如 `OutOfMemoryError`。
- **Exception**：
  - **Checked Exception**：编译期检查，如 `IOException`。
  - **Unchecked Exception**：运行时异常，如 `NullPointerException`。

### 3.2 异常处理结构

```java
try {
    // 可能抛出异常的代码
} catch (IOException e) {
    // 处理异常
} finally {
    // 无论是否异常都会执行，常用于资源释放
}
```

### 3.3 throws 与 throw

- `throws`：声明方法可能抛出的异常。
- `throw`：手动抛出异常对象。

### 3.4 自定义异常

```java
class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}
```

## 四、数组与字符串

### 4.1 数组

- 声明：`int[] arr = new int[5];`
- 初始化：`int[] nums = {1, 2, 3};`
- 长度：`arr.length`

### 4.2 String

- 不可变对象，每次操作生成新对象。
- 常用方法：`equals()`、`length()`、`substring()`、`split()`、`trim()`
- 字符串拼接性能：优先使用 `StringBuilder`（单线程）或 `StringBuffer`（多线程）

## 五、集合框架

### 5.1 主要接口

- `Collection`：根接口
  - `List`：有序、可重复（如 `ArrayList`, `LinkedList`）
  - `Set`：无序、不重复（如 `HashSet`, `TreeSet`）
  - `Queue`：队列
- `Map`：键值对（如 `HashMap`, `TreeMap`, `LinkedHashMap`）

### 5.2 常见实现类特点

- `ArrayList`：基于动态数组，随机访问快。
- `LinkedList`：基于双向链表，插入删除快。
- `HashMap`：哈希表实现，允许 null 键和值，非线程安全。
- `ConcurrentHashMap`：线程安全的 Map。

### 5.3 遍历方式

- for-each 循环
- `Iterator` 迭代器
- Java 8 Stream API

## 六、泛型

### 6.1 作用

- 提供编译期类型安全。
- 避免强制类型转换。

### 6.2 基本用法

```java
List<String> list = new ArrayList<>();
Map<Integer, String> map = new HashMap<>();
```

### 6.3 通配符

- `<?>`：未知类型
- `<? extends T>`：上限通配符（只能读）
- `<? super T>`：下限通配符（只能写）

## 七、Java 8+ 新特性

### 7.1 Lambda 表达式

```java
Runnable r = () -> System.out.println("Run");
list.forEach(System.out::println);
```

### 7.2 Stream API

```java
List<String> result = users.stream()
    .filter(u -> u.getAge() > 18)
    .map(User::getName)
    .collect(Collectors.toList());
```

### 7.3 Optional

避免空指针：

```java
Optional<String> opt = Optional.ofNullable(str);
opt.ifPresent(s -> System.out.println(s));
```

### 7.4 新日期时间 API

- 包：`java.time`
- 常用类：`LocalDateTime`, `ZonedDateTime`, `Duration`, `Period`
- 线程安全、不可变设计

## 八、多线程与并发

### 8.1 创建线程方式

1. 继承 `Thread` 类
2. 实现 `Runnable` 接口
3. 实现 `Callable<V>` 接口（配合 `FutureTask`）

### 8.2 线程状态

NEW → RUNNABLE → BLOCKED / WAITING / TIMED_WAITING → TERMINATED

### 8.3 同步机制

- `synchronized`：修饰方法或代码块
- `volatile`：保证可见性与禁止指令重排序
- `ReentrantLock`：显式锁，支持公平锁、条件变量

### 8.4 线程池

```java
ExecutorService executor = Executors.newFixedThreadPool(4);
executor.submit(() -> { /* task */ });
executor.shutdown();
```

### 8.5 并发工具类

- `CountDownLatch`：等待多个线程完成
- `CyclicBarrier`：线程相互等待
- `Semaphore`：控制并发数量
- `ConcurrentHashMap`：高效线程安全 Map

## 九、IO 与 NIO

### 9.1 传统 IO（阻塞）

- 字节流：`InputStream` / `OutputStream`
- 字符流：`Reader` / `Writer`
- 常用组合：`FileReader + BufferedReader`

### 9.2 NIO（非阻塞，Java 1.4+）

- 核心组件：`Buffer`、`Channel`、`Selector`
- 支持多路复用，适用于高并发网络编程（如 Netty）

## 十、JVM 基础

### 10.1 内存区域

- **堆（Heap）**：存放对象实例，GC 主要区域
- **方法区（Metaspace）**：存储类信息、常量、静态变量
- **虚拟机栈**：每个线程私有，存储局部变量、方法调用
- **程序计数器**：记录当前线程执行字节码位置
- **本地方法栈**：为 Native 方法服务

### 10.2 垃圾回收（GC）

- 常见算法：标记-清除、复制、标记-整理
- 常见收集器：Serial、Parallel、CMS、G1

### 10.3 类加载机制

- 加载 → 验证 → 准备 → 解析 → 初始化
- 双亲委派模型：防止核心类被篡改
