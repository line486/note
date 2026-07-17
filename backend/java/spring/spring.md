# Spring

> [Spring 家族](https://spring.io/projects)

## Spring 概述

1. `Spring` 是轻量级的开源的 `JavaEE` 框架
2. `Spring` 可以解决企业应用开发的复杂性
3. `Spring` 有两个核心部分：`IOC` 和 `AOP`
   - `IOC`：控制反转，把创建对象过程交给 `Spring` 进行管理
   - `AOP`：面向切面，不修改源代码进行功能增强
4. `Spring` 特点
   - 方便解耦，简化开发
   - `AOP` 编程支持
   - 方便程序测试
   - 方便和其他框架进行整合
   - 方便进行事务操作
   - 降低 API 开发难度

## IOC 容器 ↓↓↓

`IOC`: `Inversion of Control` 翻译过来死反转控制。

## 入门案例

1. 创建 Meven Module

2. 引入依赖

   ```xml
   <dependencies>
       <!--基于Maven依赖传递性,导入spring-context依赖即可导入当前所需要所有jar包-->
       <dependency>
           <groupId>org.springframework</groupId>
           <artifactId>spring-context</artifactId>
           <version>5.2.21.RELEAS</version>
       </dependency>
       <!--junit测试-->
       <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>4.12</version>
           <scope>test</scope>
       </dependency>
       <!-- lombok -->
       <dependency>
           <groupId>org.projectlombok</groupId>
           <artifactId>lombok</artifactId>
           <version>RELEASE</version>
           <scope>compile</scope>
       </dependency>
   </dependencies>
   ```

3. 创建 Spring 配置文件

   在 `resources` 目录，添加 `spring` 的配置文件 `applicationContext.xml`

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd">
   </beans>
   ```

4. 添加 Bean

   Book 类

   ```java
   import lombok.Data;

   @Data
   public class Book {
       Integer id;
       String title;
       String author;
       String publisher;
   }

   ```

   配置

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
          http://www.springframework.org/schema/beans/spring-beans.xsd">
       <!--
           bean:配置一个bean对象,将对象交给IOC容器管理
           属性:
               id:bean的唯一表示,不能重复
               class:设置bean对象所对应的类型
        -->
       <bean id="book" class="org.example.pojo.Book"/>
       <!-- scope: 设置单例或者非单例：prototype/singleton 默认为singleton -->
   </beans>
   ```

   > [!TIP]
   >
   > `singleton` 只有一个实例，也即是单例模式；
   > `prototype` 访问一次创建一个实例，相当于 `new` 。

5. 获取 Bean（创建IOC容器）

   ```java
   @Slf4j
   public class ApplicationContextTest {

       @Test
       public void test() {
     // 创建 ApplicationContext 对象，加载 spring 配置文件（创建IOC容器）
           ApplicationContext context = new ClassPathXmlApplicationContext("ApplicationContext.xml");
     // 调用 context 中的 getBean 方法获取 ioc 容器中的 bean
           Book book = context.getBean(Book.class);
     // 调用 bean 对象中的方法
           log.info("book = {}", book.getTitle());
       }
   }
   ```

## 依赖注入

> 共 `5` 种

### Setter 注入

`applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="book" class="org.example.pojo.Book">
    <!-- setter注入(类必须有setter方法) -->
        <property name="title1" value="Spring实战"/>
        <property name="author" value="Craig Walls"/>
        <property name="publisher" value="Aiit"/>
    </bean>
</beans>
```

`Java`

```java
@Test
public void myBookTest() {
    // 创建ApplicationContext对象，加载spring配置文件（创建IOC容器）
    AbstractApplicationContext context = new ClassPathXmlApplicationContext(
            "ApplicationContext.xml");

    Book book = context.getBean(Book.class);
    // 或者
 // Book book = (Book)context.getBean("book");
    log.info("book = {}", book);
    context.close();
}
```

> [!WARNING]
>
> 使用 `setter` 注入时，类必须有 `setter` 方法。

### 构造方法注入

`applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 构造方式注入（类必须有全参构造方法） -->
    <bean id="myBook" class="org.example.pojo.MyBook">
        <constructor-arg name="name1" value="Spring实战"/>
        <constructor-arg name="author" value="Craig Walls"/>
        <constructor-arg name="publisher" value="Aiit"/>
    </bean>
</beans>
```

`Java`

```java
package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * MyBook 类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyBook {

    private String name1;
    private String author;
    private String publisher;

}

```

```java
@Test
public void myBookTest() {
    // 创建ApplicationContext对象，加载spring配置文件（创建IOC容器）
    AbstractApplicationContext context = new ClassPathXmlApplicationContext(
            "ApplicationContext.xml");

    MyBook myBook = context.getBean(MyBook.class);

    log.info("myBook = {}", myBook);
    context.close();
}
```

### 静态工厂方法注入

`applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- class 等于工厂类  factory-method等于工厂的静态方法-->
    <!-- ioc 容器调用 StaticCarFactory.produceCarMethod() 方法，返回一个 Car 对象，并注入到容器中 -->
    <bean id="car" class="org.example.config.StaticCarFactory"
        factory-method="produceCarMethod"/>
</beans>
```

`Java`

```java
package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 汽车类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    String brand;
    String color;
}
```

```java
package org.example.config;

import org.example.pojo.Car;

/**
 * 静态工厂类
 */
public class StaticCarFactory {

   public static Car produceCarMethod(){
      return new Car();
   }
}
```

```java
// 测试程序
@Test
public void carTest() {
    // 创建ApplicationContext对象，加载spring配置文件（创建IOC容器）
    AbstractApplicationContext context = new ClassPathXmlApplicationContext(
            "ApplicationContext.xml");

    Car car = context.getBean(Car.class);
    log.info("car = {}", car);
    context.close();
}
```

### 实例化工厂方法注入

`applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 实例化工厂方法注入 -->
    <!-- 第一步：配置一个工厂对象的bean -->
    <!-- 第二步：ioc 容器调用工厂的无参构造方法，instanceCarFactory = new InstanceCarFactory()，并注入到容器中 -->
    <!-- 第三步：ioc 容器调用工厂的 instanceCarFactory.produceCarMethod2() 方法，返回一个 Car 对象，并注入到容器中 -->
    <bean id="instanceCarFactory" class="org.example.config.InstanceCarFactory"/>
    <bean id="myCar" class="org.example.pojo.Car" factory-bean="instanceCarFactory"
    factory-method="produceCarMethod2"/>
</beans>
```

`Java`

```java
package org.example.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * 汽车类
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Car {
    String brand;
    String color;
}

```

```java
package org.example.config;

import org.example.pojo.Car;

/**
 * 实例化工厂类
 */
public class InstanceCarFactory {

    public Car produceCarMethod2() {
        return new Car("大众", "黑色");
    }
}
```

```java
@Test
public void myCarTest() {
    // 创建ApplicationContext对象，加载spring配置文件（创建IOC容器）
    AbstractApplicationContext context = new ClassPathXmlApplicationContext(
            "ApplicationContext.xml");

    Car car = (Car)context.getBean("myCar");
    log.info("car = {}", car);
    context.close();
}
```

### Autowired 自动装配

- 由 `Spring` 提供；
- 根据属性的数据类型自动装配，如果存在多个相同类型的 `bean` 对象，会抛出 `bean` 对象不是唯一定义异常。

```xml
<bean id="student6" class="org.example.pojo.Student" autowire="constructor"/>
<bean id="teacher" class="org.example.pojo.Teacher" autowire="byType"/>
<!-- 等等 -->
```

1. 什么是自动装配
   - 根据指定装配规则（属性名称或者属性类型），`Spring` 自动将匹配的属性值进行注入

2. 演示自动装配过程

   根据属性名称自动注入

   ```xml
   <!--实现自动装配
    bean 标签属性 autowire，配置自动装配
    autowire 属性常用两个值：
    byName 根据属性名称注入 ，注入值 bean 的 id 值和类属性名称一样
    byType 根据属性类型注入
   -->
   <bean id="emp" class="com.atguigu.spring5.autowire.Emp" autowire="byName">
    <!--<property name="dept" ref="dept"></property>-->
   </bean>
   <bean id="dept" class="com.atguigu.spring5.autowire.Dept"></bean>
   ```

   根据属性类型自动注入

   ```xml
   <!--实现自动装配
    bean 标签属性 autowire，配置自动装配
    autowire 属性常用两个值：
    byName 根据属性名称注入 ，注入值 bean 的 id 值和类属性名称一样
    byType 根据属性类型注入
   -->
   <bean id="emp" class="com.atguigu.spring5.autowire.Emp" autowire="byType">
    <!--<property name="dept" ref="dept"></property>-->
   </bean>
   <bean id="dept" class="com.atguigu.spring5.autowire.Dept"></bean>
   ```

## AOP 容器 ↓↓↓

`AOP` 全称为 `Aspect Oriented Programming`，即面向切面的编程。这种编程方式可以为某些方法提供行为增强，亦或者是行为监控能力。通过对切片统一编程可以在相比于不使用 `AOP` 的情况下减少了重复代码的开发量，同时使得代码功能更加明确。

## AOP底层

> 使用动态代理

1. 第一种情况是有接口的情况，使用 JDK 动态代理

   创建接口实现类代理对象，增强类的方法。

2. 第二种情况是没有接口的情况，使用 CGLIB 动态代理

   创建子类的代理对象，增强类的方法。

## JDK 动态代理

### 使用 JDK 动态代理

> 使用 Proxy 类里面的方法创建代理对象

- 调用 `newProxyInstance` 方法。
- 该方法有三个参数：
  - 第一个：类加载器。
  - 第二个：增强方法所在的类，这个类实现的接口，支持多个接口。
  - 第三个：实现这个接口 `InvocationHandler`，创建代理对象，写增强方法。

### 编写 JDK 动态代理代码

1. 创建接口，定义方法

   ```java
   package cn.sugarscat.example.mapper;
   public interface UserMapper {
       public int add(int a, int b);
       public String update(String id);
   }
   ```

2. 创建接口实现类，实现方法

   ```java
   package cn.sugarscat.example.mapper;

   public class UserMapperImpl implements UserMapper {
       @Override
       public int add(int a, int b) {
           System.out.println("add方法执行了...");
           return a + b;
       }

       @Override
       public String update(String id) {
           System.out.println("update方法执行了");
           return "id:" + id;
       }
   }
   ```

3. 使用 `Proxy` 类创建接口代理对象

   ```java
   package cn.sugarscat.example.mapper;

   import java.lang.reflect.InvocationHandler;
   import java.lang.reflect.Method;
   import java.lang.reflect.Proxy;
   import java.util.Arrays;

   public class JDKProxy {
       public static void main(String[] args) {
           // 创建接口实现类代理对象
           Class[] interfaces = {UserMapper.class};

           // 这里可以通过IOC控制反转得到对象，但是我这里直接new了
           UserMapperImpl userMapperImpl = new UserMapperImpl();

           // 这里要进行AOP了，就是在不进行修改源码的情况，为代码增加逻辑

           UserMapper userMapper = (UserMapper)Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserMapperProxy(userMapperImpl));
           int result = userMapper.add(1,2);
           String res = userMapper.update("EDDD-DSSS");
           System.out.println("result:" + result);
       }
   }


   // 创建代理对象代码
   class UserMapperProxy implements InvocationHandler {
       // 1. 把创建的是谁的代理对象，把谁传进来
       // 有参数的构造

       private Object object;
       public UserMapperProxy(Object object) {
           this.object = object;
       }

       // 写增强的逻辑
       @Override
       public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
           // 方法之前
           System.out.println("方法执行之前： " + method.getName() + "传递的参数" + Arrays.toString(args));

           // 被增强的方法执行
           Object res = method.invoke(object, args);

           // 方法之后
           System.out.println("方法执行之后.."+object);

           // 返回res，增强的方法
           return res;
       }
   }
   ```

## AOP术语

1. 连接点

   在一个类中，哪些方法可以被增强，这些方法就叫连接点；

2. 切入点

   实际真正被增强的方法，被称为切入点；

3. 通知（增强）

   > 实际增强的代码逻辑部分，就是通知。
   - 前置通知：被增强的方法前执行；
   - 后置通知：被增强的方法后执行；
   - 环绕通知：被增强的方法前后都执行；
   - 异常通知：被增强的方法出现异常会执行；
   - 最终通知：类似于 `finally`，永远会执行；

4. 切面

   是动作上的操作，把通知应用到切入点的过程，就叫切面；

## XML 案例

1. 导入依赖

   ```xml
   <!--spring aop依赖-->
   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-aop</artifactId>
       <version>5.1.9.RELEASE</version>
   </dependency>

   <dependency>
       <groupId>org.springframework</groupId>
       <artifactId>spring-aspects</artifactId>
       <version>5.1.9.RELEASE</version>
   </dependency>

   <!--        aop实现依赖-->
   <dependency>
       <groupId>aopalliance</groupId>
       <artifactId>aopalliance</artifactId>
       <version>1.0</version>
   </dependency>
   <!--        切面实现依赖-->
   <dependency>
       <groupId>org.aspectj</groupId>
       <artifactId>aspectjweaver</artifactId>
       <version>1.9.1</version>
   </dependency>
   ```

2. 创建配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <beans xmlns="http://www.springframework.org/schema/beans"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xmlns:p="http://www.springframework.org/schema/p"
          xmlns:c="http://www.springframework.org/schema/c"
          xmlns:context="http://www.springframework.org/schema/context"
          xmlns:aop="http://www.springframework.org/schema/aop"
          xsi:schemaLocation="http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/aop
           http://www.springframework.org/schema/aop/spring-aop.xsd">


       <!--注册Bean-->
       <bean name="userDao" class="org.example.dao.Impl.UserDaoImpl"></bean>
       <bean name="xmlAdvice" class="org.example.dao.XmlAdvice"></bean>

       <!--配置Spring AOP-->
       <aop:config>
           <!--指定切入点-->
           <aop:pointcut id="pointcut" expression="execution(*
           org.example.dao.Impl.UserDaoImpl.*(..))"/>
           <!--指定切面-->
           <aop:aspect ref = "xmlAdvice">
               <!--指定前置通知-->
               <aop:before method="before" pointcut-ref="pointcut"/>
               <!--指定返回通知-->
               <aop:after-returning method="afterReturning" pointcut-ref="pointcut"/>
               <!--指定环绕通知-->
               <aop:around method="around" pointcut-ref="pointcut"/>
               <!--指定异常通知-->
               <aop:after-throwing method="afterException" pointcut-ref="pointcut"/>
               <!--指定后置通知-->
               <aop:after method="after" pointcut-ref="pointcut"/>
           </aop:aspect>
       </aop:config>

   </beans>
   ```

3. 一些类

   `UserDaoImpl.java`

   ```java
   package org.example.dao.Impl;

   import org.example.dao.UserDao;

   public class UserDaoImpl implements UserDao {

       public void insert(){
           System.out.println("添加用户信息");
       }

       public void delete(){
           System.out.println("删除用户信息");
       }

       public void update(){
           System.out.println("更新用户信息");
       }

       public void select(){
           System.out.println("查询用户信息");
       }
   }
   ```

   `UserDao.java`

   ```java
   package org.example.dao;

   public interface UserDao {
       public void insert();
       public void delete();
       public void update();
       public void select();
   }
   ```

   `XmlAdvice.java`

   ```java
   package org.example.dao;

   import org.aspectj.lang.JoinPoint;
   import org.aspectj.lang.ProceedingJoinPoint;

   public class XmlAdvice {
       //前置通知
       public void before(JoinPoint joinPoint){        //使用JoinPoint接口实例作为参数获得目标对象的类名和方法名
           System.out.print("这是前置通知！");
           System.out.print("目标类：" + joinPoint.getTarget());
           System.out.println("，被织入增强处理的目标方法为："+joinPoint.getSignature().getName());
       }
       //返回通知
       public void afterReturning(JoinPoint joinPoint){//使用JoinPoint接口实例作为参数获得目标对象的类名和方法名
           System.out.print("这是返回通知（方法不出现异常时调用）！");
           System.out.println("被织入增强处理的目标方法为："+joinPoint.getSignature().getName());
       }
       /**
        * 环绕通知
        * ProceedingJoinPoint是JoinPoint子接口，表示可以执行目标方法
        * 1.必须是Object类型的返回值
        * 2.必须接收一个参数，类型为ProceedingJoinPoint
        * 3.必须throws Throwable
        */
       public Object around(ProceedingJoinPoint point)throws Throwable{//使用ProceedingJoinPoint接口实例作为参数获得目标对象的类名和方法名
           System.out.println("这是环绕通知之前的部分！");
           //调用目标方法
           Object object = point.proceed();
           System.out.println("这是环绕通知之前的部分！");
           return object;
       }
       //异常通知
       public void afterException(){
           System.out.println("异常通知！");
       }
       //后置通知
       public void after(){
           System.out.println("这是后置通知！");
       }
   }
   ```

4. 测测程序

   ```java
   import lombok.extern.slf4j.Slf4j;

   import org.example.dao.UserDao;
   import org.junit.Test;
   import org.springframework.context.ApplicationContext;
   import org.springframework.context.support.ClassPathXmlApplicationContext;

   @Slf4j
   public class AppTest {

       @Test
       public void test() {
           log.info("test");
       }

       @Test
       public void AOPTest() {
           ApplicationContext context = new
                   ClassPathXmlApplicationContext("ApplicationContext.xml");
           UserDao userDao = context.getBean("userDao",UserDao.class);
           userDao.delete();
           System.out.println();
           userDao.insert();
           System.out.println();
           userDao.select();
           System.out.println();
           userDao.update();
       }
   }
   ```

## AOP 的 XML 元素

| 元素                  | 描述                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------- |
| `<aop:config>`        | Spring AOP 配置的根元素                                                                |
| `<aop:aspect>`        | 配置切面                                                                               |
| `<aop:advisor>`       | 配置通知器                                                                             |
| `<aop:pointcut>`      | 配置切入点                                                                             |
| `<aop:before>`        | 配置前置通知，在目标方法执行前实施增强，可以应用于权限管理等功能                       |
| `<aop:after>`         | 配置后置通知，在目标方法执行前实施增强，可以应用于关闭流、上传文件、删除临时文件等功能 |
| `<aop:around>`        | 配置环绕通知，在目标方法执行前实施增强，可以应用于日志、事务管理等功能                 |
| `<aop:after-running>` | 配置返回通知，在目标方法执行之后调用通知                                               |
| `<aop:after-throw>`   | 配置异常通知，在方法抛出异常后实施增强，可以应用于处理异常记录日志等功能               |

## 注解案例

### 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                             http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--开启组件扫描-->
    <context:component-scan base-package="com.demo"/>
    <!--寻找有@Aspect注解的类,并生成代理对象-->
    <aop:aspectj-autoproxy/>

</beans>
```

```java
@Component
public class User {
    public void add(){
        System.out.println("被增强的类执行了add ...");
    }
}
```

### @Before/@After/@Around/@AfterThrowing/@AfterReturning

> [!TIP]
>
> ```java
> /**
>  * 第一个 * 表示：任意返回类型
>  * 第二个 * 表示：任意方法名
>  * .. 表示：任意参数列表
>  */
> @Before("execution(* com.demo.domain.User.*(..))")
> // 同时 * 也可以匹配任意字符
> @After("execution(* com.demo.domain.User.save*(..))")
> // 匹配以 save 开头的方法
> ```

```java
// 增强类,用来增强User类
@Component
@Aspect   // 生成代理对象
public class UserProxy {

    // 前置通知
    // 加上注解和切入点表达式
    @Before("execution(* com.demo.domain.User.add(..))")
    public void before(){
        System.out.println("前置执行 ..");
    }

    // 后置通知
    @After("execution(* com.demo.domain.User.add(..))")
    public void after(){
        System.out.println("后置执行 ..");
    }

    // 环绕通知
    @Around("execution(* com.demo.domain.User.add(..))")
    public void around(ProceedingJoinPoint point) throws Throwable {
        System.out.println("环绕前通知 ..");
        //表示执行被增强的方法
        point.proceed();
        System.out.println("环绕后通知 ..");
    }

    // 异常通知
    @AfterThrowing("execution(* com.demo.domain.User.add(..))")
    public void afterThrowing(){
        System.out.println("异常通知 ..");
    }

    // 最终通知
    @AfterReturning("execution(* com.demo.domain.User.add(..))")
    public void afterReturning(){
        System.out.println("最终通知 ..");
    }
}
```

```java
//测试类
@Test
public void test(){
   ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");
    User user = context.getBean("user", User.class);
    user.add();
}
```

### @Pointcut

```java
// 公共注解
@Pointcut("execution(* org.example.dao.UserDao.*(..))")
public void doAspect(){}
// 定义通知（前置通知）
@Before("doAspect()")
```

## SpringMVC ↓↓↓

## 介绍

### 简介

`Spring MVC` 是 `Spring Framework` 提供的 `Web` 组件，全称是 `Spring Web MVC`，是目前主流的实现 `MVC` 设计模式的框架，提供前端路由映射、视图解析等功能。

### MVC 是什么

`MVC` 是一种软件架构思想，把软件按照模型，视图，控制器来划分；
`Model` 模型层，指工程中的 `JavaBean`，用来处理数据；
`JavaBean` 分成两类：

- 一类称为实体类 `Bean`：专门用来存储业务数据，比如 `Student`，`User`
- 一类称为业务处理 `Bean` ：指 `Servlet` 或 `Dao` 对象，专门用来处理业务逻辑和数据访问
  `View` :视图层，指工程中的 `html`, `jsp` 等页面，作用是和用户进行交互，展示数据
  `Controler`:控制层，指工程中的 `Servlet`,作用是接收请求和响应浏览器
- 流程：
  - 用户通过视图层发送请求到服务器，在服务器中请求被 `Controller` 接收
  - `Controller` 调用相应的 `Model` 层处理请求，处理完毕后结果返回到 `Controller`
  - `Controller` 再根据请求处理的结果找到对应的View视图，渲染数据后最终响应给浏览器

## 实现原理

### 核心组件

- `DispatcherServlet`： 前置控制器，负责调度其他组件的执行，可以降低不同组件之间的耦合性，是整个 `Spring MVC` 的核心模块
- `Handler` ：处理器，完成具体的业务逻辑，相当于 `Servlet`
- `HandlerMapping`： `DispatcherServlet` 是通过 `HandlerMapping` 把请求映射到不同的 `Handler`
- `HandlerInterceptor`：处理器拦截器，是一个接口，如果我们需要进行一些拦截处理，可以通过实现该接口完成
- `HandlerExecutionChain`：处理器执行链，包括两部分内容 `Handler` 和 `HandlerInterceptor` (系统会有一个默认的 `HandlerInterceptor`，如果有额外拦截处理，可以添加拦截器进行设置)
- `HandlerAdapter`：处理器适配器，`Handler` 执行业务方法之前，需要进行一系列的操作包括表单的数据验证、数据类型转换、把表单数据封装到`POJO`等，这些一系列的操作都是由 `HandlerAdapter` 完成，`DispatcherServlet` 通过 `HandlerAdapter` 执行不同的 `Handler`
- `ModelAndView`：封装了模型数据和视图信息，作为 `Handler` 的处理结果，返回给 `DispatcherServlet`
- `ViewResolver`：视图解析器，`DispatcherServlet`通过它把逻辑视图解析为物理视图，最终把渲染的结果响应给客户端

## 简单示例

### 导入依赖

`maven` 配置

```xml
<!-- Spring-web 依赖-->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-web</artifactId>
  <version>5.2.25.RELEASE</version>
</dependency>

<!-- springmvc -->
<dependency>
  <groupId>org.springframework</groupId>
  <artifactId>spring-webmvc</artifactId>
  <version>5.2.8.RELEASE</version>
</dependency>

<!-- servlet -->
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>javax.servlet-api</artifactId>
  <version>3.1.0</version>
  <scope>provided</scope>
</dependency>
<dependency>
  <groupId>javax.servlet.jsp</groupId>
  <artifactId>jsp-api</artifactId>
  <version>2.2</version>
  <scope>provided</scope>
</dependency>
<dependency>
  <groupId>javax.servlet</groupId>
  <artifactId>jstl</artifactId>
  <version>1.2</version>
</dependency>
```

### 配置 DispatcherServlet

在 `web.xml`配置 `Spring MVC` 的 `DispatcherServlet`

```xml
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>
  <!-- 配置核心控制器 -->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!-- springmvc配置文件加载路径
         1）默认情况下，读取WEB-INF下面的文件
         2）可以改为加载类路径下（resources目录），加上classpath:
     -->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:SpringMVC.xml</param-value>
    </init-param>
    <!--
       DispatcherServlet对象创建时间问题
          1）默认情况下，第一次访问该Servlet的创建对象，意味着在这个时间才去加载springMVC.xml
          2）可以改变为在项目启动时候就创建该Servlet，提高用户访问体验。
              <load-on-startup>1</load-on-startup>
                    数值越大，对象创建优先级越低！ （数值越低，越先创建）
    -->
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <!--/ 匹配所有的请求；（不包括.jsp）-->
    <!--/* 匹配所有的请求；（包括.jsp）-->
    <!--*.do拦截以do结尾的请求-->
    <url-pattern>/</url-pattern>
  </servlet-mapping>
</web-app>
```

### 配置 SpringMVC

`SpringMVC.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd">
    <!-- 配置自动扫包 -->
    <context:component-scan base-package="cn.sugarscat.springmvc.controller"/>

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!--给逻辑视图加上前缀和后缀 -->
        <!--前缀-->
        <property name="prefix" value="/"/>
        <!--后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

</beans>
```

### 示例代码

`Controller`

```java
package cn.sugarscat.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HelloController {
    /**
     * 当客户端访问index请求时
     * 直接自动关联到这个方法
     * 执行这个方法后，会返回结果
     * @return String
     */
    @RequestMapping("/index")
    public String index(){
        System.out.println("接收到了请求");
        //返回逻辑视图 逻辑视图相当于视图的别名 通过这个找到物理视图，也就是真正的视图
        //这里返回的只是页面的名称，不是完整的页面访问路径
        return "index";
    }
}
```

## 注解解析

### @RequestMapping 注解

`Spring MVC` 通过 `@RequestMapping` 注解把 `URL` 请求和业务方法进行映射，在控制器的类定义处以及方法定义处都可以添加 `@RequestMapping` ，在类定义处添加相当于多了一层访问路径。

@RequestMapping("/index") = @RequestMapping(value = "/index")

> method ：指定请求的 method 类型，包括GET、POST、PUT、DELETE等

### @PostMapping 等

@PostMapping("/index") = @RequestMapping(value = "/index"， method = RequestMethod.POST)

## 参数绑定

### URL 风格参数绑定

`params` 是对 `URL` 请求参数进行限制，不满足条件的 `URL` 无法访问该方法，需要在业务方法中获取 `URL` 的参数值。

1. 在业务方法定义时声明参数列表；
2. 给参数列表添加 `@RequestParam` 注解进行绑定；

```java
@RequestMapping("/index", method = RequestMethod.GET)
public String index(@RequestParam("num") Integer id) {
    System.out.println("id=" + id);
    return "index";
}
```

### RESTful 风格的URL参数获取

- 传统的URL：localhost:8080/hello/index?id=1&name=tom
- RESTful URL：localhost:8080/hello/index/1/tom

```java
@RequestMapping("/restful/{id}/{name}")
public String restful(@PathVariable("id") Integer num, @PathVariable("name") String name){
    System.out.println(num+"-"+name);
    return "index";
}
```

### 映射 Cookie

```java
@RequestMapping("/cookie")
public String getCookie(@CookieValue("JSESSIONID") String sessionId){
    System.out.println(sessionId);
    return "index";
}
```

### 使用 POJO 绑定参数

`Spring MVC` 会根据请求参数名和 `POJO` 属性名进行匹配，自动为该对象填充属性值，并且支持属性级联。

```java
@PostMapping("/user")
public Result addUser(User user) {
    return Result.error();
}
```

### JSP 页面的转发和重定向

`Spring MVC` 默认是通过转发的形式响应 `JSP`，可以手动进行修改。

#### 重定向

设置重定向的时候不能写逻辑视图，必须写明资源的物理路径，比如 `rediect:/index.jsp`

```java
@RequestMapping("/restful/{id}/{name}")
public String restful(@PathVariable("id") Integer num, @PathVariable("name") String name){
    System.out.println(num+"-"+name);
    return "rediect:/index.jsp";
}
```

#### 转发

```java
@RequestMapping("/restful/{id}/{name}")
public String restful(@PathVariable("id") Integer num, @PathVariable("name") String name){
    System.out.println(num+"-"+name);
    return "forward:/index.jsp";
}
```

## 文件上传

### 导入文件上传依赖

```xml
<dependency>
  <groupId>commons-io</groupId>
  <artifactId>commons-io</artifactId>
  <version>2.12.0</version>
</dependency>
<dependency>
  <groupId>commons-fileupload</groupId>
  <artifactId>commons-fileupload</artifactId>
  <version>1.5</version>
</dependency>
```

### 配置解析器

`SpringMVC.xml`

```xml
<!--文件上传解析器-->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
    <!-- 限制文件上传总大小，不设置默认没有限制，单位为字节 200*1024*1024即200M -->
    <property name="maxUploadSize" value="209715200" />
    <!-- 设置每个上传文件的大小上限 1024*1024*2 2M -->
    <property name="maxUploadSizePerFile" value="2019152"/>
    <!-- 处理文件名中文乱码 -->
    <property name="defaultEncoding" value="UTF-8" />
    <!-- resolveLazily属性启用是为了推迟文件解析，以便捕获文件大小异常 -->
    <property name="resolveLazily" value="true" />
</bean>
```

### 文件上传示例代码

```java
package cn.sugarscat.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("file")
public class FileUploadController {

    /**
     * 文件是以二进制流传输的
     * @param img img
     * @return String
     */
    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam("img") MultipartFile img, HttpServletRequest request){
        if (img.getSize()>0){
            String path = request.getSession().getServletContext().getRealPath("file");
            String filename = img.getOriginalFilename();
            File descFile= null;
            if (filename != null) {
                descFile = new File(path, filename);
            }
            try {
                if (descFile != null) {
                    img.transferTo(descFile); // 保存文件
                    System.out.println(descFile.getAbsolutePath()); // 打印文件保存目录
                }
                request.setAttribute("src", "/file/"+filename);
            } catch (IOException e) {
                e.fillInStackTrace();
            }
        }
        System.out.println(request.getAttribute("src"));
        return "upload";
    }

    /**
     * 多文件上传
     * @param imgs imgs
     * @param request HttpServletRequest
     * @return String
     */
    @PostMapping("/uploads")
    @ResponseBody
    public String uploads(@RequestParam("imgs") MultipartFile[] imgs, HttpServletRequest request){
        List<String> pathList=new ArrayList<>();
        for (MultipartFile img:imgs){
            if (img.getSize()>0){
                String path = request.getSession().getServletContext().getRealPath("file");
                String filename = img.getOriginalFilename();
                File descFile= null;
                if (filename != null) {
                    descFile = new File(path, filename);
                }
                try {
                    if (descFile != null) {
                        img.transferTo(descFile); // 保存文件
                    }
                    pathList.add("/file/"+filename);
                } catch (IOException e) {
                    e.fillInStackTrace();
                }
            }
        }
        request.setAttribute("pathList", pathList);
        return "uploads";

    }

}
```

## 拦截器

### 过滤器、监听器、拦截器的对比

- `Servlet`：处理 `Reequest` 请求和 `Response` 响应
- 过滤器(`Filter`)：对 `Request` 请求起到过滤作用，作用在 `Servlet` 之前，如果配置为 `/*` 可以为所有的资源(`servlet`、`js/css`静态资源等)进行过滤处理
- 监听器(`Listener`)：实现了 `javax.servlet.ServletContextListener` 接口的服务器端组件，它随 `Web` 应用的启动而启动，只初始化一次，然后一直监视，随`Web`应用的停止而销毁
  - 作用一：做初始化工作，`web` 应用中 `spring` 容器启动 `ContextLoaderListener`
  - 作用二：监听 `web` 中的特定事件，比如 `HttpSession`，`ServletRequest` 的创建和销毁；变量的创建、销毁和修改等可以在某些动作 前后增加处理，实现监控，比如说统计在线人数，利用 `HttpSessionListener` 等
- 拦截器(`Interceptor`)：是 `Spring MVC`、`Struts` 等表现层框架自己的，不会拦截 `jsp/html/css/image` 等的访问，只会拦截访问的控制器方法(`Handler`)
  - `servlet`、`filter`、`listener` 是配置在 `web.xml` 中，`interceptor` 是配置在表现层框架自己的配置文件中
  - 在 `Handler` 业务逻辑执行之前拦截一次
  - 在 `Handler` 逻辑执行完但是还没有跳转页面之前拦截一次
  - 在跳转页面后拦截一次

### 拦截器基本概念

`Spring MVC` 中的拦截器（`Interceptor`）类似于 `Servlet` 中的过滤器（`Filter`），它主要用于拦截用户请求并作相应的处理。例如通过拦截器可以进行权限验证、记录请求信息的日志、判断用户是否登录等。

要使用 `Spring MVC` 中的拦截器，就需要对拦截器类进行定义和配置。通常拦截器类可以通过两种方式来定义。

- 通过实现 `HandlerInterceptor` 接口
- 继承 `HandlerInterceptor` 接口的实现类（如：`HandlerInterceptorAdapter`）来定义。

### 拦截器的实现

通过实现 `HandlerInterceptor` 接口

```java
public class MyInterceptor implements HandlerInterceptor {
    /**
     * 在目标Handler(方法)执行前执行
     * 返回true:执行Handler方法
     * 返回false:阻止目标Handler方法执行
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("目标Handler执行前执行MyInterceptor---->preHandle方法...");
        return true;
    }

    /**
     * 在目标Handler(方法)执行后，视图生成前执行
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("目标Handler执行后，视图执行前执行MyInterceptor---->postHandle方法...");
    }

    /**
     * 在目标方法执行后，视图生成后执行
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("目标Handler执行后，视图执行后执行MyInterceptor---->afterCompletion方法...");
    }
}
```

拦截器配置1

```xml
<mvc:interceptors>
    <!-- 拦截器配置 -->
    <!--
        使用bean定义一个Interceptor
        直接定义在mvc:interceptors根下面的Interceptor将拦截所有的请求
        -->
    <bean class="com.example.interceptor.MyInterceptor"></bean>
</mvc:interceptors>
```

拦截器配置方式2

```xml
<!-- 拦截器配置2 -->
<mvc:interceptors>
    <!--定义在mvc:interceptor下面,可以自定义需要拦截的请求
        如果有多个拦截器满足拦截处理的要求，则依据配置的先后顺序来执行
        -->
    <mvc:interceptor>
        <!--通过mvc:mapping配置需要拦截的资源。支持通配符，可以配置多个 -->
        <mvc:mapping path="/**"/> <!-- /**表示拦截所有的请求-->
        <!--通过mvc:exclude-mapping配置不需要拦截的资源。支持通配符，可以配置多个 -->
        <mvc:exclude-mapping path="/hello/*"/> <!-- /hello/*表示放行hello路径下的请求 -->
        <bean class="com.example.interceptor.MyInterceptor"></bean>
    </mvc:interceptor>
</mvc:interceptors>
```

### 多个拦截器的实现

`Spring MVC` 框架支持多个拦截器的配置，从而构成拦截器链，对客户端进行多次拦截操作

过滤器配置

```xml
<mvc:interceptors>
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <bean class="com.example.interceptor.MyInterceptor"></bean>
    </mvc:interceptor>
    <mvc:interceptor>
        <mvc:mapping path="/**"/>
        <bean class="com.example.interceptor.MyInterceptor2"></bean>
    </mvc:interceptor>
</mvc:interceptors>
```

自定义第二个过滤器

```java
public class MyInterceptor2 implements HandlerInterceptor {
    /**
     * 在目标Handler(方法)执行前执行
     * 返回true:执行Handler方法
     * 返回false:阻止目标Handler方法执行
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("2.目标Handler执行前执行MyInterceptor2---->preHandle方法...");
        return true;
    }

    /**
     * 在目标Handler(方法)执行后，视图生成前执行
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("3.目标Handler执行后，视图执行前执行MyInterceptor2---->postHandle方法...");
    }

    /**
     * 在目标方法执行后，视图生成后执行
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        System.out.println("5.目标Handler执行后，视图执行后执行MyInterceptor2---->afterCompletion方法...");
    }
}
```

`Controller`

```java
@RequestMapping("/hello")
@Controller
public class HelloController{
    @RequestMapping("/packageType")
    @ResponseBody
    public String packageType(@RequestParam(value = "id", required = true) Integer id) {
        System.out.println("拦截的方法...");
        return "id=" + id;
    }
}
```

## 异常处理

### 方法一

`GlobalException.java`

```java
package cn.sugarscat.springmvc.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler({Exception.class})
//    @ResponseBody
    public String globalException(Exception exception, HttpServletRequest request) {
        System.out.println("全局异常捕获"+exception.getMessage());
        request.setAttribute("error", "全局异常捕获"+exception.getMessage());
        return "error";
    }
}
```

`applicationContext.xml`

```xml
<context:component-scan base-package="cn.sugarscat.springmvc.exception"/>
```

### 方法二

`applicationContext.xml`

```xml
<!--    异常处理-->
<bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">
    <property name="exceptionMappings">
        <props>
            <!-- 页面 -->
            <prop key="java.lang.Exception">error</prop>
        </props>
    </property>
</bean>
```

## SSM 整合

> Spring + SpringMVC + Mybatis

### 导入SSM依赖

`pom.xml`

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>org.example</groupId>
  <artifactId>SpringMVC</artifactId>
  <packaging>war</packaging>
  <version>1.0-SNAPSHOT</version>
  <name>SpringMVC Maven Webapp</name>
  <url>http://maven.apache.org</url>
  <dependencies>
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>

    <!-- Spring-web 依赖-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>5.2.25.RELEASE</version>
    </dependency>

    <!-- springmvc -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.2.8.RELEASE</version>
    </dependency>

    <!--spring AOP和aspectj框架整合的模块-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>5.2.25.RELEASE</version>
    </dependency>

    <!--spring 支持jdbc 编程模块-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.2.14.RELEASE</version>
    </dependency>

    <!--    lombok-->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.28</version>
      <scope>compile</scope>
    </dependency>

<!--    日志-->
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-api</artifactId>
      <version>2.0.7</version>
    </dependency>
    <dependency>
      <groupId>org.slf4j</groupId>
      <artifactId>slf4j-simple</artifactId>
      <version>2.0.7</version>
    </dependency>

    <!-- spring-json依赖 -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.15.1</version>
    </dependency>

    <!--文件上传-->
    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.12.0</version>
    </dependency>
    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.5</version>
    </dependency>

    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.2</version>
      <scope>provided</scope>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>

    <!-- mysql jdbc驱动包 -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
      <scope>runtime</scope>
    </dependency>
    <!--Druid数据库连接池 -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.20</version>
    </dependency>
    <!-- mybatis框架包 -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.13</version>
    </dependency>
    <!-- mybatis和spring整合依赖包 -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>2.1.1</version>
    </dependency>

<!-- log4j日志包 -->
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-slf4j-impl</artifactId>
      <version>2.13.3</version>
    </dependency>
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-web</artifactId>
      <version>2.13.3</version>
    </dependency>

  </dependencies>
  <build>
    <finalName>SpringMVC</finalName>
  </build>
</project>
```

### 一些配置

`log4j.properties`

```properties
log4j.rootLogger = info,stdout,D,E
log4j.appender.YourAppender.Encoding = UTF-8

log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n

log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = logs/log.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n

log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.File =logs/error.log
log4j.appender.E.Append = true
log4j.appender.E.Threshold = ERROR
log4j.appender.E.layout = org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```

`application.properties`

```properties
jdbc.username=root
jdbc.password=123456
jdbc.url=jdbc:mysql://127.0.0.1:3306/my_test?useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true
jdbc.driverClassName=com.mysql.cj.jdbc.Driver
jdbc.initialSize=5
```

`applicationContext.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd
       http://www.springframework.org/schema/context
       https://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/tx
       http://www.springframework.org/schema/tx/spring-tx.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!-- 配置自动扫包 -->
    <context:component-scan base-package="cn.sugarscat.springmvc.controller"/>

    <!-- 扫描 service 层组件 -->
    <context:component-scan base-package="cn.sugarscat.springmvc.service"/>

<!--    springMVC start-->
    <!-- springmvc 注解支持 -->
    <mvc:annotation-driven/>

    <!-- 不拦截静态资源 -->
    <mvc:default-servlet-handler/>

    <!-- 视图解析器 -->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <!--给逻辑视图加上前缀和后缀 -->
        <!--前缀-->
        <property name="prefix" value="/"/>
        <!--后缀-->
        <property name="suffix" value=".jsp"/>
    </bean>

    <mvc:interceptors>
        <!-- 拦截器配置 -->
        <!--
            使用bean定义一个Interceptor
            直接定义在mvc:interceptors根下面的Interceptor将拦截所有的请求
            -->
        <bean class="cn.sugarscat.springmvc.interceptor.LoginInterceptor"/>
    </mvc:interceptors>

    <!--文件上传解析器-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!-- 限制文件上传总大小，不设置默认没有限制，单位为字节 200*1024*1024即200M -->
        <property name="maxUploadSize" value="209715200" />
        <!-- 设置每个上传文件的大小上限 1024*1024*2 2M -->
        <property name="maxUploadSizePerFile" value="2019152"/>
        <!-- 处理文件名中文乱码 -->
        <property name="defaultEncoding" value="UTF-8" />
        <!-- resolveLazily属性启用是为了推迟文件解析，以便捕获文件大小异常 -->
        <property name="resolveLazily" value="true" />
    </bean>
<!--    springMVC end-->

    <!-- 读取外部配置文件 -->
    <context:property-placeholder location="classpath:application.properties"/>

    <!-- 将 Druid 数据源交给 Spring IOC 容器来管理-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="driverClassName" value="${jdbc.driverClassName}"/>
        <property name="initialSize" value="${jdbc.initialSize}"/>
    </bean>

    <!-- SqlSessionFactory 会话工厂交给 spring 容器管理-->
    <bean name="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--注入数据源-->
        <property name="dataSource" ref="dataSource"/>
        <!--配置 Mapper 映射文件的位置-->
<!--        <property name="mapperLocations" value="classpath:mapper/*Mapper.xml"/>-->
        <property name="configuration">
            <bean class="org.apache.ibatis.session.Configuration">
<!--                开启驼峰规则-->
                <property name="mapUnderscoreToCamelCase" value="true"/>
                <property name="cacheEnabled" value="true"/>
            </bean>
        </property>
    </bean>

    <!-- 配置Mapper接口的扫描器 -->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!-- 配置 mapper 接口所在的包 -->
        <property name="basePackage" value="cn.sugarscat.springmvc.mapper"/>
        <!-- 注入会话工厂 -->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
    </bean>

    <!--配置jdbc的事务管理器-->
    <bean name="txManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--注入数据源-->
        <property name="dataSource" ref="dataSource"/>
    </bean>

    <!-- 启用注解事务 -->
    <tx:annotation-driven transaction-manager="txManager"/>

<!--    异常处理-->
<!--    <bean class="org.springframework.web.servlet.handler.SimpleMappingExceptionResolver">-->
<!--        <property name="exceptionMappings">-->
<!--            <props>-->
<!--                <prop key="java.lang.Exception">error</prop>-->
<!--            </props>-->
<!--        </property>-->
<!--    </bean>-->
    <context:component-scan base-package="cn.sugarscat.springmvc.exception"/>
</beans>
```

### 代码示例

`User.java`

```java
package cn.sugarscat.springmvc.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Integer uid;
    private String uname;
    private String pwd;
    private Integer sex;
    private Integer age;
}
```

`UserMapper.java`

```java
package cn.sugarscat.springmvc.mapper;

import cn.sugarscat.springmvc.pojo.User;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserMapper {
    //查询全部用户
    @Select("select * from user")
    List<User> selectAll();

    //根据id查询用户
    @Select("select *  from user where uid = #{uid}")
    User selectByPrimaryKey(Integer uid);

    //根据id删除用户
    @Delete("delete from user where uid = #{uid}")
    void deleteByPrimaryKey(Integer uid);
}
```

`UserService.java`

```java
package cn.sugarscat.springmvc.service;

import cn.sugarscat.springmvc.pojo.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {

    /*查询所有用户*/
    List<User> queryAllUser();

    /*根据用户id查询用户*/
    User queryUserByUid(Integer uid);
}
```

`UserServiceImpl.java`

```java
package cn.sugarscat.springmvc.service.impl;

import cn.sugarscat.springmvc.mapper.UserMapper;
import cn.sugarscat.springmvc.pojo.User;
import cn.sugarscat.springmvc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public List<User> queryAllUser() {
        return userMapper.selectAll();
    }

    @Override
    public User queryUserByUid(Integer uid) {
        return userMapper.selectByPrimaryKey(uid);
    }
}
```

`UserController.java`

```java
package cn.sugarscat.springmvc.controller;

import cn.sugarscat.springmvc.pojo.User;
import cn.sugarscat.springmvc.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 查询所有用户
     * @return List<User>
     */
    @GetMapping("/user/all")
    public List<User> queryAllUser() {
        return userService.queryAllUser();
    }

    /**
     * 根据用户 id 查询用户
     * @param uid Integer
     * @return User
     */
    @GetMapping("/user/{uid}")
    public User queryUserByUid(@PathVariable("uid") Integer uid) {
        return userService.queryUserByUid(uid);
    }
}
```

## Spring 常用注解 ↓↓↓

### @Component

表示一个带注释的类是一个“组件”，成为 `Spring` 管理的 `Bean` 。当使用基于注解的配置和类路径扫描时，这些类被视为自动检测的候选对象。同时 `@Component` 还是一个元注解。

### @Service

组合注解（组合了 `@Component` 注解），应用在 `service` 层（业务逻辑层）。

### @Repository

组合注解（组合了 `@Component` 注解），应用在 `dao` 层（数据访问层）。

### @Controller

组合注解（组合了 `@Component` 注解），应用在 `MVC` 层（控制层），`DispatcherServlet` 会自动扫描注解了此注解的类，然后将 `web` 请求映射到注解了 `@RequestMapping` 的方法上。

### @RequestMapping

用于映射 `Web` 请求，包括访问路径和参数。（类或方法上）

### @ResponseBody

支持将返回值放在 `response` 内，而不是一个页面，通常用户返回 `json` 数据。（返回值旁或方法上）

### @RequestBody

允许 `request` 的参数在 `request` 体中，而不是在直接连接在地址后面。（放在参数前）

### @PathVariable

用于接收路径参数，比如 `@RequestMapping(“/hello/{name}”)` 申明的路径，将注解放在参数中前，即可获取该值，通常作为 `Restful` 的接口实现方法。

### @RestController

该注解为一个组合注解，相当于 `@Controller` 和 `@ResponseBody` 的组合，注解在类上，该 `Controller` 的所有方法都默认加上了 `@ResponseBody` 。

### @ExceptionHandler

用于全局处理控制器里的异常。

### @ModelAttribute

本来的作用是绑定键值对到 `Model` 里，在 `@ControllerAdvice` 中是让全局的 `@RequestMapping` 都能获得在此处设置的键值对。

### @Autowired

`Spring` 提供的工具（由 `Spring` 的依赖注入工具（`BeanPostProcessor`、`BeanFactoryPostProcessor`）自动注入）。

根据类型注入 `bean`，假如有多个同类型的 `bean` 对象，再根据名称去匹配 `bean` 对象。

> [!TIP]
>
> **扩展**
>
> `@Qualifier` 注解会改变 `Autowired` 注入策略，去 IOC 容器中获取 `bean` 对象，使用它的配置名称时，必须在 IOC 容器中有所配置。
>
> ```java
> @Qualifier("serviceHello")
> // 同时在 service 上必须配置
> @Service("serviceHello")
> ```

### @Configuration

声明当前类是一个配置类（相当于一个 `Spring` 配置的 `xml` 文件）（类上）。

### @Bean

注解在方法上，声明当前方法的返回值为一个 `Bean`。返回的 `Bean` 对应的类中可以定义 `init()` 方法和 `destroy()` 方法，然后在 `@Bean(initMethod=”init”,destroyMethod=”destroy”)` 定义，在构造之后执行 `init` ，在销毁之前执行`destroy`。（方法上）

### @ComponentScan

自动扫描指定包下所有使用 `@Service`、`@Component`、`@Controller`、`@Repository` 的类并注册（类上）。

### @Aspect

声明一个切面（类上） 使用 `@After、@Before、@Around` 定义建言（`advice`），可直接将拦截规则（切点）作为参数。

`@After` ：在方法执行之后执行（方法上）。

`@Before`： 在方法执行之前执行（方法上）。

`@Around`： 在方法执行之前与之后执行（方法上）。

`@PointCut`： 声明切点 在java配置类中使用 `@EnableAspectJAutoProxy` 注解开启 `Spring` 对 `AspectJ` 代理的支持（类上）。

### @Scope

定义我们采用什么模式去创建Bean（方法上，得有@Bean） 其设置类型包括：

> `Singleton` （单例,一个 `Spring` 容器中只有一个 `bean` 实例，默认模式）, `Prototype`（每次调用新建一个 `bean`）, `Request`（`web`项目中，给每个`http request`新建一个`bean`）, `Session`（`web`项目中，给每个`http session`新建一个`bean`）, `GlobalSession`（给每一个 `global http session`新建一个`bean`实例）。

### @PostConstruct

标注在方法上，该方法在构造函数执行完成之后执行。

### @PreDestory

标注在方法上，该方法在对象销毁之前执行。

### @Value

经常与 `Sping EL` 表达式语言一起使用，注入普通字符，系统属性，表达式运算结果，其他 `Bean` 的属性，文件内容，网址请求内容，配置文件属性值等。

### @EnableAsync

配置类中，通过此注解开启对异步任务的支持，叙事性 `AsyncConfigurer` 接口。（类上）

### @Async

在实际执行的 `bean`方法使用该注解来申明其是一个异步任务（方法上或类上所有的方法都将异步，需要 `@EnableAsync` 开启异步任务）

### @EnableScheduling

在配置类上使用，开启计划任务的支持。（类上）

### @Scheduled

来申明这是一个任务，包括 `cron`，`fixDelay`，`fixRate` 等类型。（方法上，需先开启计划任务的支持）

### @Enable\*注解说明

> 这些注解主要用来开启对 xxx 的支持。 `@EnableAspectJAutoProxy` 开启对 `AspectJ` 自动代理的支持。

`@EnableAsync`： 开启异步方法的支持。

`@EnableScheduling`： 开启计划任务的支持。

`@EnableWebMvc` ：开启 `Web MVC` 的配置支持。

`@EnableConfigurationProperties` ：开启对 `@ConfigurationProperties` 注解配置 `Bean` 的支持。

`@EnableJpaRepositories`：开启对 `SpringData JPA Repository` 的支持。

`@EnableTransactionManagement`：开启注解式事务的支持。

`@EnableTransactionManagement`： 开启注解式事务的支持。

`@EnableCaching`： 开启注解式的缓存支持。
