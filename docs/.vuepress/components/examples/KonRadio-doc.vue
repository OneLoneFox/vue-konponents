<template>
    <div class="example">
        <KonRadio v-model="picked" value="radio1" name="options" label="radio 1" />
        <KonRadio v-model="picked" value="radio2" name="options" label="radio 2" />
        <KonRadio v-model="picked" value="radio3" name="options" label="radio 3" />
        <KonRadio v-model="picked" value="radio4" name="options" label="radio 4" />
        <div class="results">
            <h3>Checkbox results</h3>
            <pre class="language-json">Picked: {{ picked }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            picked: 'radio1',
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