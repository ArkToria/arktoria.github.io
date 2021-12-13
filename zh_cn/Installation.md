# 安装

## 预编译软件包

### Releases

- https://github.com/arktoria/across/releases

### Git 版本

- [Arch Linux](https://github.com/ArkToria/ACross/actions/workflows/arch-build.yaml) | <span id="across-git-archlinux"></span>

- [Nix / NixOS](https://github.com/ArkToria/ACross/actions/workflows/nix-build.yaml)

- [Windows x86_64 - MSVC](https://github.com/ArkToria/ACross/actions/workflows/msvc-build.yaml) | <span id="across-git-msvc"></span>

- [Windows x86_64 - MSYS2](https://github.com/ArkToria/ACross/actions/workflows/msys2-mingw64-build.yaml) | <span id="across-git-mingw-w64"></span>

### 验证软件包

#### 下载和安装

- Windows: [Gpg4win](https://gpg4win.org/download.html)
- Linux: 从系统包管理器安装 `gnupg`
- 更多: https://gnupg.org/download/

#### 从命令行验证：

```bash
$ gpg --keyserver keys.openpgp.org --recv-keys 9B1380D7B700BA9DFAAED4849EEEED2D1566C61B

$ gpg --verify <across_release_package>.sig
```

#### 从图形界面验证：

![search from gui](/Installation/search_from_gui.png)

![verify from gui](/Installation/verify_from_gui.png)

### Windows

#### Scoop

```powershell
scoop bucket add arktoria https://github.com/ArkToria/scoop-bucket
scoop install arktoria/across
```

`scoop` 包里面提供了一个简单的配置，并且如果修改设置页面中的任何内容都能生成一份完整的配置。软件会被安装在你的用户目录下：`~/scoop/bucket/across/`。

#### Pacman & MSYS2

从 Action 或者 Release 页面下载 `mingw-w64-x86_64` 包。对于从 Action 下载的包来说，你需要先用 `unzip` 解压。

```bash
pacman -U *.pkg.tar.zst
```

#### Portable

下载并解压即可使用

### Linux

#### Pacman & ArchLinux

你可以从 [ArchLinuxCN](https://wiki.archlinux.org/title/Unofficial_user_repositories#archlinuxcn) 源下载并安装。

对于 `Manjaro` 或者其他基于 Arch Linux 的发行版用户来说，我们推荐你从 [AUR](https://aur.archlinux.org/packages/across/) 自行构建软件包。

#### Nix & NixOS

我们提供了 [Flakes](https://github.com/ArkToria/ACross/blob/master/flake.nix) 支持。

### MacOS

#### AppImage & Others

我们的 AppImage 从 Debian 中构建，但由于其上游并未提供最新版的 Qt 和一些其他的依赖，所以可能会存在一些问题，如输入法无法使用。

在你启动 AppImage 之前，你需要进行 `chmod u+x <AppImage File>` 操作，给它可执行权限，并且需要确保你的 `glibc` 版本符合最低需求。

## 从源代码编译

### 依赖

- 运行环境需求

  - qt6-base
  - qt6-svg
  - qt6-quickcontrols2
  - qt6-translations
  - qt6-tools
  - qt6-imageformats
  - qt6-5compat
  - [curl](https://github.com/curl/curl)
  - [fmt](https://github.com/fmtlib/fmt) `>=8.0.0`
  - [spdlog](https://github.com/gabime/spdlog) `>=1.9.0`
  - [grpc](https://github.com/grpc/grpc)
  - [protobuf](https://github.com/protocolbuffers/protobuf)
  - [nlohmann-json](https://github.com/nlohmann/json)
  - [zxing-cpp](https://github.com/nu-book/zxing-cpp) `>=1.2.0`

- 编译环境需求
  - GCC / Clang / MSVC (Support C++ 20 Standard)
  - Ninja (optional)
  - Git
  - CMake
  - GoogleTest

### Linux

请参考 Arch Linux 的 [PKGBUILD 文件](https://github.com/ArkToria/ACross/blob/master/pkgbuild/arch/across-dev-git/PKGBUILD) 来了解需要的依赖。

```bash
$ cd <ACross Reposotiry>
$ mkdir -p build && cd build
$ cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_BUILD_TYPE=Release \
    -GNinja
$ cmake --build .
$ DESTDIR=<installation_directory> cmake --install .
```

> [CPM.cmake](https://github.com/cpm-cmake/CPM.cmake) 是一个 CMake 脚本，它可以管理 CMake 的依赖。

我们用 `CPM` 作为 C++ 的依赖管理器。按照我们的设定，它会默认首先搜索本地的软件包。如果没有找到需要的依赖，会用 [FetchContent()](https://cmake.org/cmake/help/latest/module/FetchContent.html) 按照版本自动拉取依赖。然而，一些基本的依赖，比如 `gcc` 和 `cmake`, 你还是得手动安装。

如果你的编译环境不支持通过网络打包，比如说 [OBS](https://build.opensuse.org/), 那你就得手动同步所有的 submodules 并且把以下设置调成 `OFF`.

```bash
$ cmake .. \
    -DCMAKE_INSTALL_PREFIX=/usr \
    -DCMAKE_BUILD_TYPE=Release \
    -DFETCH_MAGIC_ENUM=OFF \
    -DFETCH_SEMVER=OFF \
    -DFETCH_SINGLE_APPLICATION=OFF \
    -GNinja
```

### Windows

#### vcpkg

为了编译 `ACross`, Qt 的版本不应低于 `v6.2.0`. 然而，若你实用官方的安装器，那你至少需要 `v6.2.1` 因为它缺少 `qt6-5compat` 组件。

以下指令均在 PowerShell 中执行。

##### 0. 安装 vcpkg

###### 若你从未安装过 `vcpkg`

克隆并引导该项目。

```powershell
$ git clone --recursive https://github.com/microsoft/vcpkg.git
$ ./vcpkg/bootstrap-vcpkg.bat
```

你可以把 `vcpkg` 目录添加到环境变量 `PATH` 中, 或者在接下来的操作中使用带绝对路径的 `vcpkg.exe`.

###### 若你已经安装过 `vcpkg`

升级

```powershell
$ cd <vcpkg Directory>
$ git pull
$ ./vcpkg/bootstrap-vcpkg.bat
```

##### 1. 安装依赖

```powershell
$ cd <ACross Reposotiry>
$ vcpkg install
```

##### 2. 编译 CMake 项目

```powershell
$ cd <ACross Reposotiry>
$ mkdir build && cd build
$ cmake ../ ^
    -G "Visual Studio 16 2019" ^
    -DCMAKE_BUILD_TYPE=Release ^
    -DCMAKE_TOOLCHAIN_FILE=<vcpkg Directory>/scripts/buildsystems/vcpkg.cmake ^
    -DVCPKG_TARGET_TRIPLET=x64-windows
$ cmake --build .
```

#### MSYS2 + MINGW

**推荐方法**

按照官方教程，利用 [ACross PKGBUILD](https://github.com/ArkToria/ACross/blob/master/pkgbuild/msys2/PKGBUILD) 编译 MSYS2 包.

> https://www.msys2.org/wiki/Creating-Packages/

```bash
$ pacman -S base-devel mingw-w64-x86_64-toolchain mingw-w64-x86_64-gcc
$ cd <ACross Reposotiry>/pkgbuild/msys2/
$ MINGW_ARCH=mingw64 makepkg-mingw -sCLfi
```

你也可以按照如下步骤手动编译。

##### 0. 安装 MSYS2

从 [Official Website](https://www.msys2.org/) | [TUNA Mirror](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.exe) 下载软件包。

##### 1. 安装依赖

> 这个包管理器名叫 `pacman`, Arch Linux 用家们应当十分熟悉。它也可以用来安装 MSYS2. 但是，使用 pacman 安装软件包时，需要 root 权限。

```bash
$ pacman -S mingw-w64-x86_64-qt6-base \
    mingw-w64-x86_64-qt6-translations \
    mingw-w64-x86_64-qt6-imageformats \
    mingw-w64-x86_64-qt6-5compat \
    mingw-w64-x86_64-qt6-tools \
    mingw-w64-x86_64-curl \
    mingw-w64-x86_64-fmt \
    mingw-w64-x86_64-spdlog \
    mingw-w64-x86_64-protobuf \
    mingw-w64-x86_64-grpc \
    mingw-w64-x86_64-nlohmann-json \
    mingw-w64-x86_64-zxing-cpp \
    mingw-w64-x86_64-cmake \
    mingw-w64-x86_64-clang \
    mingw-w64-x86_64-ninja \
    mingw-w64-x86_64-gcc \
    mingw-w64-x86_64-gtest
```

##### 2. 编译 CMake 项目

从 Windows 开始菜单打开 Mingw-w64 终端。

```bash
$ mkdir build && cd build
$ cmake ../ -GNinja -DCMAKE_BUILD_TYPE=Release
$ cmake --build .
```

默认的 `ENABLE_DEPLOYMENT` 是 `ON`, 也就是说所需的资源（包括 `*.dll`）会被拷贝到编译目录中。
