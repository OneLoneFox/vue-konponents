<template>
    <div
        class="kon-select-multiple"
        :class="[{'disabled': disabled, 'open': isOpen, 'has-label': label, 'has-margin': hasMargin, 'full-width': fullWidth}, konStyle]"
        :style="`z-index: ${zIndex};`"
        v-on="listeners"
        :tabindex="disabled ? -1 : 0"
    >
        <select class="kon-multiple-fallback" multiple tabindex="-1">
            <option v-for="item in items" :key="itemValue(item)" :selected="isSelected(item)" :value="itemValue(item)"></option>
        </select>
        <label
          class="kon-select-label"
          :class="{'is-placeholder': labelAsPlaceholder, 'elevated': isElevated}"
          v-if="label"
        >
            {{ label }}
        </label>
        <div
            class="kon-placeholder"
            :class="{'kon-placeholder-hidden': filterable && filterInput && isOpen}"
            v-if="!selectedItems.length"
        >
            {{ placeholder || '&nbsp;' }}
        </div>
        <transition-group
            name="kon-select-multiple-chips"
            tag="div"
            class="kon-values"
            @before-leave="beforeLeave"
        >
            <template v-if="collapseChips && uncollapsedChips.length">
                <div
                    class="kon-value-chip"
                    v-for="item in uncollapsedChips"
                    :key="itemValue(item)"
                >
                    <span class="kon-value-text">{{ itemText(item) }}</span>
                    <span class="kon-chip-remove" @click.stop="handleRemoveClick($event, item)"></span>
                </div>
                <div
                    class="kon-value-chip"
                    key="kon-collapsed-chips"
                    v-if="extraSelectedItemsCount > 0"
                >
                    <span class="kon-value-text">{{ `+${extraSelectedItemsCount}` }}</span>
                </div>
            </template>
            <template v-else>
                <div
                    class="kon-value-chip"
                    v-for="item in selectedItems"
                    :key="itemValue(item)"
                >
                    <span class="kon-value-text">{{ getDisplayItem(item) }}</span>
                    <span class="kon-chip-remove" @click.stop="handleRemoveClick($event, item)"></span>
                </div>
            </template>
            <input
                class="kon-filter-input"
                v-if="filterable && filterInput && isOpen"
                type="text"
                key="kon-filter"
                :value="$data._search"
                @input="handleFilterInput"
                @keydown.stop="listeners.keydown"
                @blur.stop="listeners.blur"
                @change.stop=""
                ref="filterInput"
            />
        </transition-group>
        <div class="chevron">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
        <transition name="kon-show-options" @before-enter="setHigherIndex" @after-leave="setAutoIndex">
            <div class="kon-options" v-show="isOpen">
                <transition-group name="kon-options-list" tag="div" class="kon-options-list">
                    <template v-if="filteredItems.length">
                        <KonOption
                            v-for="item in filteredItems"
                            :key="itemValue(item)"
                            :value="itemValue(item)"
                            :selected="isSelected(item)"
                            :disabled="disabledItem(item)"
                            @click.stop="handleItemClick($event, item)"
                            ref="options"
                        >
                            <!-- 
                                @slot Current KonOption content
                                    @binding {string|object} item the current item
                                    @binding {boolean} selected determines if the current item is selected
                            -->
                            <slot :item="item" :selected="isSelected(item)">
                                {{ itemText(item) }}
                            </slot>
                        </KonOption>
                    </template>
                    <template v-else>
                        <KonOption :key="-1" disabled>
                            <!-- 
                                @slot Use this slot for empty options list or no filter results
                                    @binding {string} search the internal filter search value
                             -->
                            <slot name="empty" :search="$data._search || search">
                                {{ (search == '' && $data._search == '') ? 'No options' : 'No matching results' }}
                            </slot>
                        </KonOption>
                    </template>
                </transition-group>
            </div>
        </transition>
        <transition name="kon-toggle-message">
            <div class="kon-select-message" v-if="!!$slots.message">
                <!-- 
                    @slot Shows a message below the select
                 -->
                <slot name="message" />
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
            /**
             * @model
             */
            value: {
                type: Array,
                default: () => [],
            },
            /**
             * If set to true any selected value after the amount defined in the maxChips prop
             * will be collapsed into a single chip containing the count of all the collapsed chips
             */
            collapseChips: {
                type: Boolean,
                default: false,
            },
            /**
             * Defines the maximum amount of chips to be showed before collapsing.
             */
            maxChips: {
                type: Number,
                default: 1,
                validator(val){
                    return val > 0;
                }
            },
            /**
             * Determines if the component should return only an array of values
             * instead of objects if the items prop is an array of objects.
             */
            returnValues: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            /**
             * Provides a way to find the object in items in O(1) time even if return-values is set. :D
             * 
             * @returns {Map<String|Number, *>}
             */
            mappedItems: function(){
                let map = new Map();
                this.items.forEach(item => {
                    map.set(this.itemValue(item), this.itemText(item));
                });
                return map;
            },
            /**
             * @returns {Array}
             */
            selectedItems: function(){
                return [...this.value];
            },
            /**
             * @returns {Array}
             */
            uncollapsedChips: function(){
                return this.selectedItems.slice(0, this.maxChips);
            },
            /**
             * @returns {Object}
             */
            firstSelectedItem: function(){
                return this.selectedItems[0];
            },
            /**
             * @returns {number}
             */
            extraSelectedItemsCount: function(){
                return this.selectedItems.length - this.maxChips;
            },
            /**
             * @returns {boolean}
             */
            isElevated: function(){
                return !!this.selectedItems.length;
            },
            /**
             * Set the events to be emitted by this comopnents
             * @returns {Object}
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
                        let isKonOption = e.relatedTarget && e.relatedTarget.classList.contains('kon-option');
                        let isFilterInput = e.relatedTarget && e.relatedTarget.classList.contains('kon-filter-input');
                        // if( !e.relatedTarget || (e.relatedTarget && e.relatedTarget.closest('.kon-select-multiple') != this.$el) ){
                        if( !e.relatedTarget || (!isKonOption && !isFilterInput) ){
                            /**
                             * Close if not focusable children (KonOption) was found.
                             * Otherwise the option will handle closing it, this is required
                             * because the blur event gets fired before click so the option list gets closed
                             * before handling the option selection
                             */
                            this.handleBlur();
                        }
                        this.$emit('blur', e);
                    },
                    /**
                     * Handles keyboard navigation :D
                     * 
                     * @returns {void}
                     */
                    keydown: (e) => {
                        if(this.isOpen){
                            // there's probably a simpler more performanct implementation but this one is, as far as I'm concerned, bulletproof
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
                        this.$emit('keydown', e);
                    },
                    keypress: (e) => {
                        if(document.activeElement == this.$el && (e.code == 'Space' || e.code == 'Enter')){
                            e.preventDefault();
                            this.toggle();
                        }
                        this.$emit('keypess', e);
                    },
                    /**/
                };
            },
        },
        methods: {
            /**
             * @param {Object|string|number} item - The item to find the label for.
             * @return {*}
             */
            getDisplayItem(item){
                return this.mappedItems.get(this.itemValue(item));
            },
            /**
             * Handles toggling of items to either be selected or unselected.
             * 
             * @returns {void}
             */
            handleItemClick: function(e, item){
                if(!this.isSelected(item)){
                    this.selectItem(e, item);
                }else{
                    this.unselectItem(e, item);
                }
            },
            /**
             * Takes an item from the items list and adds it to the selected items array.
             * It then emits that array as the first argument of the `change` event.
             * 
             * @param {Event} e - The click's event payload
             * @param {Object|string|number} - The item to select
             * @fires change
             * @return {void}
             */
            selectItem: function(e, item){
                // we want a copy of the computed value
                let selectedItems = [...this.selectedItems];
                selectedItems.push(this.returnValues ? this.itemValue(item) : item);
                this.$emit('change', selectedItems);
            },
            /**
             * Takes an item from the items list and tries to remove it from the
             * selected items array. It then emits that array as the first argument
             * of the `change` event.
             * 
             * @param {Event} e - The click's event payload
             * @param {Object|string|number} item - The item to unselect
             * @fires change
             * @returns {void}
             */
            unselectItem: function(e, item){
                // we want a copy of the computed value
                let selected = [...this.selectedItems];
                // filter out the item from the selected items array
                selected = selected.filter((selectedItem) => {
                    return this.itemValue(selectedItem) !== this.itemValue(item);
                });
                let selectedItems = selected;
                this.$emit('change', selectedItems);
            },
            /**
             * Determines if the current item is in the selected items array.
             * 
             * @param {Object|string|number} item - The item to evaluate
             * @returns {boolean}
             */
            isSelected: function(item){
                let selectedItem = this.selectedItems.find((selItem) => {
                    return this.itemValue(selItem) === this.itemValue(item);
                });
                return !!selectedItem;
            },
            /**
             * Triggered when the user clicks on the remove button of one of the chips.
             * 
             * Takes an item as an argument unselects that item and closes the options list.
             * 
             * @param {Object|string|number} item - The item to deselect
             * @returns {void}
             */
            handleRemoveClick: function(e, item){
                this.unselectItem(e, item);
                // why close? doesn't really make sense to use the remove "button"
                // and keep the menu open at the same time...
                // PLUS since the remove button is not an actual button, the component loses focus
                // and you're unable to close the element by clocking outside
                this.close();
            },
            /**
             * Hook to before-leave event on the transition-group and force the chip
             * to stay in position.
             * 
             * This funtion fixes the issue where the removed element jumps to the top left of the container
             * since it needs position absolute and the parent is a flex container so it does not stay
             * in the flow despite not having any positioning value.
             * 
             * @param {HTMLElement} el - The element to be repositioned
             * @returns {void}
             */
            beforeLeave: function(el) {
                const {marginLeft, marginTop, width, height} = window.getComputedStyle(el);
                el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`;
                el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`;
                el.style.width = width;
                el.style.height = height;
            }
        },
        mounted: function(){
            
        }
    }
</script>