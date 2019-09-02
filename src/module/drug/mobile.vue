<template>
    <div class="pg-mobile-move">
        <div
            v-for="(item, index) in list"
            :key="item.id"
            :style="{background: item.color, height: '140px',width: '100px', display: 'inline-block'}"
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
 * 
 * 一、初始化记录所有可移动元素的位置  --- 直接将dom存储在数组中
 * 1 计算出每个可移动DOM的位置存储
 * 
 * 二、拖动时判断
 * 1 定时模拟长按效果
 * 2 拖动时通过 touchmove 动态修改 当前元素的样式， 实现跟随效果
 * 
 * 三、松开手指时 touchend
 * 1 松开时获取当前松开的位置
 * 2 判断该位置落入哪个可以交换顺序的DOM中
 * 3 回传拖动的DOM 和 落入的DOM的key 以交换两个数据
*/

/**
 * 获取滚动条高度
 * ==> PC 
 * document.documentElement.scrollTop
 * ===> mobile
 * document.body.scrollTop
 */

/** 
 * method -> getBoundingClientRect 获取DOM相对视口的位置, 返回位置信息对象
 * top:    dom顶部距离视口 -顶部- 的距离
 * bottom: dom底部距离视口 -顶部- 的距离
 * left:   dom左边距离视口 -左边- 的距离
 * right:  dom右边距离视口 -左边- 的距离
 * width:  元素的宽度
 * height: 元素的高度
 */

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
            let aElements = document.getElementsByTagName(tag);
            let aEle = [];
            for (let i = 0; i < aElements.length; i++) {
                let ele = aElements[i].getAttribute(dataAttr);
                if (ele === 'true') {
                    let key = aElements[i].getAttribute('data-key');
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

            let tar = e.target;
            this.onStart(e);

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

            // 判断进入了哪个目标区域  soureEl-移动的元素   key- 落入的目标元素
            for (let key in this.posList) {
                if (nowX < this.posList[key].maxX
                    && nowX > this.posList[key].minX
                    && nowY < this.posList[key].maxY
                    && nowY > this.posList[key].minY
                ) {
                    this.list.splice(soureEl, 1, ...this.list.splice(key, 1, this.list[soureEl]));
                    break;
                }
            }
            this.onEnd(e)
        },

        // 移动元素
        setMove(e, type) {
            let x = this.moveX || 0,
                y = this.moveY || 0;
            if (type === 'reset') {
                e.style.cssText = '';
                return;
            }
            // e.style.cssText += 'position: absolute;-webkit-transform: translate(' + x + 'px,' + y + 'px);';
            e.style.cssText += '-webkit-transform: translate(' + x + 'px,' + y + 'px);';
        },
        // touchstart时调用
        onStart(e) {
            // 长按时间控制
            this.canMove = false;
            this.delayTimer ? window.clearTimeout(this.delayTimer) : null;
            this.delayTimer = setTimeout(() => {
                this.canMove = true;
            }, 100);
        },
        // touchmove 开始移动时
        onMove(e) {
            if (e.getBoundingClientRect().top <= 30) {
                document.body.scrollTop = document.body.scrollTop >= 4 ? document.body.scrollTop - 4 : 0

            } else if (window.screen.availHeight - e.getBoundingClientRect().bottom <= 150) {

                document.body.scrollTop = document.body.scrollTop + 4
            }
        },
        onEnd(e) {
            // 清除拖动时的样式
            let targetStyle = e.target.style.cssText
            e.target.style.cssText = targetStyle.split('transform')[0] || '';
            this.delayTimer ? window.clearTimeout(this.delayTimer) : null
            this.canMove = false;
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
    width: 400px;
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