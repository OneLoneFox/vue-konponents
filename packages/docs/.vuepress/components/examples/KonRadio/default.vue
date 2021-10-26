<template>
    <div class="demo">
        <KonRadio v-model="picked" value="radio1" name="options" label="radio 1" />
        <KonRadio v-model="picked" value="radio2" name="options" label="radio 2" />
        <KonRadio v-model="picked" value="radio3" name="options" label="radio 3" />
        <KonRadio v-model="picked" value="radio4" name="options" label="radio 4" />
        <KonRadio v-model="picked" value="radio5" name="options" label="radio 5" disabled />
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