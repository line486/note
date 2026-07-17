# Wireshark

## Wireshark简介

Wireshark是一款开源的网络协议分析工具，前身为Ethereal，由Gerald Combs于1998年开发。它是网络管理员、安全专家和开发人员必备的工具之一，主要用于：

- 网络故障排除
- 协议分析与学习
- 网络安全分析
- 网络性能评估
- 软件和协议开发调试

Wireshark支持超过2000种网络协议的解码，能够在多种操作系统上运行，包括Windows、macOS和Linux。

## 安装与配置

### 系统要求

- 操作系统：Windows 7/8/10/11, macOS 10.12+, Linux主流发行版
- 处理器：1GHz或更高
- 内存：至少2GB（分析大文件需要更多）
- 磁盘空间：至少500MB

### 下载与安装

#### Windows系统

1. 访问官网 https://www.wireshark.org/download.html
2. 下载Windows安装程序（建议稳定版）
3. 运行安装程序，按向导操作
4. 安装时勾选以下组件：
   - Wireshark主程序
   - TShark（命令行版本）
   - 插件和扩展
   - Npcap（推荐）或WinPcap（捕获驱动）

#### macOS系统

1. 通过Homebrew安装：`brew install --cask wireshark`
2. 或从官网下载DMG包手动安装
3. 安装后需配置权限：
   ```bash
   sudo chmod 755 /dev/bpf*
   ```

#### Linux系统

Debian/Ubuntu:

```bash
sudo apt update
sudo apt install wireshark
sudo dpkg-reconfigure wireshark-common  # 选择是否允许非root用户捕获
sudo usermod -a -G wireshark $USER      # 将当前用户加入wireshark组
```

Fedora/RHEL:

```bash
sudo dnf install wireshark
```

### 初始配置

1. 首次启动时配置全局参数：
   - Edit → Preferences
   - 设置捕获接口默认参数
   - 配置显示过滤器
   - 调整配色方案

2. 配置协议选项：
   - 在Preferences → Protocols中配置特定协议的解码选项
   - 例如HTTP协议的端口号、SSL密钥等

## 界面概览

Wireshark主界面分为多个主要区域：

1. **菜单栏**：提供所有功能的访问入口
2. **工具栏**：常用功能的快捷按钮
3. **过滤器栏**：显示和捕获过滤器的输入区域
4. **数据包列表窗格**：显示捕获的数据包概要
5. **数据包详情窗格**：显示选中数据包的协议详情
6. **数据包字节窗格**：显示原始字节和对应ASCII/HEX
7. **状态栏**：显示当前状态、捕获文件信息等

### 数据包列表列配置

右键点击列标题可配置显示列：

1. 添加/删除列
2. 调整列顺序
3. 设置列属性（如时间格式）

建议配置常用列：

- No.：数据包序号
- Time：相对/绝对时间
- Source：源IP地址
- Destination：目的IP地址
- Protocol：协议类型
- Length：数据包长度
- Info：简要信息

## 捕获网络流量

### 选择捕获接口

1. 点击"Capture" → "Interfaces"
2. 显示所有可用网络接口及其流量统计
3. 选择目标接口（有线/无线/虚拟）
4. 可点击接口名称旁的齿轮图标配置高级选项

### 捕获选项配置

点击"Capture" → "Options"进行详细配置：

1. **输入**选项卡：
   - 选择接口
   - 设置混杂模式（捕获所有流量，不仅是本机）
   - 设置捕获过滤器（BPF语法）

2. **输出**选项卡：
   - 设置自动保存文件（环形缓冲）
   - 文件命名规则
   - 文件格式（pcapng默认）

3. **选项**选项卡：
   - 实时更新数据包列表
   - 自动滚动
   - 名称解析设置（MAC,网络,传输层）

4. **停止条件**：
   - 捕获多少数据包后停止
   - 捕获多少时间后停止
   - 文件大小限制

### 开始/停止捕获

1. 点击"Start"开始捕获
2. 使用工具栏停止按钮或"Capture" → "Stop"
3. 使用快捷键：Ctrl+E（开始/停止）

### 捕获过滤器语法

捕获过滤器使用Berkeley Packet Filter (BPF)语法，在捕获前过滤：

常用表达式：

- `host 192.168.1.1`：特定主机
- `net 192.168.1.0/24`：特定网络
- `port 80`：特定端口
- `tcp`/`udp`/`icmp`：特定协议
- `src`/`dst`：源/目标限定符

组合示例：

- `tcp port 80 and host 192.168.1.1`
- `not arp and not icmp`
- `vlan 100 and host 10.0.0.1`

## 过滤数据包

### 显示过滤器语法

显示过滤器用于捕获后分析，语法不同于捕获过滤器：

比较运算符：

- `==` (eq), `!=` (ne), `>` (gt), `<` (lt), `>=` (ge), `<=` (le)

逻辑运算符：

- `and` (&&), `or` (||), `not` (!), `xor` (^^)

常用过滤器：

- `ip.addr == 192.168.1.1`：包含该IP的数据包
- `tcp.port == 443`：TCP端口443
- `http.request.method == "GET"`：HTTP GET请求
- `dns.qry.name contains "example.com"`：DNS查询
- `frame.time_delta > 0.5`：与前包时间差>0.5秒

协议字段过滤：

- `tcp.flags.syn == 1`：TCP SYN标志
- `tcp.analysis.retransmission`：TCP重传
- `ssl.handshake.type == 1`：SSL Client Hello

### 过滤器表达式

1. 在过滤器栏直接输入表达式
2. 使用表达式构建器（点击过滤器栏右侧书签图标）
3. 保存常用过滤器为按钮

### 颜色规则

1. 点击"View" → "Coloring Rules"
2. 可创建/编辑/删除颜色规则
3. 示例规则：
   - 绿色：HTTP请求
   - 红色：TCP RST
   - 黄色：TCP重传

## 分析数据包

### 数据包详情分析

点击数据包列表中的包，在详情窗格查看：

典型TCP/IP包结构：

- Frame：物理层信息
- Ethernet II：数据链路层
- Internet Protocol Version 4：网络层
- Transmission Control Protocol：传输层
- Hypertext Transfer Protocol：应用层

右键点击字段可进行：

- 作为过滤器应用
- 准备过滤器
- 复制值/字段
- 查找引用

### 跟踪流

1. 右键数据包 → Follow → TCP/UDP/HTTP Stream
2. 查看完整会话内容
3. 可显示ASCII/HEX/EBCDIC等格式
4. 可保存流内容

### 专家信息

1. 点击"Analyze" → "Expert Information"
2. 查看警告、错误、注释等信息
3. 分类查看：
   - Errors：严重问题
   - Warnings：潜在问题
   - Notes：一般信息
   - Chats：普通对话信息

### 数据包标记

1. 右键数据包 → Mark/Unmark Packet (Ctrl+M)
2. 标记的包会高亮显示
3. 可用于重要数据包快速定位

### 时间显示与参考

1. 时间列格式设置：
   - 绝对时间（Y-M-D H:M:S）
   - 相对时间（从第一个包）
   - 增量时间（与前包间隔）
2. 设置时间参考：
   - 右键包 → "Set Time Reference"
   - 计算相对于参考包的时间

## 统计功能

### 摘要统计

1. "Statistics" → "Capture File Properties"
   - 文件基本信息
   - 时间统计
   - 平均包速率/大小

### 协议层次统计

1. "Statistics" → "Protocol Hierarchy"
   - 各协议占比
   - 字节/包数统计
   - 识别异常协议

### 会话统计

1. "Statistics" → "Conversations"
   - 按Ethernet/IPv4/IPv6/TCP/UDP分组
   - 查看端点间流量
   - 识别异常会话

### 端点统计

1. "Statistics" → "Endpoints"
   - 各端点通信统计
   - 可过滤显示
   - 识别异常端点

### HTTP统计

1. "Statistics" → "HTTP" → "Packet Counter"
   - 请求方法统计
   - 响应状态码统计
2. "Statistics" → "HTTP" → "Requests"
   - 查看所有HTTP请求
   - 可导出为CSV

### IO图表

1. "Statistics" → "IO Graph"
   - 流量随时间变化图表
   - 可添加多个过滤器曲线
   - 调整时间间隔/单位

### 流量图

1. "Statistics" → "Flow Graph"
   - 可视化端点间会话
   - 显示TCP序列号/ACK
   - 识别连接问题

## 高级功能

### 自定义协议解析器

1. 编写Lua解析器
   - 放在Wireshark安装目录下的plugins文件夹
   - 示例简单解析器：

     ```lua
     local my_proto = Proto("myproto", "My Protocol")
     local field1 = ProtoField.uint32("myproto.field1", "Field1", base.DEC)
     my_proto.fields = {field1}

     function my_proto.dissector(buffer, pinfo, tree)
         local length = buffer:len()
         pinfo.cols.protocol = my_proto.name
         local subtree = tree:add(my_proto, buffer(), "My Protocol Data")
         subtree:add(field1, buffer(0,4))
     end

     local udp_port = DissectorTable.get("udp.port")
     udp_port:add(9999, my_proto)
     ```

2. 重新加载Lua脚本：Ctrl+Shift+L

### 命令行工具TShark

基本用法：

```bash
tshark -i eth0 -f "tcp port 80" -w output.pcap
```

常用参数：

- `-r`：读取文件
- `-Y`：显示过滤器
- `-T fields -e`：提取特定字段
- `-z`：统计选项（类似GUI统计功能）

示例：

```bash
# 提取HTTP Host头
tshark -r traffic.pcap -Y "http.host" -T fields -e http.host

# 统计TCP重传
tshark -r traffic.pcap -z io,stat,0,"tcp.analysis.retransmission"
```

### 自定义列

1. 右键列标题 → "Column Preferences"
2. 添加新列
3. 设置列类型：
   - 普通：固定字段
   - 自定义：使用显示过滤器字段
4. 示例：添加HTTP响应时间列：
   - 类型：Custom
   - 字段：`http.time`

### 重组数据

1. 文件 → 导出对象
   - HTTP：网页/图片等
   - DICOM：医学图像
   - SMB：文件共享
2. 重组TCP流为完整文件

### 远程捕获

1. 使用SSH远程捕获：
   ```bash
   ssh user@remote-host "tshark -i eth0 -f 'not port 22' -w -" | wireshark -k -i -
   ```
2. 使用rpcapd服务（Windows）

## 故障排除

### 常见问题解决

**无法捕获数据包**

1. 检查是否以管理员/root权限运行
2. 确认选择了正确的接口
3. 检查混杂模式设置
4. 验证驱动安装（WinPcap/Npcap）

**捕获时Wireshark崩溃**

1. 减少捕获缓冲区大小
2. 关闭名称解析
3. 更新到最新版本
4. 检查已知问题列表

**无法解析特定协议**

1. 确认Wireshark支持该协议
2. 检查协议首选项设置
3. 验证端口号是否正确关联
4. 查找或编写解析器

### 性能优化

1. 捕获时：
   - 使用捕获过滤器减少数据量
   - 禁用名称解析
   - 限制文件大小/包数
2. 分析时：
   - 使用显示过滤器
   - 关闭实时更新
   - 减少显示列数量
3. 大文件处理：
   - 使用`editcap`分割文件
   - 使用`tshark`预处理

## 安全与隐私

### 安全注意事项

1. 法律问题：
   - 仅捕获授权网络流量
   - 遵守隐私法规（GDPR等）
2. 敏感信息：
   - HTTP明文密码
   - 个人信息
   - 加密密钥

### 匿名化数据

1. 使用`editcap`匿名化：
   ```bash
   editcap -r original.pcap anonymized.pcap
   ```
2. Wireshark内置匿名化：
   - File → Export Specified Packets
   - 勾选"Randomize IPs and ports"

### SSL/TLS解密

1. 配置SSL密钥：
   - Edit → Preferences → Protocols → TLS
   - 添加RSA密钥
2. 使用会话密钥：
   - 设置环境变量SSLKEYLOGFILE
   - 浏览器/应用导出密钥

## 实用技巧

### 快捷键

- Ctrl+E：开始/停止捕获
- Ctrl+K：捕获选项
- Ctrl+↑/↓：上一个/下一个包
- Ctrl+.: 跳转到特定包
- Ctrl+F：查找包
- Ctrl+T：时间参考
- Ctrl+Shift+D：重载Lua脚本

### 插件扩展

1. 安装插件：
   - 下载.lua或.so/.dll文件
   - 放入plugins目录
2. 常用插件：
   - Dissector插件：新协议支持
   - Stats插件：自定义统计
   - Tool插件：集成外部工具

### 报告生成

1. 导出数据：
   - File → Export Packet Dissections
   - 多种格式：CSV, XML, JSON等
2. 生成报告：
   - Statistics → 所需统计 → 导出
   - 使用IO图表 → 导出图像

### 自动化脚本

1. 使用Python + pyshark：
   ```python
   import pyshark
   cap = pyshark.FileCapture('traffic.pcap', display_filter='http')
   for pkt in cap:
       print(pkt.http.host)
   ```
2. 使用Bash + tshark自动化分析
