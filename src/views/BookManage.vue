<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="name"
          label="书名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="author"
          label="作者"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="dele(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="pageSize"
        @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    dele(row){
      const _this = this
      axios.delete('http://localhost:8181/book/deleteById/' + row.id).then(function (resp) {
        _this.$alert('删除《' + row.name + '》成功', '消息', {
          confirmButtonText: '确定',
          callback: action => {
            window.location.reload()
          }
        });
      })
    },
    edit(row) {
      this.$router.push({
        path: '/Update',
        query: {
          id : row.id
        }
      })
    },
    page(currentPage){
      const _this = this
      axios.get("http://localhost:8181/book/findAll/" + currentPage + "/6").then(function (resp){
        _this.tableData = resp.data.content
        _this.total = resp.data.totalElements
        _this.pageSize = resp.data.size
      })
    }
  },

  created() {
    const _this = this
    axios.get('http://localhost:8181/book/findAll/1/6').then(function (resp){
      _this.tableData = resp.data.content
      _this.total = resp.data.totalElements
      _this.pageSize = resp.data.size
    })
  },

  data() {
    return {
      total: null,
      tableData: null,
      pageSize: null
    }
  }
}
</script>