<template>
    <div class="demo">
        <KonCheckbox value="r" readonly :checked="true" label="Read" />
        <KonCheckbox value="x" readonly :checked="false" label="Write" />
        <KonCheckbox value="w" readonly :checked="false" label="Execute" />
    </div>
</template>

<script>
export default {}
</script>