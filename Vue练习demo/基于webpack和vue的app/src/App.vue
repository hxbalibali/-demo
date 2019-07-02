<template>
    <div class="app-container">
        <!-- 顶部 header 部分-->
        <mt-header fixed title="韩雪的vue项目">
            <span slot="left" @click="goBack" v-show="flag">
                <mt-button icon="back">返回</mt-button>
            </span>
        </mt-header><!--脱离文档流-->

        <!-- 中间的路由 router-view 部分-->
        <transition>
            <router-view></router-view>
        </transition>



        <!-- 底部 tabbar 区域-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item mui-active" to="/home">
                <span class="mui-icon mui-icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" to="/shopcar">
                <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
                </span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" to="/search">
                <span class="mui-icon mui-icon-search"></span>
                <span class="mui-tab-label">搜索</span>
            </router-link>
        </nav>
    </div>
</template>



<script>
    export default {
        data(){
            return {
                flag: false
            }
        },
        created() {
            this.flag = this.$route.path === '/home' ? false : true;
        },
        methods: {
            goBack(){
                // 点击后退
                this.$router.go(-1);
            }
        },
        watch: {
            '$route.path': function(newVal){
                if(newVal === '/home'){
                    this.flag = false;
                }else{
                    this.flag = true;
                }

            }
        }
    }

</script>

<style lang="scss" scoped>
    .mint-header {
        z-index: 99;
    }
    .app-container {
        padding-top: 40px;
        overflow-x: hidden; //去除routerview动画时候出现滚动条
        padding-bottom: 50px;
    }

    .v-enter{
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute; //这一步可以解决动画往上飘的效果
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
</style>