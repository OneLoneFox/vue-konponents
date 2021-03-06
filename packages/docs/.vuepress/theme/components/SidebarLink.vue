<script>
import { isActive, hashRE, groupHeaders } from "../util";

export default {
  functional: true,

  props: ["item", "sidebarDepth"],

  render(
    h,
    {
      parent: { $page, $site, $route, $themeConfig, $themeLocaleConfig },
      props: { item, sidebarDepth },
    }
  ) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path);
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active =
      item.type === "auto"
        ? selfActive ||
          item.children.some((c) =>
            isActive($route, item.basePath + "#" + c.slug)
          )
        : selfActive;
    const link =
      item.type === "external"
        ? renderExternal(h, item.path, item.title || item.path)
        : renderLink(h, item.path, item.title || item.path, active);

    const maxDepth = [
      $page.frontmatter.sidebarDepth,
      sidebarDepth,
      $themeLocaleConfig.sidebarDepth,
      $themeConfig.sidebarDepth,
      1,
    ].find((depth) => depth !== undefined);

    const displayAllHeaders =
      $themeLocaleConfig.displayAllHeaders || $themeConfig.displayAllHeaders;

    if (item.type === "auto") {
      return [
        link,
        renderChildren(h, item.children, item.basePath, $route, maxDepth),
      ];
    } else if (
      (active || displayAllHeaders) &&
      item.headers &&
      !hashRE.test(item.path)
    ) {
      const children = groupHeaders(item.headers);
      return [link, renderChildren(h, children, item.path, $route, maxDepth)];
    } else {
      return link;
    }
  },
};

function renderLink(h, to, text, active, level) {
  const component = {
    props: {
      to,
      activeClass: "",
      exactActiveClass: "",
    },
    class: {
      active,
      "sidebar-link": true,
    },
  };

  if (level > 2) {
    component.style = {
      "padding-left": level + "rem",
    };
  }

  return h("RouterLink", component, [h('span', text)]);
}

function renderChildren(h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null;
  return h(
    "ul",
    { class: "sidebar-sub-headers" },
    children.map((c) => {
      const active = isActive(route, path + "#" + c.slug);
      return h("li", { class: "sidebar-sub-header" }, [
        renderLink(h, path + "#" + c.slug, c.title, active, c.level - 1),
        renderChildren(h, c.children, path, route, maxDepth, depth + 1),
      ]);
    })
  );
}

function renderExternal(h, to, text) {
  return h(
    "a",
    {
      attrs: {
        href: to,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      class: {
        "sidebar-link": true,
      },
    },
    [text, h("OutboundLink")]
  );
}
</script>

<style lang="scss">
.sidebar {
  .sidebar-sub-headers {
    display: none;
  }
}
a {
  &.sidebar-link {
    display: inline-flex;
    align-items: center;
    position: relative;
    font-size: 1em;
    font-weight: 400;
    color: rgb(var(--foreground-color));
    padding: 0.35rem 1rem 0.35rem 1.25rem;
    width: 100%;
    box-sizing: border-box;
    transition: opacity 250ms ease ;
    opacity: 0.5;
    border-radius: 8px;
    &:hover, &.active  {
      opacity: 1;
      background: rgba(var(--foreground-color), 0.06);
    }
    &::before{
      content: '';
      display: block;
      position: absolute;
      width: 5px;
      height: 70%;
      left: 0;
      border-radius: 5px;
      background: rgb(var(--foreground-color));
      transform-origin: center center;
      transform: scale(0);
      transition: 250ms transform ease;
    }
    &.active::before{
      transform: scale(1);
    }
    > span{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
/* .sidebar-group {
  a {
    &.sidebar-link {
      padding-left: 2rem;
    }
  }
} */
</style>