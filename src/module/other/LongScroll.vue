<template>
    <div class="long-scroll_wrap">
        <!-- table容器 -->
        <Button type="primary" @click="handler">click</Button>
        <div class="long-scroll_view">
            <slot></slot>
        </div>
        <!-- 滚动条 -->
        <div class="long-scroll_bar">
            <div ref="thumb" class="long-scroll_thumb" @mousedown="mousedownHandler"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LongScroll',
    data() {
        return {
            startX: 0,
            startY: 0,
            druging: false,
            currThumbX: 0
        }
    },
    mounted() {
        document.onmouseup = (event) => {
            console.log('up');
            this.druging = false
            // this.currThumbX = this.$refs.thumb.offsetLeft;  // 移动之后重设当前位置

        }
        document.onmousemove = (event) => {
            if (!this.druging) {
                return false;
            }
            let { clientX, clientY } = event
            let diffX = clientX - this.startX
            if (diffX === 0) {
                return false;
            }
            // let diffY =  clientY - this.startY
            let transX = 0
            transX = this.currThumbX + diffX

            transX = transX < 0 ? 0 : transX // 防止左移 滚出去；额

            this.$refs.thumb.style.transform = "translateX(" + transX + "px)";


        }

    },
    methods: {
        mousedownHandler(event) {
            let { clientX, clientY } = event;
            this.startX = clientX
            this.startY = clientY
            let transformValue = this.getStyle(this.$refs.thumb, "transform")   // 获取当前translate的X位置
            if (transformValue !== 'none') {
                this.currThumbX = parseInt(transformValue.match(/-?\d+/g)[4]);  // 保存当前的位置
            }
            this.druging = true  // 按下鼠标时、开启滚动
        },




        handler() {
            console.log('this.druging', this.druging);
            this.$refs.thumb.style.transform = "translateX(" + 200 + "px)";

        },
        // 获取元素的属性
        getStyle: function (selector, property) {
            return document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(selector, false)[property] : selector.currentStyle[property];
        },
    },
}
</script>
<style lang="less">
.long-scroll_wrap {
    position: relative;
    overflow: hidden;
    user-select:none; // 禁止选择
}

.long-scroll_view {
    margin-bottom: -17px;
    margin-right: -17px;
}

.long-scroll_bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 6px;
    background: rgb(209, 209, 209);
    .long-scroll_thumb {
        position: relative;
        display: block;
        height: 6px;
        width: 30%;
        background: red;
        cursor: pointer;
        // transform: translateX(100px);
    }
}
</style>
