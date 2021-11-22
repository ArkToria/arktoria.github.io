# User Interface

## Home Page

![Home Page](/UI/home_page.png)

### Local Group and Nodes

- Create Local Group

![Create local group](/UI/create_local_group.png)

Enter the group name and you can pre-fill the node list in `base64` format here, or leave it blank.

- Edit Local Group

Right Click on the group item card and toggle the `Edit` action.

![Edit group](/UI/edit_group.png)

### Subscription Group

- Create Subscription Group

![Create Subscription group](/UI/create_subscription_group.png)

The subscription content type should be one of the following three: `Base64`, `SIP008`, and `JSON Outbound`. If you are not sure, enter the subscription link in your browser to compare with the following scheme.

#### Subscription Type

- Base64: Typically, it looks like `vmess://` | `ss://` | `trojan://`

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

#### Update

When the application launches, it will automatically update the subscription groups according to the last updated time and update intervals.

For manual updates, you can right-click to update a single group or drop-down group list to update all groups.

![update groups](/UI/update_groups.png)

## Setting Page

![setting page](/UI/setting_page.png)

All setting are in the configuration file, the default configuration file path is as follows:

- UNIX: `~/.config/ACross/across.json`
- Windows: `C:\Users\<UserName>\AppData\Local\ACross\across.json`

### Core Settings

#### Install

Before we connect to the nodes, we need to install and configure the core.

It's recommended to install the core via preferred package manager. As for other methods, you can refer to the official tutorial and make sure that there is no `config.json` file in your installation directory. [More...](/FAQ?id=application)

> https://www.v2fly.org/guide/install.html

#### Select

![core settings](/UI/core_dialog.png)

- Core Path: the path of your executable file - `v2ray` / `v2ray.exe`
- Assets Path: File directory containing `geoip.dat` and `geosite.dat`

If the core is found as expected, the core information will be displayed in "Core info".

Also, before you test the API, you should start the proxy node by double-clicking the item card on the `HomePage`.

### Inbound Settings

![inbound settings](/UI/inbound_setting.png)

Currently, we do not provide any form of a global or transparent proxy, which means you need the set the environment variables or software built-in proxy client, such as `Telegram Desktop` and your browser, to the correct listening port. These ports should not be occupied by other applications. [More...](/FAQ?id=core)

### Application Settings

![application settings](/UI/application_setting.png)

- The `Data directory` contains the database for storing node information and log files _(if you set the `Log Outputs` to file or both stdout and file)_.

- The `User Agent` is set to disguise the download behavior of the browser for [curl](https://curl.se/) downloader. If you don't know what it means, please leave it blank by default.

- `Auto Connect` will automatically start the proxy when the app starts, if you don't have any available nodes, please don't open this option yet.

- `Tray Icon` requires the system tray. or `GNOME` users, we recommend installing an [appindicator extensions](https://github.com/ubuntu/gnome-shell-extension-appindicator) and switch on `gnome tweaks`.

- `Minimize Startup` allows you to start the application in background, usually enabled along with `Auto Connect` to make for quiet proxy. If you don't have the system tray, click the application icon again to show the main window.

### Appearance Settings

![appearance settings](/UI/appearance_setting.png)

Some options for setting the appearance, you can add a background image for yourself, or manually set the color schemes in the configuration file.
