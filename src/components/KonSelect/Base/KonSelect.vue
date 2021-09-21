<template>
    <div
        class="kon-select"
        :class="[{'disabled': disabled, 'open': isOpen}, konStyle]"
        :style="`z-index: ${zIndex};`"
        v-on="listeners"
        tabindex="0"
    >
        <input type="hidden" :name="name" :value="itemValue(selectedItem)">
        <span
            class="kon-placeholder"
            key="kon-label-placeholder"
            v-if="!selectedItemExists"
        >
            {{ placeholder }}
        </span>
        <span
            class="kon-value"
            :class="{'kon-value-hidden': filterable && filterInput && isOpen}"
            :key="`kon-label-${itemValue(selectedItem)}`"
            v-else
        >
            {{ itemText(selectedItem) }}
        </span>
        <input
            class="kon-filter-input"
            v-show="filterable && filterInput && isOpen"
            type="text"
            :value="$data._search"
            @input="$data._search = $event.target.value"
            @keydown.stop="listeners.keydown"
            @blur.stop="listeners.blur"
            @change.stop=""
            ref="filterInput"
        />
        <transition name="kon-show-options" @before-enter="setHigherIndex" @after-leave="setAutoIndex">
            <div class="kon-options" v-show="isOpen">
                <transition-group name="kon-options-list" tag="div" class="kon-options-list">
                    <template v-if="filteredItems.length">
                        <KonOption
                            v-for="item in filteredItems"
                            :key="itemValue(item)"
                            :value="itemValue(item)"
                            :selected="selectedValue === itemValue(item)"
                            :disabled="disabledItem(item)"
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
                        <KonOption :key="-1" disabled>
                            <slot name="empty">
                                {{ (search == '' && $data._search == '') ? 'No options' : 'No matching results' }}
                            </slot>
                        </KonOption>
                    </template>
                </transition-group>
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
            value: [String, Number, Object],
            returnObject: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            /**
             * Searches through the items array for the matching value.
             * 
             * It's done this wat since the items prop could be an array of objects
             * and the value could either be the raw value or one complete item object.
             * 
             * @returns {Object|String|Number}
             */
            selectedItem: function(){
                return this.items.find((item) => {
                    return this.itemValue(item) === this.itemValue(this.value);
                });
            },
            /**
             * Provides the value of the currently selected item.
             * 
             * @returns {String|Number}
             */
            selectedValue: function(){
                return this.itemValue(this.value);
            },
            /**
             * Used to prevent the user passing an invalid default value and thus 
             * causing the component's label to show a non existent value in the label.
             * 
             * However if the user passes an invalid value, this will be fired as 
             * the payload of the `invalid` event.
             * 
             * @fires invalid
             * @returns {Boolean}
             */
            selectedItemExists: function(){
                if(this.value === null){
                    return false;
                }
                let foundItem = this.items.find((item) => {
                    return this.itemValue(item) === this.itemValue(this.selectedItem);
                });

                if(!foundItem){
                    /**
                     * Invalid item event.
                     * 
                     * @event invalid
                     * @type {String|Number|Object}
                     */
                    this.$emit('invalid', this.selectedItem);
                }

                return !!foundItem;
            },
            /**
             * Set the events to be emitted by this comopnent.
             * 
             * @returns {Object}
             */
            listeners: function(){
                return {
                    /**
                     * Keeps all the native events
                     */
                    ...this.$listeners,
                    /**
                     * Toggles the options
                     * 
                     * @returns {void}
                     */
                    click: (e) => {
                        this.toggle();
                        this.$emit('click', e);
                    },
                    /**
                     * Handles clicking or tabbing outside the element.
                     * 
                     * Close if not focusable children (KonOption) was found.
                     * 
                     * Otherwise the option will handle closing it, this is required
                     * because the blur event gets fired before click so the option list gets closed
                     * before handling the option selection.
                     * 
                     * @returns {void}
                     */
                    blur: (e) => {
                        if( !e.relatedTarget || (e.relatedTarget && e.relatedTarget.closest('.kon-select') != this.$el) ){
                            this.handleBlur();
                        }
                    },
                    /**
                     * Handles keyboard navigation :D
                     * 
                     * @returns {void}
                     */
                    keydown: (e) => {
                        if(this.isOpen){
                            // there's probably a simpler more performant implementation but this one is, as far as I'm concerned, bulletproof
                            if(e.code == 'ArrowUp'){
                                e.preventDefault();
                                this.focusPreviousOrLast();
                            }else if(e.code == 'ArrowDown'){
                                e.preventDefault();
                                this.focusNextOrFirst();
                            }else if(e.code == 'Enter' || e.code == 'Space'){
                                return;
                            }else{
                                if(this.isOpen && this.filterable && this.filterInput){
                                    this.$refs.filterInput.focus();
                                }
                            }
                        }
                    },
                    /**
                     * Handles space and enter keys for keyboard navigation+}
                     * 
                     * @returns {void}
                     */
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
             * Takes an item from the items list and adds it to the selected items array.
             * It then emits that array as the first argument of the `change` event.
             * 
             * @param {Event} e - The click's event payload
             * @param {Object|String|Number} item - The item to select
             * @fires change
             * @returns {void}
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