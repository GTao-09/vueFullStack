<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 14:59:52
 * @LastEditTime: 2019-08-10 08:42:01
 * @LastEditors: Please set LastEditors
 -->
<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="6" class="logo-container">
        <img src="../assets/logo.png" alt="logo" class="logo" />
        <span class="title">XX公司在线后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <img
            :src="user.avatar || 'http://www.gravatar.com/avatar/00?s=120&d=mm&r=g'"
            alt="头像"
            class="avatar"
          />
          <div class="welcome">
            <p class="name comenname">欢迎</p>
            <p class="name avatarname">{{ user.name }}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    setDialogInfo (cmdItem) {
      switch (cmdItem) {
        case 'info':
          this.showIndoList()
          break
        case 'logout':
          this.logout()
          break
      }
    },
    showIndoList () {
      this.$router.push('/infoshow')
    },
    logout () {
      // 清除token
      localStorage.removeItem('eleToken')
      this.$store.dispatch('clearCurrentState')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #ffffff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
  /* background-color: white; */
}
.logo {
  height: 50px;
  width: 50px;
  margin-right: 5px;
  vertical-align: middle;
}
.title {
  vertical-align: middle;
  font-size: 22px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
}
.welcome {
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
  /* background-color: black; */
  display: inline-block;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>
