<template>
    <div>
        <h2>我是子组件</h2>
        <div class="u-text">值由父组件传递下来：</div>
            <ul class="parent-info">
                <li>姓名：{{ name }}</li>
                <li>年龄：{{ acount }} </li>
                <li>存款：<strong style="color: red;"> {{ longMoney }} </strong> </li>
                <li>存款+1：<strong style="color: red;"> {{ myMoney }} </strong> </li>
                

            </ul>
            <div class="children-change">
                <Form :model="formItem" :label-width="80" class="long-form-wrap">
                    <FormItem label="消费金额：">
                        <Input v-model="formItem.costMoney"  placeholder="请输入你的存款"></Input>
                    </FormItem>
                    <Button type="primary" @click="changeMoney">消费</Button>
                </Form>
            </div>
    </div>

</template>

<script>
export default {
    name: 'chilrdren',
    props: ['name', 'acount', 'long-money'],
    data() {
        return {
            formItem: {
                costMoney: '',
            },
            message: ''
        }
    },
    methods: {
        changeMoney() {
            this.$emit('child-cost', this.formItem.costMoney )
        }
    },
    computed: {
        myMoney() {
            return this.longMoney + 1
        }
    }
}
</script>
<style lang="less">
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
