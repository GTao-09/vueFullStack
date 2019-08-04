<template>
  <div class="registered">
    <p class="registered-title">XX公司管理系统</p>
    <div class="registeredform">
      <router-link to="/login" tag="div" class="registered-back">
         <i class="el-icon-arrow-left">返回登陆</i>
      </router-link>
      <el-form
        :model="registeredUser"
        :rules="rules"
        ref="registeredForm"
        label-width="20%"
        class="registeredForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registeredUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registeredUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="registeredUser.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="registeredUser.checkPass"
            autocomplete="off"
            placeholder="请确认密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
          <el-select v-model="registeredUser.identity" class="selectform" placeholder="请选择身份">
            <el-option label="管理者" value="manager"></el-option>
            <el-option label="员工" value="employee"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registeredForm')" class="btnsubmit">注册</el-button>
          <el-button @click="resetForm('registeredForm')" class="btnreset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    // 密码验证规则
    var validatePass = (rule, value, callback) => {
      if (!value.trim()) {
        callback(new Error('请输入密码,且密码不能为空格'))
      } else {
        if (this.registeredUser.checkPass !== '') {
          this.$refs.registeredForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registeredUser.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registeredUser: {
        name: '',
        email: '',
        password: '',
        checkPass: '',
        identity: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur']
          }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, message: '最少6位', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        identity: [{ required: true, message: '必须选择身份', trigger: 'change' }]
      }
    }
  },
  methods: {
    resetForm (registeredForm) {
      this.$refs[registeredForm].resetFields()
    },
    submitForm (registeredForm) {
      this.$refs[registeredForm].validate((valid) => {
        if (valid) {
          // console.log(this.registeredUser)
          // alert('submit!')
          this.$axios.post('/api/users/register', this.registeredUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: '账号注册成功!',
                type: 'success'
              })
              // 跳到登陆页
              this.$router.push('/login')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.registered {
  width: 100%;
  height: 100%;
  background-image: url("../assets/bg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.registered-title {
  width: 100%;
  text-align: center;
  font-size: 5vw;
  color: ghostwhite;
  padding-top: 5%;
}
.registered-back {

}
.el-icon-arrow-left {
  margin-top: 5%;
  font-size: 1.5vw;
  color: #999999;
  cursor: pointer;
}
.registeredform {
  width: 40%;
  margin: 0 auto;
  background-color: white;
  margin-top: 3%;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.6) 0 0 10px;
}
.registeredForm {
  padding-top: 5%;
  padding-right: 5%;
}
.btnsubmit {
  margin-bottom: 5%;
  width: 50%;
}
.btnreset {
  width: 40%;
}
.selectform {
  width: 100%;
}
</style>
