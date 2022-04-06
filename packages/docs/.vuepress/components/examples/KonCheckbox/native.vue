<template>
    <div class="demo">
        <KonCheckbox name="rice" value="rice" label="Rice" />
        <KonCheckbox name="dumplings" value="dumplings" label="Dumplings" />
        <KonCheckbox name="ramen" value="ramen" label="Ramen" checked />
        <KonCheckbox name="tacos" value="tacos" label="Tacos" checked @change="change" />
        <KonCheckbox name="pizza" value="pizza" label="Pizza" />
    </div>
</template>

<script>
export default {
    methods: {
        change: function(e){
            console.log(e);
        },
    },
}
</script>