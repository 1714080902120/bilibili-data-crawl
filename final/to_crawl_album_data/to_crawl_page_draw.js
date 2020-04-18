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
    await page.goto('https://h.bilibili.com/ywh/h5/home#/draw', { waitUntil: 'networkidle2' })




    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();
    await page.waitForSelector('.img-container')
    await (async function () {
      for (let j = 0; j < 4; j++) {
        await page.waitForSelector('.img-container')
        for (let i = 0; i < 10; i++) {
          await page.keyboard.press('ArrowDown')
        }
      }
    })();

    await page.waitForSelector('.img-container')
    await page.waitForSelector('.img-container')
    await page.waitForSelector('.img-container')
    await page.waitForSelector('.img-container')
    await page.waitForSelector('.img-container')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('img')
    await page.waitForSelector('.waterfall-item a')
    let link = await page.$$eval('.waterfall-item a', elements => {
      let a = []
      elements.forEach(e => {
        let h = e.href.split('/')
        let obj = {
          mid: h[h.length - 1],
          href: e.href
        }
        a.push(obj)
      })
      return a
    }).then(res => {
      return res
    })

    // 图片
    await page.waitForSelector('.img-container')
    let img = await page.$$eval('.img-container', elements => {
      
      let a = []
      elements.forEach(e => {
        let b = e.style.backgroundImage.split('url("')[1]
        let r = b.split('")')[0]
        a.push(r)
      })
  
      return a
    }).then(res => {
      return res
    })

    // 多P
    // await page.waitForSelector('.counts')
    // let mul = await page.$$eval('.counts', elements => {
      
    //   let a = []
    //   elements.forEach(e => {
    //     a.push(e.innerText)
    //   })
  
    //   return a
    // }).then(res => {
    //   return res
    // })

    // 标题
    await page.waitForSelector('.title')
    let title = await page.$$eval('.title', elements => {
      
      let a = []
      elements.forEach(e => {
        a.push(e.innerText)
      })
  
      return a
    }).then(res => {
      return res
    })


    // logo
    await page.waitForSelector('i img')
    let logo = await page.$$eval('i img', elements => {
      
      let a = []
      elements.forEach(e => {

        a.push(e.src)
      })
  
      return a
    }).then(res => {
      return res
    })

    // name
    await page.waitForSelector('span')
    let name = await page.$$eval('span', elements => {
      
      let a = []
      elements.forEach(e => {

        a.push(e.innerText)
      })
  
      return a
    }).then(res => {
      return res
    })




    let page_draw = []
    for (let i = 0; i < link.length; i++) {
      let location = `E:/VScode/bilibili/bilibili_data/album_data/draw_data/${link[i].mid}/`
      let imgName = `${link[i].mid}_page.png`
      let logoName = `${link[i].mid}_logo.png`
      let obj = {
        link: link[i],
        img: {
          originSrc: img[i],
          name: imgName,
          src: location
        },
        up: {
          logo: {
            originSrc: logo[i],
            name: logoName,
            src: location
          },
          name: name[i]
        },
        title: title[i]
      }

    page_draw.push(obj)
    // await fs.mkdir(location, err => { if (err) console.log(err) })
  }
  console.log(page_draw.length)
  
  page_draw = await page_draw.filter(n => {
    let reg = /http/gi
    return reg.test(n.img.originSrc)
  })
  console.log(page_draw.length)

  for (let i = 0; i < page_draw.length; i++) {
    for (let j = i + 1; j < page_draw.length; j++) {
      if (page_draw[i].link.mid === page_draw[j].link.mid) {
        page_draw.splice(j, 1)
        break
      }
    }
  }
  console.log(page_draw.length)

  for (let i = 0; i < page_draw.length; i++) {
    let location = `E:/VScode/bilibili/bilibili_data/album_data/draw_data/${page_draw[i].link.mid}/`    
    await fs.mkdir(location, err => { if (err) console.log(err) })
  }

  for (let j = 0; j < page_draw.length; j++) {
    let location = `E:/VScode/bilibili/bilibili_data/album_data/draw_data/${page_draw[j].link.mid}/`
    // 下载文件夹
    // await fs.mkdir(location, err => { if (err) console.log(err) })
    // 图片
    await c.queue({
      url: page_draw[j].img.originSrc,
      filename: page_draw[j].img.src + page_draw[j].img.name,
      headers
    })
    // logo
    await c.queue({
      url: page_draw[j].up.logo.originSrc,
      filename: page_draw[j].up.logo.src + page_draw[j].up.logo.name,
      headers
    })
  }
  
  await saveData(page_draw, 'album_draw_data')
  })()
