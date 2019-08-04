<template>
  <div class="fundlist">
    <div class="fundAdd-container">
      <el-form :inline="true" ref="add-data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
    <el-table v-if="tableData.length" :data="tableData" style="width: 100%" max-height="450" border>
      <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
      <el-table-column label="创建时间" width="250" prop="data" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.data }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
      <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
      <el-table-column prop="income" label="收入" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#00d053">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="expenditure" label="支出" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.expenditure }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cash" label="账户现金" align="center" width="170">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <Dialog :dialog="dialog" :formData="formData" @updata='getProgile'></Dialog>
  </div>
</template>

<script>
import Dialog from '../components/Dialog.vue'
export default {
  components: {
    Dialog
  },
  data () {
    return {
      tableData: [],
      dialog: {
        show: false,
        title: '',
        option: 'edit'
      },
      formData: {
        type: '',
        describe: '',
        income: '',
        expenditure: '',
        cash: '',
        remark: '',
        id: ''
      }
    }
  },
  mounted () {
    this.getProgile()
  },
  methods: {
    getProgile () {
      // 获取表格数据
      this.$axios
        .get('/api/profiles')
        .then(res => {
          // console.log(res)
          this.tableData = res.data
        })
        .catch(err => console.log(err))
    },
    handleEdit (index, row) {
      // 编辑
      // console.log(this.dialog)
      this.dialog = {
        show: true,
        title: '修改资金信息',
        option: 'edit'
      }
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expenditure: row.expenditure,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      }
    },
    handleDelete (index, row) {
      if (window.confirm('你确定删除吗?')) {
        this.$axios.delete(`/api/profiles/delete/${row._id}`)
          .then(res => {
            this.$message({
              message: '删除成功!',
              type: 'success'
            })
            this.getProgile()
          })
      }
    },
    handleAdd () {
      this.dialog = {
        show: true,
        title: '添加资金信息',
        option: 'add'
      }
      this.formData = {
        type: '',
        describe: '',
        income: '',
        expenditure: '',
        cash: '',
        remark: '',
        id: ''
      }
    }
  }
}
</script>

<style scoped>
.fundlist {
  width: 100%;
  height: 100%;
  padding: 16px;
}
.btnRight {
  float: right;
}
</style>
