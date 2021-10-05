<template>
    <ParentLayout />
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
export default {
    name: 'layout',
    components: {
        ParentLayout,
    },
}
</script>

<style lang="scss">
*{
    --doc-navbar-height: 70px;
    --doc-sidebar-width: 250px;

    box-sizing: border-box;
}
</style>