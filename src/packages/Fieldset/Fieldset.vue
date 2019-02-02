<template>
    <div class="atom-fieldset">
        <label>学校</label>
        <div class="atom-fieldset__body">
            <slot name="prepend"></slot>
            <span class="flex-item">
                <slot></slot>
            </span>
            <slot name="append"></slot>
            <span
                v-if="'' !== statusIconName"
                :class="[`body__icon`, `body__icon-${statusIconName}`]"
            >
                <a-loading
                    v-if="'loading' === statusIconName"
                    width="14"
                    height="14"
                    class="text-darker"
                />
                <a-icon v-else :name="statusIconName" size="12"/>
            </span>
        </div>
        <div :class="[`atom-fieldset__message`, `atom-fieldset__message--${status}`]">{{message}}</div>
    </div>
</template>
<script>
export default {
    name: 'AtomFieldset',

    props: {
        labelFor: {
            type:String
        },
        status: {
            type: String
        },

        message: {
            type: String
        },

        hasStatusIcon: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            // status: 'success'
        };
    },

    computed: {
        statusIconName() {
            const MAP = {
                success: 'tick',
                loading: 'loading',
                error: 'close',
                warning: 'warning'
            };
            return MAP[this.status];
        }
    }
};
</script>