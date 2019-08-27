<template>
  <div>
     <div 
     v-for="item in list"
     :key="item.id"
     class="box"
     :style="{background: item.color}"
     
     >
  {{item.content}}
     </div>
  </div>
</template>

<script>
  export default {
    name: 'mobile',
    data() {
      return {
        list: [{
          id: 1,
          color: 'yellow',
          content: '这是第一个'
        },{
          color: 'lightblue',
          id: 2,
          content: '这是第2个'
        },{
          id: 3,
          color: 'green',
          content: '这是第3个'
        },{
          id: 32,
          color: 'orange',
          content: '这是第4个'
        },{
          id: 323,
          color: 'purple',
          content: '这是第5个'
        },{
          id: 4,
          color: 'pink',
          content: '这是第6个'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  .box {
    display: inline-block;
    width: 100px;
    height: 100px;
    text-shadow: 1px 1px 0 white;
    font-size: 20px;
  }
</style>