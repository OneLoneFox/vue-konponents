<template>
    <div
      class="kon-stepper"
      :class="{'focus': (isFocused)}"
      @click="handleClick"
      @mousedown="handleMouseDown"
    >
        <KonButton
          class="kon-stepper-decrease"
          icon-only
          ref="decreaseButton"
          @click="decrease"
        >
            <slot name="icon-decrease">
                <span class="icon-decrease-default">-</span>
            </slot>
        </KonButton>
        <div class="kon-stepper-content" key="active">
            <div class="kon-stepper-input-bg"></div>
            <div class="kon-stepper-value">
                <input
                    type="number"
                    ref="value"
                    :value="value"
                    step="stepSize"
                    v-bind="$attrs"
                    v-on="stepperListeners"
                />
                <span class="unit-label" v-if="unitLabel">{{ unitLabel }}</span>
            </div>
        </div>
        <KonButton
          class="kon-stepper-increase"
          icon-only
          ref="increaseButton"
          @click="increase"
        >
            <slot name="icon-increase">
                <span class="icon-increase-default">+</span>
            </slot>
        </KonButton>
    </div>
</template>

<script>
    import '../../KonButton/';
    export default {
        name: 'KonStepper',
        inheritAttrs: false,
        props: {
            /**
             * @model
             */
            value: {
                type: Number,
                default: 0,
            },
            /**
             * Amount to increase or decrease every step.
             * 
             * Must be greater than 0
             */
            stepSize: {
                type: Number,
                default: 1,
                validator: function(val){
                    return val > 0;
                },
            },
            /**
             * The unit the component's value is representing.
             * 
             * @ignore
             */
            unitLabel: {
                type: String,
            },
        },
        data: function(){
            return {
                isFocused: false,
                keepFocus: false,
            };
        },
        computed: {
            stepperListeners: function(){
                return {
                    ...this.$listeners,
                    input: (e) => {
                        // emit the value or 0 (in case of backspace setting the value to '')
                        this.$emit('input', e.target.value || 0);
                    },
                    focus: () => {
                        this.isFocused = true;
                    },
                    blur: (e) => {
                        // Keep the focus on button click (fires blur) once 
                        // the user has actually focused the input (not just clicked the buttons)
                        if(this.keepFocus && e.relatedTarget && e.relatedTarget.closest('.kon-stepper') == this.$el){
                            this.$refs.value.focus();
                            return;
                        }
                        this.isFocused = false;
                        this.keepFocus = false;
                        this.$emit('blur', e);
                    },
                };
            },
        },
        methods: {
            handleMouseDown: function(){
                // triggers before blur
                this.keepFocus = this.isFocused;
            },
            handleClick: function(e){
                // don't force focus if the user is directly using the buttons
                if(e.target == this.$refs.decreaseButton.$el || e.target == this.$refs.increaseButton.$el){
                    return;
                }
                this.isFocused = true;
                this.$nextTick().then(() => {
                    // wait for the ref to exist (Flipped's v-if)
                    this.$refs.value.focus();
                });
            },
            /**
             * Decreases the component's value by one stepSize unit
             */
            decrease: function(){
                // if(!this.isFocused){
                //     return;
                // }
                let decreased = this.value - this.stepSize;
                this.$emit('input', decreased);
            },
            /**
             * Increases the component's value by one stepSize unit
             */
            increase: function(){
                // if(!this.isFocused){
                //     return;
                // }
                let increased = this.value + this.stepSize;
                this.$emit('input', increased);
            },
        },
    }
</script>