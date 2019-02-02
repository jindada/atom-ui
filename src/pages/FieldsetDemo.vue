<template>
    <main>
        <a-fieldset class="border" :status="status" :message="status">
            <!-- <a-tag slot="prepend" type="darkest">1年4班</a-tag> -->
            <input style="width:100%;" v-model="text1">
            <template slot="append">人
                <a-icon size="16" name="star"></a-icon>
            </template>
        </a-fieldset>

        <section>
            <h3 class="fill-left fill-top fill-bottom-sm">状态</h3>
            <a-cell>
                <a-radio v-model="status" value="success">success</a-radio>
            </a-cell>
            <a-cell>
                <a-radio v-model="status" value="error">error</a-radio>
            </a-cell>
            <a-cell>
                <a-radio v-model="status" value="warning">warning</a-radio>
            </a-cell>
            <a-cell>
                <a-radio v-model="status" value="loading">loading</a-radio>
            </a-cell>
        </section>
    </main>
</template>
<script>
export default {
    name: 'FieldDemo',

    data() {
        return {
            text1: '123',
            status: 'loading'
        };
    },

    methods: {}
};
</script>
<style lang="scss" scoped>
@import '../scss/variables.scss';
</style>
