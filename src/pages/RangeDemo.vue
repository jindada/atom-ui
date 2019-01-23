<template>
    <main class="demo-page fill">
        <h4 class="fill gutter-top">默认最大值100, 最小值0, 当前: <span class="text-primary">{{value1}}</span> </h4>
        <a-range v-model="value1"/>

        <h4 class="fill gutter-top">最大值20, 最小值10, 当前: <span class="text-primary">{{value2}}</span></h4>
        <a-range v-model="value2" :min="10" :max="20"/>
        
        <h4 class="fill gutter-top">最大值60, 最小值10, 每一步2, 当前: <span class="text-primary">{{value3}}</span></h4>
        <a-range v-model="value3" :min="10" :max="60" :step="2"/>
    </main>
</template>
<script>
export default {
    name: 'RangeDemo',

    data() {
        return {
            value1: 10,
            value2: 6,
            value3: 10
        };
    },
};
</script>
<style scoped lang="scss">
@import '../scss/variables.scss';
.demo-page {
    height: calc(100% - 55px);
}
</style>
