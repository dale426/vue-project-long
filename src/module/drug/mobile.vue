<template>
    <div class="pg-mobile-move">
        <div v-for="item in list" :key="item.id" :style="{background: item.color, height: '100px'}">
            <img
                :move="true"
                class="box"
                :data-key="item.id"
                :src="item.url"
                alt
                @touchstart="touchstart"
                @touchmove="touchmove"
				@touchend="touchend($event, item.id)"
                @click="handlerClick"
            />
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
                color: 'lightblue',
                id: 'bb',
                content: '这是第2个',
                url: 'http://img.souche.com/f2e/fd1386859f281b07ab66b77ea547e188.png'
            }, {
                id: 'cc',
                color: 'green',
                content: '这是第3个',
                url: 'http://img.souche.com/f2e/725010505271b56446bcffcfcb1efd9f.jpeg'
            }, {
                id: 'dd',
                color: 'orange',
                content: '这是第4个',
                url: 'http://img.souche.com/f2e/684bcbff9b2c9c7fcd86f7676674914f.jpeg'
            }],
            domList: [],
            posList: []
        }
    },
    mounted() {
        this.queryDomList()
    },
    methods: {
        async queryDomList() {
            let domList = await this.getElementByAttr('img', 'move');
            for (let key in domList) {
				let element = domList[key].getBoundingClientRect();

                this.posList[key] = {
                    minX: element.left - (element.width) / 2,
                    maxX: element.left + (element.width) / 2,
                    minY: element.top - (element.height) / 2,
                    maxY: element.top + (element.height) / 2,
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
            e.preventDefault();
            e.stopPropagation();
            var tar = e.target;
            //执行定义在拖动开始时须执行的函数， 参数为即将拖动的元素
            // this.opts.onStart(tar);
            this.onStart(tar);
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
            var tar = e.target;
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
			console.log('e', e);
			// 松开时 当前位置
			let nowX = e.target.x + this.moveX;
			let nowY = e.target.y + this.moveY;
			console.log('nowX, nowY', nowX, nowY);
			
			// 判断进入了哪个目标区域
			for (let key in this.posList) {
				if (nowX < this.posList[key].maxX 
				&& nowX > this.posList[key].minX
				&& nowY < this.posList[key].maxY
				&& nowY > this.posList[key].minY
				) {
					console.log('key', key);
					break;
				}
			}


            //目标区域的视觉变化
            // this.tarEle.style.cssText = "opacity: .5;"
            //检测最终位置
            // this.checkPos('end', e.target);

            // 判断是否进入一个正确的目标区域

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
        onStart() {
        },
        // 开始移动时
        onMove(e) {


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
}
</style>