<template>
    <div class="example">
        <KonSwitch v-model="values" value="JP" label="Japan" />
        <KonSwitch v-model="values" value="ES" label="Spain" />
        <KonSwitch v-model="values" value="MX" label="Mexico" />
        <KonSwitch v-model="values" value="CA" label="Canada" />
        <KonSwitch v-model="values" value="KR" label="South Korea" />
        <div class="results">
            <h3>Switch results</h3>
            <pre class="language-json">checked: {{ values }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            values: [],
        };
    }
}
</script>

<style scoped>
.example {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}
.results{
    flex-basis: 100%;
}
</style>