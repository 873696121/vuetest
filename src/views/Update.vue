<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="编号" prop="id">
      <el-input v-model="ruleForm.id" readonly></el-input>
    </el-form-item>
    <el-form-item label="书名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        id: '',
        name: '',
        author: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入书名', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
        ]
      }
    };
  },
  created() {
    const _this = this
    axios.get('http://localhost:8181/book/findById/' + this.$route.query.id).then(function (resp) {
      _this.ruleForm = resp.data
    })
  },
  methods: {
    submitForm(formName) {
      const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put('http://localhost:8181/book/update', this.ruleForm).then(function (resp) {
            if(resp.data == 'success'){
              _this.$notify({
                title: '消息',
                message: '《'+ _this.ruleForm.name + '》修改成功',
                type: 'success'
              });
              _this.$router.push('/BookManage')
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>