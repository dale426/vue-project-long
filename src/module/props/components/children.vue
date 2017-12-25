<template>
    <div>
        <h1>我是子组件</h1>
        <div>值由父组件传递下来：</div>
        <div>
            <Button type="success">接收</Button>
            <ul>
                <li>姓名：{{ name }}</li>
                <li>年龄：{{ age }} </li>
                <li>存款：{{ money }} </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chilrdren',
    props: ['name', 'age', 'money'],
    data() {
        return {
            message: ''
        }
    },
    methods: {

    }
}
</script>
<style lang="less">

</style>
