<template>
    <div class="body">
        <menu class="menu" type="list">
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            <li class="menu-item"><a href="/"><i class="icon-menu iconfont icon-homepage"></i>首页</a></li>
            
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </menu>
        <div class="main">
            <slot> </slot>   
        </div>
    </div>
</template>
<script>
export default {
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

