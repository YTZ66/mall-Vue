<template>
  <div>
    <!-- 标题头 -->
    <titleHead></titleHead>
    <!-- 返回主界面 -->
    <returnHome></returnHome>
    <!-- 搜索框 -->
    <div style="margin: 0 auto;text-align: center">
      <el-input
          style="width: 500px;"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="commodityName"
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
</template>

<script>
import titleHead from '../views/head/Head'
import returnHome from '../views/return/ReturnHome'
import {getRequest} from "../utils/api";

export default {
  name: "CommodityCheck",
  components: {
    titleHead,
    returnHome
  },
  data() {
    return {
      page: null,
      commodityList: [],
      commodityName: null,
      currentPage: 1,//当前页
      size: 10,//当前总条数
      prev: 0,//上一页
      next: 0,//下一页
      total: 0,
      searchValue: {
        name: null
      }
    }
  },
  mounted() {
    this.initCommodityCheckName();
    this.initCommodityCheck();
  },
  methods: {
    // 将home传过来的name参数进行截取
    initCommodityCheckName() {
      let key = "name";
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
        //中文解码
        this.searchValue.name = decodeURI(value);
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
      if (this.commodityName === '') {
        this.$message('内容为空！');
      } else {
        this.$router.push({path: '/commoditycheck?name=' + (this.commodityName)});
      }
      getRequest('/commoditycheck/listCommodityPage?currenPage=' + this.currentPage + '&size=' + this.size + '&name=' + this.commodityName)
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

    //根据商品名称查询商品分类
    initCommodityCheck() {
      let url = '/commoditycheck/listCommodityPage/?currenPage=' + this.currentPage + '&size=' + this.size;
      if (this.searchValue.name !== undefined) {
        url += '&name=' + this.searchValue.name;
      }
      this.getRequest(url).then(resp => {
        if (resp) {
          this.page = false;
          this.commodityList = resp.data;
          //分页的总条数
          this.total = resp.total;
          console.log(resp.data.picture);
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