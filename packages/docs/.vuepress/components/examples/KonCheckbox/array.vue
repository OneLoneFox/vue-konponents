<template>
    <div class="demo">
        <KonCheckbox v-model="values" value="JP" label="Japan" />
        <KonCheckbox v-model="values" value="ES" label="Spain" />
        <KonCheckbox v-model="values" value="MX" label="Mexico" />
        <KonCheckbox v-model="values" value="CA" label="Canada" />
        <KonCheckbox v-model="values" value="KR" label="South Korea" />
    </div>
</template>

<script>
import injectResultSnippet from '../../mixins/injectResultSnippet';
export default {
    mixins: [injectResultSnippet],
    data: function(){
        return {
            values: [],
        };
    },
    computed: {
        results: function(){
            return {
                values: this.values,
            };
        }
    }
}
</script>