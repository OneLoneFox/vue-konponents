<template>
    <div>
        <div class="collapse-toggle" tabindex="0">
            <i class='bx bx-code-alt'></i>
        </div>
        <transition
            name="expand"
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
        >
            <div v-if="expanded">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        expanded: false,
    },
    methods: {
        enter(element) {
            const width = getComputedStyle(element).width;

            element.style.width = width;
            element.style.position = "absolute";
            element.style.visibility = "hidden";
            element.style.height = "auto";

            const height = getComputedStyle(element).height;

            element.style.width = null;
            element.style.position = null;
            element.style.visibility = null;
            element.style.height = 0;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;

            // Trigger the animation.
            // We use `requestAnimationFrame` because we need
            // to make sure the browser has finished
            // painting after setting the `height`
            // to `0` in the line above.
            requestAnimationFrame(() => {
                element.style.height = height;
            });
        },
        afterEnter(element) {
            element.style.height = "auto";
        },
        leave(element) {
            const height = getComputedStyle(element).height;

            element.style.height = height;

            // Force repaint to make sure the
            // animation is triggered correctly.
            getComputedStyle(element).height;

            requestAnimationFrame(() => {
                element.style.height = 0;
            });
        },
    },
};
</script>

<style lang="scss" scoped>
*{
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}
.expand-enter-active,
.expand-leave-active {
    transition: height 250ms ease-in-out;
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}
.collapse-toggle{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: #292929;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    outline: none;
    &::before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(53, 67, 255, 0.1);
        transform: scale(0);
        transform-origin: center;
        transition: transform 150ms ease;
    }
    &:hover, &:focus{
        &::before{
            transform: scale(1);
        }
    }
}
</style>