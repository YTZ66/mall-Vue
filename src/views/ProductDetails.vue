<template>
  <div id="right" style="height: 100%;">
    <div>
      <!-- 标题 -->
      <title-head></title-head>
    </div>
    <div class="BreadCrumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="divs">
      <el-form :model="detailsFrom" ref="loginForm">
        <!-- 商品图片 -->
        <el-form-item style="margin-top: 68px;" prop="commoditypicture">
          <el-input :disabled="true"
                    style="display:none;"
                    v-model="detailsFrom.commoditypicture"/>
        </el-form-item>
        <div style="width: 40%;float: left;">
          <div style="margin-top: 68px;">
            <img class="img1" :src="getPath(this.commodity.picture)" alt="">
          </div>
          <!-- 轮播图 -->
          <template>
            <el-carousel :interval="4000" type="card" height="100px" style="width: 450px">
              <el-carousel-item v-for="(item, index) in commodityimgs" :key="index">
                <img style="width: 230px;height: 100px" :src="getPath(item.img)" alt="">
              </el-carousel-item>
            </el-carousel>
          </template>
        </div>
        <div style="width: 50%;float: left;margin-left: 50px;">
          <!-- 用户id -->
          <el-form-item prop="userid">
            <el-input
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.userid"
            />
          </el-form-item>
          <!-- 商品id -->
          <el-form-item prop="commodityid">
            <el-input
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.commodityid"
            />
          </el-form-item>
          <!-- 商品名称 -->
          <el-form-item prop="commodiyname">
            <el-input
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.commodiyname"
            />
          </el-form-item>
          <div>
            <h1>{{ commodity.name }}</h1>
          </div>
          <!-- 价格 -->
          <el-form-item prop="unitprice">
            <el-input
                v-if="details"
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.unitprice"
            />
            <el-input
                v-else
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.unitprice"
            />
          </el-form-item>
          <div>
            <span>价格：</span>
            <span style="margin-left: 12px;" v-if="details">{{ combos[0].price }}</span>
            <span style="margin-left: 12px;" v-else>{{ combos[1].price }}</span>
          </div>
          <!-- 店铺id -->
          <el-form-item prop="shopid">
            <el-input
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.shopid"/>
          </el-form-item>
          <!-- 店铺名称 -->
          <el-form-item prop="shopname">
            <el-input
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.shopname"
            />
          </el-form-item>
          <div>
            <span>店铺：</span>
            <span style="margin-left: 12px;">{{ shop.name }}</span>
          </div>
          <div style="margin-bottom: 30px;margin-top: 40px">
            <span>月销：</span>
            <span style="margin-left: 15px;">{{ commodity.monthlysales }}</span>
          </div>
          <div>
            <span>配送至：</span>
            <el-cascader
                style="width: 250px"
                class="long"
                size="large"
                :options="regionData"
                v-model="selectedOptions2"
                @change="handleChange">
            </el-cascader>
          </div>
          <!-- 套餐id -->
          <el-form-item prop="comboid">
            <el-input
                v-if="this.comboId"
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.comboid"/>
            <el-input v-else
                      :disabled="true"
                      style="display:none;"
                      v-model="detailsFrom.comboid"/>
          </el-form-item>
          <!-- 套餐名称 -->
          <el-form-item prop="comboname">
            <el-input
                v-if="this.radios===0"
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.comboname"/>
            <el-input v-else
                      :disabled="true"
                      style="display:none;"
                      v-model="detailsFrom.comboname"/>
          </el-form-item>
          <div>
            <span>套餐：</span>
            <el-radio style="margin-left: 13px" v-model="radios" :label="0" @click.native="linkage1">{{
                combos[0].name
              }}
            </el-radio>
            <el-radio v-model="radios" :label="1" @click.native="linkage2">{{ combos[1].name }}</el-radio>
          </div>
          <!-- 选中套餐属性 -->
          <el-form-item prop="choose">
            <el-input :disabled="true"
                      style="display:none;"
                      v-model="detailsFrom.choose"/>
          </el-form-item>
          <template v-for="(item1, index1) in chooseMap1">
            <div style="margin-top: 40px;" :key="index1">
              <span>{{ index1 }}：</span>
              <el-radio style="margin-left: 13px" v-model="radio" :label="0" @click.native="radio1">{{
                  item1[0]
                }}
              </el-radio>
              <el-radio v-model="radio" :label="1" @click.native="radio2">{{ item1[1] }}</el-radio>
              <el-radio v-model="radio" :label="2" @click.native="radio3">{{ item1[2] }}</el-radio>
            </div>
          </template>
          <!-- 数量 -->
          <el-form-item style="margin-top: 35px;" label="数量：" prop="quantity">
            <div>
              <el-input-number style="margin-top: 10px" v-model="detailsFrom.quantity" @change="handleChange2" :min="1"
                               :max="10"></el-input-number>
            </div>
          </el-form-item>
          <!-- 选择套餐名称id -->
          <el-form-item prop="comboNameid">
            <el-input
                v-if="this.radios===0"
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.comboNameid"/>
            <el-input
                v-else
                :disabled="true"
                style="display:none;"
                v-model="detailsFrom.comboNameid"/>
          </el-form-item>
          <!-- 金额 -->
          <el-form-item prop="amount">
            <el-input :disabled="true"
                      style="display:none;"
                      v-model="detailsFrom.amount"/>
          </el-form-item>
          <div style="margin-top: 10px;margin-left: 450px">
            <h4>库存：{{ commodity.quantity }}</h4>
          </div>
          <div style="margin-top: 20px">
            <el-button style="width: 250px;height: 50px">立即购买</el-button>
            <el-button style="width: 250px;height: 50px" icon="el-icon-shopping-cart-full
" @click="addCart">加入购物车
            </el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div>
      <!-- 店铺 -->
      <div class="shopClass">
        <div class="shopName">
          <h3 style="color: white;text-align: center;padding:15px 0;">{{ shop.name }}旗舰店</h3>
        </div>
        <div class="shopInfo">
          <div>
            <img class="shopImg" :src="getPath(shop.avatar)" alt=""/>
          </div>
          <h4 style="text-align: center">商城十年老店</h4>
          <div style="text-align: center">
            <span>描述</span>
            <span style="margin-left: 15px">服务</span>
            <span style="margin-left: 15px">物流</span>
          </div>
          <div style="margin-top: 20px">
            <div style="float:left;">
              <el-button style="background-color: black;">
                <router-link class="shopSubmit" :to="{path: '/shop'}">
                  <span style="color: white">进入店铺</span>
                </router-link>
              </el-button>
            </div>
            <div style="float:left;margin-left: 2px">
              <el-button style="background-color: white;">
                <router-link class="shopSubmit" :to="{path: '/'}">
                  <span style="color: black">收藏店铺</span>
                </router-link>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <!--  商品详情介绍图片和评价信息  -->
      <div class="evaluateClass">
        <el-tabs style="margin-left: 20px" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="商品详情" name="first">商品详情</el-tab-pane>
          <!-- 商品评价信息 -->
          <el-tab-pane label="商品评价" name="second">
            <div>
              <!-- 好评率 -->
              <div class="evaluateRete">
                <div style="padding:15px 0;margin-left: 10px">
                  <el-radio-group v-model="radioEvaluate">
                    <el-radio :label="undefined" @click.native="initEvaluateInfo(undefined)">({{ this.total }})全部
                    </el-radio>
                    <el-radio :label="1" @click.native="initEvaluateInfo(1)">({{ this.goodTotal }})好评
                    </el-radio>
                    <el-radio :label="0" @click.native="initEvaluateInfo(0)">({{ this.midTotal }})中评
                    </el-radio>
                    <el-radio :label="-1" @click.native="initEvaluateInfo(-1)">({{ this.badTotal }})差评
                    </el-radio>
                  </el-radio-group>
                </div>
                <span style="margin-left: 450px">好评率：{{ this.percent }}%</span>
              </div>
              <!-- 用户评价信息 -->
              <div v-for="(item, index) in this.evaluateInfo">
                <div id="userEvaluate" :key="index" style="width: 100%;
   height:auto;
  border-bottom: 1px solid #cac6c6;">
                  <div v-for="(item2, index2) in item.userList" :key="index2">
                    <img class="userEvaluateImg"
                         :src="require('C:/project/hotel/avatar/'+item2.avatar)" alt="">
                    <span style="font-size: 16px;margin-left: 50px;">{{ item.information }}</span>
                    <br><span style="margin-left: 10px;">{{ item2.name }}</span>
                  </div>
                  <span style="margin-left: 600px;">{{ item.time }}</span>
                  <el-button style="margin-left: 150px" type="text" @click="dialogVisible = true">回复
                  </el-button>
                  <!-- 回复 -->
                  <details>
                    <summary style="margin-left: 80px">回复该用户(5)</summary>
                    <div style="margin-top: 10px">
                      <img class="userEvaluateImg" src="../img/lingshi.jpg" alt="">
                      <span style="font-size: 16px;margin-left: 40px;">好吃价格合理</span>
                      <br><span style="margin-left: 5px;">多亮</span>
                      <span style="margin-left: 600px;">2022年19号02日&nbsp;16:51</span>
                      <details>
                        <summary style="margin-left: 80px">回复(5)</summary>
                        <img class="userEvaluateImg" src="../img/lingshi.jpg" alt="">
                        <span style="font-size: 16px;margin-left: 40px;">好吃价格合理</span>
                        <br><span style="margin-left: 5px;">多亮</span>
                        <span style="margin-left: 600px;">2022年19号02日&nbsp;16:51</span>
                      </details>
                    </div>
                  </details>
                </div>
              </div>
              <!-- 分页 -->
              <div style="text-align: center;margin-top: 20px;">
                <el-pagination
                    background
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    @prev-click="prevChange"
                    @next-click="nextChange"
                    layout="sizes, prev, pager, next, jumper, ->, total"
                    :total="totalPage">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import titleHead from '../views/head/Head'
import {getRequest, postRequest} from "../utils/api";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode
} from '../utils/app';

export default {
  name: "ProductDetails",
  components: {
    titleHead
  },
  data() {
    return {
      comboId: true,
      detailsFrom: {
        userid: null, //用户id
        commodityid: null, //商品id
        commodiyname: '', //商品名称
        commoditypicture: '', //商品图片
        shopid: null, //店铺id
        shopname: '', // 店铺名称
        unitprice: '', //单价
        amount: null, //金额
        comboid: null, //套餐id
        comboNameid: null,//选择套餐名称id
        comboname: '', //套餐名称
        choose: '', // 套餐属性
        quantity: 1, //数量
      },
      comboChoose: {},
      num: 1,
      user: JSON.parse(window.sessionStorage.getItem('user')),
      dialogVisible: false,
      radioEvaluate: undefined,
      goodTotal: null,
      badTotal: null,
      total: null,
      midTotal: null,
      percent: null,
      activeName: 'second',
      CodeToText,
      TextToCode,
      BeiJing: CodeToText["110000"],
      provinceAndCityData,
      provinceAndCityDataPlus,
      regionData,
      regionDataPlus,
      selectedOptions1: ["110000", "110100"],
      selectedOptions2: ["120000", "120100", "120101"],
      selectedOptions3: ["130000", ""],
      selectedOptions4: ["120000", "120100", ""],
      commodity: {},
      commodityimgs: [],
      shop: {},
      combos: [],
      chooseMap: {},
      chooseMap1: {},
      radio: 0,
      radios: 0,
      product: {
        commodityId: null
      },
      details: true,
      evaluateRate: {},
      sizes: 5,
      currenPage: 1,
      totalPage: 0,
      prev: 0,//上一页
      next: 0,//下一页
      jumper: 0,
      evaluateInfo: []
    }
  },
  mounted() {
    this.initProductDetails();
    this.initEvaluateRate();
    this.initEvaluateInfo();
    this.handleChange2();
  },
  methods: {
    //加入购物车
    addCart() {
      //判断存储的用户信息是否存在，不存在提示跳转到登录界面进行登录
      if (this.user !== null) {
        postRequest('/cart/addCart', this.detailsFrom).then(resp => {
          if (resp) {
            this.$confirm('添加购物车成功，是否跳转到购物车页面?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.replace('/cart');
            }).catch(() => {
              //初始化商品详情
              this.initProductDetails();
            });
          }
        })
      } else {
        this.$alert('尚未登录请先登录！', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.replace('/');
          }
        });
      }
    },
    //根据商品id查询该商品的评价信息
    initEvaluateInfo(radio) {
      let url = '/evaluate/EvaluationPage?currenPage=' + this.currenPage + '&size=' + this.sizes +
          '&id=' + this.product.commodityId;
      this.radioEvaluate = radio;
      if (this.radioEvaluate !== undefined) {
        url += '&type=' + this.radioEvaluate;
      }
      getRequest(url).then(resp => {
        if (resp) {
          this.evaluateInfo = resp.data;
        }
      })
    },
    //分页
    currentChange(currentPage) {
      this.currentPage = currentPage;
      //初始化页面
      this.initEvaluateInfo();
    },
    sizeChange(sizes) {
      this.sizes = sizes;
      //初始化页面
      this.initEvaluateInfo();
    },
    prevChange(prev) {
      this.prev = prev;
      //初始化页面
      this.initEvaluateInfo();
    },
    nextChange(next) {
      this.next = next;
      //初始化页面
      this.initEvaluateInfo();
    },
    //商品评价率
    initEvaluateRate() {
      getRequest('/evaluate/EvaluationTotal?id=' + this.product.commodityId).then(resp => {
        if (resp) {
          this.goodTotal = resp.goodTotal;
          this.total = resp.total;
          this.badTotal = resp.badTotal;
          this.midTotal = resp.midTotal;
          this.percent = resp.percent;
        }
      })
    },
    //标签页
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //省市区联动
    handleChange(value) {
      console.log(value);
    },
    //套餐属性
    radio1() {
      this.radio = 0;
      this.initProductDetails();
      console.log("0的：" + this.radio);
    },
    radio2() {
      this.radio = 1;
      this.initProductDetails();
      console.log("1的：" + this.radio);
    },
    radio3() {
      this.radio = 2;
      this.initProductDetails();
      console.log("2的：" + this.radio);
    },
    //套餐名称
    linkage1() {
      this.details = true;
      this.radios = 0;
      this.comboId = true;
      this.initProductDetails();
      console.log("套餐1：" + this.radios);
    },
    linkage2() {
      this.details = false;
      this.radios = 1;
      this.comboId = false;
      this.initProductDetails();
      console.log("套餐2：" + this.radios);
    },
    getPath(path) {
      return path ? require('../img/' + path) : '';
    },
    //数量
    handleChange2() {
      this.initProductDetails();
      //数量
      // console.log(this.detailsFrom.quantity);
      // console.log(this.detailsFrom.combo[1].price * this.detailsFrom.quantity);
      //金额 数量乘价格
      //this.detailsFrom.amount = this.detailsFrom.quantity * this.detailsFrom.combo
    },
    //根据商品id查询
    initProductDetails() {
      //将home传过来的参数进行截取
      let key = "commodityid";
      let value;
      const url = window.location.toString();
      const arr = url.split("?");
      if (arr.length > 1) {
        const params = arr[1].split("&");
        for (let i = 0; i < params.length; i++) {
          let param = params[i];
          if (param.split("=")[0] === key) {
            value = param.split("=")[1];
          }
        }
      }
      this.product.commodityId = value;
      getRequest('/commodity/selectCombo?id=' + this.product.commodityId).then(resp => {
        if (resp) {
          //商品基本信息
          this.commodity = resp.commodity;
          //图片
          this.commodityimgs = resp.commodityimgs;
          //店铺
          this.shop = resp.shop;
          //套餐
          this.combos = resp.combos;
          //套餐选项
          const map = this.combos[0].choose;
          //转换为json格式
          this.chooseMap1 = eval("(" + map + ")");

          //用户id
          this.detailsFrom.userid = this.user.id;
          //商品id
          this.detailsFrom.commodityid = resp.commodity.id;
          //商品名称
          this.detailsFrom.commodiyname = resp.commodity.name;
          //商品图片
          this.detailsFrom.commoditypicture = resp.commodity.picture;
          //店铺id
          this.detailsFrom.shopid = resp.shop.id;
          //店铺名称
          this.detailsFrom.shopname = resp.shop.name;
          //套餐id
          if (this.comboId) {
            this.detailsFrom.comboid = resp.combos[0].id;
          } else {
            this.detailsFrom.comboid = resp.combos[1].id;
          }
          //套餐名称
          if (this.radios === 0) {
            this.detailsFrom.comboNameid = resp.combos[0].comboid;
            console.log(resp.combos[0].comboid);
            this.detailsFrom.comboname = resp.combos[0].name;
          } else {
            this.detailsFrom.comboNameid = resp.combos[1].comboid;
            this.detailsFrom.comboname = resp.combos[1].name;
          }
          //套餐价格
          if (this.details) {
            this.detailsFrom.unitprice = resp.combos[0].price;
          } else {
            this.detailsFrom.unitprice = resp.combos[1].price;
          }
          //选中的套餐属性
          const choose = resp.combos[0].choose;
          //转换为json格式
          this.chooseMap = eval("(" + choose + ")");
          //将key：口味，value：原味...等循环出来在进行判断
          for (const [key, value] of Object.entries(this.chooseMap)) {
            if (this.radio === 0) {
              this.detailsFrom.choose = key + '：' + value[0];
            }
            if (this.radio === 1) {
              this.detailsFrom.choose = key + '：' + value[1];
            }
            if (this.radio === 2) {
              this.detailsFrom.choose = key + '：' + value[2];
            }
          }
          //金额
          if (this.details) {
            this.detailsFrom.amount = this.detailsFrom.unitprice * this.detailsFrom.quantity;
          } else {
            this.detailsFrom.amount = this.detailsFrom.unitprice * this.detailsFrom.quantity;
          }
        }
      })
    },
    //省市区三级联动
    convertTextToCode(provinceText, cityText, regionText) {
      let code = "";
      if (provinceText && this.TextToCode[provinceText]) {
        const province = this.TextToCode[provinceText];
        code += province.code + ", ";
        if (cityText && province[cityText]) {
          const city = province[cityText];
          code += city.code + ", ";
          if (regionText && city[regionText]) {
            code += city[regionText].code;
          }
        }
      }
      return code;
    }
  }
}
</script>

<style>
.right {
  width: 100%;
  height: 100%;
  background: #dddddd;
  position: absolute;
}

li {
  list-style: none;
}

h3 {
  margin-top: 25px;
}

.evaluateUser {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #cac6c6;
}

.userEvaluateImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 10px;
  margin-left: 15px;
}

.evaluateRete {
  width: 100%;
  height: 40px;
  border-right: 1px solid #cac6c6;
  border-top: 1px solid #cac6c6;
  border-bottom: 1px solid #cac6c6;
  border-left: 1px solid #cac6c6;
}

.divs {
  width: 80%;
  height: auto;
  margin-left: 150px;
  margin-top: 20px;
  border-right: 1px solid #cac6c6;
  border-top: 1px solid #cac6c6;
  border-bottom: 1px solid #cac6c6;
}

.shopSubmit {
  text-decoration: none;
}

.shopImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 75px;
}

.shopClass {
  width: 200px;
  height: 600px;
  margin-left: 150px;
  margin-top: 20px;
  border-right: 1px solid #cac6c6;
  border-top: 1px solid #cac6c6;
  border-bottom: 1px solid #cac6c6;
  border-left: 1px solid #cac6c6;
  float: left;
}

.shopName {
  width: 200px;
  height: 50px;
  background-color: #000000;
  border-bottom: 1px solid #cac6c6;
  margin-bottom: 10px;
}

.evaluateClass {
  width: 65%;
  margin-left: 25px;
  height: 600px;
  margin-top: 20px;
  border-right: 1px solid #cac6c6;
  border-top: 1px solid #cac6c6;
  border-bottom: 1px solid #cac6c6;
  border-left: 1px solid #cac6c6;
  float: left;
}

.BreadCrumbs {
  margin-left: 150px;
  margin-top: 10px;
}

.img1 {
  width: 450px;
  height: 400px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>