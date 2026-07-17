# MySQL 数据库

## 基本

1. 一行SQL语句

   ```sql
   -- 一行 SQL 语句
   UPDATE user SET username='robot', password='robot' WHERE username = 'root';
   ```

2. 多行SQL语句

   ```sql
   -- 多行 SQL 语句
   UPDATE user
   SET username='robot', password='robot'
   WHERE username = 'root';
   ```

3. 三种注释

   ```sql
   ## 注释1
   -- 注释2
   /* 注释3 */
   ```

4. AS 后是”别名“

## 一、 增删改查

> 增删改查，又称为 CRUD，数据库基本操作中的基本操作。

### 1. 插入数据

- INSERT INTO 语句用于向表中插入新记录。

1. 插入完整的一行

   ```sql
   INSERT INTO 表名 VALUES (值, 值, ..., 值);
   ```

2. 插入行的一部分

   ```sql
   INSERT INTO 表名(字段, 字段, ..., 字段) VALUES (值, 值, ..., 值);
   ```

3. 嵌套插入

   ```sql
   INSERT INTO 表1(字段1) SELECT n字段2 FROM 表2;
   ```

### 2. 更新数据

- UPDATE 语句用于更新表中的记录。

  ```sql
  UPDATE 表名 SET 字段 = 值, ... WHERE 字段 = 值, ...;
  -- WHERE 后面是条件
  ```

### 3. 删除数据（清空表）

- DELETE 语句用于删除表中的记录。
- TRUNCATE TABLE 可以清空表，也就是删除所有行。

1. 删除指定数据

   ```sql
   DELETE FROM 表名 WHERE 字段 = 值;
   ```

2. 清空表中数据

   ```sql
   TRUNCATE TABLE 表名;
   ```

### 4. 查找数据

- SELECT 语句用于从数据库中查询数据。
- DISTINCT 用于返回唯一不同的值。它作用于所有列，也就是说所有列的值都相同才算相同。
- 限制返回的行数。可以有两个参数，第一个参数为起始行，从 0 开始；第二个参数为返回的总行数。
- ASC ：升序（默认）
- DESC ：降序

1. 查找全部数据

   ```sql
   SELECT * FROM 表名;
   ```

2. 查找部分数据

   ```sql
   SELECT 字段, ... FROM 表名;
   ```

3. 查询不同的值

   ```sql
   SELECT DISTINCT 字段 FROM 表名;
   ```

4. 限制查询结果

   ```sql
   -- 返回前 5 行
   SELECT * FROM 表名 LIMIT 5;
   SELECT * FROM 表名 LIMIT 0, 5;
   -- 返回第 3 ~ 5 行
   SELECT * FROM 表名 LIMIT 2, 3;
   --查询前2种
   SELECT Top 2  * from 表名;
   --查询前百分之五
   SELECT Top 5 percent  * from 表名;
   ```

## 二、 子查询（嵌套）

> 子查询是嵌套在较大查询中的 SQL 查询。子查询也称为内部查询或内部选择，而包含子查询的语句也称为外部查询或外部选择。

### 1. 子查询的子查询

```sql
SELECT 字段, ...
FROM 表1
WHERE 字段 IN (SELECT 字段
FROM 表2
WHERE 字段 IN (SELECT 字段
FROM 表3
WHERE 字段 = 值));
```

### 2. WHERE

- WHERE 子句用于过滤记录，即缩小访问数据的范围。
- WHERE 后跟一个返回 true 或 false 的条件。
- WHERE 可以与 SELECT，UPDATE 和 DELETE 一起使用。
- 可以在 WHERE 子句中使用的操作符：
  - = : 等于
  - <> : 不等于。注释：在 SQL 的一些版本中，该操作符可被写成 !=
  - '>' : 大于
  - < : 小于
  - '>=' : 大于等于
  - <= : 小于等于
  - BETWEEN : 在某个范围内
  - LIKE : 搜索某种模式
  - IN : 指定针对某个列的多个可能值

### 3. IN 和 BETWEEN

- N 操作符在 WHERE 子句中使用，作用是在指定的几个特定值中任选一个值。
- BETWEEN 操作符在 WHERE 子句中使用，作用是选取介于某个范围内的值。

1. IN

   ```sql
   SELECT * FROM 表名 WHERE 字段 IN (值, ... );
   ```

2. BETWEEN

   ```sql
   SELECT * FROM 表名 WHERE 字段 BETWEEN 值 AND 值;
   ```

### 4. AND, OR, NOT

- AND、OR、NOT 是用于对过滤条件的逻辑处理指令。
- AND 优先级高于 OR，为了明确处理顺序，可以使用 ()。
- AND 操作符表示左右的条件都要满足。
- OR 操作符表示左右的条件满足任意一个即可。
- NOT 操作符用于否定一个条件。

1. AND

   ```sql
   SELECT 字段, ... FROM 表名 WHERE 字段 = 值 AND 字段 <= 值;
   ```

2. OR

   ```sql
   SELECT 字段, ... FROM 表名 WHERE 字段 = 值 OR 字段 = 值;
   ```

3. NOT

   ```sql
   SELECT 字段, ... FROM 表名 WHERE 字段 NOT BETWEEN 值 AND 值;
   ```

### 5. Like

- LIKE 操作符在 WHERE 子句中使用，作用是确定字符串是否匹配模式。
- 只有字段是文本值时才使用 LIKE。
- LIKE 支持两个通配符匹配选项：% 和 \_。
- 不要滥用通配符，通配符位于开头处匹配会非常慢。
- % 表示任何字符出现任意次数。
- \_ 表示任何字符出现一次。

1. % 示例

   ```sql
   SELECT 字段, ... FROM 表名
   WHERE 字段 LIKE '%值%';
   ```

2. \_ 示例

   ```sql
   SELECT 字段 FROM 表名
   WHERE 字段 LIKE '_值';
   ```

## 四、 连接和组合

### 1. 连接（JOIN）

- 如果一个 JOIN 至少有一个公共字段并且它们之间存在关系，则该 JOIN 可以在两个或多个表上工作。
- 连接用于连接多个表，使用 JOIN 关键字，并且条件语句使用 ON 而不是 WHERE。
- JOIN 保持基表（结构和数据）不变。
- JOIN 有两种连接类型：内连接和外连接。
- 内连接又称等值连接，使用 INNER
- JOIN 关键字。在没有条件语句的情况下返回笛卡尔积。
- 自连接可以看成内连接的一种，只是连接的表是自身而已。
- 自然连接是把同名列通过 = 测试连接起来的，同名列可以有多个。
- 内连接提供连接的列，而自然连接自动连接所有同名列。
- 外连接返回一个表中的所有行，并且仅返回来自次表中满足连接条件的那些行，即两个表中的列是相等的。外连接分为左外连接、右外连接、全外连接（Mysql 不支持）。
- 左外连接就是保留左表没有关联的行。
- 右外连接就是保留右表没有关联的行。
- 连接 vs 子查询：连接可以替换子查询，并且比子查询的效率一般会更快。

1. 内连接（INNER JOIN）

   ```sql
   SELECT 字段, ... FROM vendors
   INNER JOIN products ON vendors.vend_id = products.vend_id;
   ```

2. 自连接

   ```sql
   SELECT 字段, ... FROM customers c1, customers c2
   WHERE c1.cust_name = c2.cust_name AND c2.cust_contact = 'Jim Jones';
   ```

3. 自然连接（NATURAL JOIN）

   ```sql
   SELECT 字段, ... FROM Products
   NATURAL JOIN Customers;
   ```

4. 左连接（LEFT JOIN）

   ```sql
   SELECT 字段, ... FROM customers
   LEFT JOIN orders ON customers.cust_id = orders.cust_id;
   ```

5. 右连接（RIGHT JOIN）

   ```sql
   SELECT 字段, ... FROM customers
   RIGHT JOIN orders ON customers.cust_id = orders.cust_id;
   ```

### 2. 组合（UNION）

- UNION 运算符将两个或更多查询的结果组合起来，并生成一个结果集，其中包含来自 UNION 中参与查询的提取行。
- UNION 基本规则：
  - 所有查询的列数和列顺序必须相同。
  - 每个查询中涉及表的列的数据类型必须相同或兼容。
    - 通常返回的列名取自第一个查询。
- 默认会去除相同行，如果需要保留相同行，使用 UNION ALL。
- 只能包含一个 ORDER BY 子句，并且必须位于语句的最后。
- 应用场景
  - 在一个查询中从不同的表返回结构数据。
  - 对一个表执行多个查询，按一个查询返回数据。

1. 组合查询

   ```sql
   SELECT cust_name, cust_contact, cust_email
   FROM customers
   WHERE cust_state IN ('IL', 'IN', 'MI')
   UNION
   SELECT cust_name, cust_contact, cust_email
   FROM customers
   WHERE cust_name = 'Fun4All';
   ```

### 3. OIN vs UNION

- JOIN 中连接表的列可能不同，但在 UNION 中，所有查询的列数和列顺序必须相同。
- UNION 将查询之后的行放在一起（垂直放置），但 JOIN 将查询之后的列放在一起（水平放置），即它构成一个笛卡尔积。

## 五、函数(适合MySql)

### 1. 文本处理

| 函数             | 说明                   |
| :--------------- | :--------------------- |
| LEFT()、RIGHT()  | 左边或者右边的字符     |
| LOWER()、UPPER() | 转换为小写或者大写     |
| LTRIM()、RTIM()  | 去除左边或者右边的空格 |
| LENGTH()         | 长度                   |
| SOUNDEX()        | 转换为语音值           |

- SOUNDEX() 可以将一个字符串转换为描述其语音表示的字母数字模式。

```sql
SELECT *
FROM mytable
WHERE SOUNDEX(col1) = SOUNDEX('apple')
```

### 2. 日期和时间处理

- 日期格式：YYYY-MM-DD
- 时间格式：HH:MM:SS

| 函 数         | 说 明                          |
| :------------ | :----------------------------- |
| AddDate()     | 增加一个日期（天、周等）       |
| AddTime()     | 增加一个时间（时、分等）       |
| CurDate()     | 返回当前日期                   |
| CurTime()     | 返回当前时间                   |
| Date()        | 返回日期时间的日期部分         |
| DateDiff()    | 计算两个日期之差               |
| Date_Add()    | 高度灵活的日期运算函数         |
| Date_Format() | 返回一个格式化的日期或时间串   |
| Day()         | 返回一个日期的天数部分         |
| DayOfWeek()   | 对于一个日期，返回对应的星期几 |
| Hour()        | 返回一个时间的小时部分         |
| Minute()      | 返回一个时间的分钟部分         |
| Month()       | 返回一个日期的月份部分         |
| Now()         | 返回当前日期和时间             |
| Second()      | 返回一个时间的秒部分           |
| Time()        | 返回一个日期时间的时间部分     |
| Year()        | 返回一个日期的年份部分         |

- 如：

```sql
SELECT NOW(); -- 显示当前时间
```

### 3. 数值处理

| 函 数  | 说 明  |
| :----- | :----- |
| SIN()  | 正弦   |
| COS()  | 余弦   |
| TAN()  | 正切   |
| ABS()  | 绝对值 |
| SQRT() | 平方根 |
| MOD()  | 余数   |
| EXP()  | 指数   |
| PI()   | 圆周率 |
| RAND() | 随机数 |

### 4. 汇总

| 函 数   | 说 明            |
| :------ | :--------------- |
| AVG()   | 返回某列的平均值 |
| COUNT() | 返回某列的行数   |
| MAX()   | 返回某列的最大值 |
| MIN()   | 返回某列的最小值 |
| SUM()   | 返回某列值之和   |

- AVG() 会忽略 NULL 行。
- 使用 DISTINCT 可以让汇总函数值汇总不同的值。

```sql
SELECT AVG(DISTINCT 字段) AS 别名 FROM 表名;
```

## 六、 排序和分组

### 1. ORDER BY

- 用于对结果集进行排序。
- ASC ：升序（默认）
- DESC ：降序
- 可以按多个列进行排序，并且为每个列指定不同的排序方式

1. 指定多个列的排序方向

   ```sql
   SELECT 字段, ... FROM 表名
   ORDER BY 字段 DESC, 字段 ASC;
   ```

### 2. GROUP BY

- GROUP BY 子句将记录分组到汇总行中。
- GROUP BY 为每个组返回一个记录。
- GROUP BY 通常还涉及聚合：COUNT，MAX，SUM，AVG 等。
- GROUP BY 可以按一列或多列进行分组。
- GROUP BY 按分组字段进行排序后，ORDER BY 可以以汇总字段来进行排序。

1. 分组

   ```sql
   SELECT 字段, COUNT(字段) AS 别名 FROM 表名 GROUP BY 字段;
   ```

2. 分组后排序

   ```sql
   SELECT 字段, COUNT(字段) AS 别名 FROM 表名 GROUP BY 字段 ORDER BY 字段 DESC;
   ```

### 3. HAVING

- HAVING 用于对汇总的 GROUP BY 结果进行过滤。
- HAVING 要求存在一个 GROUP BY 子句。
- WHERE 和 HAVING 可以在相同的查询中。
- HAVING vs WHERE
- WHERE 和 HAVING 都是用于过滤。
- HAVING 适用于汇总的组记录；而 WHERE 适用于单个记录。

1. 使用 WHERE 和 HAVING 过滤数据

   ```sql
   SELECT 字段, COUNT(*) AS 别名 FROM 表名
   WHERE 字段 IS NOT NULL GROUP BY 字段 HAVING COUNT(*) >= 1;
   ```

## 七、 数据定义

> DDL 的主要功能是定义数据库对象（如：数据库、数据表、视图、索引等）。

### 1. 数据库（DATABASE）

1. 创建数据库

   ```sql
   CREATE DATABASE 表名;
   ```

2. 删除数据库

   ```sql
   DROP DATABASE 表名;
   ```

3. 选择数据库

   ```sql
   USE test;
   ```

### 2. 数据表（TABLE）

1. 创建数据表
   1. 普通创建

      ```sql
      CREATE TABLE user (
      id int(10) unsigned NOT NULL COMMENT 'Id',
      username varchar(64) NOT NULL DEFAULT 'default' COMMENT '用户名',
      password varchar(64) NOT NULL DEFAULT 'default' COMMENT '密码',
      email varchar(64) NOT NULL DEFAULT 'default' COMMENT '邮箱'
      ) COMMENT='用户表';
      ```

   2. 根据已有的表创建新表

      ```sql
      CREATE TABLE 表名 AS SELECT * FROM 表名;
      ```

2. 删除数据表

   ```sql
   DROP TABLE 表名;
   ```

3. 修改数据表
   1. 添加列

      ```sql
      ALTER TABLE user ADD age int(3);
      ```

   2. 删除列

      ```sql
      ALTER TABLE user DROP COLUMN age;
      ```

   3. 修改列

      ```sql
      ALTER TABLE user MODIFY COLUMN age tinyint;
      ```

   4. 添加主键

      ```sql
      ALTER TABLE user ADD PRIMARY KEY (id);
      ```

   5. 删除主键

      ```sql
      ALTER TABLE user DROP PRIMARY KEY;
      ```

### 3. 视图（VIEW）

- 定义
  - 视图是基于 SQL 语句的结果集的可视化的表。
  - 视图是虚拟的表，本身不包含数据，也就不能对其进行索引操作。对视图的操作和对普通表的操作一样。

- 作用
  - 简化复杂的 SQL 操作，比如复杂的联结；
  - 只使用实际表的一部分数据；
  - 通过只给用户访问视图的权限，保证数据的安全性；
  - 更改数据格式和表示。

1. 创建视图

   ```sql
   CREATE VIEW top_10_user_view AS
   SELECT id, username FROM user WHERE id < 10;
   ```

2. 删除视图

   ```sql
   DROP VIEW top_10_user_view;
   ```

### 4. 索引（INDEX）

- 作用
  - 通过索引可以更加快速高效地查询数据。
  - 用户无法看到索引，它们只能被用来加速查询。
- 注意：更新一个包含索引的表需要比更新一个没有索引的表花费更多的时间，这是由于索引本身也需要更新。
- 因此，理想的做法是仅仅在常常被搜索的列（以及表）上面创建索引。
- 唯一索引：唯一索引表明此索引的每一个索引值只对应唯一的数据记录。

1. 创建索引

   ```sql
   CREATE INDEX user_index ON user (id);
   ```

2. 创建唯一索引

   ```sql
   CREATE UNIQUE INDEX user_index ON user (id);
   ```

3. 删除索引

   ```sql
   ALTER TABLE user DROP INDEX user_index;
   ```

### 5. 约束

- 如果存在违反约束的数据行为，行为会被约束终止。
- 约束可以在创建表时规定（通过 CREATE TABLE 语句），或者在表创建之后规定（通过 ALTER TABLE 语句）。
- 约束类型
  - NOT NULL - 指示某列不能存储 NULL 值。
  - UNIQUE - 保证某列的每行必须有唯一的值。
  - PRIMARY KEY - NOT NULL 和 UNIQUE 的结合。确保某列（或两个列多个列的结合）有唯一标识，有助于更容易更快速地找到表中的一个特定的记录。
  - FOREIGN KEY - 保证一个表中的数据匹配另一个表中的值的参照完整性。
  - CHECK - 保证列中的值符合指定的条件。
  - DEFAULT - 规定没有给列赋值时的默认值。

1. 创建表时使用约束条件：

   ```sql
   CREATE TABLE Users (
   Id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增Id',
   Username VARCHAR(64) NOT NULL UNIQUE DEFAULT 'default' COMMENT '用户名',
   Password VARCHAR(64) NOT NULL DEFAULT 'default' COMMENT '密码',
   Email VARCHAR(64) NOT NULL DEFAULT 'default' COMMENT '邮箱地址',
   Enabled TINYINT(4) DEFAULT NULL COMMENT '是否有效',
   PRIMARY KEY (Id)
   ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
   ```

## 八、 事务处理

- 不能回退 SELECT 语句，回退 SELECT 语句也没意义；也不能回退 CREATE 和 DROP 语句。
- MySQL 默认是隐式提交，每执行一条语句就把这条语句当成一个事务然后进行提交。当出现 START TRANSACTION 语句时，会关闭隐式提交；当 COMMIT 或 ROLLBACK 语句执行后，事务会自动关闭，重新恢复隐式提交。
- 通过 set autocommit=0 可以取消自动提交，直到 set autocommit=1 才会提交；autocommit 标记是针对每个连接而不是针对服务器的。
- 指令
  - START TRANSACTION - 指令用于标记事务的起始点。
  - SAVEPOINT - 指令用于创建保留点。
  - ROLLBACK TO - 指令用于回滚到指定的保留点；如果没有设置保留点，则回退到 START TRANSACTION 语句处。
  - COMMIT - 提交事务。

```sql
-- 开始事务
START TRANSACTION;

-- 插入操作 A
INSERT INTO `user`
VALUES (1, 'root1', 'root1', 'xxxx@163.com');

-- 创建保留点 updateA
SAVEPOINT updateA;

-- 插入操作 B
INSERT INTO `user`
VALUES (2, 'root2', 'root2', 'xxxx@163.com');

-- 回滚到保留点 updateA
ROLLBACK TO updateA;

-- 提交事务，只有操作 A 生效
COMMIT;
```

## 九、 权限控制

- GRANT 和 REVOKE 可在几个层次上控制访问权限：
- 整个服务器，使用 GRANT ALL 和 REVOKE ALL；
- 整个数据库，使用 ON database.\*；
- 特定的表，使用 ON database.table；
- 特定的列；
- 特定的存储过程。
- 新创建的账户没有任何权限。
- 账户用 username@host 的形式定义，username@% 使用的是默认主机名。
- MySQL 的账户信息保存在 mysql 这个数据库中。

### 1. 创建账户

```sql
CREATE USER myuser IDENTIFIED BY 'mypassword';
```

### 2. 修改账户名

```sql
UPDATE user SET user='newuser' WHERE user='myuser';
FLUSH PRIVILEGES;
```

### 3. 删除账户

```sql
DROP USER myuser;
```

### 4. 查看权限

```sql
SHOW GRANTS FOR myuser;
```

### 5. 授予权限

```sql
GRANT SELECT, INSERT ON *.* TO myuser;
GRANT all privileges ON *.* TO 'root' @'%' identified BY 'Mysql@123';
grant create,alter,drop,select,insert,update,delete on apollodb.* to dev001@'%';
```

1. GRANT 与 ON 之间为操作（SELECT, INSERT ···）。
2. ON 与 TO 之间为数据库名，格式为：数据库名 + .\*。
3. TO 后面为账户。
4. @ 后面为ip地址，% 表示随意ip。
5. BY 后面为密码。

### 6. 删除权限

```sql
REVOKE SELECT, INSERT ON *.* FROM myuser;
```

### 7. 更改密码

```sql
SET PASSWORD FOR myuser = 'mypass';
```

### 7. 刷新权限

```sql
flush privileges；
```

## 十、 存储过程

- 存储过程可以看成是对一系列 SQL 操作的批处理；
- 好处：
  - 代码封装，保证了一定的安全性；
  - 代码复用；
  - 由于是预先编译，因此具有很高的性能。
- 创建存储过程：
  - 命令行中创建存储过程需要自定义分隔符，因为命令行是以 ; 为结束符，而存储过程中也包含了分号，因此会错误把这部分分号当成是结束符，造成语法错误。
  - 包含 in、out 和 inout 三种参数。
  - 给变量赋值都需要用 select into 语句。
  - 每次只能给一个变量赋值，不支持集合的操作。

### 1. 创建存储过程

```sql
DROP PROCEDURE IF EXISTS `proc_adder`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_adder`(IN a int, IN b int, OUT sum int)
BEGIN
DECLARE c int;
if a is null then set a = 0;
end if;

    if b is null then set b = 0;
    end if;

    set sum  = a + b;
END
;;
DELIMITER;
```

### 2. 使用存储过程

```sql
set @b=5;
call proc_adder(2,@b,@s);
select @s as sum;
```

## 十一、 游标

- 游标（cursor）是一个存储在 DBMS 服务器上的数据库查询，它不是一条 SELECT 语句，而是被该语句检索出来的结果集。
- 在存储过程中使用游标可以对一个结果集进行移动遍历。
- 游标主要用于交互式应用，其中用户需要对数据集中的任意行进行浏览和修改。
- 使用游标的四个步骤：
  - 声明游标，这个过程没有实际检索出数据；
  - 打开游标；
  - 取出数据；
  - 关闭游标；

```sql
DELIMITER $
CREATE  PROCEDURE getTotal()
BEGIN
DECLARE total INT;
-- 创建接收游标数据的变量
DECLARE sid INT;
DECLARE sname VARCHAR(10);
-- 创建总数变量
DECLARE sage INT;
-- 创建结束标志变量
DECLARE done INT DEFAULT false;
-- 创建游标
DECLARE cur CURSOR FOR SELECT id,name,age FROM cursor_table where age>30;
-- 指定游标循环结束时的返回值
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;
SET total = 0;
OPEN cur;
FETCH cur INTO sid, sname, sage;
WHILE(NOT done)
DO
SET total = total + 1;
FETCH cur INTO sid, sname, sage;
END WHILE;

    CLOSE cur;
    SELECT total;
END $
DELIMITER ;

-- 调用存储过程
call getTotal();
```

## 十二、 触发器

- 触发器是一种与表操作有关的数据库对象，当触发器所在表上出现指定事件时，将调用该对象，即表的操作事件触发表上的触发器的执行。
- 可以使用触发器来进行审计跟踪，把修改记录到另外一张表中。
- MySQL 不允许在触发器中使用 CALL 语句 ，也就是不能调用存储过程。

#### 1. BEGIN 和 END3

- 当触发器的触发条件满足时，将会执行 BEGIN 和 END 之间的触发器执行动作。
- 注意：在 MySQL 中，分号 ; 是语句结束的标识符，遇到分号表示该段语句已经结束，MySQL 可以开始执行了。
- 因此，解释器遇到触发器执行动作中的分号后就开始执行，然后会报错，因为没有找到和 BEGIN 匹配的 END。
- 这时就会用到 DELIMITER 命令（DELIMITER 是定界符，分隔符的意思）。
- 它是一条命令，不需要语句结束标识，语法为：DELIMITER new_delemiter。new_delemiter 可以设为 1 个或多个长度的符号，默认的是分号 ";"，
- 我们可以把它修改为其他符号，如 $ - DELIMITER $ 。
- 在这之后的语句，以分号结束，解释器不会有什么反应，只有遇到了 $，才认为是语句结束。注意，使用完之后，我们还应该记得把它给修改回来。

#### 2. NEW 和 OLD3

- MySQL 中定义了 NEW 和 OLD 关键字，用来表示触发器的所在表中，触发了触发器的那一行数据。
- 在 INSERT 型触发器中，NEW 用来表示将要（BEFORE）或已经（AFTER）插入的新数据；
- 在 UPDATE 型触发器中，OLD 用来表示将要或已经被修改的原数据，NEW 用来表示将要或已经修改为的新数据；
- 在 DELETE 型触发器中，OLD 用来表示将要或已经被删除的原数据；
- 使用方法：NEW.columnName （columnName 为相应数据表某一列名）

### 3. 创建触发器

- CREATE TRIGGER 指令用于创建触发器。

1. 语法：

   ```sql
   CREATE TRIGGER trigger_name
   trigger_time
   trigger_event
   ON table_name
   FOR EACH ROW
   BEGIN
   trigger_statements
   END;
   ```

2. 说明：
   - trigger_name：触发器名
   - trigger_time: 触发器的触发时机。取值为 BEFORE 或 AFTER。
   - trigger_event: 触发器的监听事件。取值为 INSERT、UPDATE 或 DELETE。
   - table_name: 触发器的监听目标。指定在哪张表上建立触发器。
   - FOR EACH ROW: 行级监视，Mysql 固定写法，其他 DBMS 不同。
   - trigger_statements: 触发器执行动作。是一条或多条 SQL 语句的列表，列表内的每条语句都必须用分号 ; 来结尾。

3. 示例：

   ```sql
   DELIMITER $
   CREATE TRIGGER `trigger_insert_user`
   AFTER INSERT ON `user`
   FOR EACH ROW
   BEGIN
   INSERT INTO `user_history`(user_id, operate_type, operate_time)
   VALUES (NEW.id, 'add a user',  now());
   END $
   DELIMITER;
   ```

### 4. 查看触发器

```sql
SHOW TRIGGERS;
```

### 5. 删除触发器

```sql
DROP TRIGGER IF EXISTS trigger_insert_user;
```
