<template>
    <contenerWrap>
        <div class="banner">
            <ul class="clearfix">
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
        </div>
    </contenerWrap>
</template>
<script>
import contenerWrap from '@/components/header/contenerWrap'

export default {
    data () {
        return {
            dream: '永远年轻、永远热泪盈眶'
        }
    },
    components: {contenerWrap},
    methods: {
        clickHandle () {
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
      width: 100%;
      ul:first-child {
          width: 1000%;
          transform: translateX(10%);
          -webkit-transform: translateX(-10%);
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
      ul:last-child{
          height: 10px;;
          width: 220px;
          position: absolute;
          bottom: 20px;
          left: 50%;
          margin-left: -110px;
          li{
              width: 10px;
              height: 10px;
              float: left;
              border-radius: 5px;
              border: 1px solid #fff;
              margin-left: 20px;
          }
          li:nth-child(1){
              margin-left: 0;
          }
          li.now{
              background: #fff;
          }
      }
  }

</style>

