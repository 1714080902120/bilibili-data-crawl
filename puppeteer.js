const puppeteer = require('puppeteer-core')
const path = require('path')
const fs = require('fs')
const url = require('url')
async function test () {
  const browser = await puppeteer.launch({
    executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
  })
  // const page = await browser.newPage()
  // await page.setRequestInterception(true)
  // await page.on('request', interceptedRequest => {
  //   let data = {
  //     url: 'https://www.bilibili.com/video/BV174411V7nq?from=search&seid=12316267087332767103',
  //     'method': 'GET'
  //   }
  //   interceptedRequest.continue(data)
  //   console.log(interceptedRequest.method(),'method')//输出GET
  // })
  // let res = await page.goto('https://www.bilibili.com/video/BV174411V7nq?from=search&seid=12316267087332767103')
  // let res = await page.request('https://www.bilibili.com/video/BV174411V7nq?from=search&seid=12316267087332767103')
  // console.log(res)
  const page = await browser.newPage()

  await page.goto("https://www.bilibili.com/video/BV1Kc411h7Qg?t=206", {
      waitUntil: 'networkidle2'
  })
  // await page.on('response', response => {
  //   let reg = /%26/gi
  //   console.log(response)
  // });
  // await page.on('request', res => {
  //   // 获取
  //   console.log(res)
  //   // 获取真正的url
  //   // let arr = res.postData().split('https')
  //   // let a = arr[1]
  //   // let result = unescape('https' + a)
  //   // if (result) {
  //   // browser.close()
  //   // }
  // })
  // await browser.close()
  // await page.setRequestInterception(true)
  let data = []

  await page.reload().then(res => {
  })
  await page.waitForSelector('.bp-svgicon')
  await page.click('.bp-svgicon')
  await page.on('request', req => {
    data.push(unescape(req.postData()))
  })
  setTimeout(() => {
    browser.close()
    fs.writeFile('./a.json', data, () => {})
  }, 10000)
  // await page.on('request', interceptedRequest => {
  //   console.log(interceptedRequest.url())
  //   // if (req.method() == 'GET') {
  //   //   console.log(req.url())
  //   // } else {
  //   //   console.log(req.method())
  //   // }
  //   interceptedRequest.continue()
  // })
  // await page.close()
}

test()