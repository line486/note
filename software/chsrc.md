# chsrc 换源工具

> [!NOTE]
>
> 开源地址 [Github](https://github.com/RubyMetric/chsrc)

## 安装

### Windows

- 可通过 `WinGet` 安装。

  ```bash
  winget install RubyMetric.chsrc
  ```

- 可通过 `PowerShell` 脚本一键下载最新版二进制文件。

  若下方链接无法访问，可使用 `https://gitee.com/RubyMetric/chsrc/raw/main/tool/installer.ps1` 替代

  ```PowerShell
  "& { $(iwr -useb https://chsrc.run/windows) } -Version pre" | iex
  ```

- 或手动下载二进制文件，这是最新版，往往比 `scoop` 提供的更新，适用于修复 Bug、添加新功能后及时使用，以及未安装 `scoop` 时

  ```bash
  # x64
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-x64-windows.exe -o chsrc.exe

  # x86
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-x86-windows.exe -o chsrc.exe
  ```

### Linux

- 支持 `AUR`，可通过 `yay` 安装。

  ```bash
  # AUR
  $ yay -S chsrc-bin # Binary from GitHub Release
  $ yay -S chsrc-git # Build  from the latest main branch (stable)
  $ yay -S chsrc     # Build  from GitHub Release
  ```

- 可通过 `shell` 脚本一键安装最新版，感谢 [@Efterklang] 与 [@wickdynex]

  若下方链接无法访问，可使用 `https://gitee.com/RubyMetric/chsrc/raw/main/tool/installer.sh` 替代

  ```bash
  # 非root用户默认安装至 ~/.local/bin
  $ curl https://chsrc.run/posix | bash

  # root用户默认安装至 /usr/local/bin
  $ curl https://chsrc.run/posix | sudo bash

  # 使用 -d 指定目录安装
  $ curl https://chsrc.run/posix | bash -s -- -d ./
  ```

- 可手动下载二进制文件安装

  ```bash
  # x64
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-x64-linux -o chsrc; chmod +x ./chsrc

  # aarch64
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-aarch64-linux -o chsrc; chmod +x ./chsrc

  # riscv64
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-riscv64-linux -o chsrc; chmod +x ./chsrc

  # armv7
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-armv7-linux -o chsrc; chmod +x ./chsrc
  ```

### macOS

- 可通过 `homebrew` 安装。

  ```bash
  brew install chsrc
  ```

- 可通过 `shell` 脚本安装最新版，感谢 [@Efterklang] 与 [@wickdynex]

  若下方链接无法访问，可使用 `https://gitee.com/RubyMetric/chsrc/raw/main/tool/installer.sh` 替代

  ```bash
  # 非root用户默认安装至 ~/.local/bin
  $ curl https://chsrc.run/posix | bash

  # root用户默认安装至 /usr/local/bin
  $ curl https://chsrc.run/posix | sudo bash

  # 使用 -d 指定目录安装
  $ curl https://chsrc.run/posix | bash -s -- -d ./
  ```

- 或手动下载二进制文件，这是最新版，往往比 `homebrew` 提供的更新，适用于修复 Bug、添加新功能后及时使用

  ```bash
  # arm64/aarch64
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-aarch64-macos -o chsrc; chmod +x ./chsrc

  # x64
  curl -L https://gitee.com/RubyMetric/chsrc/releases/download/pre/chsrc-x64-macos -o chsrc; chmod +x ./chsrc
  ```

## 💡 使用

```bash
使用: chsrc <command> [options] [target] [mirror]

help                      # 打印此帮助，或 h, -h, --help
issue                     # 查看相关issue

list (或 ls, 或 l)        # 列出可用镜像源，和可换源目标
list mirror/target        # 列出可用镜像源，或可换源目标
list os/lang/ware         # 列出可换源的操作系统/编程语言/软件

measure <target>          # 对该目标所有源测速
cesu    <target>

list <target>             # 查看该目标可用源与支持功能
get  <target>             # 查看该目标当前源的使用情况

set  <target>             # 换源，自动测速后挑选最快源
set  <target>  first      # 换源，使用维护团队测速第一的源
set  <target> <mirror>    # 换源，指定使用某镜像站 (通过list命令查看)
set  <target> https://url # 换源，用户自定义源URL
reset <target>            # 重置，使用上游默认使用的源

选项:
-dry                      # Dry Run，模拟换源过程，命令仅打印并不运行
-local                    # 仅对某项目而非全局换源 (仅部分软件如bundler,pdm支持)
-ipv6                     # 使用IPv6测速
-en(glish)                # 使用英文输出
-no-color                 # 无颜色输出
```

```bash
自动测速，寻找最快者，换源

    $ chsrc set ruby

不想自动测速的时候，可使用维护团队测试的最快镜像站

    $ chsrc set ruby first

先列出可用的镜像站，然后选择其一，如使用 RubyChina 作为镜像站

    $ chsrc ls  ruby
    $ chsrc set ruby rubychina

若您有自己的镜像地址，使用自定义URL

    $ chsrc set ruby https://gems.ruby-china.com/

对支持 *项目级* 换源的目标，可以避免全局（*系统级* 或 *用户级*）换源

    $ chsrc set -local bundler
    $ chsrc set -local pdm
```

## 编程语言开发

```bash
chsrc set ruby|rb|gem|bundler|rubygems

chsrc set python | py | pypi # 同时换 pip, poetry, pdm, uv 这4个包管理器，也可以4个独立换源
  chsrc set pip
  chsrc set poetry
  chsrc set pdm
  chsrc set uv

chsrc set rye

chsrc set node | nodejs # 同时换 npm, yarn 和 pnpm 这3个包管理器，也可以3个独立换源
  chsrc set npm
  chsrc set yarn
  chsrc set pnpm

chsrc set nvm
chsrc set bun

chsrc set perl | cpan
chsrc set php  | composer
chsrc set lua  | luarocks

chsrc set rust | cargo | crate
chsrc set rustup

chsrc set go
chsrc set java    | maven | mvn | gradle
chsrc set clojure | clojars
chsrc set dart    | pub
chsrc set flutter
chsrc set haskell | hackage | cabal | stack
chsrc set ocaml   | opam

# 同时会为 bioconductor 换源
chsrc set r | cran
chsrc set julia
```

## 操作系统

```bash
sudo chsrc set ubuntu
sudo chsrc set linuxmint | mint
sudo chsrc set debian
sudo chsrc set fedora
sudo chsrc set suse  | opensuse
sudo chsrc set kali
sudo chsrc set arch
sudo chsrc set archlinuxcn
sudo chsrc set manjaro
sudo chsrc set gentoo
sudo chsrc set rocky | rockylinux
sudo chsrc set alma  | almalinux
sudo chsrc set alpine
sudo chsrc set void  | voidlinux
sudo chsrc set solus
sudo chsrc set ros   | ros2
sudo chsrc set trisquel
sudo chsrc set lite  | linuxlite
sudo chsrc set raspi | raspberrypi
sudo chsrc set armbian
sudo chsrc set openwrt

sudo chsrc set openeuler
sudo chsrc set openanolis | anolis
sudo chsrc set openkylin
sudo chsrc set deepin

chsrc set msys2 | msys

# Android
chsrc set termux

# BSD
sudo chsrc set freebsd
sudo chsrc set openbsd
sudo chsrc set netbsd
```

## 软件

```bash
chsrc set winget
chsrc set brew      | homebrew
chsrc set cocoapods | cocoa | pod
chsrc set dockerhub | docker
chsrc set flathub   | flatpak
chsrc set nix
chsrc set guix
chsrc set emacs  | elpa
chsrc set tex    | ctan | latex | texlive | miktex
chsrc set conda  | anaconda
```
