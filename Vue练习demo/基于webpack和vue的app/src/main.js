// 入口文件
import Vue from 'vue'

// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 1.3 导入自己的 router.js 路由模块
import router from './router.js'

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
// 全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

// 每次刚进入我们的网站， 肯定会先调用main.js，在调用的时候，先从本地存储中，把购物车的数据读出来，放到store中
var car = JSON.parse(localStorage.getItem('car') || []);
// 注册 vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// new Vuex.Store()实例，得到一个数据仓储
var store = new Vuex.Store({
    state:{ // this.$store.state.***
        // 将购物车中商品的数据，用一个数组存储起来，在car 数组中，存储一些商品的对象，样式设计成：
        // id:商品id，count:要购买的数量，price:商品单价，selected:是否选中
        car: car

    },
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
        addToCar(state, goodsinfo){ // 点击加入购物车，把商品信息保存到store中
            // 分析：
            // 1. 如果之前购物车中就有这个商品，更新数目
            // 2. 如果没有，则直接添加
            // 假设在购物车中没有找到
            var flag = false;
            state.car.some(item => {
                if(item.id == goodsinfo.id){
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true
                }
            });
            // 循环完毕，未找到该商品，则新增
            if(!flag){
                state.car.push(goodsinfo);
            }

            // 当更新 car 之后，把car数组存储到本地的 localStorage
            localStorage.setItem('car', JSON.stringify(state.car));

        },
        updateGoodsInfo(state, goodsinfo){
            // 修改购物车中商品的数量制
            state.car.some(item => {
                if(item.id === goodsinfo.id){
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
                //同时更新到localStorage中
                localStorage.setItem('car', JSON.stringify(state.car));
            })
        },
        removeFromCar(state, id){
            state.car.some((item, i) => {
                if(item.id === id){
                    state.car.splice(i, 1);
                    return true;
                }
            })
            //同时更新到localStorage中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if(item.id === info.id){
                    item.selected = info.selected;
                }
            })
            // 保存到localstorage中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        getAllCount(state){
            var cnt = 0;
            state.car.forEach(item => {
                cnt += item.count;
            });
            return cnt;
        },
        getGoodsCount(state){
            var obj = {};
            state.car.forEach(item => {
                obj[item.id] = item.count;
            });
            return obj;
        },
        getGoodsSelected(state){
            var obj = {}
            state.car.forEach(item=>{
                obj[item.id] = item.selected
            })
            return obj
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0, // 勾选的数量
                amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
                if(item.selected) {
                    o.count += item.count;
                    o.amount += item.price *item.count;
                }
            })
            return o;
        }
    }
})


//导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern);
})

// 导入MUI的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//导入App根组件
import app from './App.vue'

//按需导入mint-ui中的组件库
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
// 按需导入会影响懒加载
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
// import 'vue-preview/dist/vue-preview.min.js'

var vm = new Vue({
    el: "#app",
    //使用render渲染组件
    render : c=>c(app),
    router, // 1.4 挂载路由对象到 vm 实例上
    store // 挂载 store 状态管理对象
})