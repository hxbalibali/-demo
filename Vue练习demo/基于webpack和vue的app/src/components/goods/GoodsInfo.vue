<template>
    <div class="goodsinfo-container">
        <!--给小球加动画，半场动画，采用钩子函数-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>{{ goodsinfo.market_price }}</del>&nbsp;&nbsp; 销售价：<span class="now_price">{{ goodsinfo.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopcar">加入购物车</mt-button>
                        <!-- 分析：如何实现 点击加入购物车的时候， 拿到 购买的数量-->
                        <!-- 按钮属于goodsinfo组件， 数字属于numberbox组件-->
                        <!-- 子组件向父组件传值（事件调用机制），父向子传递一个事件，子调用事件，将值传回父-->
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>




    </div>

</template>

<script>
    // 导入轮播图组件
    import swiper from '../subcomponents/swiper.vue'
    // 导入 数字选择框 组件
    import numbox from '../subcomponents/goodsinfo_numbox.vue'
    export default {
        data(){
            return {
                id: this.$route.params.id,
                lunbotu:[],
                goodsinfo:[],
                ballFlag: false, //控制小球隐藏和显示
                selectedCount: 1 // 保存用户选中的商品数量，初始为1
            }
        },
        created(){
            this.getLunbotu();
            this.getGoodsInfo();
        },
        methods: {
            getLunbotu(){
                this.$http.get('api/getthumimages/' + this.id).then(result => {
                    if(result.body.status === 0){
                        //先循环每一项，为 item 添加 img 属性
                        result.body.message.forEach(item => {
                            item.img = item.src;
                        });
                        this.lunbotu = result.body.message;
                }})
            },
            getGoodsInfo(){
                // 获取商品的信息
                this.$http.get('api/goods/getinfo/'+ this.id).then(result => {
                    if(result.body.status === 0){
                        this.goodsinfo = result.body.message[0];
                    }
                })
            },
            goDesc(id){
                // 采用编程式导航跳转到图文介绍页面
                this.$router.push({ name: 'goodsdesc', params: { id }});
            },
            goComment(id){
                this.$router.push({ name: 'goodscomment', params: { id }});
            },
            addToShopcar(){ //添加购物车
                this.ballFlag = ! this.ballFlag;
                // id:商品id，count:要购买的数量，price:商品单价，selected:是否选中
                var goodsinfo = { id: this.id, count:this.selectedCount, price: this.goodsinfo.sell_price, selected: true };

                this.$store.commit('addToCar', goodsinfo);
                // console.log(this.$store.state.car)
            },
            beforeEnter(el){
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done){
                el.offsetWidth;

                // 小球动画优化思路：
                // 1. 分析：为什么小球动画不准确？
                // 原因：我们把小球最终位移到的位置，已经局限在了某一分辨率下的滚动条未滚动的情况下
                // 2. 只要 分辨率和测试时候的不一样 以及 滚动条滚动了，动画就不准确了
                // 3. 因此，不能写死位移的横纵坐标，而是应该根据情况，动态计算这两个坐标值
                // 解决办法：想得到徽标的横纵坐标，再得到小球的横纵坐标，两者相减得差值，即为位移

                // 获取小球在页面中的位置
                const ballPosition = this.$refs.ball.getBoundingClientRect();
                // 获取徽标在页面中的位置，注意：徽标不是在这个页面中的，这里采用dom操作，根据id来操作
                const badgePosition = document.getElementById("badge").getBoundingClientRect();
                // console.log(ballPosition);
                // console.log(badgePosition)
                const xDist = badgePosition.left - ballPosition.left;
                const yDist = badgePosition.top - ballPosition.top;

                el.style.transform = `translate(${xDist}px, ${yDist}px)`;// 采用ES6 模板字符串
                el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter(el){
                this.ballFlag = !this.ballFlag;
            },
            getSelectedCount(count){ // 向子组件传递方法
                this.selectedCount = count;
                // console.log(this.selectedCount);
            }
        },
        components: {
            swiper,
            numbox
        }
    }

</script>


<style lang="scss" scoped>
    .goodsinfo-container {
        background-color: #eee;
        overflow: hidden;
    }
    .now_price {
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }

    // 小球
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 100;
        top: 410px;
        left: 147px;
    }

</style>