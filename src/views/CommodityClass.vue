<template>
  <div>
    <div>
      <!-- 标题头 -->
      <headTitle></headTitle>
      <!-- 返回主界面 -->
      <returnHome></returnHome>
      <!-- 搜索框 -->
      <div style="margin: 0 auto;text-align: center">
        <el-input
            style="width: 500px;"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="searchValue.name"
            clearable>
        </el-input>
        <el-button icon="el-icon-search" @click="submit" circle/>
      </div>
      <!-- 商品列表 -->
      <div>
        <div class="commodity" style="margin-top: 20px">
          <el-card v-for="(item, index) in commodityList" :key="index"
                   class="commodity-card" style="margin-left: 50px">
            <div>
              <div class="product-picture">
                <a href="#"><img class="product-img" :src="require('../img/'+item.picture)"></a>
              </div>
            </div>
            <div class="product-information">
              <div>商品名称：{{ item.name }}</div>
              <div>价格：{{ item.price }}</div>
              <span v-for="(item2, index2) in item.shopList" :key="index2">
             <div>店铺名称：{{ item2.name }}</div>
          </span>
              <div style="margin-left: 200px">销量：{{ item.monthlysales }}</div>
            </div>
          </el-card>
        </div>
        <!-- 分页 -->
        <div style="display: flex;justify-content: center" v-if="page === true">
          <el-pagination
              background
              @current-change="currentChange1"
              @size-change="sizeChange1"
              @prev-click="prevChange1"
              @next-click="nextChange1"
              layout="sizes, prev, pager, next, jumper, ->, total"
              :total="total">
          </el-pagination>
        </div>
        <div style="display: flex;justify-content: center" v-else>
          <el-pagination
              background
              @current-change="currentChange2"
              @size-change="sizeChange2"
              @prev-click="prevChange2"
              @next-click="nextChange2"
              layout="sizes, prev, pager, next, jumper, ->, total"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headTitle from '../views/head/Head'
import {getRequest} from "../utils/api";
import returnHome from '../views/return/ReturnHome'

export default {
  name: "CommodityClass",
  components: {
    headTitle,
    returnHome
  },
  data() {
    return {
      page: null,
      commodityList: [],
      currentPage: 1,//当前页
      size: 10,//当前总条数
      prev: 0,//上一页
      next: 0,//下一页
      total: 0,
      searchValue: {
        name: null,
        classificationid: null,
        secondaryid: null,
        subclassid: null
      },
      id: null
    }
  },
  mounted() {
    this.initCommodityCheckID1();
    this.initCommodityCheckID2();
    this.initCommodityCheckID3();
    this.initCommodityCheck();
  },
  methods: {
    // 将home传过来的id参数进行截取
    initCommodityCheckID1() {
      let key = "subclassid";
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
        this.searchValue.subclassid = value;
        this.id = this.searchValue.subclassid;
        console.log("id:"+this.id);
      }
    },
    initCommodityCheckID2() {
      let key = "secondaryid";
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
        this.searchValue.secondaryid = value;
      }
    },
    initCommodityCheckID3() {
      let key = "classificationid";
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
        this.searchValue.classificationid = value;
      }
    },

    //分页
    currentChange1(currentPage) {
      this.currentPage = currentPage;
      //初始化页面
      this.submit();
    },
    sizeChange1(size) {
      this.size = size;
      //初始化页面
      this.submit();
    },
    prevChange1(prev) {
      this.prev = prev;
      //初始化页面
      this.submit();
    },
    nextChange1(next) {
      this.next = next;
      //初始化页面
      this.submit();
    },
    currentChange2(currentPage) {
      this.currentPage = currentPage;
      //初始化页面
      this.initCommodityCheck();
    },
    sizeChange2(size) {
      this.size = size;
      //初始化页面
      this.initCommodityCheck();
    },
    prevChange2(prev) {
      this.prev = prev;
      //初始化页面
      this.initCommodityCheck();
    },
    nextChange2(next) {
      this.next = next;
      //初始化页面
      this.initCommodityCheck();
    },

    //提交事件
    submit() {
      if (this.searchValue.name === '') {
        this.$message('内容为空！');
      } else {
        this.$router.push({path: '/commoditycheck?name=' + (this.searchValue.name)});
      }
      getRequest('/commoditycheck/listCommodityPage?currenPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.searchValue.name)
          .then(resp => {
            console.log(resp.data);
            if (resp) {
              this.page = true;
              this.commodityList = resp.data;
              //分页总条数
              this.total = resp.total;
            }
          })
    },

    //根据分了id查询商品分类
    initCommodityCheck() {
      let url = '/commoditycheck/listCommodityPage/?currenPage=' + this.currentPage + '&size=' + this.size;
      if (this.searchValue.subclassid !== undefined) {
        console.log("里面的id："+this.id);
        url += '&subclassid=' + this.searchValue.subclassid;
      } else if (this.searchValue.secondaryid !== undefined) {

        url += '&secondaryid=' + this.searchValue.secondaryid;
      } else if (this.searchValue.classificationid !== undefined) {

        url += '&classificationid=' + this.searchValue.classificationid;
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.page = false;
          this.commodityList = resp.data;
          //分页的总条数
          this.total = resp.total;
        }
      })
    }
  }
}
</script>

<style>
.commodity {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.commodity-card {
  width: 300px;
  margin-bottom: 20px;
  margin-right: 15px;
}

.product-picture {
  width: 100%;
  display: flex;
  justify-content: center;
}

.product-information {
  font-size: 12px;
}
</style>