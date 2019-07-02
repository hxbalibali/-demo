<template>
    <!-- 问题：不知道何时能够拿到max值，但是，总归有一刻会拿到 -->
    <!-- 我们可以使用 watch 这种属性监听，来监听 父组件传过来的max值， 不管watch 会被处罚几次，最后一次，肯定是一个合法的max值-->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox"/>
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
            console.log(this.max)
        },
        methods: {
            // 每当文本框数据修改的时候，立即传数据回父组件
            countChanged(){
                // console.log(this.$refs.numbox.value)
                this.$emit("getCount", parseInt(this.$refs.numbox.value));
            }

        },
        props: ["max"],
        watch: {
            // 属性监听
            'max': function(newVal, oldVal){
                // 使用 JS API 设置 numbox 的最大值
                mui(".mui-numbox").numbox().setOption("max", newVal);
                // console.log(newVal)
            }
        }
    }

</script>

<style lang="scss" scoped>


</style>