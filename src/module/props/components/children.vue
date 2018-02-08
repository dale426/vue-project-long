<template>
    <div>
        <h2>我是子组件</h2>
        <div class="u-text">值由父组件传递下来：</div>
        <div>
            <ul>
                <li>姓名：{{ name }}</li>
                <li>年龄：{{ acount }} </li>
                <li>存款：<strong style="color: red;"> {{ money }} </strong> </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'chilrdren',
    props: ['name', 'acount', 'money'],
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
    .u-text{
        padding: 30px 0;
        color: #ff0080;
        font-size: 16px;
    }
</style>
