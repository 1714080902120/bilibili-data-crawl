let crawler = require('crawler')
const { saveData, getData } = require('../../save_to_db')
let { toGetData } = require('./to_crawl_detail_draw')

// 先分批获取数据
  ; (async function () {
    for (let i = 0; i < 19; i++) {
      setTimeout(() => {
        getData('album_take_data', i * 5, 5).then(data => {
          setTimeout(() => {
            (async function () { 
              await toGetData({
                webSiteList: data[0]
              })
            })()
          }, 500)
        })
      }, 1000 + ((i) * 30000))
    }
  })()