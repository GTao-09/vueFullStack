<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 17:11:07
 * @LastEditTime: 2019-08-10 08:43:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="user">
          <img :src="user.avatar || 'http://www.gravatar.com/avatar/00?s=120&d=mm&r=g'" alt="头像" class="avatar">
        </div>
      </el-col>
      <el-col :span="16">
        <div class="userinfo">
          <div class="user-item">
            <i class="iconfont icon-yonghu"></i>
            <span>{{ user.name }}</span>
          </div>
          <div class="user-item">
            <i class="iconfont icon-shezhi"></i>
            <span>{{ user.identity === 'manager' ? '管理员' : '员工' }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 30%;
}
.user img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eeeeee;
}
.user-item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333333;
}
.iconfont {
  font-size: 30px;
  margin-right: 10px;
}
</style>
