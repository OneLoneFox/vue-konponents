<template>
    <div class="example">
        <KonInput v-model="data" label="Label as placeholder" label-as-placeholder autocomplete="off">
            <template #message v-if="data.length > 4">Input messages can be cool</template>
        </KonInput>
        
        <div class="results">
            <h3>Select konponent results</h3>
            <pre class="language-json">{{ data }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            data: '',
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