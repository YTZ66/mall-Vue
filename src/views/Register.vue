<template>
  <div>
    <div class="personal">
      <h2 style="text-align: center">注册账号</h2>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm" style="margin-top: 50px">
        <!-- 上传头像 -->
        <el-form-item prop="avatar">
          <el-upload
              ref="uploadimg"
              class="avatar-uploader"
              action="/user/register"
              :data="ruleForm"
              :auto-upload="false"
              :show-file-list="false"
              :headers="header"
              :on-change="handleChange"
              :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar"
                 alt="">
            <img title="点击上传头像" v-else src="../img/moren.jpg" alt="" class="imgs">
          </el-upload>
        </el-form-item>
        <!-- 用户账号 -->
        <el-form-item style="margin-top: 50px" label="用户账号" prop="username">
          <el-input placeholder="请输入账号" type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item label="请输入密码" prop="password">
          <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <!-- 再次输入密码 -->
        <el-form-item label="请输入密码" prop="checkPassword">
          <el-input placeholder="请再此输入密码" type="password" v-model="ruleForm.checkPassword"></el-input>
        </el-form-item>
        <!-- 用户昵称 -->
        <el-form-item label="用户昵称" prop="name">
          <el-input placeholder="请输入昵称" type="title" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <!-- 用户性别 -->
        <el-form-item label="性别" prop="gender">
          <div>
            <el-radio v-model="ruleForm.gender" :label="1">男</el-radio>
            <el-radio v-model="ruleForm.gender" :label="2">女</el-radio>
          </div>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item label="电话号码" prop="phone">
          <el-input placeholder="请输入电话号码" type="title" v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <!-- 提交|重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        avatar: '',//头像
        username: '', //用户名
        password: '', //密码
        name: '', //昵称
        gender: null, //性别
        phone: '', //电话
        checkPassword: '' //再此输入密码
      },
      //获取请求头
      header: {
        Authorization: window.sessionStorage.getItem('tokenStr')
      },
      rules: {
        username: [
          {required: true, message: '请输入用户账号', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在3到5个字符直接', trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPassword: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入用户昵称', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在3到5个字符直接', trigger: 'blur'}
        ],
        gender: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请规范输入手机号', trigger: 'blur'}
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    //文件状态改变执行，实现表单提交前图片预览功能
    handleChange(file, fileList) {
      console.log(fileList);
      this.ruleForm.avatar = URL.createObjectURL(file.raw);
    },
    //文件上传前执行，把值变为true，当值为false时停止上传
    beforeAvatarUpload(file) {
      console.log(file);
      return true;
    },
    //提交事件
    submitForm(forName) {
      this.$refs[forName].validate((valid) => {
        if (valid) {
          this.getRequest('/user/selectByUsername?username=' + this.ruleForm.username ).then(resp =>{
            if(resp.length === 0){
              this.$refs.uploadimg.submit();
              this.$alert('请点击返回登录界面', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.replace('/');
                }
              });
            }else{
              console.log(resp);
              this.$message("该账号已存在，请重新输入！");
            }
          })
        } else {
          console.log("提交失败！");
          return false
        }
      })
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style>
.personal {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.avatar-uploader .imgs {
  border: 1px dashed #d9d9d9;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 40px;
}

.avatar-uploader .imgs:hover {
  border-color: #409EFF;
}

.imgs {
  width: 70px;
  height: 70px;
}

.avatar {
  width: 70px;
  height: 70px;
  display: block;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 40px;
}
</style>