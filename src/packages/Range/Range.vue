<template>
    <div class="atom-range">
        <div class="atom-range__body">
            <!-- 进度条 -->
            <a-progress-line ref="progress" :value="progress"/>

            <!-- 刻度 -->
            <i
                v-if="hasDots"
                v-for="n in dotsLength"
                :style="{left: `${(n-1)*100/(dotsLength-1)}%`}"
                :class="{'atom-range__icon-dot--unreached':currentValue-min<(n-1)*step}"
                class="atom-range__icon-dot"
            />

            <!-- 抓手 -->
            <span
                ref="handler"
                :id="`handler${_uid}`"
                :style="{left: `${progress}%`}"
                class="atom-range__handler"
            >
                <slot name="handler">
                    <i class="handler__icon"></i>
                </slot>
            </span>

            <!-- 气泡 -->
            <a-popper
                v-if="!!$slots.default"
                ref="popper"
                placement="top"
                :is-show.sync="isShowPopper"
                :target="`#handler${_uid}`"
            >
                <slot></slot>
            </a-popper>
        </div>
    </div>
</template>
<script>
import AnyTouch from "any-touch";
import AProgressLine from "../../packages/Progress/Line";
import APopper from "../../packages/Popper";
export default {
    name: "AtomRange",

    components: { AProgressLine, APopper },

    props: {
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
        },

        hasDots: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isShowPopper: false,
            // 滚动条长度
            progressBarWidth: 0,
            // 内部值
            currentValue: 0,

            isPanMove: false
        };
    },

    computed: {
        //百分比, 驱动界面变化
        progress() {
            const start = this.currentValue - this.min;
            const length = this.max - this.min;
            const progress = Math.round((start / length) * 100);
            // 边界处理
            return Math.max(Math.min(100, progress), 0);
        },

        dotsLength() {
            return (this.max - this.min) / this.step + 1;
        }
    },

    watch: {
        value(value) {
            if (!this.isPanMove) this.currentValue = value;
        },

        currentValue(value) {
            let _value = value;
            if (this.max < value) {
                _value = this.max;
            } else if (this.min > value) {
                _value = this.min;
            }
            _value = Math.round(_value);
            // step的整数倍
            if (0 === (_value - this.min) % this.step) {
                this.$emit("change", _value);
                this.$emit("input", _value);
            }
            // this.$emit('input', _value);
        }
    },

    mounted() {
        // 内部变量表示当前值
        this.currentValue = this.value;

        // 初始化手势
        const at = new AnyTouch(this.$refs.handler);

        // 进度条宽度
        this.progressBarWidth = this.$refs.progress.$el.offsetWidth;

        at.on("panstart", ev => {
            this.moveHandler(ev.deltaX);
        });

        at.on("panmove", ev => {
            this.moveHandler(ev.deltaX);
        });

        at.on("panend", ev => {
            this.resetBoundary();
        });

        this.$on("hook:beforeDestroy", () => {
            at.destroy();
        });
    },

    methods: {
        /**
         * 移动把手
         */
        moveHandler(deltaX) {
            this.isShowPopper = true;
            this.$nextTick(() => {
                if (this.$slots.default) {
                    // 刷新popper的位置
                    this.$refs.popper.forceUpdate();
                }
                this.isPanMove = true;
                this.currentValue +=
                    (deltaX / this.progressBarWidth) * (this.max - this.min);
            });
        },

        /**
         * 超过出边界, 那么归位到最近的边界
         */
        resetBoundary() {
            this.isPanMove = false;
            if (this.max < this.currentValue) {
                this.currentValue = this.max;
            } else if (this.min > this.currentValue) {
                this.currentValue = this.min;
            }
        }
    }
};
</script>