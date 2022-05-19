import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import CommodityCheck from "../views/CommodityCheck";
import Head from "../views/head/Head";
import CommodityClass from "../views/CommodityClass";
import Register from "../views/Register";
import Revise from "../views/revise/Revise";
import Personal from "../views/Personal";
import ProductDetails from "../views/ProductDetails";
import Cart from "../views/Cart";
import Shop from "../views/Shop";
import Test from "../views/revise/Test";

Vue.use(VueRouter)

const routes = [
    { //登录
        path: '/',
        name: 'Login',
        component: Login
    },
    { //主界面
        path: '/home',
        name: 'Home',
        component: Home
    },
    { //标题头
        path: '/head',
        name: 'Head',
        component: Head
    },
    { //根据商品name查询商品信息
        path: '/commoditycheck',
        name: 'CommodityCheck',
        component: CommodityCheck
    },
    { //根据分类id查询商品信息
        path: '/commodityclass',
        name: 'CommodityClass',
        component: CommodityClass
    },
    { //注册
        path: '/register',
        name: 'Register',
        component: Register
    },
    { //修改密码
        path: '/revise',
        name: 'Revise',
        component: Revise
    },
    { //个人中心
        path: '/personal',
        name: 'Personal',
        component: Personal
    },
    { //商品详情
        path: '/productDetails',
        name: 'ProductDetails',
        component: ProductDetails
    },
    { //购物车
        path: '/cart',
        name: 'Cart',
        component: Cart
    },
    {//店铺
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    }
]

const router = new VueRouter({
    routes
})


const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router
