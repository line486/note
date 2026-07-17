# Headscale 自建 Tailscale 控制服务器

## 简介

[Headscale](https://github.com/juanfont/headscale) 是 Tailscale 控制服务器的开源自托管实现，可自行搭建私有 WireGuard VPN 网络。实现单一 tailnet，适用于个人或小型组织使用。

## 安装

### 方式一：Docker 部署（推荐）

#### 1. 创建目录结构

```bash
mkdir -p ./headscale/{config,lib}
cd ./headscale
```

#### 2. 下载配置文件

```bash
# 开发版
curl -o config/config.yaml https://raw.githubusercontent.com/juanfont/headscale/main/config-example.yaml

# 指定版本（如 v0.29.1）
curl -o config/config.yaml https://raw.githubusercontent.com/juanfont/headscale/v0.29.1/config-example.yaml
```

#### 3. 启动容器

```bash
docker run \
  --name headscale \
  --detach \
  --read-only \
  --tmpfs /var/run/headscale \
  --volume "$(pwd)/config:/etc/headscale:ro" \
  --volume "$(pwd)/lib:/var/lib/headscale" \
  --publish 127.0.0.1:8080:8080 \
  --publish 127.0.0.1:9090:9090 \
  --health-cmd "CMD headscale health" \
  --restart unless-stopped \
  docker.io/headscale/headscale:latest \
  serve
```

> 使用 `0.0.0.0:8080:8080` 替代 `127.0.0.1:8080:8080` 可对外暴露服务。

### 方式二：Docker Compose

```yaml
services:
  headscale:
    image: docker.io/headscale/headscale:latest
    restart: unless-stopped
    container_name: headscale
    read_only: true
    tmpfs:
      - /var/run/headscale
    ports:
      - "127.0.0.1:8080:8080"
      - "127.0.0.1:9090:9090"
    volumes:
      - /path/to/headscale/config:/etc/headscale:ro
      - /path/to/headscale/lib:/var/lib/headscale
    command: serve
    healthcheck:
      test: ["CMD", "headscale", "health"]
```

```bash
docker compose up -d
```

### 方式三：二进制安装

#### 1. 下载

```bash
VERSION=$(curl -s https://api.github.com/repos/juanfont/headscale/releases/latest | grep tag_name | cut -d '"' -f 4)
curl -L "https://github.com/juanfont/headscale/releases/download/${VERSION}/headscale_${VERSION#v}_linux_amd64" -o /usr/local/bin/headscale
chmod +x /usr/local/bin/headscale
```

#### 2. 创建 systemd 服务

```bash
cat > /etc/systemd/system/headscale.service << 'EOF'
[Unit]
Description=Headscale
After=network.target

[Service]
ExecStart=/usr/local/bin/headscale serve
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now headscale
```

## 配置

### 配置文件位置

Headscale 按以下顺序搜索 `config.yaml`：

1. `/etc/headscale`
2. `$HOME/.headscale`
3. 当前工作目录

可通过以下方式指定其他路径：

- 命令行参数：`headscale -c /path/to/config.yaml`
- 环境变量：`HEADSCALE_CONFIG=/path/to/config.yaml`

### 验证配置

```bash
headscale configtest
```

### 配置文件示例

```yaml
# 监听地址和端口
listen_port: 8080

# 控制服务器 URL（客户端访问地址，需包含端口）
server_url: https://headscale.example.com:8080

# 私钥文件路径
private_key_path: /var/lib/headscale/private.key

# 数据库配置
database:
  type: sqlite3
  sqlite3:
    path: /var/lib/headscale/db.sqlite

# DNS 配置
dns:
  magic_dns: true
  nameservers:
    global:
      - 1.1.1.1
      - 8.8.8.8

# DERP 中继服务器
derps:
  enabled: true
  map_uri: https://controlplane.tailscale.com/derpmap/default

# 策略文件路径
policy:
  path: /etc/headscale/policy.json
```

## CLI 通用说明

### Docker 环境下的命令

所有 `headscale` 命令在 Docker 中通过 `docker exec` 执行：

```bash
docker exec -it headscale headscale <COMMAND>
```

### 权限说明

默认只有 `headscale` 或 `root` 用户可访问 Unix socket（`/var/run/headscale/headscale.sock`）。其他用户可通过以下方式执行命令：

- 使用 `sudo`
- 以 `headscale` 用户身份运行
- 将当前用户加入 `headscale` 组

### 帮助命令

```bash
# 查看所有可用命令
headscale help

# 查看子命令帮助
headscale <COMMAND> --help

# 例：查看 nodes 子命令帮助
headscale nodes --help
```

## 用户管理（users）

### 创建用户

```bash
headscale users create <USER>
```

### 列出用户

```bash
headscale users list
```

### 删除用户

```bash
headscale users delete <USER>
```

### 重命名用户

```bash
headscale users rename <OLD_NAME> <NEW_NAME>
```

## 节点管理（nodes）

### 列出所有节点

```bash
headscale nodes list
```

### 查看节点详情

```bash
headscale nodes get <NODE_ID>
```

### 查看节点路由

```bash
headscale nodes list-routes
```

输出示例：

```
ID | Hostname | Approved | Available      | Serving (Primary)
1  | myrouter |          | 10.0.0.0/8     |
   |          |          | 192.168.0.0/24 |
```

### 批准路由

```bash
# 批准指定路由
headscale nodes approve-routes --identifier <NODE_ID> --routes 10.0.0.0/8,192.168.0.0/24

# 批准所有可用路由
headscale nodes approve-routes --identifier <NODE_ID> --auto-approve-routes
```

### 撤销路由

```bash
headscale nodes remove-routes --identifier <NODE_ID> --routes 10.0.0.0/8
```

### 删除节点

```bash
headscale nodes delete <NODE_ID>

# 强制删除（不等待确认）
headscale nodes delete <NODE_ID> --force
```

### 过期节点密钥（重新认证）

```bash
headscale nodes expire <NODE_ID>
```

### 移动节点到其他用户

```bash
headscale nodes move <NODE_ID> --user <USER>
```

### 批量操作

```bash
# 删除指定用户的所有节点
headscale nodes delete --user <USER>

# 列出指定用户的节点
headscale nodes list --user <USER>
```

## 注册认证密钥（preauthkeys）

### 创建认证密钥

```bash
# 基本用法（一次性，默认 1 小时过期）
headscale preauthkeys create --user <USER_ID>

# 可重复使用
headscale preauthkeys create --user <USER_ID> --reusable

# 指定过期时间
headscale preauthkeys create --user <USER_ID> --expiration 24h

# 指定过期时间 + 可重复使用
headscale preauthkeys create --user <USER_ID> --reusable --expiration 720h

# 带标签（注册为 tagged node）
headscale preauthkeys create --tags tag:server,tag:web
```

### 列出认证密钥

```bash
headscale preauthkeys list --user <USER_ID>

# 包含已使用的密钥
headscale preauthkeys list --user <USER_ID> --all
```

### 删除认证密钥

```bash
headscale preauthkeys delete <KEY> --user <USER_ID>
```

## 节点注册

### 方式一：Web 认证（交互式）

1. 客户端执行：

```bash
tailscale up --login-server <YOUR_HEADSCALE_URL>
```

2. 浏览器打开输出的 URL 完成认证，获取 Auth ID

3. 服务端批准：

```bash
headscale auth register --user <USER> --auth-id <AUTH_ID>
```

### 方式二：预认证密钥（非交互式）

```bash
# 先创建密钥
headscale preauthkeys create --user <USER_ID>

# 客户端使用密钥注册
tailscale up --login-server <YOUR_HEADSCALE_URL> --authkey <YOUR_AUTH_KEY>
```

### 标签设备注册

```bash
# 客户端带标签注册
tailscale up --login-server <YOUR_HEADSCALE_URL> --advertise-tags tag:server

# 服务端批准（标签设备会分配给 tagged-devices 用户）
headscale auth register --user <USER> --auth-id <AUTH_ID>
```

## 路由管理

### 子网路由（Subnet Router）

#### 配置节点为子网路由器

```bash
# 注册时指定子网
sudo tailscale up --login-server <YOUR_HEADSCALE_URL> --advertise-routes=10.0.0.0/8,192.168.0.0/24

# 已注册节点更新路由
sudo tailscale set --advertise-routes=10.0.0.0/8,192.168.0.0/24
```

#### 批准子网路由

```bash
headscale nodes approve-routes --identifier <NODE_ID> --routes 10.0.0.0/8,192.168.0.0/24
```

#### 客户端接受路由

```bash
sudo tailscale set --accept-routes
```

### 出口节点（Exit Node）

#### 配置节点为出口节点

```bash
# 注册时指定为出口节点
sudo tailscale up --login-server <YOUR_HEADSCALE_URL> --advertise-exit-node

# 已注册节点更新
sudo tailscale set --advertise-exit-node
```

#### 批准出口节点

```bash
headscale nodes approve-routes --identifier <NODE_ID> --routes 0.0.0.0/0
```

#### 使用出口节点

```bash
# 使用指定出口节点
sudo tailscale set --exit-node <HOSTNAME_OR_IP>

# 停止使用出口节点
sudo tailscale set --exit-node=
```

### 自动批准路由（策略配置）

在策略文件中配置 `autoApprovers`：

```json
{
  "tagOwners": {
    "tag:router": ["alice@"]
  },
  "autoApprovers": {
    "routes": {
      "192.168.0.0/24": ["tag:router"]
    },
    "exitNode": ["tag:exit"]
  }
}
```

## DNS 配置

### 配置 MagicDNS

```yaml
dns:
  magic_dns: true
  nameservers:
    global:
      - 1.1.1.1
      - 8.8.8.8
  domains: []
```

### 额外 DNS 记录

#### 静态记录（配置文件）

```yaml
dns:
  extra_records:
    - name: "grafana.myvpn.example.com"
      type: "A"
      value: "100.64.0.3"
    - name: "prometheus.myvpn.example.com"
      type: "A"
      value: "100.64.0.3"
```

#### 动态记录（JSON 文件）

```json
[
  {
    "name": "grafana.myvpn.example.com",
    "type": "A",
    "value": "100.64.0.3"
  }
]
```

```yaml
dns:
  extra_records_path: /path/to/extra-records.json
```

> Headscale 会自动监听文件变化并更新 DNS 记录。

### 验证 DNS

```bash
dig +short grafana.myvpn.example.com
# 输出: 100.64.0.3
```

## 策略/ACL（Policy）

策略文件使用 [huJSON](https://github.com/tailscale/hujson) 格式。默认不加载策略文件时，所有节点间通信不受限制。

### 加载策略文件

1. 配置文件指定路径：

```yaml
policy:
  path: /etc/headscale/policy.json
```

2. 重载 Headscale：

```bash
# systemd 方式
sudo systemctl reload headscale

# 信号方式
sudo kill -HUP $(pidof headscale)
```

### 策略示例

#### 允许所有通信

```json
{}
```

#### 拒绝所有通信

```json
{
  "grants": []
}
```

#### 自定义访问控制

```json
{
  "hosts": {
    "router": "100.64.0.1/32",
    "node": "100.64.0.2/32",
    "service.example.net": "192.168.0.1/32"
  },
  "grants": [
    {
      "src": ["node"],
      "dst": ["service.example.net"],
      "ip": ["80,443"]
    }
  ]
}
```

### 自动组（Autogroups）

| 自动组               | 说明                                     |
| -------------------- | ---------------------------------------- |
| `autogroup:internet` | 允许通过出口节点访问互联网（仅用于目标） |
| `autogroup:member`   | 所有个人（未标记）设备                   |
| `autogroup:tagged`   | 所有带标签的设备                         |
| `autogroup:self`     | 同一用户认证的源和目标设备（仅用于目标） |
| `autogroup:nonroot`  | SSH 规则中除 root 外的所有用户           |

## 系统设置

### 开启 IP 转发

子网路由器和出口节点需要 IP 转发：

```bash
# 临时生效
sysctl -w net.ipv4.ip_forward=1
sysctl -w net.ipv6.conf.all.forwarding=1

# 永久生效
cat >> /etc/sysctl.conf << 'EOF'
net.ipv4.ip_forward = 1
net.ipv6.conf.all.forwarding = 1
EOF
sysctl -p
```

### 健康检查

```bash
# 本地检查
curl http://127.0.0.1:8080/health

# Docker 健康检查
docker exec -it headscale headscale health
```

## 客户端常用命令（tailscale）

### 连接与断开

```bash
# 连接到 Headscale 服务器
tailscale up --login-server <YOUR_HEADSCALE_URL>

# 使用预认证密钥连接
tailscale up --login-server <YOUR_HEADSCALE_URL> --authkey <AUTH_KEY>

# 断开连接
tailscale down

# 退出登录
tailscale logout
```

### 查看状态

```bash
# 查看网络状态
tailscale status

# 查看详细状态
tailscale status --json

# 测试连通性
tailscale ping <PEER_HOSTNAME>

# 指定使用 DERP 中继
tailscale ping --timeout 5s <PEER_HOSTNAME>
```

### 网络设置

```bash
# 接受路由
sudo tailscale set --accept-routes

# 启用/禁用出口节点
sudo tailscale set --exit-node <HOSTNAME>
sudo tailscale set --exit-node=

# 指定子网路由
sudo tailscale set --advertise-routes=10.0.0.0/8

# 指定出口节点
sudo tailscale set --advertise-exit-node
```

### 文件传输

```bash
# 发送文件到对端
tailscale file cp <FILE> <TARGET_HOSTNAME>:<REMOTE_PATH>

# 从对端接收文件
tailscale file cp <TARGET_HOSTNAME>:<REMOTE_PATH> <LOCAL_PATH>
```

## 调试与排查

### 查看日志

```bash
# Docker 日志
docker logs -f headscale

# systemd 日志
journalctl -u headscale -f
```

### 常用排查命令

```bash
# 测试控制服务器连通性
curl http://your-server:8080/health

# 查看网络拓扑
tailscale status

# 查看 DERP 连接状态
tailscale netcheck

# 查看节点路由状态
headscale nodes list-routes

# 查看认证密钥
headscale preauthkeys list --user <USER_ID>

# 重置节点密钥（触发重新认证）
headscale nodes expire <NODE_ID>

# 查看配置是否正确
headscale configtest
```

### 调试容器

使用 `-debug` 变体镜像（包含 Busybox shell）：

```bash
docker run -it docker.io/headscale/headscale:latest-debug sh
```

## 反向代理配置

### Nginx

```nginx
server {
    listen 443 ssl;
    server_name headscale.example.com;

    ssl_certificate     /etc/ssl/certs/headscale.pem;
    ssl_certificate_key /etc/ssl/private/headscale.key;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket 支持
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 更新 server_url

使用反向代理后，配置文件中的 `server_url` 需要更新为外部地址：

```yaml
server_url: https://headscale.example.com:443
```

## 参考链接

- [Headscale 官方文档](https://headscale.net/)
- [Headscale GitHub](https://github.com/juanfont/headscale)
- [Headscale 示例配置](https://github.com/juanfont/headscale/blob/main/config-example.yaml)
- [Tailscale 客户端下载](https://tailscale.com/download)
- [Tailscale 策略文件语法](https://tailscale.com/docs/reference/syntax/policy-file)
