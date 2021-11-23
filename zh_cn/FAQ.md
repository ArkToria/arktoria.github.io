# 常见问题

## 各平台都有的

### 核心

> Only one of each socket address is normally permitted

可能是本地端口被占用。请改变入站端口，或关闭占用相应端口的进程。

寻找使用特定端口的进程 PID 可以看这里 [Windows](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-tcp-or-udp-port-on-windows) | [Linux](https://unix.stackexchange.com/questions/106561/finding-the-pid-of-the-process-using-a-specific-port)。

### 应用程序

> The proxy node configuration failed to take effect

![config.json](/FAQ/use_local_config.png)

请检查工作目录中是否有 `config.json` 文件。

`ACross` 将配置发送到 `stdin`, 但 `v2ray-core` 的默认优先级是低于本地文件的。你需要删除工作目录的 `config.json`, 或者为应用程序另外创建一个没有配置文件的工作目录。

> Update subscription through proxy

如果一个节点正在运行，将自动通过它下载和更新。

> Where is the log page

由于 QML 中的 `TextArea` 组件的内存占用很高，我们暂时隐藏了它，在 [上游修复](https://codereview.qt-project.org/c/qt/qtdeclarative/+/379095/6) 之后会使其可见。

调试时，你可以在设置页面上把输出模式改为 `stdout` 或 `both`.

## Linux

### Wayland

> Plasma wayland + systemd boot + autostart unable to display the icon on the system tray
>
> > No such signal QPlatformNativeInterface::systemTrayWindowChanged("QScreen")

系统托盘小部件是与面板一起被异步加载的，而应用程序在它们之前被打开。

下面给出一个在 5 秒后延迟启动的用户服务实例。

```systemd
# ~/.config/systemd/user/across.service

[Unit]
Description=ACross
SourcePath=/usr/share/applications/org.arktoria.across.desktop
PartOf=graphical-session.target
Wants=graphical-session.target

[Service]
Type=exec
ExecStartPre=:/usr/bin/sleep 5s
ExecStart=:/usr/bin/across "-qwindowicon" "org.arktoria.across"
Restart=no
TimeoutSec=10s
Slice=app.slice

[Install]
WantedBy=default.target
```

## Windows

> The software built by vcpkg and MSVC cannot add or update groups via the `tls1.3` only subscription link.

我们使用 `curl` 作为下载器，但它在 Schannel 上仍没有支持 TLS 1.3. 请关注上游的 [issue](https://github.com/curl/curl/pull/7784) .
