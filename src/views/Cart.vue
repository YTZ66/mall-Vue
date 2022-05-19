<template>
  <div class="cart">
    <!-- 标题头 -->
    <div>
      <titleHead></titleHead>
    </div>
    <div style="margin-top: 10px;margin-left: 150px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 购物车栏 -->
    <div class="cartClass">
      <div class="cartHeader">
        <span style="margin-left: 20px;font-weight: 900;font-size: 25px;">购物车(全部4)</span>
        <span style="margin-left: 67%;font-size: 17px;">已选商品</span>
        <span style="font-size: 23px;color: coral;margin-left: 15px;">0.00</span>
        <el-button round style="margin-top: 20px;margin-left: 10px;background-color: coral" @click="settlement">结算
        </el-button>
      </div>
      <div style="margin-top: 10px;">
        <table>
          <ul>
            <li>
              <!-- 一级全选 -->
              <!--              <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>-->
              <input type="checkbox" v-model="checkAll" @change="handleCheckAllChange(checkAll)"/>全选
            </li>
            <li>
              <span style="margin-left: 120px;font-weight: 900;">商品信息</span>
            </li>
            <li>
              <span style="margin-left: 300px;font-weight: 900;">单价</span>
            </li>
            <li>
              <span style="margin-left: 140px;font-weight: 900;">数量</span>
            </li>
            <li>
              <span style="margin-left: 140px;font-weight: 900;">金额</span>
            </li>
            <li>
              <span style="margin-left: 140px;font-weight: 900;">操作</span>
            </li>
          </ul>
        </table>
        <!-- 店铺 -->
        <div style="margin-left: 20px;" v-for="(item, index) in cartList" :key="index">
          <div style="margin-top: 20px;margin-left: 60px;">
            <span>店铺：{{ item.name }}</span>
          </div>
          <div v-for="(value, key) in item.carts">
            <!-- 二级购物车商品 -->
            <input style="margin-left: 40px;"
                   type="checkbox"
                   :key="key"
                   v-model="value.checkbox"
                   @click="handleCheckAllDocChange(value)"/>
            <div class="commodityInfo">
              <div style="float:left; display:inline;">
                <img class="imgs" :src="getPath(value.commoditypicture)" alt="">
              </div>
              <div style="float:left; display:inline;margin-top: 20px;width: 100px;">
                <span>{{value.cartid}}</span>
                <span style="margin-left: 30px;">{{ value.commodiyname }}</span>
              </div>
              <div style="float:left; display:inline;margin-top: 20px;width: 150px;">
                <span style="margin-left: 20px;">{{ value.comboname }}</span>
                <br>
                <el-button style="margin-left: 15px;" type="text" class="el-icon-edit"
                           @click="selectComboInf(value.commodityid)
"/>
                <el-dialog
                    :title="title"
                    :visible.sync="dialogVisible"
                    width="30%">
                  <el-select v-model="combos" placeholder="请选择">
                    <el-option
                        v-for="(itemCart, index) in comboList"
                        :key="index"
                        :label="itemCart.name"
                        :value="itemCart.name">
                    </el-option>
                  </el-select>
                  <el-button @click="updateComboInfo(value.cartid, combos)">提交</el-button>
                  <el-button @click="dialogVisible = false">取消</el-button>
                </el-dialog>
              </div>
              <div style="float:left; display:inline;margin-top: 20px;width: 120px;">
                <span style="margin-left: 30px;">{{ value.choose }}</span>
              </div>
              <div style="float:left; display:inline;margin-top: 20px;">
                <span style="margin-left: 30px;">{{ value.unitprice }}</span>
              </div>
              <div style="float:left; display:inline;margin-top: 20px;">
                <el-input-number style="margin-left: 75px;" v-model="value.quantity"
                                 @change="handleChange(value.cartid)" :min="1" :max="10"></el-input-number>
              </div>
              <div style="float:left; display:inline;margin-top: 20px;width: 120px;">
                <span style="margin-left: 70px;">{{ value.amount }}</span>
              </div>
              <div style="float:left; display:inline;margin-top: 10px;width: 60px;">
                <el-button style="margin-left: 110px;" type="text" @click="deleteCart">删除</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cartHeader">
        <span style="margin-left: 20px;font-weight: 900;font-size: 25px;">购物车(全部4)</span>
        <span style="margin-left: 67%;font-size: 17px;">已选商品</span>
        <span style="font-size: 23px;color: coral;margin-left: 15px;">0.00</span>
        <el-button round style="margin-top: 20px;margin-left: 10px;background-color: coral">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import titleHead from '../views/head/Head'
import {deleteRequest, getRequest, putRequest} from "../utils/api";

export default {
  name: "Cart",
  components: {
    titleHead
  },
  data() {
    return {
      combos: [],
      comboList: [],
      title: '修改套餐',
      checkedCart: [],
      checkedDocs: [],
      cartData: [],
      cartData2: [],
      checkDocAll: false,
      checkAll: false,
      cartList: [],
      user: JSON.parse(window.sessionStorage.getItem('user')),
      dialogVisible: false
    }
  },
  mounted() {
    this.initCartInfo();
  },
  methods: {
    //修改购物车套餐
    updateComboInfo(id, value) {
      console.log(id);
      console.log(value);
      // putRequest('/cart/updateCartAndCombo?id=' + id + '&comboName=' + value).then(resp => {
      //   if (resp) {
      //     this.dialogVisible = false;
      //     //初始化购物车信息
      //     this.initCartInfo();
      //   }
      // })
    },
    //查询套餐信息
    selectComboInf(id) {
      this.dialogVisible = true;
      getRequest('/cart/selectComboInfo?id=' + id).then(resp => {
        if (resp) {
          this.comboList = resp;
        }
      })
    },
    //可以用 checkedDocs: []来提交
    settlement() {
      console.log(this.checkedDocs);
    },
    //一级
    handleCheckAllChange(val) {
      if(val){
        this.cartData2.forEach(item => {
          item.checkbox = true;
          this.checkedDocs.push(item);
        })
      }else {
        this.cartData2.forEach(item => {
          item.checkbox = false;
          this.checkedDocs.push(null);
        })
      }
    },
    //二级店铺
    handleCheckAllDocChange(value) {
      this.checkedDocs.push(value);
      this.checkAll = this.checkedDocs.length === this.cartData2.length;
    },
    //数量
    handleChange(id) {
      //数量乘金额
      console.log(id);

    },
    getPath(path) {
      return path ? require('../img/' + path) : '';
    },
    //查询购物车信息
    initCartInfo() {
      getRequest('/cart/selectUserOfCartInfo?id=' + this.user.id).then(resp => {
        if (resp) {
          this.cartList = resp.shopOfCart;
          this.cartList.forEach(item => {
            this.cartData.push(item.carts);
          });
          this.cartData.map(item => {
            item.map(itemCart => {
              this.cartData2.push(itemCart);
            })
          })
        }
      })
    },
    //删除购物车信息
    deleteCart(id) {
      this.$confirm('是否删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRequest('/cart/deleteCart?id=' + id).then(resp => {
          console.log(id);
          if (resp) {
            //初始化
            this.initCartInfo();
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>
.imgs {
  height: 80px;
  width: 80px;
  line-height: 400px;
  vertical-align: middle;
  display: table-cell;
  margin-top: 20px;
  margin-left: 20px;
}

.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 25px;

}

.price {
  font-size: 13px;
  color: #777;
  vertical-align: 1px;
  margin-left: 10px;
}

.price::before {
  content: '\00A5';
  margin-right: 1px;
}

ul li {
  float: left;
  margin-top: 20px;
}

.commodityInfo {
  margin-top: 10px;
  width: 1050px;
  height: 120px;
  background: #dddddd;
  border-radius: 20px;
  margin-left: 60px;
}

.cartClass {
  background: white;
  width: 80%;
  height: auto;
  border-radius: 20px;
  border: 1px solid #cac6c6;
  margin-left: 10%;
  margin-top: 20px;
}

.cartHeader {
  width: 100%;
  height: 80px;
  border-bottom: 1px solid #cac6c6;

  position: relative;
}

.cart {
  width: 100%;
  height: 100%;
  background: #dddddd;
  position: absolute;
}
</style>