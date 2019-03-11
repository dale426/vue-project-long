<template>
    <div>
        <h1>parents</h1>
        <Button type="primary" @click="showV2">展示V2</Button>
        <div>
            <h2>child</h2>
            <childv1 :data="datalist"></childv1>
        </div>
        <div>
            <h2>child2</h2>
            <div v-if="v22">
                <childv2 :data="datalist"></childv2>
            </div>
        </div>
    </div>
</template>

<script>
import childv1 from "./child1.vue";
import childv2 from "./child2.vue";
export default {
    name: 'parent',
    data() {
        return {
            datalist: [],
            v22: false
        }
    },
    components: {
        childv1, childv2
    },
    beforeCreate() {
        console.log('parent beforeCreated');

    },
    async created() {
        console.log('parent created');
        await this.queryData()
    },
    mounted() {
        console.log('parent mounted');
    },
    methods: {
        showV2() {
            this.v22 = true
        },
        queryData() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.datalist.push(123)
                    console.log('ajax-end');
                    
                    return Promise.resolve()
                }, 2000)
            })

        }
    },
}
</script>
