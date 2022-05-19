<template>
  <div>
    <div>
      <el-button style="width: 100%;margin-top: 10px" type="primary" @click="dialogVisible = true">修改密码</el-button>
    </div>
    <!-- 修改密码弹框 -->
    <div>
      <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="50%">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                   label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户昵称" prop="name">
              <el-input type="title" v-model="user.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="请输入旧密码" prop="oldPassword">
              <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请确认新密码" prop="checkPassword">
              <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
export default {
  name: "Revise",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      user: JSON.parse(window.sessionStorage.getItem('user')),
      dialogVisible: false,
      title: '修改密码',
      ruleForm: {
        userId: null,
        oldPassword: '', //旧密码
        newPassword: '', //新密码
        checkPassword: '' //确认新密码
      },
      rules: {
        oldPassword: [
          {validator: validatePass, trigger: 'blur'}
        ],
        newPassword: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //提交修改密码
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.userId = this.user.id;
          this.dialogVisible = false;
          this.putRequest('/revise', this.ruleForm).then(resp => {
            if (resp) {
              //修改成功后退出登录
              this.postRequest('/logout');
              //清空session存放的user和token
              window.sessionStorage.removeItem('user');
              window.sessionStorage.removeItem('token');
              //跳转到登录页
              this.$router.replace('/');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>

</style>