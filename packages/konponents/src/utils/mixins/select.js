import uniqueId from '../uniqueId';

var selectMixin = {
    props: {
        name: {
            type: String,
            default: '',
        },
        /**
         * Defines the component's label.
         */
        label: {
            type: String,
            required: false,
        },
        /**
         * Defines the component's placeholder.
         */
        placeholder: {
            type: String,
            default: '',
        },
        /**
         * If set to true, the label will mimic a placeholder when not focused
         * and shift to a normal label when the value is not empty.
         * 
         * Placeholder should not be used in conjunction with this property.
         */
         labelAsPlaceholder: {
            type: Boolean,
            default: false,
        },
        /**
         * An array of strings|numbers|objects containig the values
         * you want in the select.
         * 
         * If an array of objects is passed the valueAttrbute and textAttribute
         * properties MUST be defined as valid object properties.
         */
        items: {
            type: Array,
            required: true,
        },
        /**
         * Determines which of the object properties must be treated as the label
         * to show both in the selected label and the options list.
         */
        textAttribute: {
            type: String,
            default: 'text',
        },
        /**
         * Determines which of the object properties must be treated as the value
         * for the component to be able to know which element is selected.
         * 
         * It MUST be unique per item.
         */
        valueAttribute: {
            type: String,
            default: 'value',
        },
        /**
         * Disables all interactions with the component and lowers the opacity.
         */
        disabled: {
            type: Boolean,
            default: false,
        },
        /**
         * Determines the visual style of the options list,
         * 
         * @values default, detached
         */
        konStyle: {
            type: String,
            default: 'default',
            validator(val){
                return ['default', 'detached'].includes(val);
            }
        },
        /**
         * Determines if an item should be disabled.
         * 
         * The function is executed for every item in the items Array
         * or if enabled, for every item visible after the filter.
         * 
         * Returns false by default for all items.
         * 
         * @param {Object|string|number} item
         * 
         * @returns {boolean}
         */
        disabledItem: {
            type: Function,
            default: (item) => false,
        },
        /**
         * Enables the usage of the filter function
         * to narrow down the items list based on the search
         * prop or the internal search value if filterInput is true.
         * 
         * If false, the search and filterInput props won't have any effect.
         * 
         * @type {boolean}
         */
         filterable: {
            type: Boolean,
            default: false,
        },
        /**
         * Shows an input in place of the placeholder for filtering
         * with an internal search term.
         * 
         * @type {boolean}
         */
        filterInput: {
            type: Boolean,
            default: false,
        },
        /**
         * Search term used for filtering items from outside the component.
         * 
         * @type {string}
         */
        search: {
            type: String,
            default: ''
        },
        /**
         * When true the internal _search value will be reset
         * after the options list closes.
         * 
         * @type {boolean}
         */
        clearSearch: {
            type: Boolean,
            default: true,
        },
        /**
         * Determines the value to be used by the filter function
         * as the searchTerm to match.
         * 
         * If not provided the default implementation of filter will
         * use the textAttribute.
         * 
         * Note: This prop should only be set if the items are an array of.
         * 
         * @type {string}
         */
        filterBy: {
            type: String,
            required: false,
        },
        /**
         * Function used for filtering items.
         * 
         * The default implementation uses case insensitive string matching.
         * 
         * If no filterBy is provided it will use the textAttribute by default.
         * 
         * Note: Since both the internal search and the searh prop are strings, if you want
         * to filter by comparing numeric values you need to parse the searchTerm.
         * 
         * @param {Array} items - A copy of the items prop
         * @param {string} searchTerm - The search term passed by the search prop or the internal search data from the input
         * 
         * @returns {Array}
         */
        filter: {
            type: Function,
            default(items, searchTerm){
                return items.filter((item) => {
                    let normalizedItemText = this.filterBy ? item[this.filterBy] : this.itemText(item);
                    if(typeof normalizedItemText != 'string'){
                        normalizedItemText = normalizedItemText.toString().toLowerCase();
                    }else{
                        normalizedItemText = normalizedItemText.toLowerCase();
                    }
                    let normalizedSearchTerm = searchTerm.toLowerCase();
                    return normalizedItemText.indexOf(normalizedSearchTerm) !== -1;
                });
            }
        }
    },
    data: function(){
        return {
            isOpen: false,
            focusIndex: -1,
            focusedItem: null,
            _search: '',
            zIndex: 'auto',
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
            handleParentBlur: this.handleBlur,
            parentComponent: this,
        };
    },
    computed: {
        /**
         * If the filterable prop is set to true, it returns a filtered copy
         * of the items array based on the filter prop function.
         * 
         * Otherwise it will return the original items prop.
         * 
         * @returns {Array}
         */
        filteredItems: function(){
            if(!this.filterable){
                return this.items;
            }
            let items = [...this.items];
            let searchTerm = this.search || this.$data._search;
            return this.filter(items, searchTerm);
        },
    },
    methods: {
        setHigherIndex: function(){
            this.zIndex = '999';
        },
        setAutoIndex: function(){
            this.zIndex = 'auto';
        },
        /**
         * Returns the text to be used as the selected item label
         * and for every item in the options list.
         * 
         * Returns null if the item is null, undefined or an empty string
         * in the case of :value (or v-model) being either of those.
         * 
         * No item in the items list should be empty.
         * 
         * @param {Object|string|number} item - The item to return the text for
         * @returns {*}
         */
        itemText: function(item){
            if(item === null || item === undefined || item === ''){
                return null;
            }
            return typeof item === "object" ? item[this.textAttribute] : item;
        },
        /**
         * Returns the propper value for the current item. If the item is
         * an Object it returns the defined valueAttribute, `item.value`
         * is used by default.
         * 
         * Returns null if the item is null, undefined or an empty string
         * in the case of :value (or v-model) being wither of those.
         * 
         * No item in the items list should be empty.
         * 
         * @param {Object|string|number} item - The item to return the value for
         * @returns {String|Number}
         */
        itemValue: function(item){
            if(item === null || item === undefined || item === ''){
                return null;
            }
            return typeof item === "object" ? item[this.valueAttribute] : item;
        },
        /**
         * Opens the option list
         * 
         * @public
         * @returns {void}
         */
        open: function(){
            this.isOpen = true;
            if(this.filterable && this.filterInput){
                this.$nextTick(() => {
                    // Wait for v-show to trigger
                    this.$refs.filterInput.focus();
                });
            }
        },
        /**
         * Closes the option list
         * 
         * @public
         * @returns {void}
         */
        close: function(){
            this.isOpen = false;
            if(this.clearSearch){
                this.clearFilter();
            }
        },
        /**
         * Toggles the state of the option list (open|close)
         * 
         * @public
         * @returns {void}
         */
        toggle: function(){
            // this.isOpen = !this.isOpen;
            this.isOpen ? this.close() : this.open();
        },
        /**
         * Clears the internal search value.
         * 
         * @public
         */
        clearFilter: function(){
            this.$data._search = '';
        },
        /**
         * Handles focus loose
         * 
         * @returns {void}
         */
        handleBlur: function(){
            this.close();
        },
        /**
         * Tries to focus the option previous to the curretly focused one.
         * 
         * If there's no focused element OR the focused element is hidden
         * by the filter it will then focus the first option in the list.
         * 
         * @returns {void}
         */
        focusPreviousOrLast: function(){
            this.focusedElement = this.focusedElement?.previousElementSibling;
            // recursively skip all disabled options
            if(this.focusedElement && this.focusedElement.matches(':disabled')){
                // Prevents recursion stack overlflow since node.previousElementSibling is cyclic
                if(this.focusedElement.matches(':first-child')){
                    return;
                }
                // Mom come pick me up I'm scared
                return this.focusPreviousOrLast();
            }
            if(!this.focusedElement || !this.isFocusedElementVisible()){
                // If no item is selected or is selected but not visible
                // then use the last element
                let lastElement = this.$refs.options?.[this.$refs.options.length && this.$refs.options.length - 1];
                this.focusedElement = lastElement?.$el;
            }
            // transfer focus to the previous element or do nothing
            this.focusedElement?.focus?.();
        },
        /**
         * Tries to focus the option next to the currently focused one.
         * 
         * If there's no focused element OR the focused element is hidden
         * by the filter it will then focus the first option in the list.
         * 
         * @returns {void}
         */
        focusNextOrFirst: function(){
            this.focusedElement = this.focusedElement?.nextElementSibling;
            // recursively skip all disabled options
            if(this.focusedElement && this.focusedElement.matches(':disabled')){
                // Prevents recursion stack overlflow since node.nextElementSibling is cyclic
                if(this.focusedElement.matches(':last-child')){
                    return;
                }
                // Mom come pick me up I'm scared
                return this.focusNextOrFirst();
            }
            if(!this.focusedElement || !this.isFocusedElementVisible()){
                // If no item is selected or is selected but not visible
                // then use the first element
                let firstElement = this.$refs.options[0];
                this.focusedElement = firstElement?.$el;
            }
            // transfer focus to the next element or do nothing
            this.focusedElement?.focus?.();
        },
        /**
         * Determines if the focused element is visible through the filter
         * 
         * @returns {boolean}
         */
        isFocusedElementVisible: function(){
            if(this.filterable && (this.search.length || this.$data._search.length)){    
                // options are narred down and the focusedElement could be hidden
                let isFocusedElementVisible = this.$refs.options.find((option) => {
                    return option.$el === this.focusedElement;
                });
                return !!isFocusedElementVisible;
            }else{
                return true;
            }
        },
        handleFilterInput: function(e){
            this.$data._search = e.target.value;
            this.$emit('search', e.target.value);
        }
    },
    beforeCreate: function(){
        this.uid = `konponent-${uniqueId()}`;
    }
}

export default selectMixin;