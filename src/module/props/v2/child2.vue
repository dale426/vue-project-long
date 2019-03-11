<template>
  <div class="v2-child-V2">
    我是child-V2 001
    <ul>
      <li v-for="(item, index) in dataList" :key="index"> -----{{ item }}------ </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'child-V2',
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
    console.log('child-V2 beforeCreated');
    
  },
  created() {
    console.log('child-V2 created');
    
  },
  mounted() {
    console.log('this.data', this.data);
    
    console.log('child-V2 mounted');
    // this.changeData()
  },
  methods: {
    changeData() {
      this.dataList = this.data
    }
  },
  watch: {
    data: {
      handler(newVal) {
        this.changeData();
      },
      immediate: true
    }
  },
}
</script>
<style lang="less">
.v2-child-V2{
  border: 2px solid red;
}
</style>

