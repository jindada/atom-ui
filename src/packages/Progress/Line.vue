<template>
    <div :class="{'atom-progress-line--rounded': hasBorderRadius}" class="atom-progress-line">
        <div :class="{rounded: hasBorderRadius}" class="atom-progress-line__body" :style="{width: value + '%', transition: 'width ' + speed + 'ms'}"></div>
    </div>
</template>
<script>
/**
 * 发现functional组件的没法在父组件中通过$refs访问, 
 * 所以暂时不用
 */
export default {
    name: 'AtomProgressLine',

    props: {
        value: {
            type: [Number, String]
        },

        speed: {
            type: [Number, String],
            default: 0
        },

        hasBorderRadius: {
            type: Boolean,
            default: true
        }
    }
};
</script>