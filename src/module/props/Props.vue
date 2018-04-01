<template>
    <div class="wrap">
        <div class="wrap-conter">
            <h2>我是父组件</h2>
            <div class="p-content">
                <div class="u-text">父组件内容-->> 账户余额： {{ formItem.money }}</div>
                <div></div>
                <Form :model="formItem" :label-width="80" class="long-form-wrap">
                    <FormItem label="姓名：" style="min-width: 200px;">
                        <span> {{ formItem.name }} </span>
                    </FormItem>
                    <FormItem label="账号：" style="min-width: 200px;">
                        <span> {{ formItem.acount }} </span>
                    </FormItem>
                    <FormItem label="存款：">
                        <Input v-model="tempMoney"  placeholder="请输入你的存款" />
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
                :money="formItem.money" 
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
<<<<<<< HEAD
            this.formItem.money += Number(this.tempMoney)
            this.tempMoney = ''
        },
        reduceMoney(fee) {
            console.log('fee', fee)
            this.formItem.money -= Number(fee)
=======
            this.tempMoney += Number(this.formItem.money) 
            this.formItem.money = ''
        },
        costMoney(money) {
            console.log("money", money)
            this.tempMoney -= Number(money)
>>>>>>> a82f1ed38819b6b7938465c1931a826b59edcac3
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

