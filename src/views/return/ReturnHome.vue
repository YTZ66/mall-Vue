<template>
  <div>
    <a style="text-decoration:none">
      <el-link style="margin-left: 20px" icon="el-icon-back" type="info"
               @click="returnHome">返回主页面
      </el-link>
    </a>
  </div>
</template>

<script>
export default {
  name: "ReturnHome",
  methods:{
    //返回home页面
    returnHome(){
      this.$router.push({path: '/home'});
    }
  }
}
</script>

<style>

</style>