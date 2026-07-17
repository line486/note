# SpringBoot 数据访问

## CRUD 功能

`CRUD` 其实是数据库基本操作中的 `Create` (创建)、~~`Read`~~ `Retrieve` (读取)、`Update` (更新)、`Delete` (删除)。

## MySql

### 导入 JDBC 场景

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-jdbc</artifactId>
</dependency>
```

### 导入 mysql 驱动

```xml
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 修改 JDBC 配置项

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_account
    username: root
    password: 123456
    driver-class-name: com.mysql.jdbc.Driver
  jdbc:
    template:
      query-timeout: 3
      # 3 秒没结果，就超时
```

### JDBC 测试

```java
@Slf4j
@SpringBootTest
class MysqlTest {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Test
    void contextLoads() {

        Long aLong = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM `table_test`", Long.class);
        log.info("记录总数：{}",aLong);
    }

}
```

## Druid

> [Druid](https://github.com/alibaba/druid)

### 创建数据源

```xml
<dependency>
   <groupId>com.alibaba</groupId>
   <artifactId>druid</artifactId>
   <version>1.2.8</version>
</dependency>
```

### 修改 Druid 配置项

```yaml
datasource:
  url: jdbc:mysql://localhost:3306/db_account
  username: root
  password: 123456
  driver-class-name: com.mysql.cj.jdbc.Driver
```

```java
@Configuration
public class DruidConfig {

   @ConfigurationProperties(prefix = "spring.datasource")
   @Bean
   public DataSource druid() {
      return new DruidDataSource();
   }

   @Bean
   public JdbcTemplate jdbcTemplate(@Qualifier("druid") DataSource druid) {
      return new JdbcTemplate(druid);
   }

}
```

### 使用官方 starter 方式

#### 引入 starter

```xml
<dependency>
   <groupId>com.alibaba</groupId>
   <artifactId>druid-spring-boot-starter</artifactId>
   <version>1.2.8</version>
</dependency>
```

#### 配置示例

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/db_account
    username: root
    password: 123456
    driver-class-name: com.mysql.cj.jdbc.Driver

    druid:
      aop-patterns: com.atguigu.admin.* #监控SpringBean
      filters: stat,wall # 底层开启功能，stat（sql监控），wall（防火墙）

      stat-view-servlet: # 配置监控页功能
        enabled: true
        login-username: admin
        login-password: admin
        resetEnable: false

      web-stat-filter: # 监控web
        enabled: true
        urlPattern: /*
        exclusions: "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*"

      filter:
        stat: # 对上面filters里面的stat的详细配置
          slow-sql-millis: 1000
          logSlowSql: true
          enabled: true
        wall:
          enabled: true
          config:
            drop-table-allow: false
```

## MyBatis

### 引入 MyBatis 依赖

```xml
<dependency>
   <groupId>org.mybatis.spring.boot</groupId>
   <artifactId>mybatis-spring-boot-starter</artifactId>
   <version>2.1.4</version>
</dependency>
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 配置 MyBatis 数据源

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db_account
    username: root
    password: 123456
```

### 使用 MyBatis 注解

| 注解            | 说明                                   |
| --------------- | -------------------------------------- |
| @Insert         | 实现新增                               |
| @Delete         | 实现删除                               |
| @Update         | 实现更新                               |
| @Select         | 实现查询                               |
| @Result         | 实现结果集封装                         |
| @Results        | 可以与@Result 一起使用，封装多个结果集 |
| @ResultMap      | 实现引用@Results 定义的封装            |
| @One            | 实现一对一结果集封装                   |
| @Many           | 实现一对多结果集封装                   |
| @SelectProvider | 实现动态 SQL 映射                      |
| @CacheNamespace | 实现注解二级缓存的使用                 |

```java
@Mapper
public interface UserMapper {
    @Select("select * from t_user where id = #{id}")
    User findById(Integer id);
}
```

### @Result 中的属性

| 属性     | 介绍                                                |
| -------- | --------------------------------------------------- |
| id       | 是否是主键字段                                      |
| column   | 数据库的列名                                        |
| property | 需要装配的属性名                                    |
| one      | 需要使用的@One 注解（@Result（one=@One）（）））    |
| many     | 需要使用的@Many 注解（@Result（many=@many）（））） |

```java
public interface IUserDao {
   @Select("select * from user")
   @Results(id="userMap",value={
         @Result(id = true,column = "id",property = "userId"),
         @Result(column = "id",property = "userId"),
         @Result(column = "username",property = "userName"),
         @Result(column = "sex",property = "userSex"),
         @Result(column = "birthday",property = "userBirthday")

   })
   List<User> findAll();

   /**
     * 根据id查询用户
     * @param userId
     * @return
     */
    @Select("select * from user where id=#{id}")
    //@ResultMap(value={"userMap"})
    @ResultMap("userMap")
    User findById(Integer userId);
}
```

```java
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public boolean login(Integer userId) {
        User user = userMapper.findById(userId);
        log.info("{}", user);
        return false;
    }
}
```

## MyBatis Plus

> [MyBatis Plus](https://baomidou.com/pages/24112f/)

### 引入 MyBatis Plus 依赖

```xml
<dependency>
   <groupId>com.baomidou</groupId>
   <artifactId>mybatis-plus-boot-starter</artifactId>
   <version>3.4.1</version>
</dependency>
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
</dependency>
```

### 配置 MyBatis Plus 数据源

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db_account
    username: root
    password: 123456
```

### MyBatis Plus 示例

只需要我们的 `Mapper` 继承 `BaseMapper` 就可以拥有 `crud` 能力。

#### 基本示例

```java
@Mapper
public interface UserMapper extends BaseMapper<User> {}
```

```java
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public boolean login(String username, String password) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("name", username);
        queryWrapper.eq("password", password);
        List<User> users = userMapper.selectList(queryWrapper);
        log.info("{}", users);
        return false;
    }
}
```

#### 分页示例

```java
public Map<String, Object> getAllEmailAccounts(Integer pageNum, Integer pageSize) {
    Map<String, Object> data =  new HashMap<>();
    pageNum = (pageNum-1) * pageSize;
    Page<EmailAccount> acountPage = new Page<>(pageNum, pageSize);
    Page<EmailAccount> emailAccountPage = emailAccountMapper
            .selectPage(acountPage, null);
    data.put("total", emailAccountPage.getTotal());
    data.put("email", emailAccountPage.getRecords());
    return data;
}
```

### 注解与配置

- 如果数据库的表名与类名不匹配，则可以使用`@TableName`注解指定表名。

  ```java
  @TableName("t_user")
  ```

- 如果数据库的字段名与类中的属性名不匹配，则可以使用`@TableField`注解指定字段名。

  ```java
  @TableField("user_name")
  ```

  也可以开启⾃动驼峰命名规则（camel case）映射，从经典数据库列名 A_COLUMN（下划线命名） 到 经典 Java 属性名 aColumn（驼峰命名） 的类似映射。

  ```yaml
  mybatis-plus:
    configuration:
      map-underscore-to-camel-case: true
  ```

- 使用 `@TableId` 注解指定主键字段。

  ```java
  @TableId("id")
  ```

- `@TableField(fill = FieldFill.INSERT)` 表示在插入时填充字段。

- `@TableField(fill = FieldFill.UPDATE)` 表示在更新时填充字段。

- `@TableField(condition = SqlCondition.LIKE)` 表示模糊查询字段。

- `@TableField(exist = false)` 表示该字段在数据库中不存在。

- 开启数据库的 `ID` 自增策略：

  ```yaml
  mybatis-plus:
    global-config:
      db-config:
        id-type: auto
  ```

- 开启 `log4j` 日志输出：

  ```yaml
  mybatis-plus:
    configuration:
      log-impl: org.apache.ibatis.logging.log4j2.Log4j2Impl
  ```

## Redis

### 引入 Redis 依赖

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

### 配置 Redis

```yaml
spring:
  redis:
    host: 127.0.0.1
    port: 6379
    # password: 123456 # 有密码时配置
    # database: 0
    lettuce:
      pool:
        # 最大连接数
        max-active: 8
        # 当池耗尽时，连接分配在引发异常之前应阻塞的最长时间。
        max-wait: -1
        # 池中“空闲”连接的最大数量
        max-idle: 8
        # 池中要维护的最小空闲连接数的目标
        min-idle: 0
```

> [!TIP]
>
> - `Redis` 默认情况下，`maxIdle` 值为 `8`，`maxTotal` 值为 `8`，`maxWaitMillis` 值为 `-1`。
> - 负值表示没有限制。

### RedisTemplate 与 Lettuce

```java
@Test
void testRedis(){
   ValueOperations<String, String> operations = redisTemplate.opsForValue();

   operations.set("hello","world");

   String hello = operations.get("hello");
   System.out.println(hello);
}
```

## Jedis

### 引入 Jedis 依赖

```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<!--        导入jedis-->
<dependency>
   <groupId>redis.clients</groupId>
   <artifactId>jedis</artifactId>
</dependency>
```

### 配置 Jedis

```yaml
spring:
  redis:
    host: 127.0.0.1
    port: 6379
    # password: 123456 # 有密码时配置
    client-type: jedis
    jedis:
      pool:
        max-active: 10
```
