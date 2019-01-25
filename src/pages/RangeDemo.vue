<template>
    <main class="demo-page fill">
        <!-- 默认 -->
        <h4 class="fill gutter-top">默认最大值100, 最小值0, 当前:
            <span class="text-primary">{{value1}}</span>
        </h4>
        <a-range v-model="value1">
            <h4 style="word-break: keep-all;white-space: nowrap;" class="fill bg-white">✈️ 起飞</h4>
        </a-range>

        <!-- has-dots -->
        <h4 class="fill gutter-top">最大值20, 最小值10, 显示断点, 当前:
            <span class="text-primary">{{value2}}</span>
        </h4>
        <a-range v-model="value2" :has-dots="true" :min="10" :max="20"/>

        <!-- step -->
        <h4 class="fill gutter-top">最大值4, 最小值0, 每一步1, 当前:
            <span class="text-primary">{{value3}}</span>
        </h4>
        <a-range v-model="value3" :has-dots="true" :min="0" :max="4" :step="1"/>

        <!-- 自定义把手 -->
        <h4 class="fill gutter-top">自定义把手样式, 当前:
            <span class="text-primary">{{value4}}</span>
        </h4>
        <a-range v-model="value4">
            <div slot="handler" class="fill-sm text-white flex align-items-center" style="background: rgba(0,0,0,0.1); word-break: keep-all;white-space: nowrap;"><a-icon class="text-primary" name="star-half" /></div></div>
        </a-range>

    </main>
</template>
<script>
export default {
    name: "RangeDemo",

    data() {
        return {
            value1: 10,
            value2: 6,
            value3: 2,
            value4: 10,
        };
    }
};
</script>
<style scoped lang="scss">
@import "../scss/variables.scss";
.demo-page {
    height: calc(100% - 55px);
}
</style>
