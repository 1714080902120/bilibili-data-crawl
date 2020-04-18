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
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  insertData(db)
  // client.close();
});
async function insertData (db) {
  const collection = await db.collection('user')
  await collection.insertMany([
    {
      mid: 81583053 ,
      phonen: 13798510901,
      logo: 'E:/VScode/bilibili/bilibili_data/user_data/logo.jpg',
      sername: '坏蛋Dan丶',
      desc: '我只做我想做的东西，我也不会在乎你喜不喜欢，就这样。',
      sex: '男',
      age: 22,
      fans: 131,
      follows: 81,
      praises: 655,
      videos: []
    }
  ])
}


// let schema = new mongoose.Schema({
  // mid: { type: Number, default: 81583053 },
  // phonen: { type: Number, default: '13798510901' },
  // logo: { type: String, default: 'E:/VScode/bilibili/bilibili_data/user_data/logo.jpg' },
  // sername: { type: String, default: '坏蛋Dan丶' },
  // desc: { type: String, default: '我只做我想做的东西，我也不会在乎你喜不喜欢，就这样。' },
  // sex: { type: String, default: '男' },
  // age: { type: Number, default: 22 },
  // fans: { type: Number, default: 131 },
  // follows: { type: Number, default: 81 },
  // praises: { type: Number, default: 655 },
  // videos: { type: Array, default: [] }
// })

// var User = new mongoose.model('user', schema)
