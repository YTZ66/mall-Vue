<template>
  <div>
    <el-form :rules="rules"
             v-loading="loading"
             element-loading-text="正在登陆"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
             ref="loginForm"
             :model="loginForm"
             class="loginContainer">
      <h3 class="loginTitle">商城登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-autocomplete="false" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-autocomplete="false" v-model="loginForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-autocomplete="false" v-model="loginForm.code" placeholder="点击图片更换验证码"
                  style="width: 250px;margin-right: 5px"></el-input>
        <img :src="captchaUrl" alt="" @click="updateCaptcha">
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住密码</el-checkbox>
      <router-link style="margin-left: 20px;color: dodgerblue;text-decoration: none" :to="{path:'/register'}">注册
      </router-link>
      <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import {getRequest} from "../utils/api";

export default {
  name: "Login",
  data() {
    return {
      captchaUrl: '/captcha?time=' + new Date(),
      loginForm: {
        username: 'admin',
        password: '123',
        code: '',
      },
      loading: false,
      checked: true,
      //这里面的数据不是从loginForm来的，是从prop=“”来的，prop是用来传值的
      rules: {                                       //失去焦点后触发
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    updateCaptcha() {
      //获取验证码图片路径
      this.captchaUrl = '/captcha?time=' + new Date();
    },
    submitLogin() {
      //表单提交验证
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest('/login', this.loginForm).then(resp => {
            if (resp) {
              this.loading = false;
              //存储token
              const tokenStr = resp.obj.tokenHead + resp.obj.token;
              //存储user
              const user = resp.obj.user;
              //将token存到session中
              window.sessionStorage.setItem('tokenStr', tokenStr);
              //将user存储到session中
              window.sessionStorage.setItem('user', JSON.stringify(user));
              let path = this.$route.query.redirect;
              //判断是否登录成功
              this.$router.replace((path === '/' || path === undefined) ? '/home' : path);
              //跳转页面
              this.$router.replace('/home');
            } else {
              this.loading = false;
            }
          });
        } else {
          this.$message.error('请输入所有字段！');
          return false;
        }
      })
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 0 auto 40px;
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}
</style>