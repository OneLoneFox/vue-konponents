<template>
    <div class="example">
        <KonCheckbox v-model="checked" label="simple checkbox" />
        <div class="results">
            <h3>Checkbox results</h3>
            <pre class="language-json">checked: {{ checked }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            checked: false,
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