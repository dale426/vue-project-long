<template>
  <div class="body">
        <menu class="menu" type="list">
            <li class="menu-item"><a href="#/home"><i class="icon-menu iconfont icon-homepage"></i>首页滚动banner</a></li>
            <li class="menu-item"><a href="#/props"><i class="icon-menu iconfont icon-homepage"></i>Vue父子传值</a></li>
            <li class="menu-item"><a href="#/fundhold"><i class="icon-menu iconfont icon-homepage"></i>理财</a></li>
            <li class="menu-item"><a href="#/hljs/class"><i class="icon-menu iconfont icon-homepage"></i>代码高亮显示</a></li>
            <li class="menu-item"><a href="#/zoom"><i class="icon-menu iconfont icon-homepage"></i>放大图片</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
   
        </menu>
        <div class="main-body">
            <router-view></router-view>
        </div>
  </div>
</template>
<script>
export default {
    name: 'Main',
    data () {
        return {
        }
    },
    mounted () {
        this.$http.post('/src/api', {})
    }
}
</script>
<style lang="less">
   @import './contenerWrap.less';
   .main-body{
    height: calc(~"100% - 46px");
}
</style>

