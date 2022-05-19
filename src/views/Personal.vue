<template>
  <div>
    <!-- 个人中心 -->
    <div>
      <el-form class="personal">
        <div>
          <h1 style="text-align: center;">个人中心</h1>
        </div>
        <div>
          <el-upload
              action="/user/avatar"
              :headers="header"
              :data="userInformation"
              :show-file-list="false"
              :on-success="onSuccess">
            <img title="点击更换头像" class="img" :src="getPath(userInformation.avatar)" alt=""/>
          </el-upload>
        </div>
        <div>
          <h3>用户昵称：</h3>
          <el-input
              :disabled="true"
              v-model="userInformation.name"
              style="width: 350px;"
          />
        </div>
        <div>
          <h3>用户账号：</h3>
          <el-input
              :disabled="true"
              v-model="userInformation.username"
              style="width: 350px;"
          />
        </div>
        <div>
          <h3>性&#12288;&#12288;别：</h3>
          <div>
            <el-radio v-model="userInformation.gender" :label="1" disabled>男</el-radio>
            <el-radio v-model="userInformation.gender" :label="2" disabled>女</el-radio>
          </div>
        </div>
        <div>
          <h3>电话号码：</h3>
          <el-input
              :disabled="true"
              v-model="userInformation.phone"
              style="width: 350px;"
          />
        </div>
        <div>
          <el-button style="width: 100%;margin-top: 10px" type="primary" @click="dialogVisible = true">编辑资料</el-button>
        </div>
        <div>
          <revise></revise>
        </div>
        <!-- 返回home界面 -->
        <div style="margin-top: 5px">
          <router-link :to="{path:'/home'}">返回主界面</router-link>
        </div>
      </el-form>
    </div>
    <!-- 编辑资料 -->
    <div>
      <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="35%">
        <div>
          <el-form>
            <div>
              <h3 style="margin-top: 40px;text-align: center">用户昵称</h3>
              <el-input
                  v-model="user.name"
                  placeholder="请输入"
                  style="width: 100%;"
              />
            </div>
            <div>
              <h3 style="text-align: center">性&#12288;&#12288;别</h3>
              <div>
                <el-radio v-model="userInformation.gender" :label="1">男</el-radio>
                <el-radio v-model="userInformation.gender" :label="2">女</el-radio>
              </div>
            </div>
            <div>
              <h3 style="text-align: center">电话号码</h3>
              <el-input
                  v-model="user.phone"
                  placeholder="请输入"
                  style="width: 100%;"
              />
            </div>
          </el-form>
        </div>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitMaterial">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import revise from '../views/revise/Revise'
import {getRequest, putRequest} from "../utils/api";

export default {
  name: "Personal",
  components: {
    revise
  },
  data() {
    return {
      userInformation: null,
      user: JSON.parse(window.sessionStorage.getItem('user')),
      dialogVisible: false,
      title: '编辑资料',
      //获取请求头
      header: {
        Authorization: window.sessionStorage.getItem('tokenStr')
      }
    }
  },
  mounted() {
    this.initUserInformation();
  },
  methods: {
    getPath(path) {
      return path ? require('C:/project/hotel/avatar/' + path) : '';
    },
    //刷新界面头像
    onSuccess() {
      this.initUserInformation();
    },
    //根据id查询个人信息
    initUserInformation() {
      getRequest('/user/selectById?id=' + this.user.id).then(resp => {
        if (resp) {
          this.userInformation = resp;
          this.user = this.userInformation;
          window.sessionStorage.setItem('user',JSON.stringify(this.userInformation));
          console.log(this.userInformation.gender);
        }
      })
    },
    //修改个人信息
    submitMaterial() {
      this.$confirm('确定修改资料？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dialogVisible = false;
        putRequest('/changeUser', this.user).then(resp => {
          if (resp) {
            this.user = resp;
            //修改成功后重新设置session里面的user信息
            window.sessionStorage.setItem('user', JSON.stringify(resp));
            this.message = '修改成功';
          }
        })
      });
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

.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
  margin-left: 150px;
}
</style>