<template>
    <div class="long-scroll_wrap">
        <!-- table容器 -->
        <Button type="primary" @click="handler">click{{thumb_width}}</Button>
        <div class="long-scroll_view" ref="source_bar">
            <slot></slot>
        </div>
        <!-- 滚动条 -->
        <div class="long-scroll_bar">
            <div
                ref="thumb"
                :style="{width: thumb_width + 'px'}"
                class="long-scroll_thumb"
                @mousedown="mousedownHandler"
            ></div>
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
            druging: false, // 点击滚动条后开始move的标志
            currThumbX: 0,
            thumb_width: 0, // 滚动条长度
            screen_Width: 0,  //可视区域宽度  滑轨长度
            table_bar_width: 0, // table总宽度
        }
    },
    mounted() {
        document.onmouseup = (event) => {
            this.druging = false
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
            let transX = 0
            transX = this.currThumbX + diffX
            transX = transX < 0 ? 0 : transX // 防止左移 滚出去；额
            let diffWidth = this.screen_Width - this.thumb_width  
            transX = transX >= diffWidth ? diffWidth : transX   // 右侧最大值
            this.$refs.thumb.style.transform = "translateX(" + transX + "px)";
            this.moveProtoThumb(transX)
        }
        /* 
        1. offsetWidth和offsetHeight只读属性：以css像素返回它的屏幕尺寸。返回尺寸包含元素的边框以内，出去外边距。（文档高）
        2. ClientWidth和clientHeight：类似offsetWidth和offsetHeight，不同的是不包含边框大小，只包含内边距以内。
            如果浏览器在内边距和边框之间添加了滚动条，还不会包含滚动条。注意，<i>和<code>和<span>这类内联元素，
            clientWidth和clientHeight总是返回0；document.documentElement.clientHeight 随着页面的缩放，值会变化。
        3. scrollWidth和scrollHeight：内容+内边距+溢出。当无溢出时，和clientWidth和clientHeight相等。（包括隐藏的，为实际的内容区域高度）
            scrollLeft和scrollTop：是滚动条位置。 
        */

        let table_bar_width = this.table_bar_width = this.$refs.source_bar.firstChild.offsetWidth  // table的总宽度
        let screen_Width = this.screen_Width = this.$refs.source_bar.parentNode.offsetWidth // 可视区域宽度 滑轨槽 宽度

        this.thumb_width = (screen_Width / table_bar_width) * screen_Width // 滚动条宽度

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
        // 使原生滚动条 滚动
        moveProtoThumb(moveWidth) {
            let rate = this.table_bar_width / this.screen_Width  // 滚动条滚动比例
            this.$refs.source_bar.scrollLeft = moveWidth * rate
        },
        handler() {
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
    user-select: none; // 禁止选择
}

.long-scroll_view {
    margin-bottom: -17px;
    // margin-right: -17px;
    overflow: auto;
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
