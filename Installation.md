# Installation

## Pre-built Package

### Releases

- https://github.com/arktoria/across/releases

### Git Version

- [Arch Linux](https://github.com/ArkToria/ACross/actions/workflows/arch-build.yaml) | <span id="across-git-archlinux"></span>

- [Nix / NixOS](https://github.com/ArkToria/ACross/actions/workflows/nix-build.yaml)

- [Windows x86_64 - MSVC](https://github.com/ArkToria/ACross/actions/workflows/msvc-build.yaml) | <span id="across-git-msvc"></span>

- [Windows x86_64 - MSYS2](https://github.com/ArkToria/ACross/actions/workflows/msys2-mingw64-build.yaml) | <span id="across-git-mingw-w64"></span>

### Verify The Package

#### Download and install

- Windows: [Gpg4win](https://gpg4win.org/download.html)
- Linux: Install `gnupg` from system package manager
- More: https://gnupg.org/download/

#### Verify from CLI:

```bash
$ gpg --keyserver keys.openpgp.org --recv-keys 9B1380D7B700BA9DFAAED4849EEEED2D1566C61B

$ gpg --verify <across_release_package>.sig
```

#### Verify from GUI:

![search from gui](/Installation/search_from_gui.png)

![verify from gui](/Installation/verify_from_gui.png)

### Windows

#### Scoop

```powershell
scoop bucket add arktoria https://github.com/ArkToria/scoop-bucket
scoop install arktoria/across
```

The `scoop` package provides a simple configuration, and making any modifications in the setting page can generate the full one. The software will be installed in your user directory `~/scoop/bucket/across/`.

#### Pacman & MSYS2

Download the `mingw-w64-x86_64` package from action or release page. For the action artifacts package, you should `unzip` at first.

```bash
pacman -U *.pkg.tar.zst
```

#### Portable

Download and `unzip` to use it.

### Linux

#### Pacman & ArchLinux

You can install the package from [ArchLinuxCN](https://wiki.archlinux.org/title/Unofficial_user_repositories#archlinuxcn) repositories.

For `Manjaro` or other based on the Arch Linux operating system user, We recommend to build the package from [AUR](https://aur.archlinux.org/packages/across/) by yourself.

#### Nix & NixOS

We provide [Flakes](https://github.com/ArkToria/ACross/blob/master/flake.nix) support.

#### AppImage & Others

Our AppImage is built from Debian, because there has no the latest Qt or other dependence packages in the upstream, so there may be some problems, such as the input method is broken.

Before you start the AppImage, you should `chmod u+x <AppImage File>` to make it executable and make sour you `glibc` version matchs the minimum requirements.

### MacOS

## Build From Source

### Dependencies

- Runtime requirements:

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

- Build requirements:
  - GCC / Clang / MSVC (Support C++ 20 Standard)
  - Ninja (optional)
  - Git
  - CMake
  - GoogleTest

### Linux

Please refer to Arch Linux [PKGBUILD file](https://github.com/ArkToria/ACross/blob/master/pkgbuild/arch/across-dev-git/PKGBUILD) for installation dependencies.

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

> [CPM.cmake](https://github.com/cpm-cmake/CPM.cmake) is a CMake script that adds dependency management capabilities to CMake.

We use `CPM` as the dependency source manager for C++. In our settings, it will first search the local system package as default. If no dependencies are found, they will be automatically pulled by [FetchContent()](https://cmake.org/cmake/help/latest/module/FetchContent.html) based on the version. However, some basic dependencies like `gcc` and `cmake` still require you to manually build and install.

If your build system does not support packaging through the internet, such as [OBS](https://build.opensuse.org/), you'll need to manually synchronize the submodules and set the following options to `OFF`.

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

The minimum required version of Qt for building the `ACross` project is `v6.2.0`. However, if you use the official Qt installer, then you need at least version `v6.2.1` because of the absent `qt6-5compat` component.

The following commands are all executed in PowerShell.

##### 0. Install vcpkg

###### If you have not installed `vcpkg` before

Clone and bootstrap it.

```powershell
$ git clone --recursive https://github.com/microsoft/vcpkg.git
$ ./vcpkg/bootstrap-vcpkg.bat
```

You can add the `vcpkg` directory to the `PATH` environment variable, or use `vcpkg.exe` with the absolute path later.

###### If you have already installed `vcpkg`

Update it and sources by

```powershell
$ cd <vcpkg Directory>
$ git pull
$ ./vcpkg/bootstrap-vcpkg.bat
```

##### 1. Install Dependencies

```powershell
$ cd <ACross Reposotiry>
$ vcpkg install
```

##### 2. Build the CMake Project

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

**Recommended:**

Build the MSYS2 package from [ACross PKGBUILD](https://github.com/ArkToria/ACross/blob/master/pkgbuild/msys2/PKGBUILD) following the official tutorial.

> https://www.msys2.org/wiki/Creating-Packages/

```bash
$ pacman -S base-devel mingw-w64-x86_64-toolchain mingw-w64-x86_64-gcc
$ cd <ACross Reposotiry>/pkgbuild/msys2/
$ MINGW_ARCH=mingw64 makepkg-mingw -sCLfi
```

You can also follow the steps below to build manually:

##### 0. Install MSYS2

Download the installer from [Official Website](https://www.msys2.org/) | [TUNA Mirror](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.exe)

##### 1. Install Dependencies

> The package manager called `pacman`, which Arch Linux users should be familiar with, is also the one for MSYS2. But to install packages you do not need root privilege.

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

##### 2. Build the CMake Project

Open your Mingw-w64 Terminal in Windows Launcher.

```bash
$ mkdir build && cd build
$ cmake ../ -GNinja -DCMAKE_BUILD_TYPE=Release
$ cmake --build .
```

The `ENABLE_DEPLOYMENT` option is `ON` by default, this will copy the required resources (including the `*.dll`) to the compiled directory.
