# MongoDB 数据库

> [!NOTE]
>
> - [官方文档](https://www.mongodb.com/docs/)
> - [MongoDB University（免费课程）](https://learn.mongodb.com/)
> - [MongoDB Compass（图形化管理工具）](https://www.mongodb.com/products/compass)

## 什么是 MongoDB？

MongoDB 是一个开源的、面向文档的 NoSQL 数据库。它使用类似 JSON 的格式（称为 BSON）来存储数据，具有高性能、高可用性和自动扩展能力。与传统的关系型数据库（如 MySQL、PostgreSQL）不同，MongoDB 不使用表格和行，而是使用集合（Collections）和文档（Documents）来组织数据。

## 核心概念

### 文档（Document）

文档是 MongoDB 中的基本数据单元，类似于 JSON 对象。每个文档由键值对组成，例如：

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "张三",
  "age": 25,
  "email": "zhangsan@example.com"
}
```

- `_id` 是文档的唯一标识符，由 MongoDB 自动生成（类型为 ObjectId），也可以手动指定。
- 文档中的字段可以是字符串、数字、数组、嵌套对象等。

### 集合（Collection）

集合是一组文档的容器，相当于关系型数据库中的“表”。但集合是动态模式的，即同一个集合中的文档可以拥有不同的结构。

例如，一个名为 `users` 的集合可以包含多个用户文档。

### 数据库（Database）

数据库是集合的容器。一个 MongoDB 实例可以包含多个数据库。每个数据库有自己独立的集合和权限设置。

常用命令：

- `show dbs`：列出所有数据库
- `use mydb`：切换到名为 `mydb` 的数据库（如果不存在则创建）

## 安装 MongoDB

### 在 Windows 上安装

1. 访问 [MongoDB 官网下载页面](https://www.mongodb.com/try/download/community)
2. 下载 Community Server 版本
3. 运行安装程序，选择“Complete”安装类型
4. 将 MongoDB 的 `bin` 目录（如 `C:\Program Files\MongoDB\Server\7.0\bin`）添加到系统环境变量 PATH 中
5. 创建数据目录（默认为 `C:\data\db`）
6. 启动 MongoDB 服务：在命令行中运行 `mongod`
7. 另开一个终端，运行 `mongo` 或 `mongosh`（新版 Shell）连接数据库

### 在 macOS 上安装（使用 Homebrew）

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### 在 Linux（Ubuntu）上安装

```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

## 基本操作

### 连接数据库

打开终端，输入：

```bash
mongosh
```

### 创建/切换数据库

```javascript
use myFirstDB
```

> 注意：只有在向数据库中插入数据后，数据库才会真正被创建。

### 插入文档

```javascript
db.users.insertOne({
  name: "李四",
  age: 30,
  email: "lisi@example.com",
});
```

插入多个文档：

```javascript
db.users.insertMany([
  { name: "王五", age: 28 },
  { name: "赵六", age: 22, hobbies: ["读书", "游泳"] },
]);
```

### 查询文档

查询所有文档：

```javascript
db.users.find();
```

格式化输出：

```javascript
db.users.find().pretty();
```

条件查询（查找年龄大于 25 的用户）：

```javascript
db.users.find({ age: { $gt: 25 } });
```

### 更新文档

更新单个文档：

```javascript
db.users.updateOne({ name: "李四" }, { $set: { age: 31 } });
```

更新多个文档：

```javascript
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } });
```

### 删除文档

删除单个文档：

```javascript
db.users.deleteOne({ name: "赵六" });
```

删除多个文档：

```javascript
db.users.deleteMany({ status: "young" });
```

### 删除集合或数据库

删除当前数据库：

```javascript
db.dropDatabase();
```

删除集合：

```javascript
db.users.drop();
```

## 常用查询操作符

| 操作符    | 说明           | 示例                             |
| --------- | -------------- | -------------------------------- |
| `$eq`     | 等于           | `{ age: { $eq: 25 } }`           |
| `$ne`     | 不等于         | `{ age: { $ne: 25 } }`           |
| `$gt`     | 大于           | `{ age: { $gt: 25 } }`           |
| `$gte`    | 大于等于       | `{ age: { $gte: 25 } }`          |
| `$lt`     | 小于           | `{ age: { $lt: 25 } }`           |
| `$lte`    | 小于等于       | `{ age: { $lte: 25 } }`          |
| `$in`     | 在指定数组中   | `{ age: { $in: [20, 25, 30] } }` |
| `$nin`    | 不在指定数组中 | `{ age: { $nin: [20, 25] } }`    |
| `$regex`  | 正则匹配       | `{ name: { $regex: /^张/ } }`    |
| `$exists` | 字段是否存在   | `{ email: { $exists: true } }`   |
| `$size`   | 数组长度       | `{ hobbies: { $size: 2 } }`      |

## 索引（Index）

索引用于提高查询性能。

创建单字段索引：

```javascript
db.users.createIndex({ name: 1 }); // 1 表示升序，-1 表示降序
```

创建复合索引：

```javascript
db.users.createIndex({ name: 1, age: -1 });
```

查看集合中的索引：

```javascript
db.users.getIndexes();
```

删除索引：

```javascript
db.users.dropIndex({ name: 1 });
```

## 数据模型设计建议

- **嵌入 vs 引用**：
  - 如果数据经常一起使用且不常更新，考虑嵌入（将子文档直接放在父文档中）。
  - 如果数据独立、体积大或被多个文档共享，使用引用（存储另一个文档的 `_id`）。

- **避免深度嵌套**：MongoDB 不支持跨嵌套层级的高效查询。

- **合理使用数组**：适合存储列表类数据（如标签、评论），但注意数组过大可能影响性能。

## 常见误区

1. **认为 MongoDB 没有 schema**  
   虽然 MongoDB 是动态模式，但良好的应用仍应定义清晰的数据结构。

2. **忽略索引**  
   无索引的大集合查询会非常慢。

3. **过度嵌套文档**  
   导致查询复杂、更新困难。

4. **不处理 `_id` 冲突**  
   手动设置 `_id` 时需确保唯一性。
