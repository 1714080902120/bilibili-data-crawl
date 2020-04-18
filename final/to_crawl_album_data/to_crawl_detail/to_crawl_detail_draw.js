const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
// 移动端
const devices = require('puppeteer/DeviceDescriptors')
let crawler = require('crawler')
const { saveData, getData } = require('../../save_to_db')



module.exports.toGetData = async function toGetData({ webSiteList = [] }) {



  // 获取数据
  if (!webSiteList || webSiteList.length <= 0) {
    return 'websiteList are empty！'
  }

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
  })

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

  // 单独一页
  const page = [{}, {}, {}, {}, {}]


  // 存放数据 放在数据库的数组
  let arr = []
  // 循环处理
  for (let i = 0; i < webSiteList.length; i++) {

    // 下载路径
    let location = `${webSiteList[i].img.src}/detail/`

    // 产生页面
    page[i] = await browser.newPage()
    await page[i].emulate(devices['iPhone X'])

    // 打开对应网页
    await page[i].goto(webSiteList[i].link.href, { waitUntil: 'networkidle2' })


    // 下载文件夹
    await fs.mkdir(location, err => { if (err) console.log(err) })



    // 获取up主信息
    let up_info = await (async function () {

      // logo
      await page[i].waitForSelector('.user-area .user-head')
      let logo = await page[i].$$eval('.user-area .user-head', (elements) => {
        let b = elements[0].style.backgroundImage.split('url("')[1]
        let r = b.split('")')[0]
        let reg = /https/i
        if (reg.test(r)) {
          return r
        } else {
          return `https:${r}`
        }
      })

      // name
      await page[i].waitForSelector('.user-area .user-name')
      let name = await page[i].$$eval('.user-area .user-name', (elements) => {
        return elements[0].innerText
      })

      // time
      await page[i].waitForSelector('.user-area .publish-desc')
      let publish = await page[i].$$eval('.user-area .publish-desc', (elements) => {
        return elements[0].innerText
      })

      return {
        logo,
        name,
        publish
      }

    })()

    // 获取图片及介绍
    let content = await (async function () {

      // logo
      await page[i].waitForSelector('.main ul li')
      let img = await page[i].$$eval('.main ul li', (elements) => {
        let a = []
        elements.forEach(e => {
          let b = e.style.backgroundImage.split('url("')[1]
          let r = b.split('")')[0]
          let reg = /https/i
          if (reg.test(r)) {
            a.push(r)
          } else {
            a.push(`https:${r}`)
          }
        })
        return a
      })

      // desc
      await page[i].waitForSelector('.content')
      let desc = await page[i].$$eval('.content', (elements) => {
        return elements[0].innerText
      })

      return {
        desc,
        img
      }

    })()

    // 获取评论信息
    let assess = await (async function () {

      // share_comment_likes
      await page[i].waitForSelector('.bottom-section .top-bar')
      let top_bar = await page[i].$$eval('.bottom-section .top-bar', (elements) => {
        let a = []
        elements[0].children.forEach(e => {
          a.push(e.innerText)
        })
        return a
      })

      // assess-item
      let items = await (async function () {

        let item = []
        // logo
        if (await page[i].$('.comment-item')) {
          await page[i].waitForSelector('.comment-item .user-head')
          let logo = await page[i].$$eval('.comment-item .user-head', (elements) => {
            let a = []
            elements.forEach(e => {
              let b = e.style.backgroundImage.split('url("')[1]
              let r = b.split('")')[0]
              let reg = /https/i
              if (reg.test(r)) {
                a.push(r)
              } else {
                a.push(`https:${r}`)
              }
            })
            return a
          })
  
          // name
          await page[i].waitForSelector('.comment-item .name')
          let name = await page[i].$$eval('.comment-item .name', (elements) => {
            let a = []
            elements.forEach(e => {
              a.push(e.innerText)
            })
            return a
          })
  
          // time
          await page[i].waitForSelector('.comment-item .time')
          let time = await page[i].$$eval('.comment-item .time', (elements) => {
            let a = []
            elements.forEach(e => {
              a.push(e.innerText)
            })
            return a
          })
  
          // content
          await page[i].waitForSelector('.comment-item .content')
          let content = await page[i].$$eval('.comment-item .content', (elements) => {
            let a = []
            elements.forEach(e => {
              a.push(e.innerText)
            })
            return a
          })
  
          // praise
          await page[i].waitForSelector('.comment-item .praise-num')
          let praise = await page[i].$$eval('.comment-item .praise-num', (elements) => {
            let a = []
            elements.forEach(e => {
              a.push(e.innerText)
            })
            return a
          })
  
  
          for (let i = 0; i < logo.length; i++) {
            let obj = {
              logo: {
                originSrc: logo[i],
                name: `${i}_assess.png`,
                src: location
              },
              name: name[i],
              time: time[i],
              content: content[i],
              praise: praise[i]
            }
  
            // 下载评论头像
            await c.queue({
              url: logo[i],
              filename: location + `${i}_assess.png`,
              headers
            })
  
            item.push(obj)
          }
        }

        return item

      })()


      return {
        top_bar,
        items
      }

    })()


    // 修改下content img的属性
    for (let i = 0; i < content.img.length; i++) {

      let obj = {
        originSrc: content.img[i],
        name: `${i}_content.png`,
        src: location
      }

      // 下载图片内容
      await c.queue({
        url: content.img[i],
        filename: location + `${i}_content.png`,
        headers
      })

      content.img[i] = obj
    }

    // 下载

    let upLogoName = `up.png`

    // 下载up的logo
    await c.queue({
      url: up_info.logo,
      filename: location + upLogoName,
      headers
    })

    let obj = {
      mid: webSiteList[i].link.mid,
      up_info: {
        logo: {
          originSrc: up_info.logo,
          name: upLogoName,
          src: location
        },
        name: up_info.name,
        publish: up_info.publish
      },
      content,
      assess
    }



    arr.push(obj)
    await page[i].close()
  }
  await browser.close()
  // console.log(arr)

  await saveData(arr, 'album_detail_take_data')
}