# Installation

## Pre-built Package

### Arch Linux

- [Arch Linux Github Action](https://github.com/ArkToria/ACross/actions/workflows/arch-build.yaml)

## Build From Source

### Linux

#### Arch Linux

- [PKGBUILD](https://github.com/ArkToria/ACross/blob/master/pkgbuild/arch/across-dev-git/PKGBUILD)

### Windows

#### vcpkg

The minimum required version of Qt for building ACross project is `v6.2.0`. However, if you use the official Qt installer, you need at least version `v6.2.1` because of the missing `qt6-5compat` component.

#### MSYS2 + MINGW

##### 0. Install MSYS2

Download the installer from [Official Website](https://www.msys2.org/)
 |
 [Tuna Mirror](https://mirrors.tuna.tsinghua.edu.cn/msys2/distrib/msys2-x86_64-latest.exe)

##### 1. Install Dependencies

> The package manager called `pacman`, which Arch Linux users should be familiar with, is also the one for MSYS2. But to install packages you do not need root privilege.

```shell
$ pacman -S mingw-w64_x86_64-qt6-base \
    mingw-w64_x86_64-qt6-translations \
    mingw-w64_x86_64-qt6-imageformats \
    mingw-w64_x86_64-qt6-5compat \
    mingw-w64_x86_64-qt6-tools \
    mingw-w64_x86_64-curl \
    mingw-w64_x86_64-fmt \
    mingw-w64_x86_64-spdlog \
    mingw-w64_x86_64-protobuf \
    mingw-w64_x86_64-grpc \
    mingw-w64_x86_64-nlohmann-json \
    mingw-w64_x86_64-zxing-cpp
```

##### 2. Build the CMake Project

Open your Mingw-w64 Terminal in Windows Launcher.

```shell
$ mkdir build && cd build
$ cmake ../ -GNinja -DCMAKE_BUILD_TYPE=Release
$ cmake --build .
```