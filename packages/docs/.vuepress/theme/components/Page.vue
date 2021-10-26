<template>
    <div class="page">
        <div class="page-content">
            <slot name="top" />
            <!-- <div class="hero">{{ $title }}</div> -->
            <Content />
            <aside class="content-sidebar">
                <ContentSidebarLinks :items="sidebarItems" :depth="1" />
            </aside>
            <slot name="api" />
            <slot name="bottom" />
        </div>
        <PageEdit />
    </div>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue';
import ContentSidebarLinks from '@theme/components/ContentSidebarLinks.vue';
export default {
    components: {PageEdit, ContentSidebarLinks},
    props: ['sidebarItems'],
}
</script>

<style lang="scss">
.page{
    padding-left: var(--doc-sidebar-width);
}
.page-content{
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px 40px;
    margin-top: var(--doc-navbar-height);
    & > .content__default{
        position: relative;        
        z-index: 1;
    }
    &::before{
        content: '';
        position: fixed;
        bottom: 0;
        right: 0;
        width: calc(100% - var(--doc-sidebar-width));
        height: calc(100% - var(--doc-navbar-height));
        // background: rgb(var(--doc-background-color));
        background: rgb(var(--background-color));
        border-radius: 40px 0 0 0;
        z-index: 0;
    }
}
</style>