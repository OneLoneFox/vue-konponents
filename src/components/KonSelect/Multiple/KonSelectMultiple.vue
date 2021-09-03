<template>
    <div
        class="kon-select-multiple"
        :class="[{'disabled': disabled, 'open': isOpen}, konStyle]"
        v-on="listeners"
        tabindex="0"
    >
        <select class="kon-multiple-fallback" multiple>
            <option v-for="item in items" :key="itemValue(item)" :selected="isSelected(item)" :value="itemValue(item)"></option>
        </select>
        <div
            class="kon-placeholder"
            v-if="!selectedItems.length"
        >
            {{ placeholder }}
        </div>
        <div
            class="kon-values"
            v-else
        >
            <button
                class="kon-value-chip"
                v-for="item in selectedItems"
                :key="itemValue(item)"
            >
                <span class="kon-value-text">{{ itemText(item) }}</span>
                <span class="kon-chip-remove" @click.stop="unselectItem($event, item)"></span>
            </button>
        </div>
        <transition name="kon-show-options">
            <div class="kon-options" v-show="isOpen">
                <div class="kon-options-list">
                    <template v-if="items.length">
                        <KonOption
                            v-for="item in items"
                            :key="itemValue(item)"
                            :value="itemValue(item)"
                            :selected="isSelected(item)"
                            @click.stop="handleItemClick($event, item)"
                            ref="options"
                        >
                            <!-- 
                                @slot Current KonOption content
                                    @binding {(string|object)} item the current item
                                    @binding {boolean} selected determines if the current item is selected
                            -->
                            <slot :item="item" :selected="isSelected(item)">
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
        name: 'KonSelectMultiple',
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
            value: {
                type: Array,
                default: []
            },
            konStyle: {
                type: String,
                default: 'default',
            },
            keepSelected: {
                type: Boolean,
                default: true,
            },
            collapseChips: {
                type: Boolean,
                default: false,
            },
            maxChips: {
                type: Number,
                default: 1,
            },
        },
        data: function(){
            return {
                isOpen: false,
                focusIndex: -1,
                selectedItems: [...this.value],
                // unselectedItems: [this.items],
                // selectedValues: this.itemValue(this.value),
                focusedItem: null,
            };
        },
        computed: {
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
                        console.log("b")
                        // clicked outside or tabbed the component
                        if( !e.relatedTarget || (e.relatedTarget && e.relatedTarget.closest('.kon-select-multiple') != this.$el) ){
                            /**
                             * Close if not focusable children (KonOption) was found.
                             * Otherwise the option will handle closing it, this is required
                             * because the blur event gets fired before click so the option list gets closed
                             * before handling the option selection
                             */
                            this.handleBlur();
                        }
                    },
                    /**
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
                    /**/
                };
            },
        },
        methods: {
            handleItemClick: function(e, item){
                if(!this.isSelected(item)){
                    this.selectItem(e, item);
                }else{
                    this.unselectItem(e, item);
                }
            },
            selectItem: function(e, item){
                this.selectedItems.push(item);
                this.$emit('change', this.selectedItems);
            },
            unselectItem: function(e, item){
                let selected = [...this.selectedItems];
                // filter out the item from the selected items array
                selected = selected.filter((selectedItem) => {
                    return this.itemValue(selectedItem) !== this.itemValue(item);
                });
                this.selectedItems = selected;
                this.$emit('change', this.selectedItems);
            },
            isSelected: function(item){
                let selectedItem = this.selectedItems.find((selItem) => {
                    return this.itemValue(selItem) === this.itemValue(item);
                });
                return !!selectedItem;
            }
        }
    }
</script>