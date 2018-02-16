/**************************************************
 为了演示 Vuex 的 Action，我们需要创建一个接口
 我把命令放到了 package.json 的 script 中
 使用 npm run dev 即可启动这个后台服务
**************************************************/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

// 允许跨域的中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next()
})
// 处理 post 请求
app.use(bodyParser.json());

let count = [1, 2, 3];

router.route('/count')
  .get((req, res) => {
    res.send({
      count
    })
  })
  .post((req, res) => {
    count.push(Number(req.body.number));
    res.status(201).send({
      message: 'ok'
    })
  })
  .delete((req, res) => {
    count.pop();
    res.status(200).send({
      message: 'ok'
    })
  })

app.use('/api', router);

app.listen(8080, () => {
  console.log('http://localhost:8080');
})
