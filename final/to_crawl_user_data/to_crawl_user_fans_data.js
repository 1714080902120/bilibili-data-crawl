const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
const { saveData } = require('../save_to_db')

async function getFollows() {
  try {
    const username = '1466645277'
    const password = 'dan443529931'
    let imgSet = []
    let info = []
    let follows = []
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
    })
    const page = await browser.newPage()
    await page.goto('https://space.bilibili.com/81583053/fans/fans', { waitUntil: 'networkidle2' })
    await page.waitForSelector('#app')
    for (let i = 0; i < 8; i++) {
      await page.waitForSelector('.relation-list li a img')
      imgSet = imgSet.concat(await page.$$eval('.relation-list li a img', el => {
        let a = []
        for (let i = 0; i < el.length; i++) {
          let img = el[i].src
          a.push(img)
        }
        return a;
      }).then(res => {
        return res
      }))
      await page.waitForSelector('.relation-list li .content')
      info = info.concat(await page.$$eval('.relation-list li .content', el => {
        let a = []
        for (let i = 0; i < el.length; i++) {
          let name = el[i].children[0].innerText
          let href = el[i].children[0].href
          let desc = el[i].children[1].innerText
          a.push({
            name,
            desc,
            href
          })
        }
        return a;
      }).then(res => {
        return res
      }))
      if (i !== 9) {
        await page.waitForSelector('.be-pager-next')
        await page.click('.be-pager-next')
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
        await page.waitForSelector('.relation-list li a img')
        await (async function () {
          for (let j = 0; j < 4; j++) {
            await page.waitForSelector('.relation-list li a img')
            for (let i = 0; i < 10; i++) {
              await page.keyboard.press('ArrowDown')
            }
          }
        })();
      }
     
    }

    for (let index = 0; index < imgSet.length; index++) {
      info[index]['img'] = imgSet[index]
    }
    await saveData(info, 'fans')
  } catch (error) {
    console.log(error);
  }

}

getFollows()

