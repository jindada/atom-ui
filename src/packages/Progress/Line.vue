<template functional>
    <div :class="{'atom-progress-line--rounded': props.hasBorderRadius}" class="atom-progress-line">
        <div :class="{rounded: props.hasBorderRadius}" class="atom-progress-line__body" :style="{width: props.value + '%', transition: 'width ' + props.speed + 'ms'}"></div>
    </div>
</template>
<script>
export default {
    name: 'AtomProgressLine',

    props: {
        value: {
            type: [Number, String]
        },

        speed: {
            type: [Number, String],
            default: 300
        },

        hasBorderRadius: {
            type: Boolean,
            default: true
        }
    }
};
</script>