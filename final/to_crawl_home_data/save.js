var crawler = require("crawler")
var fs = require('fs')
const { saveData, updateData } = require('./save_to_db')
module.exports.download = async function (
  oldObjList,
  newObjList) {
  const headers = {
    "Content-Range": "bytes=0-xxxxxxxxx",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
  }
  try {
    let arr = []
    for (let i = 0; i < oldObjList.length; i++) {
      const location = `E:/VScode/bilibili/bilibili_data/home/recommend_2/${oldObjList[i].bvid}/`
      const photoName = `${oldObjList[i].bvid}.png`
      const videoName = `${oldObjList[i].bvid}.mp4`
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
      let obj = {}
      // await fs.mkdir(location, (err) => { console.log(err) })
      await (async function () {
        let feel = []
        for (let j = 0; j < 4; j++) {
          let ram = parseInt(Math.random() * 100000 - j)
          ram = ram < 10000 ? ram : `${Math.round((ram / 100000))}万`
          feel.push(ram)
        }
        let arr = newObjList[i].video_info.innerText.split('\n')
        let detail = newObjList[i].assess.detail
        detail.forEach(e => {
          e['src'] = `E:/VScode/bilibili/bilibili_data/home/recommend_2/${oldObjList[i].bvid}/assess/${e.mid}/`,
            e['name'] = `${e.mid}.png`
        })
        obj = {
          bvid: oldObjList[i].bvid,
          title: oldObjList[i].title,
          video_href: oldObjList[i].href,
          plays: oldObjList[i].playNum,
          danmaku: oldObjList[i].danmaku,
          img: {
            src: location,
            name: photoName,
            alt: oldObjList[i].title,
            originSrc: newObjList[i].src
          },
          video: {
            src: location,
            name: videoName,
            originSrc: newObjList[i].video.src,
            long: newObjList[i].video.time,
            label: newObjList[i].hot.innerText,
            danmaku: newObjList[i].video.danmaku,
            people_feel: {
              like: feel[0],
              disLike: 0,
              coins: feel[1],
              collect: feel[2],
              share: feel[3]
            },
            info: {
              up: arr[0],
              plays: arr[1],
              danmaku: arr[2],
              time: arr[3]
            }
          },
          up: {
            href: newObjList[i].up.href,
            mid: newObjList[i].up.mid,
          },
          assess: {
            num: newObjList[i].assess.num,
            detail: detail
          }
        }
      })()
      arr.push(obj)
      // 下载图片
      await c.queue({
        url: newObjList[i].src,
        filename: location + photoName,//写入文件名 默认在根目录
        headers
      })

      // 下载视频
      await c.queue({
        url: newObjList[i].video.src,
        filename: location + videoName,//写入文件名 默认在根目录
        headers
      })
    }
    await saveData(arr, 'home_recommend_2')
  } catch (error) {
    console.log(error)
  }
}

// 下载视频讨论用户图片
module.exports.downloadSec = async function (o, n) {
  const headers = {
    "Content-Range": "bytes=0-xxxxxxxxx",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
  }
  try {
    let array = []
    for (let i = 0; i < o.length; i++) {
      let up_data = {}
      let mid = o[i].up.mid
      let location = `E:/VScode/bilibili/bilibili_data/up_data/${mid}/`
      let bgName = `${mid}_bg.png`
      let logoName = `${mid}_logo.png`
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
      // up_data = {
      //   identy: {
      //     uuid: n[i].mid,
      //     uuid_href: n[i].midHref
      //   },
      //   baseInfo: {
      //     bg: {
      //       name: bgName,
      //       src: location,
      //       href: n[i].baseInfo.bg
      //     },
      //     logo: {
      //       name: logoName,
      //       src: location,
      //       href: n[i].baseInfo.logo
      //     },
      //     name: n[i].baseInfo.name,
      //     level: n[i].baseInfo.level[0],
      //     label: n[i].baseInfo.label,
      //     desc: n[i].baseInfo.desc,
      //     vip: n[i].baseInfo.vip,
      //     fans_follows_likes: {
      //       fans: n[i].baseInfo.fans,
      //       follows: n[i].baseInfo.follows,
      //       likes: n[i].baseInfo.likes
      //     }
      //   }
      // }
      // // 下载up主背景图
      // await c.queue({
      //   url: n[i].baseInfo.bg,
      //   filename: location + bgName,
      //   headers
      // })
      // // 下载up主头橡
      // await c.queue({
      //   url: n[i].baseInfo.logo,
      //   filename: location + logoName,
      //   headers
      // })
      // await fs.mkdir(`E:/VScode/bilibili/bilibili_data/up_data/${mid}/list`, err => console.log(err))
      // let list = []
        for (let j = 0; j < n[i].cardList.length; j++) {
          let itemLocation = `E:/VScode/bilibili/bilibili_data/up_data/${mid}/list/${j}/`
          // await fs.mkdir(itemLocation, (err) => { if (err) console.log(err) })
          let item = n[i].cardList[j].main.main
          // if (!item.inner.img.length === 0) {
          //   console.log(i, j)
          //   console.log(n[i].cardList[j].inner)
          // }


          // // 动态头
          // let obj = n[i].cardList[j]
          // obj.header['logo'] = {
          //   name: logoName,
          //   src: location,
          //   href: n[i].baseInfo.logo
          // }
          // obj.header['name'] = n[i].baseInfo.name



          // let a = obj.main
          // let final_img = a.main.inner.img



          if (item.inner.img.length > 0) {
            // final_img = []
            for (let l = 0; l < item.inner.img.length; l++) {

              let img = item.inner.img[l].split('.')
              let type = 'png'
              if (img[img.length - 1] === 'gif') {
                type = 'gif'
              }
              let imgName = `img_${l}.${type}`
              // 下载图片
              await c.queue({
                url: item.inner.img[l],
                filename: itemLocation + imgName,
                headers
              })

              // final_img.push({
              //   src: itemLocation,
              //   href: item.inner.img[l],
              //   name: imgName
              // })

            }
          }
          // obj.main = {
          //   type: a.type,
          //   ellipsis: a.ellipsis,
          //   content: {
          //     ellipsis: a.ellipsis,
          //     inner: {
          //       head: a.main.inner.head,
          //       img: final_img,
          //       detail: a.main.inner.detail,
          //       title: a.main.inner.title,
          //     }
          //   }
          // }
          // list.push(obj)
        }
        // up_data['cardList'] = list
        // array.push(up_data)
    }
    // await saveData(array, 'up_data')
  } catch (error) {
    console.log(error)
  }
}


