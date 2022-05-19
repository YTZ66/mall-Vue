<template>
  <div>
    <el-header class="homeHeader">
      <div class="title">
        商城
      </div>
      <div>
        <router-link :to="{path:'/cart'}" style="text-decoration:none">
          <el-link style="margin-right: 20px" icon="el-icon-shopping-cart-2" type="info">购物车</el-link>
        </router-link>
        <router-link :to="{path:'/personal'}" style="text-decoration:none">
          <el-link style="margin-right: 20px" icon="el-icon-s-custom" type="info">个人中心</el-link>
        </router-link>
        <el-link style="text-decoration:none" type="info" icon="el-icon-switch-button"
                 @click="logout">注销登录
        </el-link>
      </div>
    </el-header>
  </div>
</template>

<script>
export default {
  name: "Head",
  methods: {
    //注销登录
    logout() {
      this.$confirm('是否注销登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //注销登录
        this.postRequest('/logout');
        //清空用户信息
        window.sessionStorage.removeItem('tokenStr');
        window.sessionStorage.removeItem('user');
        //跳转到登录页
        this.$router.replace('/');
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  }
}
</script>

<style>
.homeHeader {
  background: chocolate;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
</style>