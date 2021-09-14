<template>
    <div
        class="kon-select"
        :class="[{'disabled': disabled, 'open': isOpen}, konStyle]"
        v-on="listeners"
        tabindex="0"
    >
        <input type="hidden" :name="name" :value="itemValue(selectedItem)">
        <!-- <transition name="kon-select-label" mode="out-in"> -->
            <span
                class="kon-placeholder"
                key="kon-label-placeholder"
                v-if="!selectedItemExists"
            >
                {{ placeholder }}
            </span>
            <span class="kon-value" :key="`kon-label-${itemValue(selectedItem)}`" v-else>{{ itemText(selectedItem) }}</span>
        <!-- </transition> -->
        <transition name="kon-show-options">
            <div class="kon-options" v-show="isOpen">
                <div class="kon-options-list">
                    <template v-if="items.length">
                        <KonOption
                            v-for="item in items"
                            :key="itemValue(item)"
                            :value="itemValue(item)"
                            :selected="selectedValue === itemValue(item)"
                            @click="selectItem($event, item)"
                            ref="options"
                        >
                            <!-- 
                                @slot Current KonOption content
                                    @binding {(string|object)} item the current item
                                    @binding {boolean} selected determines if the current item is selected
                            -->
                            <slot :item="item" :selected="selectedValue === itemValue(item)">
                                {{ itemText(item) }}
                            </slot>
                        </KonOption>
                    </template>
                    <template v-else>
                        <KonOption disabled>
                            <slot name="empty">No options</slot>
                        </KonOption>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import selectMixin from '../../../utils/mixins/select.js';
    import "../Option/";
    export default {
        name: 'KonSelect',
        mixins: [selectMixin],
        model: {
            prop: 'value',
            event: 'change',
        },
        props: {
            name: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            items: {
                type: Array,
                required: true,
            },
            textAttribute: {
                type: String,
                default: 'text',
            },
            valueAttribute: {
                type: String,
                default: 'value',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            value: [String, Number, Object],
            returnObject: {
                type: Boolean,
                default: false,
            },
            konStyle: {
                type: String,
                default: 'default',
            },
        },
        data: function(){
            return {
                isOpen: false,
                focusIndex: -1,
                focusedItem: null,
            };
        },
        provide: function() {
            /**
             * Provide the following methods to KonOption and/or descendants
             */
            return {
                open: this.open,
                close: this.close,
                toggle: this.toggle,
                selectItem: this.selectItem,
            };
        },
        computed: {
            selectedItem: function(){
                return this.items.find((item) => {
                    return this.itemValue(item) === this.itemValue(this.value);
                });
            },
            selectedValue: function(){
                return this.itemValue(this.value);
            },
            /**
             * Used to prevent the user passing an invalid default value and thus 
             * causing the component's label to show a non existent value in the label
             */
            selectedItemExists: function(){
                if(this.value === null){
                    return false;
                }
                let foundItem = this.items.find((item) => {
                    return this.itemValue(item) === this.itemValue(this.selectedItem);
                });

                if(!foundItem){
                    this.$emit('invalid', this.selectedItem);
                }

                return !!foundItem;
            },
            /**
             * Set the events to be emitted by this comopnents
             */
            listeners: function(){
                return {
                    ...this.$listeners,
                    /**
                     * Toggles the options
                     */
                    click: (e) => {
                        this.toggle();
                        /**
                         * Click event.
                         */
                        this.$emit('click', e);
                    },
                    /**
                     * Fires when the element looses focus
                     */
                    blur: (e) => {
                        // clicked outside or tabbed the component
                        if( !e.relatedTarget || (e.relatedTarget && e.relatedTarget.closest('.kon-select') != this.$el) ){
                            /**
                             * Close if not focusable children (KonOption) was found.
                             * Otherwise the option will handle closing it, this is required
                             * because the blur event gets fired before click so the option list gets closed
                             * before handling the option selection
                             */
                            this.handleBlur();
                        }
                    },
                    keydown: (e) => {
                        if(this.isOpen){
                            // there's probably a simpler more performanct implementation but this one is, as far as I'm concerned, bulletproof
                            if(e.code == 'ArrowUp'){
                                e.preventDefault();
                                this.focusedElement = this.focusedElement?.previousElementSibling || this.focusedElement;
                                if(this.focusedElement == null){
                                    // if no item is selected then just jump to the last one
                                    let lastElement = this.$refs.options?.[this.items.length && this.items.length - 1];
                                    this.focusedElement = lastElement && lastElement.$el || null;
                                }
                                this.focusedElement?.focus?.();
                            }
                            if(e.code == 'ArrowDown'){
                                e.preventDefault();
                                this.focusedElement = this.focusedElement?.nextElementSibling || this.focusedElement;
                                if(this.focusedElement == null){
                                    // if no item is selected then just use the first one
                                    let firstElement = this.$refs.options[0];
                                    this.focusedElement = firstElement && firstElement.$el || null;
                                }
                                this.focusedElement?.focus?.();
                            }
                        }
                    },
                    keypress: (e) => {
                        if(document.activeElement == this.$el && (e.code == 'Space' || e.code == 'Enter')){
                            e.preventDefault();
                            this.toggle();
                        }
                    },
                };
            },
        },
        methods: {
            /**
             * This method gets injected to KonOption and called there on click
             * 
             * @param {(string|number)} value - The selected option's value
             * @param {string} label - The selected option's corresponding label to be displayed
             */
            selectItem: function(e, item){
                this.focusedElement = e.target;
                // let label = this.itemText(item);
                let value = this.itemValue(item);

                let oldValue = this.selectedValue;

                // this.selectedLabel = label;
                // this.selectedItem = item;
                // this.selectedValue = value;
                /**
                 * Triggers when the user clicks an option and the value gets changed
                 */
                oldValue !== value && this.$emit('change', this.returnObject ? item : value);
                // return focus ownership to the parent element
                this.$el.focus();
            },
        },
        mounted: function(){
            this.$nextTick(() => {
                if(this.value != null){
                    // set the initial focused element to be the corresponding item
                    let selectedElement = this.$refs.options.find((option) => {
                        return option.value === this.itemValue(this.value);
                    });
                    selectedElement = selectedElement && selectedElement.$el;
                    this.focusedElement = selectedElement;
                }
            });
        }
    }
</script>