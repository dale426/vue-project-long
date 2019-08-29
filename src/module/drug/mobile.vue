<template>
    <div class="pg-mobile-move">
        <div
            v-for="(item, index) in list"
            :key="item.id"
            :style="{background: item.color, height: '100px'}"
        >
            <div
                @click="handlerClick"
                :move="true"
                class="box"
                :data-key="index"
                :style="{'background-image': `url(${item.url})`}"
                @touchstart="touchstart"
                @touchmove="touchmove"
                @touchend="touchend($event, index)"
            ></div>
            {{item.content}}
        </div>
    </div>
</template>

<script>

/**  
 * 思路
 * 1. 初始化记录所有可移动元素的位置  --- 直接将dom存储在数组中
 * 2. 拖动时判断 元素的位置 落入哪个目标区域， end时 重新渲染数据
 * 
*/
// 获取滚动条高度
// For scrollX
// (((t = document.documentElement) || (t = document.body.parentNode))
//     && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft

// // For scrollY
//     (((t = document.documentElement) || (t = document.body.parentNode))
//         && typeof t.scrollTop == 'number' ? t : document.body).scrollTop

export default {
    name: 'mobile',
    data() {
        return {
            list: [{
                id: 'aa',
                color: 'yellow',
                content: '这是第一个',
                url: 'http://img.souche.com/f2e/145868b5bd3e5828706cd7e3998d0abc.jpg'
            }, {
                id: 'aa1',
                color: 'lightyellow',
                content: '这是第2个',
                url: 'http://img.souche.com/f2e/145868b5bd3e5828706cd7e3998d0abc.jpg'
            }, {
                id: 'aa2',
                color: 'red',
                content: '这是第3个',
                url: 'http://img.souche.com/f2e/145868b5bd3e5828706cd7e3998d0abc.jpg'
            }, {
                id: 'aa3',
                color: '#44cef6',
                content: '这是第4个',
                url: 'http://img.souche.com/f2e/145868b5bd3e5828706cd7e3998d0abc.jpg'
            }, {
                color: 'lightblue',
                id: 'bb',
                content: '这是第5个',
                url: 'http://img.souche.com/f2e/fd1386859f281b07ab66b77ea547e188.png'
            }, {
                id: 'cc',
                color: 'green',
                content: '这是第6个',
                url: 'http://img.souche.com/f2e/725010505271b56446bcffcfcb1efd9f.jpeg'
            }, {
                id: 'dd',
                color: 'orange',
                content: '这是第7个',
                url: 'http://img.souche.com/f2e/684bcbff9b2c9c7fcd86f7676674914f.jpeg'
            }, {
                id: 'ee',
                color: '#ff4777',
                content: '这是第8个',
                url: 'http://img.souche.com/f2e/684bcbff9b2c9c7fcd86f7676674914f.jpeg'
            }, {
                id: 'ff',
                color: '#21a675',
                content: '这是第9个',
                url: 'http://img.souche.com/f2e/684bcbff9b2c9c7fcd86f7676674914f.jpeg'
            }],
            domList: [],
            posList: [],
            delayTimer: null, // 延时器
            canMove: false,
        }
    },
    mounted() {
        this.queryDomList();
    },
    methods: {
        queryDomList() {
            let domList = this.getElementByAttr('div', 'move');
            for (let key in domList) {
                let element = domList[key].getBoundingClientRect();
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
                this.posList[key] = {
                    top: element.top + scrollTop,
                    left: element.left,
                    minX: element.left - (element.width) / 4,
                    maxX: element.left + (element.width) / 4,
                    minY: element.top - (element.height) / 4 + scrollTop,
                    maxY: element.top + (element.height) / 4 + scrollTop,
                }
            }
            console.log('posList', this.posList);

        },
        getElementByAttr(tag, dataAttr) {
            var aElements = document.getElementsByTagName(tag);
            var aEle = [];
            for (var i = 0; i < aElements.length; i++) {
                var ele = aElements[i].getAttribute(dataAttr);
                var key = aElements[i].getAttribute('data-key');
                if (ele === 'true') {
                    if (aEle[key]) throw new Error('图片的key不能重复');
                    aEle[key] = aElements[i];
                }
            }
            return aEle;
        },
        handlerClick(e) {
            console.log('e', e);

        },
        touchstart(e) {
            // e.preventDefault();   // 阻止默认行为
            e.stopPropagation();  // 阻止冒泡

            var tar = e.target;
            // this.onStart(e);
            this.canMove = false;
            this.delayTimer ? window.clearTimeout(this.delayTimer) : null;
            this.delayTimer = setTimeout(() => {
                this.canMove = true;
                // 控制滚动条

            }, 400);
            //初始化拖动元素的位置信息；
            this.dragT = tar.offsetTop;
            this.dragL = tar.offsetLeft;
            this.dragW = tar.offsetWidth || tar.clientWidth;
            this.dragH = tar.offsetHeight || tar.clientHeight;
            //定义开始移动位置
            this.startX = e.pageX || e.touches[0].pageX;
            this.startY = e.pageY || e.touches[0].pageY;
            //重置移动参数
            this.moveX = this.moveY = 0;
        },
        touchmove(e) {

            if (!this.canMove) {
                return window.clearTimeout(this.delayTimer);
            }
            e.preventDefault(); // 开始移动后禁止滚动， 判断距离通过js移动滚动条
            let tar = e.target;
            this.onMove(tar);
            this.nowX = e.pageX || e.touches[0].pageX;
            this.nowY = e.pageY || e.touches[0].pageY;

            //计算目标元素需移动的距离
            this.moveX = this.nowX - this.startX;
            this.moveY = this.nowY - this.startY;

            //检测是否越界，并调整
            // this.checkOver(this.moveX, this.moveY);

            //进行拖动元素移动操作
            this.setMove(tar);

            //检测是否落入目标位置
            this.checkPos('move', tar);
        },
        touchend(e, soureEl) {
            if (!this.canMove) {
                return false;
            }
            let targetInfo = e.target.getBoundingClientRect()
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop

            // 松开时 当前位置
            let nowX = targetInfo.left;
            let nowY = targetInfo.top + scrollTop;

            console.log('targetInfo.top', targetInfo.top, targetInfo.top + scrollTop);

            // console.log('nowX, nowY', nowX, nowY, this.moveX, this.moveY);

            // 判断进入了哪个目标区域
            for (let key in this.posList) {
                if (nowX < this.posList[key].maxX
                    && nowX > this.posList[key].minX
                    && nowY < this.posList[key].maxY
                    && nowY > this.posList[key].minY
                ) {
                    console.log('key', key);
                    this.list.splice(soureEl, 1, ...this.list.splice(key, 1, this.list[soureEl]));
                    break;
                }
            }
            // 清除拖动时的样式
            let targetStyle = e.target.style.cssText
            e.target.style.cssText = targetStyle.split('position')[0] || '';
            console.log('this.list', this.list);
            this.delayTimer ? window.clearTimeout(this.delayTimer) : null
            this.canMove = false;

        },

        // 移动元素
        setMove(e, type) {
            var x = this.moveX || 0,
                y = this.moveY || 0;
            if (type === 'reset') {
                e.style.cssText = '';
                return;
            }
            e.style.cssText += 'position: absolute;-webkit-transform: translate(' + x + 'px,' + y + 'px);';
        },
        // 开始移动调用
        onStart(e) {

        },
        // 开始移动时
        onMove(e) {
            if (e.getBoundingClientRect().top <= 30) {
                document.body.scrollTop = document.body.scrollTop >= 4 ? document.body.scrollTop - 4 : 0

            } else if (window.screen.availHeight - e.getBoundingClientRect().bottom <= 150) {

                document.body.scrollTop = document.body.scrollTop + 4
            }
        },
        // 检测是否落入目标区域
        checkPos() {

        }
    }
}
</script>

<style lang="less" scoped>
.pg-mobile-move {
    display: block;
    overflow: hidden;
    border: 2px solid red;
    margin-top: 100px;
    position: relative;
}
.box {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-shadow: 1px 1px 0 white;
    font-size: 20px;
    background-size: cover;
}
</style>