<template>
    <transition
        :name="`kon-collapse${fade ? '-fade' : ''}`"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
    >
        <slot />
    </transition>
</template>

<script>
    export default {
        name: 'KonCollapse',
        props: {
            /**
             * Determines the axis on which the transition may occur.
             * 
             * @values x, y, both
             */
            mode: {
                type: String,
                default: 'y',
                validator(val){
                    return ['x', 'y', 'both'].includes(val);
                },
            },
            /**
             * If set to true the element within the slot will become position: absolute WHEN LEAVING.
             */
            absolute: {
                type: Boolean,
                default: false,
            },
            /**
             * If set to true the elements will fade in and out aka. Their opacity will change.
             */
            fade: {
                type: Boolean,
                default: false,
            },
        },
        data: function(){
            return {
                leavingElementSize: {
                    height: null,
                    width: null,
                },
            };
        },
        methods: {
            /**
             * @param {HTMLElement} element
             */
            enter(element) {
                if(this.mode != 'both'){
                    const sizeProperty = this.mode == 'y' ? 'height' : 'width';
                    const computedSize = getComputedStyle(element)[sizeProperty];
                    
                    // Use the leaving element height as the initial state to prevent jumping
                    if(this.absolute){
                        element.style[sizeProperty] = this.leavingElementSize[sizeProperty] || 0;
                    }else{
                        element.style[sizeProperty] = 0;
                    }

                    // Force repaint
                    void element.offsetHeight;

                    // Trigger the animation once the browser has finished repainting
                    requestAnimationFrame(() => {
                        element.style[sizeProperty] = computedSize;
                    });
                }else{
                    // const height = `${element.offsetHeight}px`;
                    // const width = `${element.offsetWidth}px`;
                    const {width, height} = getComputedStyle(element);
                    element.style.height = 0;
                    element.style.width = 0;

                    void element.offsetHeight;

                    requestAnimationFrame(() => {
                        element.style.height = height;
                        element.style.width = width;
                    });
                }
            },
            /**
             * @param {HTMLElement} element
             */
            afterEnter(element) {
                if(this.mode != 'both'){
                    const sizeProperty = this.mode == 'y' ? 'height' : 'width';
                    element.style[sizeProperty] = 'auto';
                }else{
                    element.style.height = "auto";
                    element.style.width = "auto";
                }
            },
            /**
             * @param {HTMLElement} element
             */
            leave(element) {
                if(this.absolute){
                    element.style.position = 'absolute';
                }
                if(this.mode != 'both'){
                    const sizeProperty = this.mode == 'y' ? 'height' : 'width';
                    const computedSize = getComputedStyle(element)[sizeProperty];
                    element.style[sizeProperty] = computedSize;

                    if(this.absolute){
                        this.leavingElementSize[sizeProperty] = computedSize;
                    }

                    void element.offsetHeight;

                    requestAnimationFrame(() => {
                        element.style[sizeProperty] = 0;
                    });
                }else{
                    const {width, height} = getComputedStyle(element);
                    element.style.height = height;
                    element.style.width = width;

                    if(this.absolute){
                        this.leavingElementSize.height = height;
                        this.leavingElementSize.width = width;
                    }

                    void element.offsetHeight;

                    requestAnimationFrame(() => {
                        element.style.height = 0;
                        element.style.width = 0;
                    });
                }
            }
        },
    }
</script>