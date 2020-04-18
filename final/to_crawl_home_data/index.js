const { getDoms, toDownLoadData, toGetUpData } = require('./to_crawl_dom')
const fs = require('fs')
var crawler = require("crawler")
const { saveData, getData } = require('../save_to_db')
const { homeMainData } = require('../to_save_video_page')
const { download, downloadSec, upData } = require('../save')
  // 获取首页初步数据 该数据在后边会废弃
  // 第一步
  // homeMainData().then(res => {
  //   saveData(res, 'home_recommends_2')
  // })
  
  // 获取详细信息和下载视频及图片
  // 第二步
  // ; (async function () {
  //   for (let i = 0; i < 20; i++) {
  //     setTimeout(() => {
  //       getData('home_recommends_2', i * 5, 5).then(data => {
  //         setTimeout(() => {
  //           (async function () {
  //             await toDownLoadData({
  //               webSiteList: data[0],
  //               dom: '.player-box img'
  //             })
  //               .then(res => {
  //                 // console.log(res)
  //                 download(data[0], res)
  //               })
  //           })()
  //         }, 500)
  //       })
  //     }, 3000 + ((i) * 40000))
  //   }
  // })()

  // // 获取up主信息
  // 第三步
  ; (async function () {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        getData('home_recommend_2', i * 5, 5).then(data => {
          setTimeout(() => {
            (async function () {
              await toGetUpData({
                webSiteList: data[0]
              })
                .then(res => {
                  // console.log(res)
                  downloadSec(data[0], res)
                })
            })()
            // downloadSec(data[0])
          }, 500)
        })
      }, 3000 + ((i) * 40000))
    }
  })()
  