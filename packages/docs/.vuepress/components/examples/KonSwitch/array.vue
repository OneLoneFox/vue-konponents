<template>
    <div class="demo">
        <KonSwitch v-model="values" value="JP" label="Japan" />
        <KonSwitch v-model="values" value="ES" label="Spain" />
        <KonSwitch v-model="values" value="MX" label="Mexico" />
        <KonSwitch v-model="values" value="CA" label="Canada" />
        <KonSwitch v-model="values" value="KR" label="South Korea" />
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