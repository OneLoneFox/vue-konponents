<template>
    <div class="example">
        <KonStepper
          v-model.number="count"
        ></KonStepper>
        <div class="result">
            <pre class="language-json">{{ count }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            count: 0,
        };
    },
}
</script>

<style scoped>
.example {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}
.result {
    flex-basis: 100%;
}
</style>