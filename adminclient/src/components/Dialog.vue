<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="margin: 10px;width: auto;"
        >
          <el-form-item label="收支类型" prop="type">
            <el-select v-model="formData.type" placeholder="收支类型" style="width: 100%;">
              <el-option
                v-for="(formtype, index) in formatTypeList"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
           <el-form-item prop="describe" label="收支描述">
            <el-input type="describe" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收入">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item prop="expenditure" label="支出">
            <el-input type="expenditure" v-model="formData.expenditure"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="现金">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button @click="dialog.show=false; resetForm('form')">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialog: Object,
    formData: Object
  },
  data () {
    return {
      formatTypeList: ['提现', '充值', '优惠券'],
      formRules: {
        describe: [
          { required: true, message: '收支描述不能为空', trigger: 'blur' }
        ],
        income: [
          { required: true, message: '收入不能为空', trigger: 'blur' }
        ],
        expenditure: [
          { required: true, message: '支出不能为空', trigger: 'blur' }
        ],
        cash: [
          { required: true, message: '现金不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetForm (form) {
      this.$refs[form].resetFields()
    },
    onSubmit (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // console.log(valid)
          let option = this.dialog.option === 'add' ? 'add' : `edit/${this.formData.id}`
          // console.log(option)
          this.$axios.post(`/api/profiles/${option}`, this.formData)
            .then(res => {
              // 注册成功
              this.$message({
                message: '添加成功!',
                type: 'success'
              })
              // 隐藏dialog
              this.dialog.show = false
              // 让父级重新获取
              this.$emit('updata')
              // 将表单置空
              this.formData.type = ''
              this.formData.type = ''
              this.formData.describe = ''
              this.formData.income = ''
              this.formData.expenditure = ''
              this.formData.cash = ''
              this.formData.remark = ''
              this.formData.id = ''
            })
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
