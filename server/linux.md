# Linux

## 目录结构

登录系统后，在当前命令窗口下输入命令：

```bash
 ls /
```

你会看到如下图所示:

![img](assets/4_20.png)

树状目录结构：

![d0c50-linux2bfile2bsystem2bhierarchy](assets/d0c50-linux2bfile2bsystem2bhierarchy.jpg)

以下是对这些目录的解释：

- **/bin**：
  bin 是 Binaries (二进制文件) 的缩写, 这个目录存放着最经常使用的命令。

- **/boot：**
  这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。

- **/dev ：**
  dev 是 Device(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。

- **/etc：**
  etc 是 Etcetera(等等) 的缩写,这个目录用来存放所有的系统管理所需要的配置文件和子目录。

- **/home**：
  用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的，如上图中的 alice、bob 和 eve。

- **/lib**：
  lib 是 Library(库) 的缩写这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。

- **/lost+found**：
  这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。

- **/media**：
  linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。

- **/mnt**：
  系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。

- **/opt**：
  opt 是 optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。

- **/proc**：
  proc 是 Processes(进程) 的缩写，/proc 是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。
  这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的ping命令，使别人无法ping你的机器：

  ```bash
  echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_all
  ```

- **/root**：
  该目录为系统管理员，也称作超级权限者的用户主目录。

- **/sbin**：
  s 就是 Super User 的意思，是 Superuser Binaries (超级用户的二进制文件) 的缩写，这里存放的是系统管理员使用的系统管理程序。

- **/selinux**：
  这个目录是 Redhat/CentOS 所特有的目录，Selinux 是一个安全机制，类似于 windows 的防火墙，但是这套机制比较复杂，这个目录就是存放selinux相关的文件的。

- **/srv**：
  该目录存放一些服务启动之后需要提取的数据。

- **/sys**：

  这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs 。

  sysfs 文件系统集成了下面3种文件系统的信息：针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统以及针对伪终端的 devpts 文件系统。

  该文件系统是内核设备树的一个直观反映。

  当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。

- **/tmp**：
  tmp 是 temporary(临时) 的缩写这个目录是用来存放一些临时文件的。

- **/usr**：
  usr 是 unix system resources(unix 系统资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。

- **/usr/bin：**
  系统用户使用的应用程序。

- **/usr/sbin：**
  超级用户使用的比较高级的管理程序和系统守护程序。

- **/usr/src：**
  内核源代码默认的放置目录。

- **/var**：
  var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。

- **/run**：
  是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。

在 Linux 系统中，有几个目录是比较重要的，平时需要注意不要误删除或者随意更改内部文件。

**/etc**： 上边也提到了，这个是系统中的配置文件，如果你更改了该目录下的某个文件可能会导致系统不能启动。

**/bin, /sbin, /usr/bin, /usr/sbin**: 这是系统预设的执行文件的放置目录，比如 **ls** 就是在 **/bin/ls** 目录下的。

值得提出的是 **/bin**、**/usr/bin** 是给系统用户使用的指令（除 root 外的通用用户），而/sbin, /usr/sbin 则是给 root 使用的指令。

**/var**： 这是一个非常重要的目录，系统上跑了很多程序，那么每个程序都会有相应的日志产生，而这些日志就被记录到这个目录下，具体在 /var/log 目录下，另外 mail 的预设放置也是在这里。

## 终端基础操作

### 1. 命令结构

```shell
命令 [-选项] [参数]
# 示例：显示详细信息并排序
ls -l --sort=size
```

### 2. 高频核心命令

| 命令  | 功能描述     | 实战示例                    |
| ----- | ------------ | --------------------------- |
| `ls`  | 列出目录内容 | `ls -lh` 人性化显示文件大小 |
| `pwd` | 显示当前路径 | `pwd -P` 显示物理路径       |
| `cd`  | 目录跳转     | `cd -` 返回上次目录         |
| `cat` | 查看文件内容 | `cat -n file` 显示行号      |

### 3. 效率提升技巧

- **智能补全**：`Tab`键自动补全路径/命令
- **历史追溯**：`Ctrl+R` 逆向搜索命令历史
- **会话管理**：
  ```shell
  screen -S work  # 创建持久会话
  tmux new -s dev # 高级终端复用
  ```

## 文件系统管理

### 1. 文件操作

```shell
# 创建多层目录
mkdir -p project/{src,dist,test}

# 安全删除（需确认）
rm -i *.log

# 强力清除（慎用！）
rm -rf node_modules/
```

### 2. 链接管理

```shell
# 创建软链接（绝对路径）
ln -s /opt/app/config.conf ~/config.link

# 查看链接指向
readlink config.link
```

### 3. 高级查找

```shell
# 按类型查找（f=文件，d=目录）
find /var -type f -name "*.log"

# 最近修改文件
find . -mtime -1 -exec ls -lh {} \;

# 组合条件搜索
find /home -size +100M -user root
```

## 系统管理

### 1. 进程监控

```shell
# 动态进程查看
top -u nginx

# 树状结构展示
pstree -p

# 杀灭进程组
kill -9 $(pgrep -f "python script")
```

### 2. 网络诊断

```shell
# 快速端口检测
nc -zv example.com 22

# 路由追踪
mtr 8.8.8.8

# 持续ping测试
ping -i 0.5 -c 100 google.com
```

## 软件管理

### APT 高级用法

```shell
# 更新软件源
sudo apt update && sudo apt upgrade -y

# 搜索软件包
apt search nginx

# 清除旧内核
sudo apt autoremove --purge
```

### 源码编译

```shell
./configure --prefix=/opt/app
make -j$(nproc)
sudo make install
```

## 软件管理（YUM）

| 指令                 | 说明                 |
| -------------------- | -------------------- |
| `yum update`         | 更新所有已安装的软件 |
| `yum install 包名`   | 安装软件包           |
| `yum remove 包名`    | 卸载软件包           |
| `yum search 关键字`  | 搜索软件包           |
| `yum list installed` | 列出已安装软件       |
| `rpm -qa`            | 查看所有安装包       |
| `rpm -ivh 包.rpm`    | 安装 RPM 包          |

## 权限管理

### 1. 权限控制

```shell
# 递归修改权限
chmod -R 750 /opt/secure

# 修改文件属主
chown user:group file.txt
```

### 2. 用户管理

```shell
# 创建系统用户
useradd -r -s /bin/false service_user

# 锁定账户
usermod -L username

# 查看登录历史
last -n 10
```

## 开发工具链

### 1. 文本处理

```shell
# 实时日志分析
tail -f /var/log/syslog | grep "ERROR"

# JSON格式化
curl api.example.com | jq .

# CSV处理
csvcut -c 1,3 data.csv | csvlook
```

### 2. 压缩打包

```shell
# 创建带时间戳的压缩包
tar -czvf backup-$(date +%Y%m%d).tar.gz /data

# 排除指定目录
tar --exclude='*.tmp' -cf archive.tar project/

# 分卷压缩
tar -cvzf - bigfile | split -b 2G - bigfile.tar.gz.
```

## 专家技巧

### 1. 命令组合

```shell
# 统计代码行数
find src/ -name "*.py" | xargs wc -l

# 批量重命名
rename 's/.JPG/.jpg/' *.JPG

# 快速创建大文件
dd if=/dev/zero of=test.img bs=1G count=5
```

### 2. 安全增强

```shell
# SSH密钥登录
ssh-keygen -t ed25519 -C "user@server"

# 防火墙配置
ufw allow proto tcp from 192.168.1.0/24 to any port 22
```

> 📌 提示：使用危险命令前建议添加 `echo` 预览效果，例如 `rm -rf` 改为 `echo rm -rf`
