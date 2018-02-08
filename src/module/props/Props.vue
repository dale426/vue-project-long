<template>
    <contenerWrap>
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
                            <Input  placeholder="请输入你的存款"> </Input>
                        </FormItem>
                        <Button type="success" @on-click="changeMoney">存入账户</Button>
                        
                    </Form>
                    <p>
                        <span>子组件:</span>
                        &ltChildren :money="formItem.money" &gt &lt/Children&gt
                    </p>
                </div>
            </div>

            <div class="wrap-conter">
                <Children :money="formItem.money" :acount="formItem.acount" :name="formItem.name"> </Children>
            </div>
        </div>
    </contenerWrap>
</template>
<script>
import contenerWrap from '@/components/header/contenerWrap'
import Children from './components/children'
export default {
    name: 'Props',
    data () {
        return {
            formItem: {
                name: '李玉龙',
                acount: '621559 260600 186 1109',
                money: ''
            }
        }
    },
    components: {contenerWrap, Children},
    methods: {
        changeMoney(e) {
            this.formItem.money += Number(e.target.value)
        }
    }
}
</script>
<style lang="less">
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

