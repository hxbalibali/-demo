<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr/>
        <textarea placeholder="请输入评论内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <!--评论列表-->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                    {{ item.content === 'undefined' ? '此用户很懒，什么都没留下' : item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>


<script>
    import { Toast } from "mint-ui"
    export default {
        data() {
            return {
                pageIndex:1, // 默认展示第一页数据
                comments: [], //所有的评论数据
                msg: '' //评论输入的内容，默认为空
            }
        },
        created(){
            this.getComments();
        },
        methods: {
            getComments() {
                //这里需要newsinfo父组件向子组件传id值
                this.$http.get('api/getcomments/' +this.id+ '?pageindex='+this.pageIndex).then(result => {
                    if(result.body.status === 0){
                        // this.comments = result.body.message;
                        // 用一个数组拼接，以防上一页列表被覆盖
                        this.comments = this.comments.concat(result.body.message)
                    }else{
                        Toast("获取评论失败！");
                    }
                })
            },
            getMore() {
                this.pageIndex ++;
                this.getComments();
            },
            postComment(){
                //校验是否为空内容
                if(this.msg.trim().length === 0){
                    return Toast('评论不能为空！')
                }
                // 发表评论
                // 参数1：请求的url地址
                // 参数2：提交给服务器的数据对象( content: this.msg )
                // 参数3：定义提交时候，表单中数据的格式（ emulateJSON:true）
                this.$http.post('api/postcomment/' + this.id,
                    { content: this.msg.trim() }).then(result => {
                        if(result.body.status === 0){
                            // 1、拼接出一个评论对象
                            var cmt = { user_name: '匿名用户', add_time: Date.now(), content: this.msg.trim() };
                            this.comments.unshift(cmt);
                            this.msg = '';
                        }
                })
            }
        },
        props: ["id"]
    }
</script>


<style lang="scss" scoped>
    .cmt-container {
        h3 {
            font-size: 18px;
        }
        textarea {
            font-size: 14px;
            height: 85px;
            margin: 0;
        }

        .cmt-list {
            margin: 5px 0;
            .cmt-item {
                font-size: 13px;
                .cmt-title {
                    background-color: #ccc;
                    line-height: 35px;
                }
                .cmt-body {
                    text-indent: 2em;
                }
            }
        }
    }
</style>
