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
    await page.goto('https://live.bilibili.com/h5/', { waitUntil: 'networkidle2' })



    await page.waitForSelector('.live-main')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.live-main')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.live-main')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.live-main')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.live-main')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.live-main')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.live-main')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.live-main')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.live-main')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.live-main')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();


    await page.waitForSelector('.live-main')
    await page.waitForSelector('.live-main')


    // 获取直播类型 
    await page.waitForSelector('.title-row')
    let type = await page.$$eval('.title-row', elements => {
      let a = []
      elements.forEach(e => {
        let text = e.innerText.split('\n')
        let href = e.children[1].children[0].href
        let obj = {
          name: text[0],
          for_more: href
        }
        a.push(obj)
      })
      return a
    })



    // 获取直播内容
    let content = await (async function () {
      // 获取轮播图
      await page.waitForSelector('.swipe-wrap a')
      let swipe = await page.$$eval('.swipe-wrap a', elements => {
        let a = []
        for (let i = 0; i < elements.length; i++) {
          let obj = {
            href: elements[i].href,
            src: elements[i].children[0].src
          }
          a.push(obj)
        }
        return a
      })      

      // 获取封面
      await page.waitForSelector('.cover img')
      let img = await page.$$eval('.cover img', elements => {
        let a = []
        let b = []
        for (let i = 0; i < elements.length; i++) {
          if ((i + 1) % 4 === 0) {
            b.push(elements[i].src)
            a.push(b)
            b = []
          } else {
            b.push(elements[i].src)
          }
        }
        return a
      })
      
      // 获取up和观看人数
      await page.waitForSelector('.cover')
      let detail = await page.$$eval('.cover', elements => {
        let a = []
        let b = []
        for (let i = 0; i < elements.length; i++) {
          let c = elements[i].innerText.split('\n')
          let obj = {
            up: c[0],
            watches: c[1]
          }
          if ((i + 1) % 4 === 0) {
            b.push(obj)
            a.push(b)
            b = []
          } else {
            b.push(obj)
          }
        }
        return a
      })

      // 获取直播链接
      await page.waitForSelector('.block-ctnr a')
      let link = await page.$$eval('.block-ctnr a', elements => {
        let a = []
        let b = []
        for (let i = 0; i < elements.length; i++) {
          let c = elements[i].href.split('/')
          let live_id = c[c.length - 1]
          let obj = {
            live_id,
            href: elements[i].href
          }
          if ((i + 1) % 4 === 0) {
            b.push(obj)
            a.push(b)
            b = []
          } else {
            b.push(obj)
          }
        }
        return a
      })

      // 获取标题
      await page.waitForSelector('.title-container')
      let title = await page.$$eval('.title-container', elements => {
        let a = []
        let b = []
        for (let i = 0; i < elements.length; i++) {
          if ((i + 1) % 4 === 0) {
            b.push(elements[i].innerText)
            a.push(b)
            b = []
          } else {
            b.push(elements[i].innerText)
          }
        }
        return a
      })

      // 获取全部直播和全部分类
      await page.waitForSelector('.main-bottom a')
      let footer = await page.$$eval('.main-bottom a', elements => {
        let a = []
        
        for (let i = 0; i < elements.length; i++) {
          let obj = {
            type: elements[i].innerText,
            href: elements[i].href
          }
          a.push(obj)
        }
        return a
      })

      console.log(img)
      console.log(detail)
      console.log(link)
      console.log(title)
      console.log(footer)
      return {
        swipe,
        img,
        detail,
        link,
        title,
        footer
      }

    })();

    // 下载并获取保存数据库
    // 分批处理


    // 第一步：先处理轮播图的数据
    // let Swipe = []
    // for (let s = 0; s < content.swipe.length; s++) {
    //   let location = `E:/VScode/bilibili/bilibili_data/live_data/swipe/`
    //   let imgName = `${s}_swipe.png`
    //   await c.queue({
    //     url: content.swipe[s].src,
    //     filename: location + imgName,
    //     headers
    //   })
    //   let obj = {
    //     href: content.swipe[s].href,
    //     originSrc: content.swipe[s].src,
    //     name: imgName,
    //     src: location
    //   }
    //   Swipe.push(obj)
    // }
    // await saveData(Swipe, 'live_swipe')


    // 将末尾的数据放入数据库
    // await saveData(content.footer, 'live_footer')
    

    // 第二步：处理下载文件夹
    let arr = []
    for (let i = 0; i < type.length; i++) {
      let location = `E:/VScode/bilibili/bilibili_data/live_data/recommend/${type[i].name}/`
      let obj = {}

      // 类型
      obj['type'] = type[i]
      let list = []

      // 下载文件夹
      // await fs.mkdir(location, err => { if (err) console.log(err) })
    

      // 下载图片及文件所在的文件夹
      for (let j = 0; j < content.link[i].length; j++) {
        let itemLocation = `E:/VScode/bilibili/bilibili_data/live_data/recommend/${type[i].name}/${content.link[i][j].live_id}/`
        let imgName = `${content.link[i][j].live_id}.png` 
        // 文件夹
        await fs.mkdir(itemLocation, err => { if (err) console.log(err) })
        
        // 下载图片
        await c.queue({
          url: content.img[i][j],
          filename: itemLocation + imgName,
          headers
        })

        let o = {
          live_id: content.link[i][j].live_id,
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
    await saveData(arr, 'live_data')

  })()
