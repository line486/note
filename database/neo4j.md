# Neo4j 数据库

> [!NOTE]
>
> - [官方文档](https://neo4j.com/docs/)
> - [Neo4j Sandbox（在线免费体验）](https://neo4j.com/sandbox/)
> - Neo4j Browser 内置教程：启动后输入 `:play intro` 或 `:play cypher`
> - [免费课程（Neo4j GraphAcademy）](https://graphacademy.neo4j.com/)

## 第一部分：基础入门

### 1. 什么是 Neo4j？

Neo4j 是全球领先的原生图数据库（Native Graph Database），专为高效存储、查询和分析高度互联的数据而设计。它采用属性图模型（Property Graph Model），将数据表示为节点（Nodes）、关系（Relationships）以及它们所携带的属性（Properties）。与传统的关系型数据库或文档数据库不同，Neo4j 的底层存储和查询引擎完全围绕“连接”进行优化，使得在处理社交网络、推荐系统、知识图谱、欺诈检测、供应链分析等场景时具有显著性能优势。

Neo4j 的主要特点包括：

- **原生图存储**：数据以图结构直接持久化，无需将图映射到表或文档
- **Cypher 查询语言**：声明式、可读性强、专为图设计的查询语言
- **ACID 事务支持**：保证数据一致性和可靠性
- **高性能遍历**：通过指针直接跳转，避免昂贵的 JOIN 操作
- **可视化工具**：内置 Neo4j Browser 提供交互式图探索界面
- **丰富生态**：支持多种编程语言驱动（Java、Python、JavaScript 等），提供 APOC（Awesome Procedures on Cypher）和 GDS（Graph Data Science）等强大扩展库
- **开源与商业版本并存**：社区版免费，企业版支持高可用、集群、监控等高级功能

Neo4j 被广泛应用于金融反欺诈、电信网络分析、医疗知识图谱、电商个性化推荐、IT 运维依赖管理等领域。

### 2. 图数据库 vs 关系型数据库

| 维度       | 关系型数据库（如 PostgreSQL）                             | 图数据库（Neo4j）                      |
| ---------- | --------------------------------------------------------- | -------------------------------------- |
| 数据模型   | 表（Table） + 行（Row） + 外键（Foreign Key）             | 节点（Node） + 关系（Relationship）    |
| 关联表达   | 通过外键和 JOIN 实现                                      | 通过显式、有向的关系直接连接           |
| 查询复杂度 | 多跳查询（如“朋友的朋友”）需多次 JOIN，性能随深度指数下降 | 多跳遍历为 O(1) 指针跳转，性能几乎恒定 |
| 扩展性     | 垂直扩展为主，分库分表复杂                                | 水平扩展支持（企业版集群）             |
| 适用场景   | 结构化事务处理、报表统计                                  | 高度关联数据分析、路径发现、模式识别   |

> 举例：查找“张三的朋友的朋友中谁也喜欢《三体》”
>
> - SQL：需 3 次 JOIN，语句冗长，执行慢
> - Cypher：`(p:Person {name:"张三"})-[:FRIEND*2]->(f)-[:LIKES]->(:Book {title:"三体"})`，直观高效

### 3. 核心图模型元素

#### 节点（Node）

- 代表实体，如人、产品、地点、事件
- 可拥有零个或多个**标签（Label）**，用于分类（类似关系型中的“表名”，但一个节点可有多个标签）
- 可携带任意数量的**属性（Property）**，以键值对形式存储（值类型：字符串、数字、布尔、列表等）

示例：

```
(:Person {name: "李雷", age: 28, city: "北京"})
```

- `Person` 是标签
- `{name: "李雷", ...}` 是属性

#### 关系（Relationship）

- 连接两个节点，表示语义关联
- **必须有方向**（从起点到终点）和**类型（Type）**
- 也可携带属性（如关系建立时间、权重、状态等）
- 关系是**一等公民**，可被直接查询和索引

示例：

```
(:Person {name: "李雷"})-[:FRIEND {since: 2020}]->(:Person {name: "韩梅梅"})
```

- `FRIEND` 是关系类型
- `{since: 2020}` 是关系属性
- `->` 表示方向（从李雷指向韩梅梅）

> 注意：虽然关系有方向，但查询时可忽略方向（使用 `-[:TYPE]-`）。

#### 属性（Property）

- 键值对，附加在节点或关系上
- 键为字符串，值可为：
  - 基本类型：String、Integer、Float、Boolean
  - 列表（List）：如 `["读书", "旅行"]`
  - 但**不能**是嵌套对象、其他节点或关系

#### 标签（Label）

- 用于对节点分组，加速查询（类似索引）
- 一个节点可有多个标签：`(:User:Customer:VIP)`
- 不强制要求，但强烈建议使用以提高可读性和性能

## 第二部分：安装、配置与工具

### 4. 安装 Neo4j

#### 方式一：Docker（推荐，快速启动）

```bash
# 拉取最新社区版镜像
docker pull neo4j:5

# 启动容器（暴露 Web UI 7474 和 Bolt 协议 7687）
docker run \
  --name neo4j \
  --publish=7474:7474 --publish=7687:7687 \
  --volume=$HOME/neo4j/data:/data \
  --env NEO4J_AUTH=neo4j/password \
  --env NEO4J_PLUGINS='["apoc", "graph-data-science"]' \
  neo4j:5
```

访问 `http://localhost:7474`，用户名 `neo4j`，密码 `password`

#### 方式二：Neo4j Desktop（图形化管理，适合开发）

1. 访问 [Neo4j 官网下载页](https://neo4j.com/download/)
2. 下载 Neo4j Desktop（支持 Windows/macOS）
3. 安装后创建新项目 → 添加本地 DBMS
4. 设置初始密码，点击“Start”启动数据库

#### 方式三：直接安装（Linux/macOS/Windows）

参考官方文档：https://neo4j.com/docs/operations-manual/current/installation/

### 5. 主要组件与端口

- **Neo4j Browser**：Web 界面，用于交互式查询和可视化（端口 `7474`）
- **Bolt 协议**：二进制通信协议，供驱动程序连接（端口 `7687`）
- **HTTP API**：RESTful 接口（端口 `7474`，路径 `/db/neo4j/tx` 等）
- **配置文件**：
  - `neo4j.conf`：主配置（内存、日志、安全等）
  - 默认位置：`$NEO4J_HOME/conf/neo4j.conf` 或 Docker 中挂载目录

关键配置项：

```txt
# 允许远程访问（默认仅 localhost）
server.bolt.advertised_address=localhost
server.http.advertised_address=localhost

# 内存设置（根据机器调整）
server.memory.heap.initial_size=512M
server.memory.heap.max_size=2G

# 启用 APOC 和 GDS 插件
dbms.security.procedures.unrestricted=apoc.*,gds.*
```

### 6. Neo4j Browser 使用指南

启动后访问 `http://localhost:7474`，输入账号密码登录。

常用命令（以冒号开头）：

- `:help`：显示帮助
- `:play intro`：内置入门教程
- `:play cypher`：Cypher 语法教程
- `:clear`：清空当前视图
- `:server connect`：切换数据库连接

界面分为：

- 顶部：命令输入区
- 中部：图可视化区（节点/关系以圆圈和连线展示）
- 底部：表格/文本结果区

> 技巧：点击图中节点可展开其属性；拖拽可调整布局；右键可删除或高亮。

## 第三部分：Cypher 查询语言详解

### 7. Cypher 基础语法

Cypher 是 Neo4j 的声明式图查询语言，灵感来自 SQL 和 ASCII-Art。

#### 模式表示法

- 节点：`()` 或 `(var:Label)` 或 `(n:Person {name: "Alice"})`
- 关系：`-->` 或 `-[:TYPE]->` 或 `<-[:KNOWS {since:2020}]-`
- 路径：`(a)-[:FRIEND]->(b)<-[:WORKS_AT]-(c)`

> 变量（如 `a`, `b`）用于在查询中引用元素。

### 8. 数据写入（CREATE, MERGE）

#### CREATE：无条件创建

```cypher
// 创建单个节点
CREATE (:Person {name: "王五", age: 30});

// 创建带关系的子图
CREATE
  (a:Person {name: "张三"}),
  (b:Person {name: "李四"}),
  (a)-[:FRIEND]->(b);
```

> 注意：重复执行会创建重复数据！

#### MERGE：智能创建（存在则匹配，不存在则创建）

```cypher
// 确保“张三”只存在一个
MERGE (p:Person {name: "张三"})
ON CREATE SET p.created = timestamp()
ON MATCH SET p.lastSeen = timestamp()
RETURN p;
```

- `ON CREATE`：仅当新创建时执行
- `ON MATCH`：仅当已存在时执行

> 最佳实践：对具有唯一标识的实体（如用户 ID、邮箱）使用 `MERGE`。

#### 创建关系

```cypher
MATCH (a:Person {name: "张三"}), (b:Person {name: "李四"})
MERGE (a)-[:FRIEND]->(b);
```

> 注意：必须先 `MATCH` 两端节点，再 `MERGE` 关系。

### 9. 数据查询（MATCH, RETURN, WHERE）

#### 基础查询

```cypher
// 查找所有人员
MATCH (p:Person)
RETURN p.name, p.age;

// 查找“张三”的直接朋友
MATCH (p:Person {name: "张三"})-[:FRIEND]->(friend)
RETURN friend.name;
```

#### 忽略方向

```cypher
// 无论 FRIEND 方向如何
MATCH (p:Person {name: "张三"})-[:FRIEND]-(friend)
RETURN friend.name;
```

#### 多跳查询

```cypher
// 朋友的朋友（两跳）
MATCH (p:Person {name: "张三"})-[:FRIEND*2]->(fof)
RETURN fof.name;

// 1 到 3 跳内的所有联系人
MATCH (p:Person {name: "张三"})-[:FRIEND*1..3]->(contact)
RETURN contact.name;
```

#### 条件过滤（WHERE）

```cypher
MATCH (p:Person)
WHERE p.age > 25 AND p.city = "上海"
RETURN p.name;

// 使用正则
MATCH (p:Person)
WHERE p.email =~ '.*@example\\.com$'
RETURN p.name;
```

#### 返回控制

```cypher
// 去重
MATCH (p:Person)-[:FRIEND]->(f)
RETURN DISTINCT f.name;

// 排序与分页
MATCH (p:Person)
RETURN p.name
ORDER BY p.age DESC
LIMIT 10 SKIP 20;
```

### 10. 数据更新（SET, REMOVE）

#### 修改属性

```cypher
MATCH (p:Person {name: "李四"})
SET p.age = 31, p.city = "深圳"
RETURN p;
```

#### 添加/移除标签

```cypher
MATCH (p:Person {name: "王五"})
SET p:Customer
REMOVE p:Prospect
RETURN p;
```

#### 更新关系属性

```cypher
MATCH (a:Person)-[r:FRIEND]->(b:Person)
WHERE a.name = "张三" AND b.name = "李四"
SET r.since = 2021
RETURN r;
```

### 11. 数据删除（DELETE, DETACH DELETE）

#### 删除关系

```cypher
MATCH (a:Person)-[r:FRIEND]->(b:Person)
WHERE a.name = "张三" AND b.name = "李四"
DELETE r;
```

#### 删除节点（必须先删关系）

```cypher
// 错误：节点仍有关系
MATCH (p:Person {name: "赵六"})
DELETE p;  // 报错

// 正确：自动删除所有关系
MATCH (p:Person {name: "赵六"})
DETACH DELETE p;
```

> `DETACH DELETE` 会级联删除该节点的所有关系。

### 12. 聚合与函数

#### 聚合函数

```cypher
// 统计每人朋友数
MATCH (p:Person)-[:FRIEND]->(f)
RETURN p.name, COUNT(f) AS friendCount
ORDER BY friendCount DESC;

// 平均年龄
MATCH (p:Person)
RETURN AVG(p.age) AS avgAge;
```

常见聚合函数：`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`, `COLLECT`（收集为列表）

#### 内置函数

- 字符串：`toUpper()`, `substring()`, `split()`
- 数学：`abs()`, `sqrt()`, `rand()`
- 列表：`size()`, `head()`, `last()`, `range()`
- 路径：`length()`, `nodes()`, `relationships()`

示例：

```cypher
MATCH path = (p:Person)-[:FRIEND*1..3]->(f)
WHERE p.name = "张三"
RETURN f.name, length(path) AS hops;
```

### 13. 子查询与过程（CALL）

#### 使用 APOC 过程

APOC（Awesome Procedures on Cypher）是 Neo4j 最流行的扩展库。

安装（Docker 已预装）：

```txt
# neo4j.conf 中启用
dbms.security.procedures.unrestricted=apoc.*
```

常用 APOC 功能：

```cypher
// 导出子图为 Cypher 语句
MATCH (p:Person {name: "张三"})-[*1..2]-(x)
WITH collect(x) AS nodes
CALL apoc.export.cypher.query(
  "MATCH (n) WHERE id(n) IN $nodes RETURN n",
  "output.cql",
  {format: "plain"}
)
YIELD file
RETURN file;

// 动态执行 Cypher
CALL apoc.cypher.run("MATCH (n:Person) RETURN n LIMIT $limit", {limit: 5})
YIELD value
RETURN value.n.name;
```

#### 使用 GDS（图算法）

GDS（Graph Data Science Library）提供 PageRank、社区发现、最短路径等算法。

示例：计算 PageRank

```cypher
// 投影图到内存（不修改原图）
CALL gds.graph.project(
  'myGraph',
  'Person',
  'FRIEND'
);

// 运行 PageRank
CALL gds.pageRank.stream('myGraph')
YIELD nodeId, score
RETURN gds.util.asNode(nodeId).name AS name, score
ORDER BY score DESC;
```

## 第四部分：高级建模与优化

### 14. 图数据建模原则

#### 建模步骤

1. **识别实体** → 转为节点（带标签）
2. **识别关系** → 转为有向关系（带类型）
3. **确定属性** → 分配给节点或关系
4. **验证查询需求** → 确保模型支持关键查询

#### 建模技巧

- **关系优于属性**：不要用 `friend_ids: [1,2,3]`，而应创建 `FRIEND` 关系
- **关系类型具体化**：用 `PURCHASED`、`WORKS_AT` 而非泛化的 `RELATED_TO`
- **避免属性爆炸**：若关系属性复杂（如交易明细），可引入中间节点
  ```
  (:User)-[:PLACED]->(:Order)-[:CONTAINS]->(:Product)
  ```
- **合理使用标签**：用于快速筛选（如 `:ActiveUser`），但不要过度（如每个用户一个标签）

#### 常见反模式

- 将关系存储为节点属性（丧失图遍历优势）
- 使用双向关系代替方向（如同时创建 A→B 和 B→A），应使用无向查询
- 在关系上存储大量属性（考虑节点化）

### 15. 索引与约束

#### 索引（加速 MATCH 查找）

```cypher
// 节点属性索引（Neo4j 5+ 语法）
CREATE INDEX person_name_index FOR (p:Person) ON (p.name);

// 复合索引
CREATE INDEX person_name_age_index FOR (p:Person) ON (p.name, p.age);

// 关系属性索引
CREATE INDEX friend_since_index FOR ()-[r:FRIEND]-() ON (r.since);
```

> 注意：索引仅加速 `WHERE` 或 `MATCH` 中的等值/范围查询，不加速图遍历。

#### 唯一约束（确保属性唯一 + 自动建索引）

```cypher
// 确保 Person 的 email 唯一
CREATE CONSTRAINT unique_person_email FOR (p:Person) REQUIRE p.email IS UNIQUE;

// 复合唯一约束
CREATE CONSTRAINT unique_user_login FOR (u:User) REQUIRE (u.username, u.tenantId) IS NODE KEY;
```

> `NODE KEY` 是 Neo4j 5 引入的复合唯一约束。

### 16. 性能优化策略

#### 查询优化

- **使用参数化查询**：避免硬编码值，提升计划缓存复用
  ```cypher
  MATCH (p:Person {name: $name}) RETURN p;
  ```
- **限制遍历深度**：避免 `[:REL*]` 无限制遍历
- **尽早过滤**：在 `MATCH` 后立即 `WHERE`
- **使用 EXPLAIN/PROFILE**：
  ```cypher
  PROFILE MATCH (p:Person {name: "张三"})-[:FRIEND*2]->(f) RETURN f.name;
  ```
  查看执行计划，关注 `DbHit`（数据库命中次数）是否过高

#### 数据模型优化

- 为高频查询路径添加“快捷关系”（如 `KNOWS_INDIRECTLY`）
- 对超大节点（如“热门商品”连接百万用户）进行分片或引入中间层

#### 配置调优（neo4j.conf）

```txt
# 堆内存（建议不超过物理内存 50%）
server.memory.heap.max_size=4G

# 页面缓存（用于存储图数据，越大越好）
server.memory.pagecache.size=2G

# 并发查询限制
dbms.transaction.concurrent.limit=100
```

## 第五部分：管理与运维

### 17. 用户与权限管理（企业版功能）

Neo4j 企业版支持基于角色的访问控制（RBAC）：

```cypher
// 创建用户
CREATE USER analyst SET PASSWORD 'secure123';

// 创建角色
CREATE ROLE data_reader;

// 授权（数据库级别）
GRANT ACCESS ON DATABASE neo4j TO data_reader;
GRANT READ { ALL LABELS } ON DATABASE neo4j TO data_reader;

// 分配角色
GRANT ROLE data_reader TO analyst;
```

社区版仅支持单一用户（初始设置的密码）。

### 18. 备份与恢复

#### 在线备份（企业版）

```bash
# 全量备份
neo4j-admin backup --database=neo4j --to=/backups/neo4j

# 增量备份
neo4j-admin backup --database=neo4j --to=/backups/neo4j --incremental
```

#### 社区版备份

直接复制数据目录（需停止服务）：

```bash
neo4j stop
cp -r $NEO4J_HOME/data /backup/
neo4j start
```

> 注意：运行时复制可能导致数据损坏。

### 19. 监控与日志

- **日志位置**：`$NEO4J_HOME/logs/`
  - `neo4j.log`：主日志
  - `security.log`：认证日志
  - `debug.log`：调试信息
- **指标暴露**：通过 JMX 或 Prometheus（企业版）
- **内置监控**：

  ```cypher
  // 查看当前查询
  CALL dbms.listQueries();

  // 终止慢查询
  CALL dbms.killQuery('query-id');
  ```

## 第六部分：应用场景与案例

### 20. 典型应用场景

#### 社交网络

- 查询：共同好友、六度空间、影响力分析
- 模型：`(:User)-[:FRIEND]->(:User)`

#### 推荐系统

- 查询：基于好友购买行为推荐商品
- 模型：`(:User)-[:BOUGHT]->(:Product)<-[:BOUGHT]-(:User)-[:FRIEND]->(me)`

#### 知识图谱

- 查询：实体关系问答（“爱因斯坦的出生地是？”）
- 模型：`(:Person {name:"爱因斯坦"})-[:BORN_IN]->(:City)`

#### 欺诈检测

- 查询：识别异常环路（如 A→B→C→A 的资金循环）
- 模型：`(:Account)-[:TRANSFERRED_TO {amount:1000}]->(:Account)`

#### IT 运维

- 查询：故障传播路径（服务器宕机影响哪些服务？）
- 模型：`(:Service)-[:DEPENDS_ON]->(:Server)`

### 21. 实战案例：电商推荐图谱

#### 数据模型

```
(:User)-[:PURCHASED {date:..., amount:...}]->(:Order)-[:CONTAINS {qty:...}]->(:Product)
(:Product)-[:CATEGORY]->(:Category)
(:User)-[:VIEWED]->(:Product)
```

#### 推荐查询

```cypher
// 基于协同过滤：找到购买相似商品的用户，推荐他们买过的其他商品
MATCH (me:User {id: 123})-[:PURCHASED]->(:Order)-[:CONTAINS]->(:Product)<-[:CONTAINS]-(:Order)<-[:PURCHASED]-(similarUser)
MATCH (similarUser)-[:PURCHASED]->(:Order)-[:CONTAINS]->(reco:Product)
WHERE NOT (me)-[:PURCHASED]->(:Order)-[:CONTAINS]->(reco)
RETURN reco.name, COUNT(*) AS score
ORDER BY score DESC
LIMIT 10;
```

## 第七部分：开发集成与生态

### 22. 官方驱动程序

Neo4j 提供多语言驱动，均支持 Bolt 协议：

- **Java**：`org.neo4j.driver`
- **Python**：`neo4j` 包
- **JavaScript/Node.js**：`neo4j-driver`
- **Go**：`github.com/neo4j/neo4j-go-driver`
- **.NET**：`Neo4j.Driver`

Python 示例：

```python
from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j", "password"))

def get_friends(tx, name):
    result = tx.run("MATCH (p:Person {name: $name})-[:FRIEND]->(f) RETURN f.name", name=name)
    return [record["f.name"] for record in result]

with driver.session() as session:
    friends = session.execute_read(get_friends, "张三")
    print(friends)

driver.close()
```

### 23. ETL 与数据导入

#### 使用 LOAD CSV

```cypher
LOAD CSV WITH HEADERS FROM 'file:///users.csv' AS row
MERGE (u:User {id: row.id})
SET u.name = row.name, u.email = row.email;
```

> 文件需放在 `$NEO4J_HOME/import/` 目录下（安全限制）。

#### 使用 APOC 导入 JSON/API

```cypher
CALL apoc.load.json("https://api.example.com/users")
YIELD value
MERGE (u:User {id: value.id})
SET u += value;
```

### 24. 可视化与 BI 集成

- **Neo4j Bloom**：企业级图探索工具（自然语言搜索）
- **Linkurious**：第三方图可视化平台
- **Power BI/Tableau**：通过 JDBC/ODBC 连接（需 Neo4j BI Connector，企业版）
