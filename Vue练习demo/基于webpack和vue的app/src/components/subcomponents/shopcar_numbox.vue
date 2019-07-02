<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" :value="initCount" @change="countChanged" ref="numbox" readonly/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>


    <!-- 分析：子组件什么时候将数据传递给父组件-->
</template>

<script>
    // 1、导入 mui 的 js文件
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        data(){
            return {

            }
        },
        mounted(){
            // 2、初始化 数字选择框
            mui(".mui-numbox").numbox();
            // console.log(this.max)
        },
        methods: {
            countChanged(){
                // 数量改变了
                // console.log(this.$refs.numbox.value);
                // 每当数量值改变，则同步数量值到购物车的store中，覆盖原先数量值
                this.$store.commit('updateGoodsInfo', {
                    id: this.goodsid,
                    count: this.$refs.numbox.value
                });
            }
        },
        props: ['initCount', 'goodsid']

    }

</script>

<style lang="scss" scoped>


</style>