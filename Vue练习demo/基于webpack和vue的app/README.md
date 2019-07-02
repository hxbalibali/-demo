#第一个vue自练项目

## 制作首页App组件
1、Header，使用的是Mint-UI中的Header组件
2、制作底部的Tabbar区域，使用的是 MUI 中的Tabbar.html
 + 在制作购物车 小图标的时候，操作会相对多一些
 + 用到 mui 扩展图标（css样式+字体库）
3、要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件

## 首页轮播图
## 加载首页轮播图数据
获取数据使用vue-resource中的this.$http.get
然后将获取的数据保存到data()身上

##首页六宫格，改造九宫格而来

##改造 新闻资讯 路由链接
## 获取新闻来源
1、绘制界面，使用mui中的media-list.html
2、使用vue-resource获取资源
3、渲染真实数据

## 点击跳转到新闻详情页面
1、router-link
2、对应的组件页面
## 新闻详情页面绘制渲染

##单独封装一个 comment.vue 评论子组件
1、创建子组件
2、父组件页面导入子组件
3、在父组件中，使用‘components’属性，将刚刚导入的组件注册成自己的子组件
4、将注册子组件时候的注册名称，以标签形式，在页面中引用

## 获取所有的评论数据，显示到页面中

## 实现点击加载更多评论功能
1、为加载更多按钮，注册点击事件，在事件中，请求 获取下一页数据
2、点击加载更多， pageindex能够自增1，然后重新调用getComments方法
3、为了防止列表老数据被新数据覆盖，采用一个数组拼接concat

## 实现发表评论功能
1、把文本框做双向数据绑定
2、为发表按钮绑定事件
3、校验评论内容是否为空，如果为空，则提示用户评论内容不能为空
4、vue-resource提交评论内容
5、发表成功，重新刷新列表
    + 如果调用getComments方法重新刷新列表，可能只会得到之前加载更多时候的最后一页列表，而我们最新评论的得不到
    + 所以换一种思路：在评论成功后，在客户端，重新拼接 新评论+之前显示的
    
## 改造图片分享 按钮 为 路由链接，并显示对应的组件页面

## 绘制图片列表
1、制作顶部的滑动条
①需要借助MUI中的 tab-top-webview-main.html，并且要将它的类 全屏 mui-fullscreen去掉
②滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下
+ 导入mui.js
+ 调用官方提供的方式
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
+ 我们在初始化滑动条的时候，导入的mui.js，控制台报错
`mui.min.js:1705 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
原因在于：webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以两者冲突了
解决办法：把 webpack 打包时候的严格模式禁用掉
(我启用了安装什么babel去严格，直接在babelrc文件里面配置ignore参数)
③获取所有分类，并渲染

2、制作底部的图片列表
①图片加载需要使用懒加载技术，我们选择mint-ui中的lazy-load
②实现了 点击图片 跳转到详情页面
+ 在改造 li 成router-link 时候，使用 tag 属性

## 实现了 图片详情中 缩略图功能
1、 使用插件 vue-preview 这个缩略图插件
2、 获取所有的图片列表，渲染数据
注意：要查看最新的官方用法
ps: 我这边调整样式还不会做

## 绘制商品列表

## 在 安卓机 上去进行项目的预览和测试
保证手机正常运行
保证手机和开发项目的电脑处于同一个 WiFi 环境下，也就是说手机可以访问到电脑的IP
打开package.json文件，在dev中，添加一个 --host 指令，把当前电脑的WiFi IP地址
设置为 --host 的指令值
cmd     ipconfig


## 购物车功能