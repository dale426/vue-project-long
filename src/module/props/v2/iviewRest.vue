<template>
    <Form
        ref="formDynamic"
        :model="formDynamic"
        :rules="validate"
        :label-width="80"
        style="width: 300px"
    >
        <FormItem
            v-for="(item, index) in formDynamic.items"
            v-if="item.status"
            :key="index"
            :label="'Item ' + item.index"
            :prop="'items.' + index + '.value'"
            :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}"
        >
            <Row>
                <Col span="18">
                    <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
                </Col>
                <Col span="4" offset="1">
                    <Button @click="handleRemove(index)">Delete</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem v-if="showName" label="姓名" prop="name">
            <Input type="text" v-model="formDynamic.name"></Input>
        </FormItem>
        <FormItem label="住址" prop="address">
            <Input type="text" v-model="formDynamic.address"></Input>
        </FormItem>
        <FormItem>
            <Row>
                <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                </Col>
            </Row>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
            <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
            <Button @click="showName=!showName" style="margin-left: 8px">showName</Button>
        </FormItem>
    </Form>
</template>
<script>
export default {
    data() {
        return {
            index: 1,
              showName: true,
            formDynamic: {
                name: '',
                address:'',
                items: [
                    {
                        value: '',
                        index: 1,
                        status: 1
                    }
                ]
            },
            validate: {
                name: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '地址不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            console.log('this.formDynamic', this.formDynamic);

            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields(); 
        },
        handleAdd() {
            this.index++;
            this.formDynamic.items.push({
                value: '',
                index: this.index,
                status: 1
            });
        },
        handleRemove(index) {
            this.formDynamic.items[index].status = 0;
        }
    }
}
</script>
