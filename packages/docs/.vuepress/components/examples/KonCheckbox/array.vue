<template>
    <div class="example">
        <KonCheckbox v-model="values" value="JP" label="Japan" />
        <KonCheckbox v-model="values" value="ES" label="Spain" />
        <KonCheckbox v-model="values" value="MX" label="Mexico" />
        <KonCheckbox v-model="values" value="CA" label="Canada" />
        <KonCheckbox v-model="values" value="KR" label="South Korea" />
        <div class="results">
            <h3>Checkbox results</h3>
            <pre class="language-json">values: {{ values }}</pre>
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