<template>
    <div class="wrap">
        <div class="wrap-conter">
            <h2>我是父组件</h2>
            <div class="p-content">
                <div class="u-text">父组件内容-->> 账户余额： {{ tempMoney }}</div>
                <div></div>
                <Form :model="formItem" :label-width="80" class="long-form-wrap">
                    <FormItem label="姓名：" style="min-width: 200px;">
                        <span> {{ formItem.name }} </span>
                    </FormItem>
                    <FormItem label="账号：" style="min-width: 200px;">
                        <span> {{ formItem.acount }} </span>
                    </FormItem>
                    <FormItem label="存款：">
                        <Input v-model="formItem.money"  placeholder="请输入你的存款" />
                    </FormItem>
                    <Button type="success" @click="changeMoney">存入账户</Button>
                    
                </Form>
                <p>
                    <span>子组件:</span>
                    <span>&ltChildren :money="formItem.money" &gt &lt/Children&gt</span>
                </p>
            </div>
        </div>

        <div class="wrap-conter">
            <Children 
                :long-money="tempMoney" 
                :acount="formItem.acount" 
                :name="formItem.name"
                @on-cost="reduceMoney">
            </Children>
        </div>
    </div>
</template>
<script>
import Children from './components/children'
export default {
    name: 'Props',
    data () {
        return {
            tempMoney: 0,
            formItem: {
                name: '李玉龙',
                acount: '621559 260600 186 1109',
                money: 0
            }
        }
    },
    components: {Children},
    methods: {
        changeMoney() {
            this.tempMoney += Number(this.formItem.money) 
            this.formItem.money = ''
        },
        reduceMoney(money) {
            console.log("money", money)
            this.tempMoney -= Number(money)
        }
    }
}
</script>
<style lang="less" scoped>
    .wrap{
        display: flex;
    }
    .wrap-conter{
        margin: 20px;
        padding: 15px;
        border: 2px solid #ff8000;
        width: 50%;
    }
    .p-content{
        padding-left: 40px;
        .u-text{
            padding: 30px 0;
            color: #ff0080;
            font-size: 16px;
        }
        .u-info{
            padding: 15px 0;
            // oblique : 倾斜体
            // italic  : 斜体
            font-style: italic;
        }

    }
</style>

