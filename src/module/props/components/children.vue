<template>
    <div class="jhk">
        <h2>我是子组件</h2>
        <div class="u-text">值由父组件传递下来：</div>
            <ul class="parent-info">
                <li>姓名：{{ name }}</li>
                <li>账号：{{ acount }} </li>
                <li>存款：<strong style="color: red;"> {{ money }} </strong> </li>
            </ul>
            <div class="children-change">
                <Form :model="formItem" :label-width="80" class="long-form-wrap">
                    <FormItem label="消费金额：">
                        <Input v-model="tempMoney"  placeholder="请输入你的存款"> </Input>
                    </FormItem>
                    <Button type="primary" @click="changeMoney">消费</Button>
                </Form>
            </div>
    </div>

</template>

<script>
export default {
    name: 'chilrdren',
    props: ['name', 'acount', 'money'],
    data() {
        return {
            tempMoney: '',
            formItem: {

            },
            message: ''
        }
    },
    methods: {
        changeMoney() {
            this.$emit('on-cost', this.tempMoney)
            this.tempMoney = ''
        }
    }
}
</script>
<style lang="less" scoped>
    .u-text{
        padding: 10px 0;
        color: #ff0080;
        font-size: 16px;
    }
    .children-change{
        margin: 10px 0;
        padding: 10px;
        min-height: 100px;
        border: 1px solid #ccc;
    }    
</style>
