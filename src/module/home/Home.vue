<template>
    <div class="banner">
        <ul ref="imageWrap" :style="imageBox" class="clearfix">
            <li><a href="#"><img src="../../assets/images/tb8.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb1.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb2.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb3.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb4.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb5.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb6.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb7.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb8.jpg" alt=""></a></li>
            <li><a href="#"><img src="../../assets/images/tb1.jpg" alt=""></a></li>
        </ul>
        <ul>
            <li class="now"></li>
            <li @click="clickHandle"></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <Button @click="btnPre" type="primary">上一张</Button>
        <Button @click="btnNext" type="primary">下一张</Button> 
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            dream: '永远年轻、永远热泪盈眶',
            imageBox: {
                border: "1px solid red",
                transform: 'translateX(-10%)',
                '-webkit-transform': 'translateX(-10%)'
            },
            imgIndex: 1

        }
    },
    mounted() {
        this.addTransition()
        this.addTranslationEnd()
        setInterval(() => {
            this.btnNext()
        }, 4000)
    },
    methods: {
        
        // 位置滚动
        setTranslateX(translateX) {
            this.imageBox = {
                ...this.imageBox,
                '-webkit-transform': "translateX(" + translateX + ")",
                transform: "translateX(" + translateX + ")"
            }
        },
        // 添加过渡效果
        addTransition() {
            this.imageBox = {
                ...this.imageBox,
                webkitTransition: "all .6s",
                transition: "all .6s"
            }
        },
        // 移除过渡效果
        removeTransition() {
            this.imageBox = {
                ...this.imageBox,
                webkitTransition: "none",
                transition: "none"
            }
        },
        // 下一张图片
        btnNext() {
            this.imgIndex++
            let index = this.imgIndex
            if (index === 2 || index === 9) {
                this.addTransition()
            }
            this.setTranslateX('-' + index * 10 + '%')
            console.log('nex - index', this.imgIndex)
        },
        // 上一张
        btnPre() {
            this.imgIndex--
            let index = this.imgIndex
            if (index === 7 || index === 0) {
                this.addTransition()
            }
            this.setTranslateX('-' + index * 10 + '%')
            console.log('pre - index', this.imgIndex)
        },
        // 绑定translationEnd事件
        addTranslationEnd() {
            this.$refs.imageWrap.addEventListener('transitionend', () => {
                if (this.imgIndex >= 9) {
                    this.imgIndex = 1
                    this.removeTransition()
                    this.setTranslateX('-' + 10 + '%')
                } else if (this.imgIndex <= 0) {
                    this.imgIndex = 8
                    this.removeTransition()
                    this.setTranslateX('-' + 80 + '%')
                }
                console.log('event - index', this.imgIndex)
            })
        },
        clickHandle() {
            let num = 0
            for (let i = 0; i < 10; i++) {
                num += i
            }
            console.log(num)
        }
    }
}
</script>
<style lang="less">
.banner {
  position: relative;
  overflow: hidden;
//   width: 50%;
  ul:first-child {
    width: 1000%;

    li {
      width: 10%;
      float: left;
    }
    a {
      width: 100%;
      display: block;
      img {
        width: 100%;
        display: block;
      }
    }
  }
  ul:last-child {
    height: 10px;
    width: 220px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -110px;
    li {
      width: 10px;
      height: 10px;
      float: left;
      border-radius: 5px;
      border: 1px solid #fff;
      margin-left: 20px;
    }
    li:nth-child(1) {
      margin-left: 0;
    }
    li.now {
      background: #fff;
    }
  }
}
</style>

