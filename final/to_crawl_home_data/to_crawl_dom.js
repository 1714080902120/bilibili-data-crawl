const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-core')
// 移动端
const devices = require('puppeteer/DeviceDescriptors')

// 获取原始数据
async function crawl({ webSite = '', dom = '', headless = false }) {
  // 存放获取到的dom元素
  if (webSite === '' || dom === '') {
    return 'website or dom is empty！'
  }
  const browser = await puppeteer.launch({
    headless,
    executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
  })
  const page = await browser.newPage()
  await page.emulate(devices['iPhone X'])
  // await page.emulate(devices['iPad Pro'])
  await page.goto(webSite, { waitUntil: 'networkidle2' })
  await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
  await page.click('.index__rankingFlow__src-home-rankingFlowNormal-')
  await (async function () {
    for (let j = 0; j < 4; j++) {
      await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowDown')
      }
    }
  })();
  await page.waitForSelector(dom)
  await (async function () {
    for (let j = 0; j < 4; j++) {
      await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowDown')
      }
    }
  })();
  await page.waitForSelector(dom)
  await (async function () {
    for (let j = 0; j < 4; j++) {
      await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowDown')
      }
    }
  })();
  await page.waitForSelector(dom)
  await (async function () {
    for (let j = 0; j < 4; j++) {
      await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowDown')
      }
    }
  })();
  await page.waitForSelector(dom)
  await (async function () {
    for (let j = 0; j < 4; j++) {
      await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowDown')
      }
    }
  })();
  await page.waitForSelector(dom)
  await (async function () {
    for (let j = 0; j < 4; j++) {
      await page.waitForSelector(".index__rankingFlow__src-home-rankingFlowNormal-")
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowDown')
      }
    }
  })();
  await page.waitForSelector(dom)
  return await page.$$eval(dom, (elements) => {
    if (!elements || elements.length <= 0) {
      console.log('website or dom is wrong or no exist!')
      return 'website or dom is wrong or no exist!'
    }
    console.log(elements)
    let list = []
    let reg = /src|href|innerHTML|alt|innerText/gi
    elements.forEach(e => {
      let obj = {}
      for (const key in e) {
        let attr = reg.exec(key)
        if (attr) {
          obj[attr] = e[attr]
        }
      }
      list.push(obj)
    })
    return list
  }).then(data => {
    return data
  })
}

// 下载
async function toDownLoadData({ webSiteList = [], dom = '' }) {
  // 存放获取到的dom元素
  if (webSiteList.length <= 0 || dom === '') {
    return 'website or dom is empty！'
  }
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
  })
  const page = [{}, {}, {}, {}, {}]
  let arr = []
  for (let i = 0; i < webSiteList.length; i++) {
    page[i] = await browser.newPage()
    await page[i].emulate(devices['iPhone X'])
    await page[i].goto(webSiteList[i].href, { waitUntil: 'networkidle2' })
    // if (await page[i].$(dom)) {
    await page[i].waitForSelector(dom)
    arr.push(await page[i].$$eval(dom, (elements) => {
      let reg = /src|href|innerHTML|alt|innerText/gi
      let obj = {}
      elements.forEach(e => {
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
      })
      return obj
    }).then(res => {
      return res
    }))
    // } else {
    //   arr.push({
    //     src: '',
    //     href: '',
    //     alt: '',
    //     innerText: '',
    //     innerHTML: ''
    //   })
    // }
    // 获取视频链接
    arr[i]['video'] = await page[i].$$eval('video source', (elements) => {
      let reg = /src|href|innerHTML|alt|innerText/gi
      let obj = {}
      elements.forEach(e => {
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
      })
      return obj
    }).then(res => {
      return res
    })

    // up主信息
    arr[i]['up'] = await page[i].$$eval('.index__writer__src-videoPage-videoInfo-', (elements) => {
      let a = elements[0].href.split('/')
      let b = a[a.length - 1].split('?')[0]
      let obj = {
        href: elements[0].href,
        mid: b
      }
      return obj
    }).then(res => {
      return res
    })

    // 获取视屏长度
    arr[i]['video']['time'] = await page[i].$$eval('.index__videoTime__src-videoPage-player- p', (elements) => {
      return elements[0].innerHTML
    }).then(res => {
      return res
    })
    // 获取火热度
    arr[i]['hot'] = await page[i].$$eval('.index__actIcon__src-videoPage-videoInfo-', (elements) => {
      let reg = /src|href|innerHTML|alt|innerText/gi
      let obj = {}
      elements.forEach(e => {
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
      })
      return obj
    }).then(res => {
      return res
    })
    // 获取基本信息
    arr[i]['video_info'] = await page[i].$$eval('.index__info__src-videoPage-videoInfo-', (elements) => {
      let reg = /src|href|innerHTML|alt|innerText/gi
      let obj = {}
      elements.forEach(e => {
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
      })
      return obj
    }).then(res => {
      return res
    })
    // 获取评论数量
    arr[i]['assess'] = {}
    arr[i]['assess']['num'] = await page[i].$$eval('.index__comNum__src-videoPage-commentArea-', (elements) => {
      return elements[0].innerHTML
    }).then(res => {
      return res
    })

    // 获取评论者名字和mid
    let nameAndMid = []
    nameAndMid = await page[i].$$eval('.index__upName__src-videoPage-commentArea-', (elements) => {
      let reg = /alt|src|href|innerHTML|innerText/gi
      let a = []
      elements.forEach(e => {
        let obj = {}
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
        a.push(obj)
      })
      return a
    }).then(res => {
      return res
    })
    // logo
    let logo = []
    logo = await page[i].$$eval('.index__imgWrap__src-videoPage-commentArea- img', (elements) => {
      let reg = /alt|src|href|innerHTML|innerText/gi
      let a = []
      elements.forEach(e => {
        let obj = {}
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
        a.push(obj)
      })
      return a
    }).then(res => {
      return res
    })
    // 评论时间
    let time = []
    time = await page[i].$$eval('.index__commentTime__src-videoPage-commentArea-', (elements) => {
      let reg = /alt|src|href|innerHTML|innerText/gi
      let a = []
      elements.forEach(e => {
        let obj = {}
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
        a.push(obj)
      })
      return a
    }).then(res => {
      return res
    })
    // 评论内容
    let content = []
    content = await page[i].$$eval('.index__commentTxt__src-videoPage-commentArea-', (elements) => {
      let reg = /alt|src|href|innerHTML|innerText/gi
      let a = []
      elements.forEach(e => {
        let obj = {}
        for (const key in e) {
          let attr = reg.exec(key)
          if (attr) {
            obj[attr] = e[attr]
          }
        }
        a.push(obj)
      })
      return a
    }).then(res => {
      return res
    })
    let people = []
    for (let i = 0; i < nameAndMid.length; i++) {
      people[i] = {}
      people[i]['name'] = nameAndMid[i].innerHTML
      people[i]['href'] = nameAndMid[i].href
      let mid = nameAndMid[i].href.split('/')
      people[i]['mid'] = mid[mid.length - 1]
      people[i]['logo'] = logo[i].src
      people[i]['time'] = time[i].innerHTML
      people[i]['content'] = content[i].innerHTML
    }
    arr[i].assess['detail'] = people
    // 获取弹幕
    let d = ['666', '握着我的抱枕~', '下次一定', '下次也不一定', '上次给了', '哈哈哈哈哈哈哈哈哈哈哈哈', '太对了哥', '哥太对', 'hahahaha', 'hiahiahia', '?', '???', '?????????', '鸡你太美', '盘他', 'awsl~', '真香', '你好骚啊', '逮虾户', '兄弟们把泪目打在屏幕上', '兄弟们把害怕打在屏幕上', '我酸了', '不过如此.jpg', '？？？？', '??', 'cece， 好快的cece']
    arr[i]['video']['danmaku'] = await (async function (d) {
      let a = []
      for (let index = 0; index < 100 + parseInt(Math.random() * 200); index++) {
        a.push(d[Math.round(Math.random() * (d.length))])
      }
      return a
    })(d)
    await page[i].close()
  }
  await browser.close()
  return await arr
}

// 获取up主信息
async function toGetUpData({ webSiteList = [] }) {
  // 存放获取到的dom元素
  if (webSiteList.length <= 0) {
    return 'website is empty！'
  }
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: path.resolve('C:/Program Files (x86)/Google/Chrome/Application/chrome.exe')
  })
  const page = [{}, {}, {}, {}, {}]
  let arr = []
  for (let i = 0; i < webSiteList.length; i++) {
    page[i] = await browser.newPage()
    await page[i].emulate(devices['iPhone X'])
    await page[i].goto(webSiteList[i].up.href, { waitUntil: 'networkidle2' })
    // 获取up个人信息
    let up_info = {}
    arr[i] = {}
    arr[i]['baseInfo'] = {}
    await page[i].waitForSelector('.list')
    // 打开所有的信息
    await (async function (page) {
      // 背景
      await page.waitForSelector('.m-space-info .banner img')
      arr[i]['baseInfo']['bg'] = up_info['bg'] = await page.$$eval('.m-space-info .banner img', (elements) => {
        return elements[0].src
      }).then(res => {
        return res
      })
      // uplogo
      await page.waitForSelector('.part1 .face img')
      arr[i]['baseInfo']['logo'] = up_info['logo'] = await page.$$eval('.part1 .face img', (elements) => {
        return elements[0].src
      }).then(res => {
        return res
      })
      // 粉丝
      await page.waitForSelector('.fans .num')
      arr[i]['baseInfo']['fans'] = up_info['fans'] = await page.$$eval('.fans .num', (elements) => {
        return elements[0].innerText
      }).then(res => {
        return res
      })
      // 关注
      await page.waitForSelector('.follow .num')
      arr[i]['baseInfo']['follows'] = up_info['follows'] = await page.$$eval('.follow .num', (elements) => {
        return elements[0].innerText
      }).then(res => {
        return res
      })
      // 获赞
      await page.waitForSelector('.likes .num')
      arr[i]['baseInfo']['likes'] = up_info['likes'] = await page.$$eval('.likes .num', (elements) => {
        return elements[0].innerText
      }).then(res => {
        return res
      })
      // 会员
      await page.waitForSelector('.base')
      arr[i]['baseInfo']['vip'] = up_info['vip'] = await page.$$eval('.base', (elements) => {
        let vip = elements[0].innerText.split(' ')
        return vip[vip.length - 1]
      }).then(res => {
        return res
      })
      // up名字
      await page.waitForSelector('.base .name')
      arr[i]['baseInfo']['name'] = up_info['name'] = await page.$$eval('.base .name', (elements) => {
        return elements[0].innerText
      }).then(res => {
        return res
      })
      // 官方标签
      if (await page.$('.official')) {
        arr[i]['baseInfo']['label'] = 'E:/VScode/bilibili/bilibili_data/bilibili_base/icon_Certification_official.png'
      } else {
        arr[i]['baseInfo']['label'] = ''
      }
      // 性别
      if (await page.$('.gender i')) {
        await page.waitForSelector('.gender i')
        arr[i]['baseInfo']['gender'] = up_info['gender'] = await page.$$eval('.gender i', (elements) => {
          let reg = /female/gi
          if (!reg.test(elements[0].className)) {
            return '男'
          } else {
            return '女'
          }
        }).then(res => {
          return res
        })
      }
      // 等级
      await page.waitForSelector('.level i')
      arr[i]['baseInfo']['level'] = up_info['level'] = await page.$$eval('.level i', (elements) => {
        let reg = /[0-9]/gi
        return reg.exec(elements[0].className)
      }).then(res => {
        return res
      })
      // 标识
      if (await page.$('.verify')) {
        await page.waitForSelector('.verify')
        arr[i]['baseInfo']['verify'] = up_info['verify'] = await page.$$eval('.verify', (elements) => {
          let reg = /展开/gi
          if (reg.test(elements[0].innerText)) {
            return elements[0].innerText.split('\n展开')[0]
          } else {
            return elements[0].innerText
          }
        }).then(res => {
          return res
        })
      }
      // 简介
      if (await page.$('.desc')) {
        await page.waitForSelector('.desc')
        arr[i]['baseInfo']['desc'] = up_info['desc'] = await page.$$eval('.desc', (elements) => {
          let reg = /展开/gi
          if (reg.test(elements[0].innerText)) {
            return elements[0].innerText.split('\n展开')[0]
          } else {
            return elements[0].innerText
          }
        }).then(res => {
          return res
        })
      }
      // 标签
      if (await page.$('tags')) {
        await page.waitForSelector('.spread-btn')
        await page.click('.spread-btn')
        await page.waitForSelector('.tags')
        arr[i]['baseInfo']['tags'] = up_info['tags'] = await page.$$eval('.tags', (elements) => {
          return elements[0].innerText.split(' ')
        }).then(res => {
          return res
        })
      }

    })(page[i]);

    // 投稿时间
    let time = []
    await page[i].waitForSelector('.main')
    await page[i].waitForSelector('.main')
    await page[i].waitForSelector('.main')
    await page[i].waitForSelector('.main')
    await page[i].waitForSelector('.main')
    await page[i].waitForSelector('.main')
    await page[i].waitForSelector('.cardHeader .userExtra')
    time = await page[i].$$eval('.cardHeader .userExtra', (elements) => {
      let a = []
      elements.forEach(e => {
        a.push(e.innerText)
      })
      return a
    }).then(res => {
      return res
    })

    // 底部信息
    let footer = []
    await page[i].waitForSelector('.footer')
    footer = await page[i].$$eval('.footer', (elements) => {
      let a = []
      elements.forEach(e => {
        let c = e.innerText.split('\n')
        c = c.filter(n => {
          return n !== false
        })
        let obj = {
          share: c[0],
          assess: c[1],
          likes: c[2]
        }
        a.push(obj)
      })
      return a
    }).then(res => {
      return res
    })
    // 获取主要信息
    let contentType = []
    await page[i].waitForSelector('.main')
    contentType = await page[i].$$eval('.main', (elements) => {
      let a = []
      elements.forEach(e => {
        let reg = /imageSet/gi
        let reg2 = /imageSingle/gi
        let reg3 = /forwardingCard/gi
        if (e.children.length > 1) {
          var childrenClassName = e.children[1].className
          if (reg.test(childrenClassName)) {
            // 多图
            a.push({ type: 'imgSet', className: childrenClassName })
          } else if (reg2.test(childrenClassName)) {
            // 单图
            a.push({ type: 'imgSingle', className: childrenClassName })
          } else if (reg3.test(childrenClassName)) {
            // 内嵌card
            a.push({ type: 'forwardingCard', className: childrenClassName })
          } else if (childrenClassName === 'wings cover-img') {
            // 音频文章
            a.push({ type: 'wings cover-img', className: childrenClassName })
          } else {
            // 视频封面
            a.push({ type: 'video', className: childrenClassName })
          }
        } else {
          // 纯文字
          a.push({ type: 'text', className: childrenClassName })
        }
      })
      return a
    }).then(res => {
      return res
    })
    let main = []
    await page[i].waitForSelector('.main')
    main = await page[i].$$eval('.main', elements => {
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
                      if (image.className === 'cover-img cover') {
                        if (image.children.length > 1) {
                          image.children.forEach(ii => {
                            img.push(ii.children[0].src)
                          })
                        } else {
                          img.push(image.children[0].src)
                        }
                      }
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
                  case 'wings cover-img':
                    img.push(child.children[1].children[0].children[0].children[0].src)
                    detail = child.children[1].children[0].children[1].innerText.split('\n\n')
                  break
                  default :
                    head = ''
                    img = [],
                    detail = [],
                    title = ''
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
                  inner: {
                    head: '',
                    img: [],
                    detail: [],
                    title: '',
                  }
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
                if (image.children.length > 1) {
                  image.children.forEach(ii => {
                    img.push(ii.children[0].src)
                  })
                } else {
                  img.push(image.children[0].src)
                }
              
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
          } else if (e.children[1].className === 'wings cover-img') {
            obj.type = 'wings cover-img'
            let child = e.children[1]
            let img = []
            let detail = []
            let title = ''
            let head = ''
            img.push(child.children[0].children[0].children[0].src)
            detail = child.children[0].children[1].innerText.split('\n\n')
            obj['main'] = {
              ellipsis: '',
              inner: {
                head,
                img,
                detail,
                title
              }
            }
          } else {
            obj.type = 'unknown'
            obj['main'] = {
              ellipsis: '',
              inner: {
                head: '',
                img: [],
                detail: [],
                title: '',
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
    let allItems = []
    for (let r = 0; r < contentType.length; r++) {
      // var obj = {
      //   header: {},
      //   main: {},
      //   footer: {}
      // }
      obj = {
        type: main[r].type,
        header: {
          logo: arr[i].baseInfo.logo,
          name: arr[i].baseInfo.name,
          time: time[r]
        },
        main: main[r],
        footer: footer[r]
      }
      allItems.push(obj)
    }
    arr[i]['cardList'] = allItems
    arr[i].mid = webSiteList[i].up.mid
    arr[i].midHref = webSiteList[i].up.href
    // console.log(contentType.length)
    // console.log(time.length)
    // console.log(footer.length)
    // console.log(main.length)
    // console.log(arr[i].cardList.length)
    // console.log(arr[i])
    await page[i].close()
  }
  await browser.close()
  return await arr
}

module.exports.getDoms = crawl
module.exports.toDownLoadData = toDownLoadData
module.exports.toGetUpData = toGetUpData

