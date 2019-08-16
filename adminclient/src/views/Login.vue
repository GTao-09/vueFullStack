<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-03 22:53:41
 * @LastEditTime: 2019-08-10 10:37:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login">
    <div class="login-title">
      <span>XX公司管理系统</span>
      <span class="login-title-english">XX&nbsp;Company&nbsp;management&nbsp;system</span>
    </div>
    <div class="login-copyright">
      <span>&copy;2020XX公司</span>
    </div>
    <div class="loginForm">
      <p class="login-form-title">密码登陆</p>
      <el-form
        :model="loginUser"
        :rules="rules"
        ref="loginForm"
        label-width="20%"
        class="loginform"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="loginUser.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <div class="other-password">
          <span class="registered-password">
            还没有账号点击<router-link to="/registered">注册账号</router-link>
          </span>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')" class="btnsubmit">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入解析token
import jwtDecode from 'jwt-decode'
export default {
  data () {
    return {
      loginUser: {
        email: '',
        password: ''

      },
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur']
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (loginForm) {
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          // console.log(this.loginUser)
          // alert('submit!')
          this.$axios.post('/api/users/login', this.loginUser)
            .then(res => {
              // console.log(res)
              // token
              const { token } = res.data
              // 存储到localStorage
              localStorage.setItem('eleToken', token)
              // 解析token
              const decoded = jwtDecode(token)
              // console.log(decoded)
              // token存储到vuex中
              this.$store.dispatch('setAuthenticated', !this.isEmpty(decoded)) /* setAuthenticated判断是否授权 */
              this.$store.dispatch('setUser', decoded)

              this.$router.push({ path: '/index' })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isEmpty (value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
      )
    }
  }
}
</script>

<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg.png");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.login-title {
  width: 40%;
  height: 20%;
  /* background-color: white; */
  position: absolute;
  left: 5%;
  top: 20%;
  font-size: 5vw;
  color: #ffffff;
  text-shadow: -3px 2px 5px rgba(0, 0, 0, 0.6);
}
.login-title-english {
  font-size: 2.2vw;
}
.login-copyright {
  width: 15%;
  height: 3%;
  /* background-color: white; */
  position: absolute;
  left: 5%;
  bottom: 18%;
  font-size: 1.3vw;
  color: #ffffff;
}
.loginForm {
  width: 35%;
  background-color: #ffffff;
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
}
.login-form-title {
  text-align: center;
  color: #999999;
  font-size: 3vw;
  margin-top: 5.5%;
  margin-bottom: 2%;
}
.loginform {
  padding-top: 5%;
  padding-right: 5%;
}
.btnsubmit {
  margin-bottom: 5%;
  width: 100%;
}
.other-password {
  margin-left: 50%;
  margin-bottom: 10%;
  margin-top: 9%;
}
</style>
