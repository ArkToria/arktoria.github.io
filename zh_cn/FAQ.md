# 常见问题

## 平台无关

### 核心

> 核心崩溃：Only one of each socket address is normally permitted

可能是本地端口被占用。请改变入站端口，或关闭占用相应端口的进程。

寻找使用特定端口的进程 PID 可以看这里 [Windows](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-tcp-or-udp-port-on-windows) | [Linux](https://unix.stackexchange.com/questions/106561/finding-the-pid-of-the-process-using-a-specific-port)。

### 应用程序

> 代理节点的配置不生效

![config.json](/FAQ/use_local_config.png)

请检查核心程序目录中是否有 `config.json` 文件。

`ACross` 将配置发送到 `stdin`，但 `v2ray-core` 的默认优先级是低于本地文件的。请删除核心程序目录中的 `config.json`，或者将其移动到没有配置文件的目录。

> 如何通过代理更新订阅？

如果一个节点正在运行，将自动通过它下载和更新。

> 日志页面去哪儿了？

由于 QML 中的 `TextArea` 组件的内存占用很高，ACross 暂时隐藏了它，在 [上游修复](https://codereview.qt-project.org/c/qt/qtdeclarative/+/379095/6) 之后会使其可见。

调试时，可以在设置页面上把输出模式改为 `stdout` 或 `both`.

## Linux

### Wayland

> Plasma wayland + systemd boot + autostart 配置下托盘图标不出现
>
> 报错：`No such signal QPlatformNativeInterface::systemTrayWindowChanged("QScreen")`

系统托盘小部件是与面板一起被异步加载的，如果 ACross 在它们完成加载之前被打开，那么就无法在托盘上注册图标（因为托盘此时还不存在）。解决方法也很简单：延迟 ACross 的启动，使它一定能在托盘加载后再启动。

这里是一个在桌面启动（不等于加载完成）后 5 秒后延迟启动 ACross 的用户服务实例。

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

> vcpkg + MSVC 构建无法从 TLS1.3-only 的订阅链接更新订阅

ACross 使用 `curl` 获取订阅，但它在 Schannel 上仍没有 TLS 1.3 的支持. 请关注上游的 [issue](https://github.com/curl/curl/pull/7784).
