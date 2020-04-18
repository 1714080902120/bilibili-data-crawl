const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
// 移动端
const devices = require('puppeteer/DeviceDescriptors')

async function crawl() {
  const browser = await puppeteer.launch({
    headless: false,
    // slowMo: 1000,
    executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
  })
  const page = await browser.newPage()
  await page.emulate(devices['iPhone X'])
  // await page.emulate(devices['iPad Pro'])
  await page.goto('https://m.bilibili.com/space/281149281?from=video', { waitUntil: 'networkidle2' })
  await page.waitForSelector('.main')
  await page.$$eval('.main', elements => {
    console.log(elements);

    let a = []
    elements.forEach(e => {
      let aa = []
      a.push(getAllText(e, aa))
    })
    function getAllText(el, arr) {
      if (el.children.length > 0) {
        el.children.forEach(e => {
          getAllText(e, arr)
        })
      } else {
        let obj = {
          src: '',
          innerText: ''
        }
        if (el.src) {
          obj.src = el.src
        }
        obj.innerText = el.parentNode.innerText
        arr.push(obj)
        return ''
      }
      return arr
    }
    console.log(a)
  })

  await page.$$eval('.main', elements => {
    let iT = []
    elements.forEach(e => {
      let obj = {
        type: '',
        ellipsis: e.children[0].innerText
      }
      if (e.children.length > 1) {
        if (e.children[1].className === 'forwardingCard') {
          obj.type = 'forwardingCard'
          let child = e.children[1].children[0].children[1]
          let ellipsis = child.children[0].innerText
          ellipsis = child.children[0].innerText.split('展开')[0]
          if (e.children[1].children[0].children[1].children.length > 0) {
            let img = []
            let detail = []
            let title = ''
            let head = ''
            let className = child.children[1].className
            switch (className) {
              case 'wings':
                if (child.children[1].children[0].className === 'cover cover-img') {
                  let image = child.children[1].children[0].children[0]
                  detail = child.children[1].children[0].children[1].innerText.split('\n\n')
                  title = child.children[1].children[1].innerText.split('\n\n')
                  img.push(image.src)
                } else if (child.children[1].children[0].className === 'text-box card-layout articleBox') {
                  head = child.children[1].children[0].children[0].innerText
                  let image = child.children[1].children[0].children[1]
                  image.children.forEach(ii => {
                    img.push(ii.children[0].src)
                  })
                  detail = child.children[1].children[0].children[2].children[0].innerText.split('\n展开')
                  title = child.children[1].children[0].children[2].children[1].innerText
                }
                break
              case 'imageSet cover-img':
                let image = child.children[1]
                image.children.forEach(i => {
                  img.push(i.children[0].children[1].src)
                })
                break
              case 'imageSingle cover-img wings':
                img.push(child.children[1].children[0].children[1].src)
                break
            }
            obj['main'] = {
              ellipsis,
              inner: {
                head,
                img,
                detail,
                title,
              }
            }
          } else {
            obj['main'] = {
              ellipsis,
              inner: {}
            }
          }
        } else if (e.children[1].className === 'wings') {
          obj.type = 'wings'
          let child = e.children[1]
          let img = []
          let detail = []
          let title = ''
          let head = ''
          if (child.children[0].className === 'cover cover-img') {
            img.push(child.children[0].children[0].src)
            detail = child.children[0].children[1].innerText.split('\n\n')
            title = child.children[1].innerText.split('\n\n')
          } else if (child.children[0].className === 'text-box card-layout articleBox') {
            head = child.children[0].children[0].innerText
            let image = child.children[0].children[1]
            image.children.forEach(i => {
              img.push(i.children[0].src)
            })
            detail = child.children[0].children[2].children[0].innerText.split('\n展开')
            title = child.children[0].children[2].children[1].innerText
          }
          obj['main'] = {
            ellipsis: '',
            inner: {
              head,
              img,
              detail,
              title
            }
          }
        } else if (e.children[1].className === 'imageSet cover-img') {
          obj.type = 'imageSet cover-img'
          let child = e.children[1]
          let img = []
          let detail = []
          let title = ''
          let head = ''
          let image = child
          image.children.forEach(i => {
            img.push(i.children[0].children[1].src)
          })
          obj['main'] = {
            ellipsis: '',
            inner: {
              head,
              img,
              detail,
              title
            }
          }
        } else if (e.children[1].className === 'imageSingle cover-img wings') {
          obj.type = 'imageSingle cover-img wings'
          let child = e.children[1]
          let img = []
          let detail = []
          let title = ''
          let head = ''
          img.push(child.children[0].children[1].src)
          obj['main'] = {
            ellipsis: '',
            inner: {
              head,
              img,
              detail,
              title
            }
          }
        }
        iT.push(obj)
      } else {
        iT.push(obj)
      }
    })
    console.log(iT)
    return iT
  })
  let main = []
  await page.waitForSelector('.main')
  main = await page.$$eval('.main', elements => {
    let iT = []
    elements.forEach(e => {
      let obj = {
        type: '',
        ellipsis: e.children[0].innerText
      }
      if (e.children.length > 1) {
        if (e.children[1].className === 'forwardingCard') {
          obj.type = 'forwardingCard'
          // main
          if (e.children[1].children[0].children[0].className !== 'cardHeader wings') {
            obj.type = 'miss'
            obj['main'] = {
              ellipsis: '',
              inner: {
                head: '',
                img: [],
                detail: ['原动态不见了~'],
                title: '',
              }
            }
          } else {
            let child = e.children[1].children[0].children[1]
            let ellipsis = child.children[0].innerText
            ellipsis = child.children[0].innerText.split('展开')[0]
            if (child.children.length > 1) {
              let img = []
              let detail = []
              let title = ''
              let head = ''
              let className = child.children[1].className
              switch (className) {
                case 'wings':
                  if (child.children[1].children[0].className === 'cover cover-img') {
                    let image = child.children[1].children[0].children[0]
                    detail = child.children[1].children[0].children[1].innerText.split('\n\n')
                    title = child.children[1].children[1].innerText.split('\n\n')
                    img.push(image.src)
                  } else if (child.children[1].children[0].className === 'text-box card-layout articleBox') {
                    head = child.children[1].children[0].children[0].innerText
                    let image = child.children[1].children[0].children[1]
                    img.push(image.children[0].src)
                    detail = child.children[1].children[0].children[2].children[0].innerText.split('\n展开')
                    title = child.children[1].children[0].children[2].children[1].innerText
                  } else if (child.children[1].children[0].className === 'card-layout bangumiBox') {
                    img.push(child.children[1].children[0].children[0].children[0].src)
                    detail = child.children[1].children[0].children[1].innerText.split('\n\n')
                  }
                  break
                case 'imageSet cover-img':
                  let image = child.children[1]
                  image.children.forEach(i => {
                    img.push(i.children[0].children[1].src)
                  })
                  break
                case 'imageSingle cover-img wings':
                  img.push(child.children[1].children[0].children[1].src)
                  break
              }
              obj['main'] = {
                ellipsis,
                inner: {
                  head,
                  img,
                  detail,
                  title,
                }
              }
            } else {
              obj['main'] = {
                ellipsis,
                inner: {}
              }
            }
          }
        } else if (e.children[1].className === 'wings') {
          obj.type = 'wings'
          let child = e.children[1]
          let img = []
          let detail = []
          let title = ''
          let head = ''
          if (child.children[0].className === 'cover cover-img') {
            img.push(child.children[0].children[0].src)
            detail = child.children[0].children[1].innerText.split('\n\n')
            title = child.children[1].innerText.split('\n\n')
          } else if (child.children[0].className === 'text-box card-layout articleBox') {
            head = child.children[0].children[0].innerText
            let image = child.children[0].children[1]
            img.push(image.children[0].src)
            detail = child.children[0].children[2].children[0].innerText.split('\n展开')
            title = child.children[0].children[2].children[1].innerText
          } else if (child.children[0].className === 'card-layout bangumiBox') {
            img.push(child.children[0].children[0].children[0].src)
            detail = child.children[0].children[1].innerText.split('\n\n')
          }
          obj['main'] = {
            ellipsis: '',
            inner: {
              head,
              img,
              detail,
              title
            }
          }

        } else if (e.children[1].className === 'imageSet cover-img') {
          obj.type = 'imageSet cover-img'
          let child = e.children[1]
          let img = []
          let detail = []
          let title = ''
          let head = ''
          let image = child
          image.children.forEach(i => {
            img.push(i.children[0].children[1].src)
          })
          obj['main'] = {
            ellipsis: '',
            inner: {
              head,
              img,
              detail,
              title
            }
          }

        } else if (e.children[1].className === 'imageSingle cover-img wings') {
          obj.type = 'imageSingle cover-img wings'
          let child = e.children[1]
          let img = []
          let detail = []
          let title = ''
          let head = ''
          img.push(child.children[0].children[1].src)
          obj['main'] = {
            ellipsis: '',
            inner: {
              head,
              img,
              detail,
              title
            }
          }
        }
        iT.push(obj)
      } else {
        obj.type = 'text'
        obj['main'] = {
          ellipsis: '',
          inner: {
            head: '',
            img: [],
            detail: [],
            title: '',
          }
        }
        iT.push(obj)
      }
    })
    return iT
  })
  console.log(main)
  
}
crawl()