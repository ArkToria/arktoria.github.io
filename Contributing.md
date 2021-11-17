# Contributing

If you're interested in contributing to this project, please provide a pull request on github or send your contact information such as telegram account, then encrypted with [GPG Key](https://github.com/cocomeow.gpg) to the [mailbox](mailto:catnights@pm.me). Also, note that this project is open-source and licensed under [GPL-3.0](https://github.com/ArkToria/ACross/blob/master/LICENSE).

## Project Structure

### Basic Information

This project is mainly composed by one repository, hosted on self-built gitea server for safety and convenience reasons and push to the [mirror repository](https://github.com/ArkToria/ACross) on Github. Therefore, for the pull requests, we will choose to squash merge manually instead of on the [Github Pull Requests Page](https://github.com/ArkToria/ACross/pulls).

The backend side of the application is written in C++, while the frontend is written in Qt/QML. The wiki website is built on the [docsify](https://docsify.js.org/#/) generator.

Due to the tight coupling required by some features, basic knowledge of both C++ and Qt/QML is recommend.

- Modern C++ Tutorial: https://changkun.de/modern-cpp/
- Qt/QML: https://doc.qt.io/qt-6/
- SQLite: https://www.sqlite.org/cintro.html
- Protocol Buffers: https://developers.google.com/protocol-buffers
- gRPC: https://grpc.io/
- V2Fly Core Document: https://www.v2fly.org/

### Code of Conduct

#### Auto Format

- [.clang-format](https://github.com/ArkToria/ACross/blob/master/.clang-format)

If you are using [QtCreator](https://www.qt.io/product/development-tools) as an IDE, then you can enable automatic formatting in the setting options. [More ...](https://doc.qt.io/qtcreator/creator-beautifier.html)

![clang-format](/Contributing/clang_format.png)

Be careful **not** to check the `Override Clang Format configuration file` box.

![qml-format](/Contributing/qml_format.png)

Also remember to enable QML formatting.

#### QML Coding Conventions

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

## Development Environment
