<template>
  <div class="v2-child">
    我是child 001
    <ul>
      <li v-for="(item, index) in dataList" :key="index"> -----{{ item }}------ </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'child',
  props: {
    data: {
      type: Array
    }
  },
  data() {
      return {
        dataList: []
      }
  },
  beforeCreate() {
    console.log('child beforeCreated');
    
  },
  created() {
    console.log('child created');
    
    this.changeData()
  },
  mounted() {
    console.log('this.data', this.data);
    
    console.log('child mounted');
  },
  methods: {
    changeData() {
      this.dataList = this.data.map( item => {
        return item**2
      })
    }
  },
  watch: {
/*     data: {
      handler(newVal) {
        this.changeData();
      },
      immediate: true,
      deep: true
    } */
  },
}
</script>
<style lang="less">
.v2-child{
  border: 2px solid red;
}
</style>

