<template>
    <div class="content">
        <h1 class="tittle">{{ dream}}</h1>
        <i class="line"></i>
        <video autoplay width="480" height="360">
            <source src="../../assets/xcz.mp4">
            啊哦，浏览器不支持视频呀，快去换个试试、、、
        </video>

        <a class="jump" href="#/home">点击前往</a>

    </div>
</template>
<script>
export default {
    data () {
        return {
            dream: '永远年轻、永远热泪盈眶'
        }
    }
}
</script>
<style lang="less">
    .content{
        height: 100%;
        background: #000;
        text-align: center;
    }
    .tittle{
        width: 100%;
        padding: 60px;
        color: #00FFFF;
    }
    .jump{
        display: block;
        color: #fff;
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        font-style: italic;
    }
    .line{
        display: inline-block;
        width: 100%;
        height: 2px;
        background: #FFFF00;
    }
</style>

