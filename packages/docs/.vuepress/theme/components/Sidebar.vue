<template>
    <ParentSideBar :items="items" />
</template>

<script>
    import ParentSideBar from '@parent-theme/components/SideBar.vue';
    export default {
        name: 'SideBar',
        components: {ParentSideBar},
        props: ['items'],
    }
</script>

<style lang="scss">
.sidebar{
    border: none;
    width: var(--doc-sidebar-width);
}
</style>