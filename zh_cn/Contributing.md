# 贡献代码

若您有意为本项目贡献代码，请您在我们的 [GitHub 仓库](https://github.com/ArkToria/ACross/) 发起一个 Pull Request. 或者，将您的联系方式，比如您的 Telegram 账户，用 [我们的 GPG Key: 0x9B1380D7B700BA9DFAAED4849EEEED2D1566C61B](https://keys.openpgp.org/vks/v1/by-fingerprint/9B1380D7B700BA9DFAAED4849EEEED2D1566C61B) 加密后，发送到 [这个邮箱](mailto:dev@arktoria.org)。 

同时请注意，本项目是开源的，遵守 [GPL-3.0](https://github.com/ArkToria/ACross/blob/master/LICENSE) 协议。

## 项目结构

### 基本信息

这个项目主要由一个仓库组成，出于安全和便捷性的考量，它被托管在一个自建的 Gitea 服务器上，并同步到 GitHub 上的 [镜像仓库](https://github.com/ArkToria/ACross)。因此，我们会手动 squash 合并 Pull Request，而不是在 [GitHub](https://github.com/ArkToria/ACross/pulls) 上完成。

本软件后端使用 C++ 编写, 前端则是 Qt/QML. 

Wiki 由 [docsify](https://docsify.js.org/#/) 生成。

由于某些特性与这两种语言联系均十分紧密，建议您同时掌握 C++ 和 Qt/QML 这两种语言。

- Modern C++ Tutorial: https://changkun.de/modern-cpp/
- Qt/QML: https://doc.qt.io/qt-6/
- SQLite: https://www.sqlite.org/cintro.html
- Protocol Buffers: https://developers.google.com/protocol-buffers
- gRPC: https://grpc.io/
- V2Fly Core Document: https://www.v2fly.org/

### 代码风格

#### 自动格式化

- [.clang-format](https://github.com/ArkToria/ACross/blob/master/.clang-format)

如您把 [QtCreator](https://www.qt.io/product/development-tools) 作为 IDE 使用，那你要在设定中打开自动格式化功能。[了解更多](https://doc.qt.io/qtcreator/creator-beautifier.html)

![clang-format](/Contributing/clang_format.png)

当心！**不要** 勾选 `Override Clang Format configuration file` 选项。

![qml-format](/Contributing/qml_format.png)

记得启用 QML 格式化。

对 [Visual Studio Code](https://code.visualstudio.com/) 用家，请安装 [C/C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools), 并且启用 `Editor: Format On Save` 选项。如果 `.clang-format` 文件不存在，你可以用 `{Key: value, ...}` 来设置特定参数。

![clang-format-vscode](/Contributing/clang_format_vscode.png)

#### QML 代码常规写法

> https://doc.qt.io/qt-6/qml-codingconventions.html

```qml
Item {
    id: control // id on the first line makes it easy to find an object

    property int fontSize: 14 // `Camel-Case` property declarations

    signal acceptAll // signal declarations

    function doSomething(x) // javascript functions
    {
        return x + photoImage.width
    }

    // try to group related properties together
    width: 180 // object properties (layout properties take precedence)

    Rectangle {} // child objects

    Connections {} // special child objects

    states: State {} // states

    transitions: Transition {} // transitions
}
```

对于复杂的 `JavaScript` 函数，我们使用 `TypeScript` 来生成，并导入 QML 文件。 [了解更多](https://github.com/ArkToria/ACross/blob/d396ba7e1dc33067988e9d63c4345dd126fe797c/tsconfig.json#L101)

#### 命名规则

- `Snake Case`, 蛇式命名。用于临时变量，例如 `auto node_info = ...;`
- `Hungarian notation`, 匈牙利命名法。用于成员函数，例如 `Config m_config; Config* p_config;`
- `Camel Case`, 驼峰命名法。用于 QML 属性以及方法，例如 `void getNodeInfo();`

### 目录结构

```text
.
├── 3rdpart // git submodules
├── cmake
├── CMakeLists.txt
├── i18n // translations
├── LICENSE
├── misc // icons and other static source
    ├── across_example.json
    ├── across.proto
    ├── across.rc
    ├── command.proto
    ├── design
    ├── icons
    ├── org.arktoria.across.desktop
    ├── resource.h
    ├── screenshots
    ├── v2ray_api.proto
    ├── v2ray_config.proto
    └── VERSION
├── pkgbuild
    ├── arch
    └── msys2
├── README.md
├── src
    ├── app.cpp
    ├── app.h
    ├── main.cpp
    ├── models // Processing
    ├── view_models // Data Bindings
    └── views // QML Files and Scripts
├── tests
└── vcpkg.json
```

### 核心组件

- [Application](https://github.com/ArkToria/ACross/blob/master/src/app.h)

  程序入口。提供初始化、QML对象绑定和 SingleApplication.

- [ConfigTools](https://github.com/ArkToria/ACross/blob/master/src/view_models/configtools.h)

  处理用户配置文件。根据 [across.proto](https://github.com/ArkToria/ACross/blob/master/misc/across.proto) 生成、解析和保存配置。

- [CoreTools](https://github.com/ArkToria/ACross/blob/master/src/models/coretools.h)

  控制 QProcess, 并通过 `stdin` 将配置发送到v2fly核心。

- [LogTools](https://github.com/ArkToria/ACross/blob/master/src/view_models/logtools.h)

  核心的应用程序记录器。有两个全局的静态日志记录器，名为 `app` 和 `core`。你可以从 `spdlog::get("app")` 或 `spdlog::get("core")` 中获得它们，然后克隆到你的 logger 组件中。[了解更多](https://spdlog.docsforge.com/v1.x/5.logger-registry/)

- [DBTools](https://github.com/ArkToria/ACross/blob/master/src/models/dbtools.h)

  SQlite3 数据库控制。用于存储节点配置和一些运行变量。你可以直接打开数据库来获得这些字段。

- [GroupList](https://github.com/ArkToria/ACross/blob/master/src/view_models/grouplist.h)

  从数据库加载 [GroupInfo](https://github.com/ArkToria/ACross/blob/efd1e64aed63ed81d7d1bd7bb42527db5f8d86bb/src/models/dbtools.h#L50) 项目，并管理订阅。

- [NodeList](https://github.com/ArkToria/ACross/blob/master/src/view_models/nodelist.h)

  按当前组别加载 [NodeInfo](https://github.com/ArkToria/ACross/blob/efd1e64aed63ed81d7d1bd7bb42527db5f8d86bb/src/models/dbtools.h#L30) 项目并管理它们。

### 翻译

> https://doc.qt.io/qt-6/internationalization.html

翻译文件位于 [${CMAKE_SOURCE_DIR}/i18n/](https://github.com/ArkToria/ACross/tree/master/i18n) 文件夹中。

文件应当按照 `across_<language code>.ts` 形式来命名。例如 `across_zh_CN.ts`.

如果翻译文件在构建过程中没有更新，你可以在项目工作区执行以下命令来手动更新。

```bash
$ lupdate6 src/ -ts i18n/across_zh_CN.ts
```

我们建议使用 `Qt Linguist` 工具来编辑生成的 `xml` 翻译文件。

![qt_linguist_tools](/Contributing/qt_linguist_tools.png)

## 开发环境

> 你应当先装好 [依赖](/zh_cn/Installation?id=依赖) 

### Linux

Linux 开发者可以很容易地从镜像中下载并安装依赖 和 QtCreator. 将工具包设置为 qt6, 我们推荐的编译器是 `gcc` 或最新的 `clang`. 然后设置自动格式化，并如前所述启用 QML 调试。

![qt_version](/Contributing/qt_version.png)

![qml_debug](/Contributing/qml_debug.png)

### Windows
