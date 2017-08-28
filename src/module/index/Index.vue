<template>
    <div class="content">
        <h1 class="tittle">{{ dream}}</h1>
        <video autoplay width="480" height="360">
            <source src="../../assets/xcz.mp4">
            啊哦，浏览器不支持视频呀，快去换个试试、、、
        </video>

        <a class="jump" href="#">点击前往</a>

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
        margin-top: 60px;
        font-style: italic;
    }
</style>

