<template>
    <div>
        <div class="img-wrap">
            <Button class="btn61" type="primary">放大</Button>
            <img :style="scale" src="../../assets/images/61.png" alt="暂无图片">
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImgZoom',
    data() {
        return {
            scale: {
                'transform':'scale(2)',
                'transform-origin': '60% 48%'
            }
        }
    }
}
</script>
<style lang="less">
    .img-wrap{
        width: 300px;
        height: 500px;
        overflow: hidden;
        border: 2px dotted blue;
        position: relative;
        
        .btn61{
            z-index: 1;
            top: 50%;
            left: 70%;
            display: inline-block;
            position: absolute;
        }
        img{
            top: 0;
            left: 0;            
            z-index: -99;
            border: 2px solid red;
            
            
            display: inline-block;
        }
    }
</style>

