const { getDoms } = require('./to_crawl_dom')
const fs = require('fs')

// 保存原始数据到数据库
module.exports.homeMainData = async function () {
  let face, final
  face = []
  img = []
  playNum = []
  danmaku = []
  title = []
  final = []
  // href
  await getDoms({
    webSite: 'https://m.bilibili.com/index.html',
    dom: '.report-scroll-module a',
    headless: false
  }).then(res => {
    face = res
    face.forEach((e, i) => {
      let b = e.href.split('/')
      let bvid = b[b.length - 1]
      let arr = e.innerText.split('\n\n')
      getData(e, bvid, arr)
    })

  })

  // 处理数据
  async function getData(e, bvid, arr) {
    let savePath = `E:/VScode/bilibili/bilibili_data/home/recommend/${bvid}/`
    // let imgName = `E:/VScode/bilibili/bilibili_data/home/recommend/${bvid}/${bvid}.png`
    // 创建文件夹
    await fs.exists(savePath, exists => {
      if (exists === false) {
        fs.mkdir(savePath, err => {
          return new Error(err)
        })
      }
    })
    
    // 存放在数据库里的数据
    let obj = {
      title: arr[2],
      bvid,
      href: e.href,
      playNum: arr[0],
      danmaku: arr[1],
      imgOriginSrc: '',
      src: savePath,
      imgName: '',
      alt: '',
      videoName: '',
      videoOriginSrc: ''
    }
    final.push(obj)
  }
  return final
}