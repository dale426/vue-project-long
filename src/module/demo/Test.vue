<template>
    <contenerWrap>
        <div class="item" v-bind:style="{border: border + 'px ' + 'solid' + ' ' + color}">
            内联样式与数据绑定
        </div>
        <div @click="handle" class="trans" v-bind:style="change">
            动画效果
        </div>
        <div>
            222
            <img src="https://wmstest.tf56.com/pages/incomeManagement/orderList.html?isFromLoginPage=true" alt="lala">
            <a href="https://wmstest.tf56.com/pages/incomeManagement/orderList.html?isFromLoginPage=true&entryListCode=R013m170830000005">aaaa</a>
        </div>
    </contenerWrap>
</template>
<script>
import contenerWrap from '@/components/header/contenerWrap'

export default {
    data () {
        return {
            index: 1,
            dream: '永远年轻、永远热泪盈眶',
            border: 4,
            color: "red",
            dray: "none",
            animation: "none",
            translateX: 10
        }
    },
    components: {contenerWrap},
    methods: {
        handle () {
            if (this.index > 5) {
                this.index = 1
            }
            let x = this.index * 100
            this.dray = 'all .6s'
            this.animation = 'translateX(20)'
            this.index += 1
            this.translateX = x
        }
    },
    computed: {
        change () {
            return {
                transition: this.dray,
                width: this.index * 30 + 'px',
                transform: `translateX(${this.translateX}px)`
            }
        }
    }
}
</script>
<style lang="less">
.item{
    width: 200px;
    height: 100px;
}
.trans{
    margin-top: 20px;
    width: 200px;
    height: 120px;
    border: 1px solid pink;
}
</style>

