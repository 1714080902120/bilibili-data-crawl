const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
// 移动端
const devices = require('puppeteer/DeviceDescriptors')
let crawler = require('crawler')
const { saveData } = require('../save_to_db')

  ; (async function () {


    const headers = {
      "Content-Range": "bytes=0-xxxxxxxxx",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
    }
    let c = await new crawler({
      encoding: null,
      jQuery: false,
      callback: function (err, res, done) {
        if (err) {
          console.error(err.stack)
        } else {
          fs.createWriteStream(res.options.filename).write(res.body)
        }
        done()
      }
    })
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
    })
    const page = await browser.newPage()
    await page.emulate(devices['iPhone X'])
    // await page.emulate(devices['iPad Pro'])
    await page.goto('https://m.bilibili.com/channel/177', { waitUntil: 'networkidle2' })



    await page.waitForSelector('.fl-box')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.fl-box')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.fl-box')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.fl-box')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.fl-box')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.fl-box')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.fl-box')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.fl-box')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.fl-box')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.fl-box')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();

    await page.waitForSelector('.fl-box')
    await page.waitForSelector('.fl-box')


    // 获取类型 
    await page.waitForSelector('.video-list-bar')
    let type = await page.$$eval('.video-list-bar', elements => {
      let a = []
      elements.forEach(e => {
        let text = e.innerText.split('\n')
        let href = e.children[1].href
        let obj = {
          name: text[0],
          for_more: href
        }
        a.push(obj)
      })
      return a
    })

    console.log(type)

    // 获取内容
    let content = await (async function () {

      // 获取封面
      await page.waitForSelector('.card img')
      let img = await page.$$eval('.card img', elements => {
        let a = []
        let b = []
        let num = 0
        for (let i = 0; i < elements.length; i++) {
          if (num < 3) {
            if ((i + 1) % 4 === 0) {
              num += 1
              b.push(elements[i].src)
              a.push(b)
              b = []
            } else {
              b.push(elements[i].src)
            }
          } else if (num === 3) {
            if ((i + 1) % 14 === 0) {
              num += 1
              b.push(elements[i].src)
              a.push(b)
              b = []
            } else {
              b.push(elements[i].src)
            }
          } else {
            if ((i + 3) % 4 === 0) {
              num += 1
              b.push(elements[i].src)
              a.push(b)
              b = []
            } else {
              b.push(elements[i].src)
            }
          }
        }
        return a
      })

      // 获取播放量和弹幕量
      await page.waitForSelector('.count')
      let detail = await page.$$eval('.count', elements => {
        let a = []
        let b = []
        let num = 0
        for (let i = 0; i < elements.length; i++) {
          let c = elements[i].innerText.split('\n')
          let obj = {
            watches: c[0],
            danmaku: c[1]
          }
          if (num < 3) {
            if ((i + 1) % 4 === 0) {
              num += 1
              b.push(obj)
              a.push(b)
              b = []
            } else {
              b.push(obj)
            }
          } else if (num === 3) {
            if ((i + 1) % 14 === 0) {
              num += 1
              b.push(obj)
              a.push(b)
              b = []
            } else {
              b.push(obj)
            }
          } else {
            if ((i + 3) % 4 === 0) {
              num += 1
              b.push(obj)
              a.push(b)
              b = []
            } else {
              b.push(obj)
            }
          }
        }
        return a
      })

      // 获取动漫链接
      await page.waitForSelector('.card-box a')
      let link = await page.$$eval('.card-box a', elements => {
        let a = []
        let b = []
        let num = 0
        for (let i = 0; i < elements.length; i++) {
          let c = elements[i].href.split('/')
          let bvid = c[c.length - 1]
          let obj = {
            bvid,
            href: elements[i].href
          }
          if (num < 3) {
            if ((i + 1) % 4 === 0) {
              num += 1
              b.push(obj)
              a.push(b)
              b = []
            } else {
              b.push(obj)
            }
          } else if (num === 3) {
            if ((i + 1) % 14 === 0) {
              num += 1
              b.push(obj)
              a.push(b)
              b = []
            } else {
              b.push(obj)
            }
          } else {
            if ((i + 3) % 4 === 0) {
              num += 1
              b.push(obj)
              a.push(b)
              b = []
            } else {
              b.push(obj)
            }
          }
        }
        return a
      })

      // 获取标题
      await page.waitForSelector('.v-card .title')
      let title = await page.$$eval('.v-card .title', elements => {
        let a = []
        let b = []
        let num = 0
        for (let i = 0; i < elements.length; i++) {
          if (num < 3) {
            if ((i + 1) % 4 === 0) {
              num += 1
              b.push(elements[i].innerText)
              a.push(b)
              b = []
            } else {
              b.push(elements[i].innerText)
            }
          } else if (num === 3) {
            if ((i + 1) % 14 === 0) {
              num += 1
              b.push(elements[i].innerText)
              a.push(b)
              b = []
            } else {
              b.push(elements[i].innerText)
            }
          } else {
            if ((i + 3) % 4 === 0) {
              num += 1
              b.push(elements[i].innerText)
              a.push(b)
              b = []
            } else {
              b.push(elements[i].innerText)
            }
          }
        }
        return a
      })

      console.log(img)
      console.log(detail)
      console.log(link)
      console.log(title)
      return {
        img,
        detail,
        link,
        title
      }

    })();

    // 下载并获取保存数据库
    // 分批处理


    // 第一步：处理下载文件夹
    let arr = []
    for (let i = 0; i < type.length; i++) {
      let location = `E:/VScode/bilibili/bilibili_data/documentary_data/${type[i].name}/`
      let obj = {}

      // 类型
      obj['type'] = type[i]
      let list = []

      // 下载文件夹
      // await fs.mkdir(location, err => { if (err) console.log(err) })


      // 下载图片及文件所在的文件夹
      for (let j = 0; j < content.link[i].length; j++) {
        let itemLocation = `E:/VScode/bilibili/bilibili_data/documentary_data/${type[i].name}/${content.link[i][j].bvid}/`
        let imgName = `${content.link[i][j].bvid}.png` 
        // 文件夹
        await fs.mkdir(itemLocation, err => { if (err) console.log(err) })

        // 下载图片
        await c.queue({
          url: content.img[i][j],
          filename: itemLocation + imgName,
          headers
        })

        let o = {
          live_id: content.link[i][j].bvid,
          img: {
            src: itemLocation,
            name: imgName,
            originSrc: content.img[i][j]
          },
          link: content.link[i][j],
          detail: content.detail[i][j],
          title: content.title[i][j]
        }
        list.push(o)
      }
      obj['list'] = list
      arr.push(obj)
    }
    await saveData(arr, 'documentary_data')

  })()
