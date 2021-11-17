# User Intreface

## Home Page

![Home Page](/UI/home_page.png)

### Local Group and Nodes

- Create Local Group

![Create local group](/UI/create_local_group.png)

Enter the group name and you can pre-fill the node list in `base64` format here, or leave it blank.

### Subscription Group

- Create Subscription Group

![Create Subscription group](/UI/create_subscription_group.png)

The subscription content type should be one of the following three: `Base64`, `SIP008` and `JSON Outbound`. If you are not sure, enter the subscription link in your browser to compare with the following scheme.

#### Subscription Type

- Base64: Generally looks like `vmess://`|`ss://`|`trojan://`

  - VMESS: `vmess://<base64EncodeJson>`

  ```json

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

When the application starts, it will automatically update the subscription groups according to the last update time and update cycle.

For manual update, you can right-click to update a single group or drop-down group list to update all groups.

![update groups](/UI/update_groups.png)