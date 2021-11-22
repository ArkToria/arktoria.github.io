# 用户界面

## 主页

![主页](/UI/home_page.png)

### 本地组和节点

- 创建本地组

![创建本地组](/UI/create_local_group.png)

输入组名，这里可以预填`base64`格式的节点列表，也可以留空。

- 编辑本地群组

右键单击组卡片并选择“编辑”操作。

![Edit group](/UI/edit_group.png)

### 订阅组

- 创建订阅组

![创建订阅组](/UI/create_subscription_group.png)

订阅内容类型应为以下三种类型之一：`Base64`、`SIP008` 和`JSON Outbound`。 如果您不确定，请在浏览器中输入订阅链接，查看内容并与以下方案进行比较。

#### 订阅类型

- Base64: 通常有着像这样的开头 `vmess://` | `ss://` | `trojan://`

  - [VMESS](<https://github.com/2dust/v2rayN/wiki/%E5%88%86%E4%BA%AB%E9%93%BE%E6%8E%A5%E6%A0%BC%E5%BC%8F%E8%AF%B4%E6%98%8E(ver-2)>): `vmess://<base64EncodeJson>`

  ```json
  {
    "v": "2",
    "ps": "Names",
    "add": "111.111.111.111",
    "port": "32000",
    "id": "1386f85e-657b-4d6e-9d56-78badb75e1fd",
    "aid": "100",
    "scy": "zero",
    "net": "tcp",
    "type": "none",
    "host": "www.bbb.com",
    "path": "/",
    "tls": "tls",
    "sni": "www.ccc.com"
  }
  ```

  - Shadowsocks [SIP002](https://shadowsocks.org/en/wiki/SIP002-URI-Scheme.html):
    `ss://<websafe-base64-encode-utf8(method:password)>@hostname:port/?plugin"#"tag`

  - Trojan:
    `trojan://<password>@<host>:<port>?sni=<server_name>&allowinsecure=<allow_insecure>&alpn=h2%0Ahttp/1.1#<name>`

- Shadowsocks [SIP008](https://shadowsocks.org/en/wiki/SIP008-Online-Configuration-Delivery.html):

  ```json
  {
    "version": 1,
    "servers": [
      {
        // Server UUID to distinguish between servers when updating.
        "id": "27b8a625-4f4b-4428-9f0f-8a2317db7c79",
        "remarks": "Name of the server",
        "server": "example.com",
        "server_port": 8388,
        "password": "example",
        "method": "chacha20-ietf-poly1305",
        "plugin": "xxx",
        "plugin_opts": "xxxxx"
      },
      // Another server
      {
        "id": "7842c068-c667-41f2-8f7d-04feece3cb67",
        "remarks": "Name of the server",
        "server": "example.com",
        "server_port": 8388,
        "password": "example",
        "method": "chacha20-ietf-poly1305",
        "plugin": "xxx",
        "plugin_opts": "xxxxx"
      }
    ],
    // The above fields are mandatory.
    // Optional fields for data usage:
    "bytes_used": 274877906944,
    "bytes_remaining": 824633720832
    // You may add other custom fields in the root object.
  }
  ```

- VMESS [Outbound Object](https://www.v2fly.org/config/outbounds.html#outboundobject)

  ```json
  {
    "sendThrough": "0.0.0.0",
    "protocol": "protocol name",
    "settings": {},
    "tag": "PROXY",
    "streamSettings": {},
    "proxySettings": {
      "tag": "another-outbound-tag",
      "transportLayer": false
    }
  }
  ```

#### 更新

当应用程序启动时，它会根据上次更新时间和更新间隔自动更新订阅组。

对于手动更新，您可以右键单击更新单个组或下拉组列表更新所有组。

![批量更新](/UI/update_groups.png)

## 设置页面

![设置页面](/UI/setting_page.png)

所有设置项都在配置文件中，默认配置文件路径如下：

- UNIX: `~/.config/ACross/across.json`
- Windows: `C:\Users\<UserName>\AppData\Local\ACross\across.json`

### 核心配置

#### 安装

在我们连接到节点之前，我们需要安装和配置核心。

推荐通过系统包管理器安装核心。其他方法可以参考官方教程，并确保安装目录下没有 `config.json` 文件。 [更多...](/FAQ?id=application)

> https://www.v2fly.org/guide/install.html

#### 选择

![core settings](/UI/core_dialog.png)

- 核心路径：你的可执行文件 - `v2ray` / `v2ray.exe`
- Assets 路径: 包含 `geoip.dat` and `geosite.dat` 的文件夹

如果能够按预期找到核心，则相关内容将显示在“核心信息”中。

此外，在测试 API 之前，您应该通过双击“主页”上的节点来启动代理。

### 入站设置

![inbound settings](/UI/inbound_setting.png)

目前我们不提供任何形式的全局或透明代理，这意味着您需要将环境变量或软件内置代理客户端（例如“Telegram Desktop”和您的浏览器）设置到正确的侦听端口。 且这些端口不应被其他应用程序所占用。 [更多...](/FAQ?id=core)

### 应用设置

![application settings](/UI/application_setting.png)

- `数据目录` 包含用于存储节点信息的数据库和日志文件*（如果你将 `日志输出` 设置为 file 或 stdout & file）*。

- `设置 User Agent` 将 [curl](https://curl.se/) 的下载请求伪装成浏览器。如果您不清楚这有什么用意，请默认将其留空。

- `自动连接` 会自动在应用程序运行时启动代理，如果您没有任何可用节点，请先不要打开此选项。

- `启用托盘图标` 需要系统托盘。对于 `GNOME` 用户，我们建议安装 [appindicator 扩展](https://github.com/ubuntu/gnome-shell-extension-appindicator) 并在 `gnome tweaks` 中启用。

- `最小化启动` 允许您在后台启动应用程序，通常与 `自动连接` 一起使用以实现静默代理。如果您没有系统托盘，可以再次单击应用程序图标以显示主窗口。

### 外观设置

![appearance settings](/UI/appearance_setting.png)

一些设置外观项，可以为自己添加背景图片，也可以在配置文件中手动设置配色方案。
