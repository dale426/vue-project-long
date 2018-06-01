<template>
    <div>
        <div class="wrap-img">
            <h1>第{{index + 1}}张</h1>
            <img :src="srcUrl" alt="相册" width="800">
            <div> {{ loading }}% -加载中...</div>
            <div class="btn">
                <Button type='primary' @click="btnPre">上一张</Button>
                <Button type='primary' @click="btnNext">下一张</Button>
            </div>
        </div>
        
        
    </div>
</template>
<script>
export default {
    name: 'ImgLoad',
    data() {
        return {
            srcList: [
                'http://img.redocn.com/sheying/20180531/yunhai_9448805.jpg',
                'http://img.redocn.com/sheying/20180531/caoyuanfengguang_9447333.jpg',
                'http://img.redocn.com/sheying/20180523/lvshucong_9426125.jpg',
                'http://img.redocn.com/sheying/20180521/yuyedetiankong_9422629.jpg',
                'http://img.redocn.com/sheying/20180528/dujuanhewan_9440877.jpg'
            ],
            index: 0,
            loading: 0
        }
    },
    mounted() {
        let count = 0
        let _self = this
        let all = this.srcList.length
        this.srcList.forEach((src, i) => {
            let imgObj = new Image()
            imgObj.addEventListener('load', function() {
                count++
                _self.loading = count / all * 100
            })
            imgObj.src = src
        })
    },
    computed: {
        srcUrl() {
            return this.srcList[this.index]
        }
    },
    methods: {
        btnPre() {
            this.index = Math.max(0, --this.index)
        },
        btnNext() {
            this.index = Math.min(this.srcList.length - 1, ++this.index)
        }
    }
}
</script>
<style lang="less">
.wrap-img {
  text-align: center;
  img {
    display: inline-block;
    width: 800px;
    height: 600px;
    box-shadow: 8px 8px 18px #888888;
  }
  .btn {
    padding: 30px 0;
  }
}
</style>

