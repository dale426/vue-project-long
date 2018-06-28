<template>
<div>
    <Breadcrumb>
        <BreadcrumbItem to="/">首页</BreadcrumbItem>
        <BreadcrumbItem to="/components/breadcrumb">我的基金</BreadcrumbItem>
        <BreadcrumbItem>自选基金</BreadcrumbItem>
    </Breadcrumb>
</div>
</template>
<script>
export default {
    name: "selfSelect",
    data() {
        return {
            formDate: {}
        };
    },
    mounted() {}
}
</script>

