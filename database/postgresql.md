# PostgreSQL 数据库

> [!NOTE]
>
> [官方文档](https://www.postgresql.org/docs/)

## 第一部分：基础入门

### 1. 什么是 PostgreSQL？

PostgreSQL（常简称为 Postgres）是一个功能强大、开源的对象-关系型数据库管理系统（ORDBMS）。它起源于加州大学伯克利分校的 Ingres 项目，自 1986 年开始开发，1996 年正式命名为 PostgreSQL。其核心设计哲学是**可靠性、数据完整性、可扩展性与 SQL 标准兼容性**。

PostgreSQL 的主要特点包括：

- 完全支持 ACID 事务（原子性、一致性、隔离性、持久性）
- 多版本并发控制（MVCC），读写不阻塞
- 支持复杂查询、子查询、CTE（公共表表达式）、窗口函数
- 内置 JSON/JSONB 类型，支持 NoSQL 风格操作
- 强大的类型系统：自定义类型、数组、范围类型、复合类型等
- 支持多种过程语言：PL/pgSQL、PL/Python、PL/Perl、PL/JavaScript 等
- 可通过扩展机制添加新功能（如 PostGIS、pg_cron、pg_partman）
- 高可用架构支持：流复制、逻辑复制、自动故障转移（配合 Patroni）
- 开源（BSD 许可证），社区活跃，企业级稳定

PostgreSQL 被广泛应用于金融、电信、政府、SaaS 平台、大数据分析等领域，是许多高并发、高可靠系统的核心存储引擎。

### 2. 安装与配置

#### 2.1 安装方式

##### Windows

1. 访问 [EnterpriseDB 官网](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
2. 下载对应版本的图形化安装包（如 PostgreSQL 16）
3. 运行安装程序，按向导设置：
   - 安装目录（如 `C:\Program Files\PostgreSQL\16`）
   - 数据目录（如 `C:\Program Files\PostgreSQL\16\data`）
   - 超级用户密码（角色名默认为 `postgres`）
   - 端口（默认 `5432`）
   - 区域（建议选择 `Chinese (Simplified)` 或 `UTF8`）
4. 安装完成后，服务自动启动，可通过 Windows 服务管理器查看

##### macOS（使用 Homebrew）

```bash
# 安装
brew install postgresql

# 启动服务（后台运行）
brew services start postgresql

# 停止服务
brew services stop postgresql

# 查看状态
brew services list
```

##### Linux（Ubuntu/Debian）

```bash
# 添加官方 APT 仓库（可选，获取最新版）
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt update

# 安装
sudo apt install postgresql postgresql-contrib

# 启动并设置开机自启
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 2.2 初始登录与安全设置

PostgreSQL 默认创建一个超级用户角色 `postgres`，但无操作系统账户绑定。

在 Linux/macOS 上首次登录：

```bash
sudo -u postgres psql
```

在 Windows 上，可直接使用 `psql` 命令（需将 bin 目录加入 PATH）：

```cmd
psql -U postgres -h localhost -p 5432
```

首次登录后，强烈建议修改密码：

```sql
ALTER USER postgres PASSWORD 'YourStrongPassword123!';
```

#### 2.3 主要配置文件

PostgreSQL 的配置集中在数据目录（`PGDATA`）下：

- **`postgresql.conf`**：主配置文件，控制内存、连接、日志、WAL 等
  - 关键参数：
    - `listen_addresses = '*'`（允许远程连接）
    - `max_connections = 100`
    - `shared_buffers = 256MB`（建议设为物理内存的 25%）
    - `work_mem = 4MB`
    - `log_statement = 'all'`（开发环境可开启，生产慎用）

- **`pg_hba.conf`**：客户端认证配置（Host-Based Authentication）
  - 控制谁可以从哪里以什么方式连接
  - 示例：
    ```
    # TYPE  DATABASE        USER            ADDRESS                 METHOD
    local   all             all                                     peer
    host    all             all             127.0.0.1/32            md5
    host    all             all             0.0.0.0/0               reject
    ```
  - `METHOD` 常见值：`trust`（免密）、`md5`（密码加密）、`scram-sha-256`（更安全）、`peer`（Linux 本地用户映射）

> 修改配置后需重载或重启：

```sql
-- 仅重载非敏感参数（如日志）
SELECT pg_reload_conf();

-- 重启（修改端口、内存等需重启）
sudo systemctl restart postgresql
```

## 第二部分：核心语法与对象

### 3. 数据库与模式管理

#### 3.1 数据库（Database）

数据库是最高级别的逻辑容器，彼此完全隔离。

```sql
-- 创建数据库
CREATE DATABASE myapp ENCODING 'UTF8' LC_COLLATE 'en_US.UTF-8' TEMPLATE template0;

-- 删除数据库（必须无连接）
DROP DATABASE IF EXISTS old_db;

-- 列出所有数据库（psql 中）
\l
```

> 注意：不能在当前连接的数据库中删除自己。

#### 3.2 模式（Schema）

模式是数据库内的命名空间，用于组织对象（表、函数等）。默认模式为 `public`。

```sql
-- 创建模式
CREATE SCHEMA sales;

-- 在指定模式建表
CREATE TABLE sales.orders (id SERIAL, amount NUMERIC);

-- 设置搜索路径（影响未限定对象的查找顺序）
SET search_path TO sales, public;
SHOW search_path;
```

> 最佳实践：为不同模块使用不同 schema，避免命名冲突。

### 4. 表与数据类型

#### 4.1 基本表结构

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email TEXT CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$'),
    age INT CHECK (age BETWEEN 0 AND 150),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMP
);
```

关键约束说明：

- `PRIMARY KEY`：唯一且非空，自动创建唯一索引
- `UNIQUE`：列值唯一
- `NOT NULL`：禁止空值
- `CHECK`：自定义验证逻辑
- `DEFAULT`：插入时若未提供值则使用默认值

#### 4.2 PostgreSQL 特色数据类型

| 类型                     | 说明                                  | 示例                                          |
| ------------------------ | ------------------------------------- | --------------------------------------------- |
| `SERIAL` / `BIGSERIAL`   | 自增整数（自动创建序列）              | `id SERIAL` → 实际是 `INT` + `nextval('seq')` |
| `UUID`                   | 通用唯一标识符                        | `gen_random_uuid()`（需 `pgcrypto` 扩展）     |
| `JSON` / `JSONB`         | JSON 数据，`JSONB` 支持索引和高效查询 | `'{"name": "张三"}'::JSONB`                   |
| `ARRAY`                  | 数组类型                              | `tags TEXT[]`, `scores INT[][]`               |
| `RANGE`                  | 范围类型（如时间区间、数值区间）      | `tsrange(NOW(), NOW() + '1 hour')`            |
| `INET` / `CIDR`          | IP 地址                               | `ip INET`                                     |
| `TSVECTOR` / `TSQUERY`   | 全文检索类型                          | `to_tsvector('english', 'hello world')`       |
| `GEOMETRY` / `GEOGRAPHY` | 地理空间（需 PostGIS 扩展）           | `POINT(116.4 39.9)`                           |

> 推荐：优先使用 `JSONB` 而非 `JSON`，因其二进制存储、支持 GIN 索引、可去重。

#### 4.3 修改表结构（DDL）

```sql
-- 添加列
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

-- 修改列类型
ALTER TABLE users ALTER COLUMN age TYPE SMALLINT;

-- 设置/删除默认值
ALTER TABLE users ALTER COLUMN updated_at SET DEFAULT NOW();
ALTER TABLE users ALTER COLUMN updated_at DROP DEFAULT;

-- 重命名列
ALTER TABLE users RENAME COLUMN phone TO mobile;

-- 删除列（谨慎！）
ALTER TABLE users DROP COLUMN mobile;

-- 添加约束
ALTER TABLE users ADD CONSTRAINT valid_email CHECK (email ~ '@');

-- 删除约束
ALTER TABLE users DROP CONSTRAINT valid_email;
```

> 注意：`ALTER COLUMN ... TYPE` 可能需要重写整个表，大表操作需谨慎。

### 5. 数据操作（DML）

#### 5.1 插入数据

```sql
-- 单行插入
INSERT INTO users (username, email, age)
VALUES ('alice', 'alice@example.com', 28);

-- 多行插入
INSERT INTO users (username, email, age)
VALUES
  ('bob', 'bob@example.com', 32),
  ('charlie', 'charlie@example.com', 25);

-- 返回插入的值（常用于获取自增 ID）
INSERT INTO users (username, email)
VALUES ('david', 'david@example.com')
RETURNING id, created_at;
```

#### 5.2 查询数据（SELECT）

```sql
-- 基础查询
SELECT id, username, email FROM users WHERE age > 25;

-- 排序与分页
SELECT * FROM users ORDER BY created_at DESC LIMIT 10 OFFSET 20;

-- 去重
SELECT DISTINCT age FROM users;

-- 聚合函数
SELECT COUNT(*), AVG(age), MAX(created_at) FROM users;

-- 分组
SELECT age, COUNT(*) FROM users GROUP BY age HAVING COUNT(*) > 1;
```

#### 5.3 更新与删除

```sql
-- 更新
UPDATE users
SET updated_at = NOW(), is_active = false
WHERE username = 'alice';

-- 返回更新后的行
UPDATE users
SET age = age + 1
WHERE id = 1
RETURNING *;

-- 删除
DELETE FROM users WHERE is_active = false;

-- 返回被删除的行
DELETE FROM users WHERE id = 1 RETURNING *;
```

> 注意：PostgreSQL 的 `UPDATE` 和 `DELETE` 支持 `RETURNING` 子句，非常实用。

## 第三部分：高级特性

### 6. 索引优化

索引是提升查询性能的关键。

#### 6.1 常见索引类型

- **B-tree**（默认）：适用于等值、范围查询（`=`、`<`、`>`、`BETWEEN`）
- **Hash**：仅用于等值查询（`=`），不支持排序
- **GIN**（Generalized Inverted Index）：适用于数组、JSONB、全文检索
- **GiST**：适用于几何、地理、全文检索等
- **BRIN**：适用于大表且数据物理有序的场景（如时间序列）

#### 6.2 创建索引示例

```sql
-- B-tree 索引（默认）
CREATE INDEX idx_users_email ON users(email);

-- 多列索引（注意列顺序）
CREATE INDEX idx_users_age_active ON users(age, is_active);

-- 降序索引
CREATE INDEX idx_users_created_desc ON users(created_at DESC);

-- 部分索引（只索引满足条件的行）
CREATE INDEX idx_active_users ON users(username) WHERE is_active = true;

-- GIN 索引（JSONB）
CREATE INDEX idx_users_profile ON users USING GIN (profile);

-- 全文检索索引
CREATE INDEX idx_users_search ON users USING GIN (to_tsvector('english', bio));
```

#### 6.3 索引使用建议

- 高频 WHERE 条件字段建索引
- ORDER BY 字段考虑建索引（尤其与 WHERE 结合）
- 避免在低选择性列（如性别）上建索引
- 定期 `REINDEX` 或监控膨胀（`pg_stat_user_indexes`）

### 7. 事务与并发控制

#### 7.1 事务基础

PostgreSQL 完全支持 ACID：

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
COMMIT;  -- 或 ROLLBACK;
```

#### 7.2 隔离级别

PostgreSQL 支持四种隔离级别（默认为 `READ COMMITTED`）：

- `READ UNCOMMITTED` → 实际等同于 `READ COMMITTED`
- `READ COMMITTED`（默认）：只能看到已提交的数据
- `REPEATABLE READ`：事务内多次读取结果一致，防止“不可重复读”
- `SERIALIZABLE`：最高隔离，防止幻读，但可能因串行化失败而回滚

设置隔离级别：

```sql
BEGIN ISOLATION LEVEL SERIALIZABLE;
```

#### 7.3 MVCC 机制

PostgreSQL 使用 **多版本并发控制（MVCC）** 实现高并发：

- 每行记录包含 `xmin`（创建事务 ID）、`xmax`（删除事务 ID）
- 读操作不会阻塞写，写操作不会阻塞读
- 旧版本数据由 `VACUUM` 回收（自动或手动）

### 8. 视图与物化视图

#### 8.1 普通视图

虚拟表，每次查询时执行底层 SQL：

```sql
CREATE VIEW active_user_summary AS
SELECT u.id, u.username, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.is_active = true
GROUP BY u.id, u.username;
```

#### 8.2 物化视图（Materialized View）

将查询结果物理存储，提升复杂查询性能，但需手动刷新：

```sql
CREATE MATERIALIZED VIEW monthly_sales AS
SELECT DATE_TRUNC('month', created_at) AS month, SUM(amount) AS total
FROM orders
GROUP BY month;

-- 刷新（全量）
REFRESH MATERIALIZED VIEW monthly_sales;

-- PostgreSQL 9.4+ 支持并发刷新（需有唯一索引）
CREATE UNIQUE INDEX idx_monthly_sales_month ON monthly_sales(month);
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_sales;
```

### 9. 函数与存储过程

#### 9.1 PL/pgSQL 函数

```sql
CREATE OR REPLACE FUNCTION get_user_age(user_id INT)
RETURNS INT AS $$
DECLARE
    user_age INT;
BEGIN
    SELECT age INTO user_age FROM users WHERE id = user_id;
    RETURN user_age;
END;
$$ LANGUAGE plpgsql;

-- 调用
SELECT get_user_age(1);
```

#### 9.2 存储过程（PostgreSQL 11+）

支持 `CALL` 语句和事务控制：

```sql
CREATE PROCEDURE transfer_funds(from_id INT, to_id INT, amount NUMERIC)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE accounts SET balance = balance - amount WHERE id = from_id;
    UPDATE accounts SET balance = balance + amount WHERE id = to_id;
    COMMIT;
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
$$;

-- 调用
CALL transfer_funds(1, 2, 100.00);
```

### 10. JSON 与 NoSQL 能力

#### 10.1 JSONB 操作符

| 操作符 | 说明                                 |
| ------ | ------------------------------------ |
| `->`   | 返回 JSON 对象字段（返回 JSON 类型） |
| `->>`  | 返回 JSON 对象字段（返回文本）       |
| `#>`   | 按路径提取（如 `'{a,b}'`）           |
| `@>`   | 左包含右（用于查询）                 |
| `<@`   | 右包含左                             |
| `?`    | 是否包含指定 key                     |
| `?`    | 是否包含任意 key（数组）             |
| `?&`   | 是否包含所有 key（数组）             |

#### 10.2 示例

```sql
-- 插入 JSONB
INSERT INTO users (username, profile)
VALUES ('eve', '{"city": "上海", "hobbies": ["摄影", "旅行"], "settings": {"theme": "dark"}}'::JSONB);

-- 查询
SELECT username FROM users WHERE profile->>'city' = '上海';
SELECT username FROM users WHERE profile @> '{"hobbies": ["摄影"]}';
SELECT username, profile->'settings'->>'theme' AS theme FROM users;

-- 索引加速
CREATE INDEX idx_users_profile_gin ON users USING GIN (profile);
```

> JSONB 是 PostgreSQL 实现“混合工作负载”（HTAP）的关键特性。

## 第四部分：管理与运维

### 11. 用户与权限管理

#### 11.1 角色（Role）

PostgreSQL 使用角色统一管理用户和组：

```sql
-- 创建登录角色（用户）
CREATE ROLE webuser WITH LOGIN PASSWORD 'webpass';

-- 创建组角色
CREATE ROLE app_readonly;

-- 授予组权限
GRANT app_readonly TO webuser;

-- 授权数据库连接
GRANT CONNECT ON DATABASE myapp TO app_readonly;

-- 授权模式使用
GRANT USAGE ON SCHEMA public TO app_readonly;

-- 授权表查询
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

-- 设置默认权限（未来新建表也生效）
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO app_readonly;
```

#### 11.2 行级安全（RLS）

PostgreSQL 9.5+ 支持行级访问控制：

```sql
-- 启用 RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 创建策略：用户只能看自己的订单
CREATE POLICY user_orders_policy ON orders
FOR SELECT USING (user_id = current_setting('app.current_user_id')::INT);
```

> 需配合应用设置 `current_setting` 或使用 `current_user`。

### 12. 备份与恢复

#### 12.1 逻辑备份（pg_dump）

适用于跨版本迁移、选择性恢复：

```bash
# 备份单个数据库
pg_dump -U postgres -h localhost -F c -b -v -f mydb.backup mydb

# 备份所有数据库
pg_dumpall -U postgres -h localhost > all.sql

# 恢复（需先创建空数据库）
pg_restore -U postgres -d mydb mydb.backup
psql -U postgres -d mydb < all.sql
```

格式说明：

- `-F p`：纯文本 SQL（默认）
- `-F c`：自定义格式（压缩、支持并行恢复）
- `-F d`：目录格式（支持并行备份）

#### 12.2 物理备份（基础备份 + WAL）

用于 PITR（时间点恢复）：

```bash
# 开启归档（postgresql.conf）
archive_mode = on
archive_command = 'cp %p /path/to/wal_archive/%f'

# 创建基础备份
SELECT pg_start_backup('my_backup');
-- 复制整个 PGDATA 目录
SELECT pg_stop_backup();
```

> 生产环境推荐使用 `pg_basebackup` 或工具如 `barman`、`wal-g`。

### 13. 性能调优

#### 13.1 查询分析

使用 `EXPLAIN` 查看执行计划：

```sql
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM users WHERE email = 'test@example.com';
```

关键指标：

- `Seq Scan` vs `Index Scan`：是否走索引
- `Rows Removed by Filter`：过滤效率
- `Buffers: shared hit/miss`：缓存命中率

#### 13.2 关键配置参数（postgresql.conf）

| 参数                   | 建议值（示例）             | 说明                     |
| ---------------------- | -------------------------- | ------------------------ |
| `shared_buffers`       | 25% 物理内存（不超过 8GB） | 数据库缓存               |
| `effective_cache_size` | 50-75% 物理内存            | 告知优化器 OS 缓存大小   |
| `work_mem`             | 4-64MB                     | 排序、哈希操作内存       |
| `maintenance_work_mem` | 1GB                        | VACUUM、索引创建内存     |
| `max_connections`      | 100-300                    | 连接数（过高影响性能）   |
| `random_page_cost`     | 1.1（SSD）                 | 随机读成本（HDD 为 4.0） |

#### 13.3 监控工具

- 内置视图：`pg_stat_user_tables`, `pg_stat_statements`
- 扩展：`pg_stat_statements`（需加载）
  ```sql
  CREATE EXTENSION pg_stat_statements;
  SELECT query, calls, total_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;
  ```
- 外部工具：`pgAdmin`、`Prometheus + postgres_exporter`、`pgBadger`

### 14. 高可用与复制

#### 14.1 流复制（Streaming Replication）

主从架构，用于读扩展和故障转移：

- 主库（Primary）：处理读写
- 备库（Standby）：只读，实时同步 WAL 日志

配置步骤：

1. 主库设置 `wal_level = replica`, `max_wal_senders = 3`
2. 创建复制用户：`CREATE ROLE replicator REPLICATION LOGIN;`
3. 配置 `pg_hba.conf` 允许备库连接
4. 备库通过 `pg_basebackup` 初始化
5. 启动备库，自动流复制

#### 14.2 逻辑复制

PostgreSQL 10+ 支持基于发布/订阅的逻辑复制：

```sql
-- 主库：创建发布
CREATE PUBLICATION pub_users FOR TABLE users;

-- 备库：创建订阅
CREATE SUBSCRIPTION sub_users
CONNECTION 'host=primary dbname=mydb user=replicator'
PUBLICATION pub_users;
```

> 优势：可跨版本、跨数据库、选择性复制表；支持双向同步（需小心冲突）。

#### 14.3 自动故障转移

推荐使用 **Patroni**（基于 etcd/Consul/ZooKeeper）实现自动主从切换。

## 第五部分：扩展与生态

### 15. 常用扩展

PostgreSQL 通过 `CREATE EXTENSION` 加载功能模块：

| 扩展          | 功能                                        |
| ------------- | ------------------------------------------- |
| `pgcrypto`    | 加密函数（`gen_random_uuid()`, `digest()`） |
| `uuid-ossp`   | UUID 生成（旧版）                           |
| `postgis`     | 地理信息系统（GIS）支持                     |
| `pg_trgm`     | 三元组相似度（用于模糊搜索）                |
| `hstore`      | key-value 存储（已被 JSONB 取代）           |
| `pg_cron`     | 数据库内定时任务                            |
| `pg_partman`  | 自动分区管理                                |
| `timescaledb` | 时间序列数据库扩展                          |

安装示例：

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();
```

### 16. 分区表（Partitioning）

PostgreSQL 10+ 原生支持声明式分区：

#### 范围分区（Range）

```sql
CREATE TABLE orders (
    id BIGSERIAL,
    created_at DATE,
    amount NUMERIC
) PARTITION BY RANGE (created_at);

CREATE TABLE orders_2023 PARTITION OF orders
FOR VALUES FROM ('2023-01-01') TO ('2024-01-01');

CREATE TABLE orders_2024 PARTITION OF orders
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

#### 列表分区（List）

```sql
CREATE TABLE events (id INT, region TEXT) PARTITION BY LIST (region);
CREATE TABLE events_eu PARTITION OF events FOR VALUES IN ('EU');
CREATE TABLE events_us PARTITION OF events FOR VALUES IN ('US');
```

> 优势：大表查询性能提升、便于数据生命周期管理（如自动删除旧分区）。

## 第六部分：最佳实践与避坑指南

### 17. 设计规范

- **主键**：优先使用 `BIGSERIAL` 或 `UUID`（分布式系统）
- **命名**：小写 + 下划线（`user_orders`），避免关键字
- **NULL 处理**：明确是否允许 NULL，避免三值逻辑陷阱
- **枚举**：使用 `CHECK` 约束或单独字典表，而非字符串
- **时间**：始终使用 `TIMESTAMPTZ`（带时区）
- **金额**：使用 `NUMERIC(p,s)`，避免浮点误差

### 18. 常见陷阱

- **N+1 查询**：应用层循环查数据库 → 改用 JOIN 或批量查询
- **忘记索引**：WHERE、JOIN、ORDER BY 字段需评估索引
- **过度使用 SELECT \***：网络传输和解析开销大
- **长事务**：阻塞 VACUUM，导致表膨胀
- **未监控膨胀**：定期 `VACUUM` 或启用 `autovacuum`

### 19. 开发工具推荐

- **GUI 客户端**：
  - pgAdmin（官方，功能全）
  - DBeaver（开源，跨数据库）
  - TablePlus（现代 UI，macOS/Windows）
- **ORM 框架**：
  - Python：SQLAlchemy, Django ORM
  - Node.js：Prisma, TypeORM
  - Java：Hibernate, jOOQ
- **迁移工具**：
  - Flyway, Liquibase（Java）
  - Alembic（Python）
  - dbmate（轻量级）
