<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-04 18:51:05
 * @LastEditTime: 2019-08-10 10:37:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="fundlist">
    <div class="fundAdd-container">
      <el-form :inline="true" ref="add-data" :model='search_data'>
        <!-- 筛选 -->
        <el-form-item label="按照时间筛选:">
            <el-date-picker
            v-model="search_data.startTime"
            type="datetime"
            placeholder="选择开始时间"
            >
            </el-date-picker>
            --
            <el-date-picker
            v-model="search_data.endTime"
            type="datetime"
            placeholder="选择结束时间"
            >
            </el-date-picker>
        </el-form-item>
        <el-form-item>
            <el-button type='primary' size="search" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight" v-if="user.identity === 'manager'">
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
      <el-table-column label="操作" width="180" align="center" v-if="user.identity === 'manager'">
        <template slot-scope="scope" >
          <el-button size="mini" icon="edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" icon="delete" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size"
            :layout="paginations.layout"
            :total="paginations.total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
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
      search_data: {
        startTime: '',
        endTime: ''
      },
      paginations: {
        page_index: 1, // 当前位于多少页
        total: 0, // 总数
        page_size: 5, // 一页显示多少条
        page_sizes: [5, 10, 15], // 每页显示多少条
        layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
      },
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
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    getProgile () {
      // 获取表格数据
      this.$axios
        .get('/api/profiles')
        .then(res => {
          // console.log(res)
          this.allTableData = res.data
          this.filterTableData = res.data // 筛选后的数据
          // 设置分页数据
          this.setPaginations()
        })
        .catch(err => console.log(err))
    },
    handleEdit (index, row) { // 编辑按钮
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
    handleDelete (index, row) { // 删除按钮
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
    handleAdd () { // 增加按钮
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
    },
    setPaginations () { // 设置分页数据
      // 分页属性设置
      this.paginations.total = this.allTableData.length
      this.paginations.page_index = 1
      this.paginations.page_size = 5
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleSizeChange (page_size) { // 切换size
      this.paginations.page_index = 1
      this.paginations.page_size = page_size
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size
      })
    },
    handleCurrentChange (page) { // 切换数据页
      // 获取当前页
      let index = this.paginations.page_size * (page - 1)
      // 数据总数
      let nums = this.paginations.page_size * page
      // 容器
      let tables = []
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables
      }
    },
    handleSearch () { // 筛选按钮
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: 'warning',
          message: '请选择时间区间'
        })
        this.getProgile()
        return
      }
      let sTime = this.search_data.startTime.getTime()
      let eTime = this.search_data.endTime.getTime()
      console.log(sTime)
      console.log(eTime)
      this.allTableData = this.tableData.filter(item => {
        let date = new Date(item.data)
        let time = date.getTime()
        console.log(time)
        return time >= sTime && time <= eTime
      })
      this.setPaginations()
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
  margin-right: 30px;
}
.pagination{
  text-align: right;
  margin-top: 10px;
  margin-right: 20px;
}
</style>
