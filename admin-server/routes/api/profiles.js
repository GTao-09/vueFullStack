const express = require('express');
const router = express.Router();

const passport = require("passport");

const Profile = require("../../models/Profile.js");

// $route GET api/profiles/test 测试
router.get('/test', (req, res) => {
  res.json({ msg: "profile works" })
})

// $route POST api/profiles/add 添加
router.post("/add", passport.authenticate('jwt', { session: false }), (req, res) => { /* 验证token */
  const profileFields = {}
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expenditure) profileFields.expenditure = req.body.expenditure;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.remark) profileFields.remark = req.body.remark;
  
  new Profile(profileFields).save().then(profile => {
    res.json(profile)
  })
})

// $route GET api/profiles  获取所有信息
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => { /* 验证token */
  Profile.find()
    .then(profile => {
      if (!profile) {
        return res.status(404).json("没有任何内容")
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// $route GET api/profiles/:id  获取该id信息
router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => { /* 验证token */
  Profile.findOne({_id: req.params.id})
    .then(profile => {
      if (!profile) {
        return res.status(404).json("没有任何内容")
      }
      res.json(profile)
    })
    .catch(err => {
      res.status(404).json(err)
    })
})

// $route POST api/profiles/edit/:id 编辑信息
router.post("/edit/:id", passport.authenticate('jwt', { session: false }), (req, res) => { /* 验证token */
  const profileFields = {}
  if (req.body.type) profileFields.type = req.body.type;
  if (req.body.describe) profileFields.describe = req.body.describe;
  if (req.body.income) profileFields.income = req.body.income;
  if (req.body.expenditure) profileFields.expenditure = req.body.expenditure;
  if (req.body.cash) profileFields.cash = req.body.cash;
  if (req.body.remark) profileFields.remark = req.body.remark;
  
  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFields},
    {new: true}
  ).then(profile =>{
    res.json(profile)
  })
})

// $route DELETE api/profiles/delete/:id 删除信息
router.delete("/delete/:id", passport.authenticate('jwt', { session: false }), (req, res) => { /* 验证token */
  Profile.findOneAndRemove(
    {_id: req.params.id},
  ).then(profile => {
    profile.save().then(profile => res.json(profile))
  })
})


module.exports = router;