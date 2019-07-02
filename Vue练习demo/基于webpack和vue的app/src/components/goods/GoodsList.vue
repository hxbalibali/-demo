<template>
    <div class="goods-list">
        <!--<router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">-->
            <!--<img :src="item.img_url" alt="wufa">-->
            <!--<h1 class="title">{{item.title}}</h1>-->
            <!--<div class="info">-->
                <!--<p class="price">-->
                    <!--<span class="now">{{item.sell_price}}</span>-->
                    <!--<span class="old">{{item.market_price}}</span>-->
                <!--</p>-->
                <!--<p class="sell">-->
                    <!--<span>热卖中</span>-->
                    <!--<span>剩{{item.stock_quantity}}件</span>-->
                <!--</p>-->
            <!--</div>-->
        <!--</router-link>-->

        <!--在网页中有两种跳转方式 -->
        <!-- 1、a标签跳转，叫做 标签跳转 -->
        <!-- 2、使用 window.location.href的形式，叫做编程式导航 -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="wufa">
            <h1 class="title">{{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">{{item.sell_price}}</span>
                    <span class="old">{{item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                pageindex: 1, //分页数
                goodslist: [] // 存放商品列表的数组
            }
        },
        created(){
            this.getGoodsList();
        },
        methods: {
            getGoodsList(){ //获取商品列表
                this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result => {
                    if(result.body.status === 0){
                        this.goodslist = this.goodslist.concat(result.body.message);
                        // console.log(result.body.message)
                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getGoodsList();
            },
            getDetail(id){
                // 使用 JS的形式进行路由导航

                // 注意要区分 this.$route 和 this.$router 这两个对象
                // 其中：this.$route 是路由参数对象，所有的路由中的参数，params  query  都属于它
                // this.$router 是路由导航对象， 用它可以方便的使用js代码，实现路由的前进后退跳转
                // 第一种
                // this.$router.push("/home/goodsinfo/"+id);
                // 第二种, 传递对象
                // this.$router.push({ path: "/home/goodsinfo/"+id})
                // 第三种，传递命名的路由
                this.$router.push({ name: 'goodsinfo', params: { id } });
                // 第四种
            }
        }
    }

</script>

<style lang="scss" scoped>
    .goods-list {
        padding: 8px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .goods-item {
            margin: 3px 0;
            width: 49%;
            border: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
            }
            .info {
                background-color: #ddd;
                p {
                    margin: 0;
                    padding: 5px;
                }
                .price {
                    .now {
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                    }
                    .old {
                        text-decoration: line-through;
                        font-size: 12px;
                        margin-left: 10px;
                    }
                }
                .sell {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }

            }
        }
    }

</style>