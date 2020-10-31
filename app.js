const nodemailer = require('nodemailer')

const { sleep, getAllDouyuRoomInfoPromise, sendMail } = require('./uti/util.js')
const config = require('./config/config.js')
var request = require('request');

let preStreamState = {} // 主播之前的开播状态
//此处填你申请的server酱的SCKEY.
let SCKEY = 'SERVER_SCKEY';

nodemailer.createTestAccount((err, account) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport(config.transporter)
  // 开启循环监听
  monitor(transporter)
})

// 监听房间状态
async function monitor(transporter) {
  try {
    const resultArray = await getAllDouyuRoomInfoPromise()
    for (let value of resultArray) {
      const { data: { data: roomInfo, error: errorCode } } = value
      // 判断状态
      if (errorCode !== 0 ) {
        throw new Error(roomInfo)
      }
      // 判断是否开播
      // "1" - 开播 , "2" - 未开播
      if (roomInfo.room_status === '1') {
        console.log(`${roomInfo.owner_name} ---- 已经开播 ---- ${roomInfo.start_time}`)
        if (!preStreamState[roomInfo.room_id]) {
          // 推送server酱
          test = '【' + roomInfo.owner_name + '】'
          desp = '【' + roomInfo.owner_name + '】' +  roomInfo.room_name  + '\n\n' + roomInfo.start_time
          request ({
            url: `https://sc.ftqq.com/${SCKEY}.send`,
            method: 'POST',
            body: `text=${test}开播啦！&desp=${desp}`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          })
          preStreamState[roomInfo.room_id] = true
        }
      } else {
        console.log(`${roomInfo.owner_name} ---- 未开播 ---- 上次开播时间 ---- ${roomInfo.start_time}`)
        preStreamState[roomInfo.room_id] = false
      }
    }
  } catch (error) {
    console.log(error)
  } finally {
    // 隔一段时间再请求
    await sleep(config.delayTime)
    return monitor(transporter)
  }
}
