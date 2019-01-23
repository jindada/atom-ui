<template>
    <div class="atom-range">
        <div class="atom-range__body">
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
            progressBarWidth: 0,
            // 内部值 
            currentValue:0,

            isPanMove: false
        };
    },

    computed: {
        //百分比, 驱动界面变化
        progress() {
            const start = this.currentValue-this.min;
            const length = this.max - this.min;
            const progress =  Math.round(start / length * 100);
            // 边界处理
            return Math.max(Math.min(100, progress), 0);
        },

        precision(){}
    },

    watch: {
        value(value){
            if(!this.isPanMove) this.currentValue = value;
        },

        currentValue(value){
            let _value = value;
            if(this.max < value) {
                _value = this.max;
            } else if(this.min > value){
                _value = this.min;
            }
            this.$emit('input', _value);
        }
    },

    mounted() {
        // 内部变量表示当前值
        this.currentValue = this.value;

        // 初始化手势
        const at = new AnyTouch(this.$refs.handler);

        // 进度条宽度
        this.progressBarWidth = this.$refs.progress.$el.offsetWidth;

        at.on('panstart', ev => {
            this.moveHandler(ev.deltaX);
        });

        at.on('panmove', ev => {
            this.moveHandler(ev.deltaX);
        });

        at.on('panend', ev=>{
            this.resetBoundary();
        });

        this.$on('hook:destory', ()=>{
            at.destroy();
        })
    },

    methods: {
        /**
         * 移动把手
         */
        moveHandler(deltaX) {
            this.isPanMove = true;
            this.currentValue = this.currentValue + (deltaX / this.progressBarWidth) * (this.max - this.min);
        },

        /**
         * 超过出边界, 那么归位到最近的边界
         */
        resetBoundary(){
            this.isPanMove = false;
            if(this.max < this.currentValue) {
                this.currentValue = this.max;
            } else if(this.min > this.currentValue){
                this.currentValue = this.min;
            }
        }
    }
};
</script>