# F&Q

## Universal

### Core

> Only one of each socket address is normally permitted

There may be a situation where the local port is occupied. Please change the inbount port or turn off the corresponding occupied process. Finding the PID of the process using a specific port? [Windows](https://stackoverflow.com/questions/48198/how-can-you-find-out-which-process-is-listening-on-a-tcp-or-udp-port-on-windows) | [Linux](https://unix.stackexchange.com/questions/106561/finding-the-pid-of-the-process-using-a-specific-port).

### Application

> The proxy node configuration failed to take effect

![config.json](/FAQ/use_local_config.png)

Please check if there is a `config.json` file in the working directory, because `ACross` send the configuration to stdin, but the default priority on v2ray core is lower than the local file. So you need to delete the `config.json` or create a separate working directory for the application without any configuration files.

> Update subscription through proxy

If a node is currently running, it will automatically use the node as an proxy to download and update items.

## Linux

### Wayland

> Plasma wayland + systemd boot + autostart unable to display icon on system tray
>
> > No such signal QPlatformNativeInterface::systemTrayWindowChanged("QScreen")

The system tray widget will be loaded asynchronously along with the panel, and the application will be opened before them. The following is an example user service of start after `5s` delay.

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
TimeoutSec=5s
Slice=app.slice

[Install]
WantedBy=default.target
```

## Windows

> The software built by vcpkg and MSVC cannot add or update groups via the `tls1.3` only subscription link.

We use `curl` as the downloader, but it still have no TLS 1.3 support on SChannel. Please following the upstream [issue](https://github.com/curl/curl/pull/7784).
