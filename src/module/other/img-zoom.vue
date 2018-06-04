<template>
    <div>
        <div class="img-wrap">
            <Button class="btn61" type="primary" @click="zoomBtn">zoom</Button>
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
                transition: 'all .6s'
                // 'transform': 'scale(2)',
                // 'transform-origin': '60% 48%'
            },
            zoomflag: false
        }
    },
    methods: {
        zoomBtn() {
            this.zoomflag = !this.zoomflag
            this.zoomflag ? this.enlargement() : this.shrink()
        },
        enlargement() {
            this.scale = {
                ...this.scale,
                'transform': 'scale(3)',
                'transform-origin': '60% 48%'
            }
        },
        shrink() {
            this.scale = {
                ...this.scale,
                'transform': 'scale(1)',
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

