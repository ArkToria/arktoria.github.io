# Installation

## Pre-built Package

### Releases
> https://github.com/arktoria/across/releases

### Git Version 

- [Arch Linux](https://github.com/ArkToria/ACross/actions/workflows/arch-build.yaml) | <span id="across-git-archlinux"></span>

- [Nix / NixOS](https://github.com/ArkToria/ACross/actions/workflows/nix-build.yaml)

- [Windows x86_64 - MSVC](https://github.com/ArkToria/ACross/actions/workflows/msvc-build.yaml) | <span id="across-git-msvc"></span>

- [Windows x86_64 - MSYS2](https://github.com/ArkToria/ACross/actions/workflows/msys2-mingw64-build.yaml) | <span id="across-git-mingw-w64"></span>

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
    - gcc / clang / msvc (Support C++ 20 Standard)
    - ninja (optional)
    - git
    - cmake
    - gtest

### Linux

Please refer to Arch Linux [PKGBUILD](https://github.com/ArkToria/ACross/blob/master/pkgbuild/arch/across-dev-git/PKGBUILD) file for installation dependencies.

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

We use `CPM` as a dependencies source manager for C++. In our settings, it will first search the local system package as default. If no dependencies are found, they will be automatically pulled by [FetchContent()](https://cmake.org/cmake/help/latest/module/FetchContent.html) based on the version. However, some basic dependencies like `gcc` and `cmake` still require you to manually build and install.

If your build system does not support packaging through the internet, such as [OBS](https://build.opensuse.org/). You need to manually synchronize the submodules and set the following options to `OFF`.

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

The minimum required version of Qt for building the `ACross` project is `v6.2.0`. However, if you use the official Qt installer, you need at least version `v6.2.1` because of the missing `qt6-5compat` component.

The following commands are all executed in PowerShell.

##### 0. Install vcpkg

###### If you have not installed `vcpkg` before

Clone and bootstrap it by

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

Download the installer from [Official Website](https://www.msys2.org/)
 |
 [Tuna Mirror](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.exe)

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