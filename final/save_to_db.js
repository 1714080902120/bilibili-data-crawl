// 最新用法
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost';
// Database Name
const dbName = 'bilibili';
// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
// Use connect method to connect to the Server
let db = null

client.connect(async function(err) {
  assert.equal(null, err)
  console.log("Connected successfully to server")
  db = await client.db(dbName)
})

module.exports.saveData =  async function (data = [], clt = '') {
  if ((typeof(data) === Array && data.length <= 0) || clt === '') {
    console.log('data or collection is empty!')
    return 'data or collection is empty!'
  }

  const collection = await db.collection(clt)
  await collection.insertMany(data)
}

module.exports.updateData = async function (clt = '', bvid = '', data = {}) {
  if (bvid === '' || clt === '' || Object.keys(data).length <= 0) {
    console.log('clt or bvid or data is empty!')
    return false
  }
  const connection = db.collection(clt)
  await connection.updateMany({ bvid }, {
    $set: data
  }, err => {
    console.log(err)
    console.log('失败')

  })
}

module.exports.getData = async function (clt = '' ,skip = 0, limit = 5) {
  if (clt === '') {
    console.log('clt is empty!')
    return false
  }
  return (async function () {
    const collection = await db.collection(clt)
    var data = []
    await collection.find({}).skip(skip).limit(limit).toArray((err, docs) => {
      assert.equal(err, null);
      console.log("Found the following records");
      data.push(docs)
    })
    return await data
  })()
}