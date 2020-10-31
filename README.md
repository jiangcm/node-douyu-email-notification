# 斗鱼tv开播提醒(server酱推送)(感谢op8278的node-douyu-email-notification，我只是做了推送方式修改而已= =)
Node.js小脚本,实现每10秒刷新斗鱼tv房间信息,若监听的主播开播,则推送开播提醒到server酱绑定的微信号上

注意: Node.js 版本需要支持 `async/await` 特性,最好`8.0`以上


### 例子
![proto](https://github.com/jiangcm/node-douyu-server-notification/blob/master/screenshots/QQ截图20201031110511.png)
![proto](https://github.com/jiangcm/node-douyu-server-notification/blob/master/screenshots/QQ截图20201031110524.png)

### 配置
需要自己配置 `app.js` 文件：
- `SERVER_SCKEY` ： 你自己的SCKEY
需要自己配置 `config.js` 文件：
- `douyu.roomId` ： 监听的斗鱼房间列表(房间号或别名)
- `delayTime` ：  延迟时间(默认每10秒刷新一次房间信息)

```
### 运行
1. `git clone https://github.com/op8278/node-douyu-email-notification.git`  
2. `cd node-douyu-email-notification`  
3. `npm install`  
4. `node app.js`  
