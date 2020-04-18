var crawler = require("crawler");
var fs = require('fs')
var c = new crawler({
    encoding: null,
    jQuery:false,// set false to suppress warning message.
    callback:function(err, res, done){
        if(err){
            console.error(err.stack);
        }else{
            //将爬取好的文件通过fs模块写入文件
            fs.createWriteStream(res.options.filename).write(res.body);
        }
        done();
    }
});

//绝大多数网站，都有反爬机制。只有小众网站没有。所以我们需要使用以下配置
//浏览器可以下载，但是服务端爬虫无效。反爬：检测你这个请求是通过浏览器发出来，还是服务端（解决方案：让服务端伪装成浏览器来发这个请求）
c.queue({
    // url: 'https://upos-sz-mirrorkodo.bilivideo.com/upgcxcode/74/71/97167174/97167174_nb2-1-30080.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1585977087&gen=playurl&os=kodobv&oi=3071360673&trid=96f2f5caa5c74162a18817da4e6d8602u&platform=pc&upsig=84e7826d35621a7e6393633d8833dda1&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=81583053&logo=80000000',
    // url:"http://upos-sz-mirrorks3.bilivideo.com/upgcxcode/82/14/67461482/67461482-1-6.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1585970817&gen=playurl&os=ks3bv&oi=3071360673&trid=b38770b4a0ee4d348ba36db61bc59a96h&platform=html5&upsig=b252bdc15b948cb171a1543ad9508854&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&logo=80000000",
    // url: 'https://upos-sz-mirrorcos.bilivideo.com/upgcxcode/09/21/172812109/172812109-1-16.mp4?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfq9rVEuxTEnE8L5F6VnEsSTx0vkX8fqJeYTj_lta53NCM=&uipk=5&nbs=1&deadline=1586099069&gen=playurl&os=cosbv&oi=3071360446&trid=1a90a971cba8450cb5024b326ca2c699h&platform=html5&upsig=10e6438a60e61ccd5b781ef89e8c6906&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,platform&mid=0&logo=80000000',
    url: 'data:image/png;base64,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',
    filename:"./11111.png",//写入文件名 默认在根目录
    headers:{
      // "Accept": "*/*",
      // "Accept-Encoding": "*",
      // "Accept-Language": "zh-CN,zh;q=0.9",
      // "Connection": "keep-alive",
      // "Content-Type": "application/octet-stream",
      // "Host": "upos-sz-mirrorcos.bilivideo.com",
      // "If-Range": "5e8061c5-51e243",
      // "Origin": "https://www.bilibili.com",
      "Content-Range": "bytes=0-xxxxxxxxx",
      // "Referer": 'https://m.bilibili.com/video/BV1Ya4y1t7fw?spm_id_from=333.400.b_766964656f5f30.1',
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36"
    }//让服务端伪装成客户端
});

