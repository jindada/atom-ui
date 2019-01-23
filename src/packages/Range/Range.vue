<template>
    <div class="atom-range">
        <div class="atom-range__body">
            <input hidden :value="value" :name="name">
            <!-- 进度条 -->
            <a-progress-line ref="progress" :value="progress"/>
            <!-- 抓手 -->
            <span ref="handler" :style="{left: `${progress}%`}" class="atom-range__handler">
                <slot></slot>
            </span>
        </div>
    </div>
</template>
<script>
import AnyTouch from "any-touch";
import AProgressLine from "../../packages/Progress/Line";
export default {
    name: "AtomRange",

    components: { AProgressLine },

    props: {
        name: {
            type: String
        },

        min: {
            type: Number,
            default: 0
        },

        max: {
            type: Number,
            default: 100
        },

        step: {
            type: Number,
            default: 1
        },

        value: {
            type: [Number, String],
            required: true
        }
    },

    data() {
        return {
            // 滚动条长度
            progressBarWidth: 0
        };
    },

    computed: {
        progress() {
            const start = this.value-this.min;
            const length = this.max - this.min;
            const progress =  Math.round(start / length * 100);
            return Math.max(Math.min(100, progress), 0);
        }
    },

    mounted() {
        const at = new AnyTouch(this.$refs.handler);
        this.progressBarWidth = this.$el.offsetWidth;
        at.on('panstart', ev => {
            this.moveHandler(ev.deltaX);
        });

        at.on('panmove', ev => {
            this.moveHandler(ev.deltaX);
        });
    },

    methods: {
        moveHandler(deltaX) {
            let value = (this.value + (deltaX / this.progressBarWidth) * (this.max - this.min));
            value = Math.max(Math.min(this.max, value), this.min);
            this.$emit('input', value);
        }
    }
};
</script>