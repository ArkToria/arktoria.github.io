# Installation

## Pre-built Package

### Releases
> https://github.com/arktoria/across/releases

### Git Version 
> <div id="across-git-version">v</div>

- [Arch Linux](https://github.com/ArkToria/ACross/actions/workflows/arch-build.yaml)

- [Nix / NixOS](https://github.com/ArkToria/ACross/actions/workflows/nix-build.yaml)

- [Windows x86_64 - MSVC](https://github.com/ArkToria/ACross/actions/workflows/msvc-build.yaml)

- [Windows x86_64 - MSYS2](https://github.com/ArkToria/ACross/actions/workflows/msys2-mingw64-build.yaml)

## Build From Source

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

### Windows

#### vcpkg

The minimum required version of Qt for building ACross project is `v6.2.0`. However, if you use the official Qt installer, you need at least version `v6.2.1` because of the missing `qt6-5compat` component.

#### MSYS2 + MINGW
**Recommended:**

Build the MSYS2 package from [ACross PKGBUILD](https://github.com/ArkToria/ACross/blob/master/pkgbuild/msys2/PKGBUILD) following to the official tutorial.

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
    mingw-w64-x86_64-zxing-cpp
```

##### 2. Build the CMake Project

Open your Mingw-w64 Terminal in Windows Launcher.

```bash
$ mkdir build && cd build
$ cmake ../ -GNinja -DCMAKE_BUILD_TYPE=Release
$ cmake --build .
```

The `ENABLE_DEPLOYMENT` option is `ON` by default, this will copy the required resources (including the `*.dll`) to the compiled directory. 