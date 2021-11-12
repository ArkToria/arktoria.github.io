# F&Q

## Universal
> The proxy node configuration failed to take effect

Please check if there is a `config.json` file in the working directory, because `ACross` send the configuration to stdin, but the default priority on v2ray core is lower than the local file.

## Linux

### Wayland

> Plasma wayland + systemd boot + autostart unable to  display icon on system tray
> > No such signal QPlatformNativeInterface::systemTrayWindowChanged("QScreen")

The system tray widget will be loaded asynchronously along with the panel, and the application will be opened before them. The following is an example user service of start after `5s` delay.

```ini
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