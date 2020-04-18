const axios = require('axios')
const fs = require('fs')
const cheerio = require('cheerio')
const baseUrl = 'https://www.bilibili.com/video/BV174411V7nq?from=search&seid=12316267087332767103'

// let ws = fs.createWriteStream('./a.m4s')

async function getData (url) {
  let res = await axios.get(url, {
    headers: {
      // "Accept": "*/*",
      // "Accept-Encoding": "*",
      // "Accept-Language": "zh-CN,zh;q=0.9",
      // "Connection": "keep-alive",
      // "Content-Type": "application/octet-stream",
      // "Host": "upos-sz-mirrorcos.bilivideo.com",
      // "If-Range": "5e8061c5-51e243",
      // "Origin": "https://www.bilibili.com",
      // "Range": "bytes=0-",
      // "Referer": "https://www.bilibili.com/video/BV1ZK4y1C7fD?spm_id_from=333.851.b_7265706f7274466972737432.5",
      // "Sec-Fetch-Mode": "cors",
      // "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
    },
    // responseType: "stream"
  })
  // console.log(res.data)

  let reg = new RegExp('https://upos-sz-mirrorkodo.bilivideo.com/upgcxcode/74/71/97167174/97167174_nb2-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1585977087&gen=playurl&os=kodobv&oi=3071360673&trid=96f2f5caa5c74162a18817da4e6d8602u&platform=pc&upsig=84e7826d35621a7e6393633d8833dda1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=81583053&logo=80000000')
  // res.data.pipe(ws)
  // res.data.on('close', () => {
  //   ws.close()
  // })
  console.log(reg.test(res.data))
}

getData(baseUrl)
