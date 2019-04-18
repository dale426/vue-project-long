<template>
    <div class="long-scroll_wrap">
        <div class="long-scroll_view">
            <slot></slot>
        </div>
        <div class="long-scroll_bar">
          <div class="long-scroll_thumb"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'LongScroll',
    data() {
        return {

        }
    }
}
</script>
<style lang="less">
.long-scroll_wrap {
    position: relative;
    // overflow: hidden;
}

.long-scroll_view {
    margin-bottom: -17px;
    margin-right: -17px;
}

.long-scroll_bar{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: rgb(209, 209, 209);
  .long-scroll_thumb{
    position: relative;
    display: block;
    height: 6px;
    width: 30%;
    background: red;
    cursor: pointer;
  }
}
</style>
