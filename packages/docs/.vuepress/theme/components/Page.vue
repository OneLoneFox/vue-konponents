<template>
  <main class="page">
    <div class="page-content">
      <slot name="top" />
      <aside class="content-sidebar">
        <ContentSidebarLinks :items="sidebarItems" :depth="1" />
      </aside>
      <div class="site-config-wrapper">
        <SiteConfig />
      </div>
      <Content class="theme-default-content" />
      <PageEdit />
      <PageNav v-bind="{ sidebarItems }" />
      <slot name="api" />
      <slot name="bottom" />
    </div>
  </main>
</template>

<script>
import PageEdit from '@theme/components/PageEdit.vue'
import PageNav from '@theme/components/PageNav.vue'
import ContentSidebarLinks from '@theme/components/ContentSidebarLinks.vue'
import SiteConfig from '@theme/components/SiteConfig.vue'

export default {
  components: { PageEdit, PageNav, ContentSidebarLinks, SiteConfig },
  props: ['sidebarItems']
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

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

</style>
