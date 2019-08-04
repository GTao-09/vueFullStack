const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入users.js
const users = require('./routes/api/users.js');
// 引入Profile.js
const profiles = require('./routes/api/profiles.js');

// 数据库地址
const db = 'mongodb://localhost:27017/useradmin';
// 链接数据库
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => {console.log('MongoDB Connected')})
  .catch(err => console.log(err))

// 解决node.js使用mongoose的旧版api弹出的警告
mongoose.set('useFindAndModify', false)

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport 初始化
app.use(passport.initialize());
require("./config/possport")(passport);

app.get("/", (req, res) => {
  res.send("Hello World!");
})

// 使用route
app.use('/api/users', users);
app.use('/api/profiles', profiles)

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}, http://127.0.0.1:${port}`)
})