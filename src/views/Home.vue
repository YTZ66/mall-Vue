<template>
  <div>
    <!-- 标题头 -->
    <div>
      <titleHead></titleHead>
    </div>
    <!-- 搜索跳转 -->
    <div style="margin: 0 auto;text-align: center">
      <el-input
          style="width: 500px;"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="commodityName"
          clearable>
      </el-input>
      <el-button @click="href" icon="el-icon-search" circle></el-button>
    </div>
    <!-- 分类列表 -->
    <el-container>
      <el-container style="margin-top: 10px">
        <ul style="margin-left: 70px" class="topmenu">
          <div class="toptitle">
            全部商品分类
          </div>
          <li v-for="(item1, index1) in classification" :key="index1">
            <router-link style="margin-left: 10px"
                         :to="{path:'/commodityclass',query:{classificationid:item1.id}}">{{ item1.name }}</router-link><span></span>
            <!-- 二级分类 -->
            <div class="submenu">
              <div class="leftdiv">
                <dl v-for="(item2, index2) in item1.subclass" :key="index2">
                  <dt>
                    <router-link :to="{path:'/commodityclass',query:{secondaryid:item2.id}}">{{ item2.name }}</router-link>
                  </dt>
                  <!-- 三级分类 -->
                  <dd style="margin-left: 100px" v-for="(item3, index3) in item2.subclass" :key="index3">
                    <router-link :to="{path:'/commodityclass',query:{subclassid:item3.id}}">{{ item3.name }}</router-link>
                  </dd>
                </dl>
              </div>
              <div class="rightdiv">
                <dl>
                  <dd>
                    <a href="http://sale.jd.com/act/1XDZ6ShE5M7tTrl.html">
                      <img
                          src="http://img30.360buyimg.com/erpVCAare/g16/M00/0B/1B/rBEbRlOCFcoIAAAAAAArMNB2tlkAACTlwDgVG8AACtI514.jpg"
                          width="194" height="70" title="\家电">
                    </a>
                  </dd>
                  <dd>
                    <a href="http://sale.jd.com/act/v8kJIaPmsMGuebpH.html">
                      <img
                          src="http://img30.360buyimg.com/erpVCAare/g16/M00/0B/19/rBEbRlOAiHUIAAAAAAAx8X2c6oIAACTCAP56A4AADIJ112.jpg"
                          width="194" height="70" title="小家电--三请聚宝盆">
                    </a>
                  </dd>
                </dl>
                <dl>
                  <dt>推荐品牌</dt>
                  <dd>
                    <a href="#">美的官方旗舰店</a>
                  </dd>
                  <dd>
                    <a href="#">苏泊尔旗舰店</a>
                  </dd>
                  <dd>
                    <a href="#">九阳旗舰店</a>
                  </dd>
                  <dd>
                    <a href="#">东菱旗舰店</a>
                  </dd>
                  <dd>
                    <a href="#">海尔统帅旗舰店</a>
                  </dd>
                  <dd>
                    <a href="#">小熊旗舰店</a>
                  </dd>
                </dl>
              </div>
            </div>
          </li>
        </ul>
        <el-main>
          <!-- 轮播器 -->
          <el-carousel height="500px">
            <el-carousel-item v-for="(item, index) in carousel" :key="index">
              <a href="#"><img style="width: 800px;height: 500px" :src="require('../img/'+item.url)" alt=""/></a>
            </el-carousel-item>
          </el-carousel>
          <!-- 今日推荐 -->
          <div style="background-color: coral">
            <div style="height: 100px;color: black">
              今日推荐
            </div>
            <div>
              <a href="#"><img v-for="(item, index) in commodityOfFour" :key="index"
                               style="width: 200px;height: 150px;margin-right: 10px"
                               :src="require('../img/'+item.picture)"></a>
            </div>
          </div>
        </el-main>
        <div style="width: 200px;height: 870px;background-color: red;margin-right: 75px;color: white">
          <h3 style="margin-left: 20px">商城头条</h3>
          <div>
            <ul>
              <li>[特惠]商城品1分秒</li>
              <li>[特惠]商城品1分秒</li>
              <li>[特惠]商城品1分秒</li>
              <li>[特惠]商城品1分秒</li>
            </ul>
          </div>
          <div>
            <el-divider></el-divider>
            <div v-if="isLogin === true">
              <a href="#"><img style="width: 50px;height: 50px;border-radius: 50%;vertical-align:middle;"
                               :src="require('C://project//hotel//avatar//'+user.avatar)" alt=""></a>
              <span style="margin-left: 10px">Hi,{{ user.name }}</span>
            </div>
            <div v-else>
              <router-link style="color: white;margin-left: 55px" :to="'/'">
                <span>登录</span>
              </router-link>
              <router-link style="color: white;margin-left: 40px" :to="'/'">
                <span>注册</span>
              </router-link>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <ul>
              <li>[特惠]商城品1分秒</li>
              <li>[特惠]商城品1分秒</li>
              <li>[特惠]商城品1分秒</li>
              <li>[特惠]商城品1分秒</li>
            </ul>
          </div>
          <div>
            <img style="width: 200px" src="../img/advTip.jpg" alt="">
          </div>
        </div>
      </el-container>
    </el-container>
    <!-- 商品列表 -->
    <template>
      <div v-for="(item1, index1) in classificationAndCommodity" :key="index1">
        <div>
          <h1>{{ item1.name }}</h1>
          <a href="#" style="float: right;color: #333333;text-decoration:none">更多标签</a>
          <el-divider></el-divider>
        </div>
        <div class="commodity">
          <el-card class="commodity-card" style="margin-left: 50px"
                   v-for="(item2, index2) in item1.commodity" :key="index2">
            <div>
              <div class="product-picture">
                <router-link :to="{path:'/productDetails',query:{commodityid:item2.id}}"><img class="product-img" :src="require('../img/'+item2.picture)" alt=""></router-link>
              </div>
            </div>
            <div class="product-information">
              <div>商品名称：{{ item2.name }}</div>
              <div>价格：{{ item2.price }}</div>
              <span v-for="(item3, index3) in item2.shops" :key="index3">
                店铺名称：{{ item3.name }}
              </span>
              <div style="margin-left: 200px">销量：{{ item2.monthlysales }}</div>
            </div>
          </el-card>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import titleHead from '../views/head/Head'

export default {
  name: "Home",
  components: {
    titleHead
  },
  data() {
    return {
      commodityName: '',
      currentDate: new Date(),
      classification: [],
      classificationAndCommodity: [],
      commodityOfFour: [],
      user: JSON.parse(window.sessionStorage.getItem('user')),
      carousel: [],
      isLogin: null
    }
  },
  mounted() {
    this.initClassification();
    this.initClassificationAndCommodity();
    this.initCommodityOfFour();
    this.initCarousel();
    this.initIsLogin();
  },
  methods: {
    //跳转
    href() {
      if(this.commodityName === ''){
        this.$message('内容为空！');
      }else{
        this.$router.push({path: '/commoditycheck?name=' + this.commodityName})
      }
    },

    //查询所有商品分类菜单
    initClassification() {
      this.getRequest('/classification/list').then(resp => {
        if (resp) {
          this.classification = resp;
          console.log(this.user.id);
        }
      })
    },

    //根据分类列表查询
    initClassificationAndCommodity() {
      this.getRequest('/classification/listByCommodity').then(resp => {
        if (resp) {
          this.classificationAndCommodity = resp;
        }
      })
    },

    //按月销最大值查询前四条数据
    initCommodityOfFour() {
      this.getRequest('/commodity/listCommodityOfFour').then(resp => {
        if (resp) {
          this.commodityOfFour = resp;
        }
      })
    },

    //查询所有轮播器图片
    initCarousel() {
      this.getRequest('/carousel/list').then(resp => {
        if (resp) {
          this.carousel = resp;
        }
      })
    },

    //判断token，user是否存在
    initIsLogin() {
      if (this.user === null) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },

  }
}
</script>

<style>
.el-aside {
  background-color: red;
  color: #333;
  text-align: center;
  line-height: 600px;
  margin-left: 150px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.commodity {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.product-information {
  font-size: 12px;
}

.product-picture {
  width: 100%;
  display: flex;
  justify-content: center;
}

.product-img {
  width: 300px;
  height: 250px;
  border-radius: 72px;
}

.commodity-card {
  width: 300px;
  margin-bottom: 20px;
  margin-right: 15px;
}

.box {
  width: 400px;
}

.top {
  text-align: center;
}

.left {
  float: left;
  width: 60px;
}

.right {
  float: right;
  width: 60px;
}

.bottom {
  clear: both;
  text-align: center;
}

.left .el-tooltip__popper,
.right .el-tooltip__popper {
  padding: 8px 10px;
}

body {
  padding: 0;
  font-size: 10pt;
}

.topmenu {
  display: block;
  width: 220px;
  border: 2px solid #e4393c;
  margin: 0;
  padding: 0;
}

.toptitle {
  height: 40px;
  line-height: 40px;
  text-align: left;
  font-size: 11pt;
  font-weight: bold;
  color: white;
  background: #e4393c;
  padding-left: 20px;
}

.topmenu li {
  height: 30px;
  line-height: 30px;
  font-size: 11pt;
  list-style-type: none;
  text-align: left;
  padding-left: 8px;
  z-index: 3;
  background-repeat: no-repeat;
  background-position: right;
}

.topmenu li a {
  text-decoration: none;
  color: #313131;
}

.topmenu li a:hover {
  text-decoration: underline;
  font-weight: bold;
  color: #e4393c;
}

.topmenu li:hover {
  border: 1px solid #dddddd;
  border-right: 0;
  box-shadow: 0 0 8px #dddddd;
  -moz-box-shadow: 0 0 8px #dddddd;
  -webkie-box-shadow: 0 0 8px #dddddd;
  background-image: none;
}

.submenu {
  display: none;
  width: 715px;
  left: 220px;
  position: absolute;
  top: 40px;
  border: 1px solid #dddddd;
  z-index: 4;
  background: white;
  box-shadow: 0 0 8px #dddddd;
  -moz-box-shadow: 0 0 8px #dddddd;
  -webkie-box-shadow: 0 0 8px #dddddd;
}

.leftdiv {
  float: left;
  width: 490px;
  margin: 5px;
}

.rightdiv {
  float: left;
  width: 200px;
  margin: 5px;
}

.topmenu li:hover .submenu {
  display: block;
}

.topmenu li:hover span {
  background: white;
  display: inline-block;
  z-index: 20;
  width: 20px;
  height: 30px;
  float: right;
  position: relative;
}

.leftdiv dl {
  display: block;
  border-bottom: 1px solid #EEE;
  padding-bottom: 6px;
  overflow: hidden;
}

.leftdiv dl dt {
  display: block;
  float: left;
  width: 60px;
  text-align: right;
  height: 22px;
  line-height: 22px;
  padding-right: 6px;
}

.leftdiv dl dt a {
  color: #e4393c;
  font-weight: bold;
  text-decoration: underline;
  font-size: 10pt;
}

.leftdiv dl dd {
  display: block;
  overflow: hidden;
}

.leftdiv dl dd a {
  display: block;
  float: left;
  border-left: 1px solid #CCC;
  color: #737373;
  font-size: 9pt;
  padding: 0 8px;
  height: 14px;
  line-height: 14px;
  margin: 4px 0;
}

.rightdiv dl dd {
  margin: 3px 0;
}

.rightdiv dl dt {
  color: #e4393c;
  font-weight: bold;
  font-size: 10pt;
}

.rightdiv dl dd a {
  font-size: 9pt;
  color: #737373;
  line-height: 22px;
}

.rightdiv dl dd a:hover {
  color: #737373;
  font-weight: normal;
}
</style>