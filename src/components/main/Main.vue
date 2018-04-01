<template>
  <div class="body">
        <menu class="menu" type="list">
            <li class="menu-item"><a href="#/home"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="#/props"><i class="icon-menu iconfont icon-homepage"></i>Vue父子传值</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </menu>
        <div class="main">
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
</style>

