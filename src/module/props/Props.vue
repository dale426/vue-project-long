<template>
    <contenerWrap> 
        <div class="parents">
            <h2>我是父组件</h2>
            <div class="p-content">
                <div class="u-text">父组件内容： {{ msg }}</div>
                <Form :model="formItem" :label-width="80">
                    <FormItem label="姓名：">
                        <Input v-model="formItem.name" placeholder="Enter something..."> </Input>
                    </FormItem>
                </Form>
                <p class="u-info">点击按钮激活子组件，并传值下去</p>
                <Button type="warning">激活子组件</Button>
            </div>
        </div>
        <div>
            <Children :name="formItem.name" :age="formItem.age" :money="formItem.money"> </Children>
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
            msg: 0,
            formItem: {
                name: 'liyulong',
                age: '25',
                money: 1000000
            }
        }
    },
    components: {contenerWrap, Children}
}
</script>
<style lang="less">
    .parents{
        margin: 20px;
        padding: 15px;
        border: 2px solid #ff8000;
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

