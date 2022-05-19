import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import "font-awesome/css/font-awesome.css"
import "font-awesome/css/font-awesome.min.css"

import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";

Vue.config.productionTip = false
Vue.use(ElementUI, VueRouter);

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;


//路由导航守卫 to:即将要进入的目标 路由对象，该对象有目标页的路由信息 next:放行该路由组件 from:当前导航正要离开的路由，该对象有当前页的路由信息
router.beforeEach((to, from, next) => {
    //获取在sessionStorage存储的token
    if (window.sessionStorage.getItem('tokenStr')) {
        if (window.sessionStorage.getItem('user')) {
            next();
        }
        next();
    } else {
        //判断是否是登录页
        if (to.path === '/') {
            next();
        } else if (to.path === '/home') {
            next();
        } else if (to.path === '/commoditycheck') {
            next();
        } else if (to.path === '/classification') {
            next();
        } else if (to.path === '/register') {
            next();
        } else if(to.path === '/productDetails'){
            next();
        } else if(to.path === '/shop'){
            next();
        } {
            // next('/?redirect=' + to.path);
            console.log("无法访问！");
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
