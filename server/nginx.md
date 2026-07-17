# Nginx 安装与配置指南

## 一、Nginx 安装

### 1. 更新包列表

```bash
sudo apt update
```

### 2. 安装 Nginx

```bash
sudo apt install -y nginx
```

### 3. 启动 Nginx 服务

```bash
sudo systemctl start nginx
```

### 4. 设置开机自启

```bash
sudo systemctl enable nginx
```

### 5. 查看服务状态

```bash
sudo systemctl status nginx
```

如果状态为 `active (running)`，说明服务已正常运行。

### 6. 目录结构说明

- `/usr/sbin/nginx`：主程序
- `/etc/nginx`：配置文件目录
- `/usr/share/nginx` 或 `/var/www`：默认站点目录
- `/var/log/nginx`：日志目录

### 7. 配置防火墙（如使用 UFW）

```bash
sudo ufw allow 'Nginx Full'
```

允许 HTTP（80）和 HTTPS（443）端口流量。

### 8. 测试 Nginx

在浏览器访问服务器 IP 或使用命令：

```bash
curl -I http://localhost
```

正常响应示例：

```http
HTTP/1.1 200 OK
Server: nginx/1.18.0 (Ubuntu)
...
```

## 二、虚拟主机配置

### 1. 创建配置文件

```bash
sudo nano /etc/nginx/sites-available/example.com
```

示例配置：

```nginx
server {
    listen 80;
    server_name example.com;

    root /var/www/example.com;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 2. 创建站点目录及示例页面

```bash
sudo mkdir -p /var/www/example.com
echo "<h1>Welcome to Example.com</h1>" | sudo tee /var/www/example.com/index.html
```

### 3. 启用配置并测试

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 三、Nginx 主配置文件结构（nginx.conf）

位于 `/etc/nginx/nginx.conf`，结构分为三大部分：

- **全局块**：设置用户、进程数、日志路径等
- **events 块**：处理连接相关配置
- **http 块**：配置 web 服务，包含多个 `server` 块

示意结构：

```nginx
# 全局块
worker_processes 1;
error_log /var/log/nginx/error.log;

# events 块
events {
    worker_connections 1024;
}

# http 块
http {
    include mime.types;
    default_type application/octet-stream;

    access_log /var/log/nginx/access.log;
    sendfile on;
    keepalive_timeout 65;

    server {
        listen 80;
        server_name localhost;

        root /var/www/html;
        index index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
}
```

## 四、配置详解

### 1. `location` 匹配规则

```nginx
location [=|~|~*|^~] /uri/ { ... }
```

- `=`：严格匹配
- `~`：正则匹配（区分大小写）
- `~*`：正则匹配（不区分大小写）
- `^~`：前缀匹配，优先级高于正则

### 2. `root` 与 `alias` 区别

- `root` 会拼接请求 URI：

  ```nginx
  location /test/ {
      root /usr/share/nginx/html;
  }
  # 访问 /test/a.html -> /usr/share/nginx/html/test/a.html
  ```

- `alias` 不会拼接 URI：

  ```nginx
  location /test/ {
      alias /usr/share/nginx/html/static/;
  }
  # 访问 /test/a.html -> /usr/share/nginx/html/static/a.html
  ```

### 3. `last` 与 `break` 区别（在 location 内）

- `last`：重新进入 location 匹配流程
- `break`：跳出 rewrite，继续当前 location 的处理

### 4. `permanent` 与 `redirect`

- `permanent`：301 永久重定向
- `redirect`：302 临时重定向

## 五、代理配置

### 1. 正向代理

客户端需配置代理，代理服务器转发请求到目标服务器。

### 2. 反向代理

客户端无需配置，代理服务器转发请求给后端服务器并返回响应。

示例：80 端口反代至 8080

```nginx
server {
    listen 80;
    location / {
        proxy_pass http://localhost:8080;
    }
}
```

## 六、解决前端跨域

```nginx
server {
    listen 8080;
    server_name 10.8.9.94;

    location ^~ /api {
        proxy_pass http://192.1.2.3:9000;
        add_header Access-Control-Allow-Origin $http_origin;
        add_header Access-Control-Allow-Credentials true;
        add_header Access-Control-Allow-Headers *;
        add_header Access-Control-Allow-Methods *;

        if ($request_method = OPTIONS) {
            return 200;
        }
    }

    location / {
        root web/dist;
        index index.html;
        add_header Access-Control-Allow-Origin *;
        try_files $uri $uri/ /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root html;
    }
}
```

## 七、负载均衡配置

### 1. 定义后端服务器组

```nginx
http {
    upstream myserver {
        server 127.0.0.1:8081;
        server 127.0.0.1:8082;
    }

    server {
        listen 80;
        location / {
            proxy_pass http://myserver;
        }
    }
}
```

### 2. 负载策略

- **轮询（默认）**：按顺序分发请求

- **weight 权重**：根据权重分发

  ```nginx
  upstream myserver {
      server 127.0.0.1:8081 weight=3;
      server 127.0.0.1:8082 weight=1;
  }
  ```

- **ip_hash**：同一 IP 分配到同一服务器

  ```nginx
  upstream myserver {
      ip_hash;
      server 127.0.0.1:8081;
      server 127.0.0.1:8082;
  }
  ```

## 八、内置变量参考表

| 变量                | 描述                                                                 |
| ------------------- | -------------------------------------------------------------------- |
| `$args`             | 这个变量等于请求行中的参数，同`$query_string`。                      |
| `$content_length`   | 请求头中的 `Content-length` 字段。                                   |
| `$content_type`     | 请求头中的 `Content-Type` 字段。                                     |
| `$document_root`    | 当前请求在 `root` 指令中指定的值。                                   |
| `$host`             | 请求主机头字段，否则为服务器名称。                                   |
| `$http_user_agent`  | 客户端 `agent` 信息。                                                |
| `$http_cookie`      | 客户端 `cookie` 信息。                                               |
| `$limit_rate`       | 这个变量可以限制连接速率。                                           |
| `$request_method`   | 客户端请求的动作，通常为 `GET` 或 `POST`。                           |
| `$remote_addr`      | 客户端的 `IP` 地址。                                                 |
| `$remote_port`      | 客户端的端口。                                                       |
| `$remote_user`      | 已经经过 `Auth Basic Module` 验证的用户名。                          |
| `$request_filename` | 当前请求的文件路径，由 `root` 或 `alias` 指令与 `URI` 请求生成。     |
| `$scheme`           | `HTTP` 方法（如 `http`，`https`）。                                  |
| `$server_protocol`  | 请求使用的协议，通常是 `HTTP/1.0` 或 `HTTP/1.1`。                    |
| `$server_addr`      | 服务器地址，在完成一次系统调用后可以确定这个值。                     |
| `$server_name`      | 服务器名称。                                                         |
| `$server_port`      | 请求到达服务器的端口号。                                             |
| `$request_uri`      | 包含请求参数的原始 `URI`，不包含主机名，如：`/foo/bar.php?arg=baz`。 |
| `$uri`              | 不带请求参数的当前 `URI`，`$uri` 不包含主机名，如 `/foo/bar.html`。  |
| `$document_uri`     | 与 `$uri` 相同。                                                     |
