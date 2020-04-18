var crawler = require("crawler") 
var fs = require('fs')

async function crawl (elements = [], downloadPath = '') {
  let opts = {}
  const c = await new crawler({
    encoding: null,
    jQuery:false,// set false to suppress warning message.
    callback:function(err, res, done){
      if(err){
          console.error(err.stack)
      }else{
          //将爬取好的文件通过fs模块写入文件
          fs.createWriteStream(res.options.filename).write(res.body) 
      }
      done()
    }
  })
  if (downloadPath === '' || (typeof(elements) === Array && elements.length <= 0) || !elements) {
    console.log('下载地址为空或者DOM集合为空')
    return false
  }
  elements.forEach(e => {
    for (const key in e) {
      switch (key) {
        case 'src':
          let reg = /m4s/gi
          if (reg.test(e[key] !== -1)) {
            opts = {
              url: e[key],
              filename: `${downloadPath}/${e.bvid}`
            }
          } else {

          }
          break
        case 'href':
          break
        default:

          break
      }
    }
  })
}


c.queue({
    url: 'https://i0.hdslb.com/bfs/archive/ea009f2fa8ae7e97e0534da3ec89d9da40a4e0e3.png@480w_300h.webp',
    filename:"./1231.png",
    headers:{
      // "Accept": "*/*",
      // "Accept-Encoding": "*",
      // "Accept-Language": "zh-CN,zh;q=0.9",
      // "Connection": "keep-alive",
      // "Content-Type": "application/octet-stream",
      // "Host": "upos-sz-mirrorcos.bilivideo.com",
      // "If-Range": "5e8061c5-51e243",
      // "Origin": "https://www.bilibili.com",
      "Content-Range": "bytes=0-xxxxxxxxx",
      // "Referer": 'https://m.bilibili.com/video/BV1Ya4y1t7fw?spm_id_from=333.400.b_766964656f5f30.1',
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
    }//让服务端伪装成客户端
}) 

module.exports.donwload = crawl