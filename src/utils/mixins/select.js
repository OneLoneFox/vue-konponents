var selectMixin = {
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
        konStyle: {
            type: String,
            default: 'default',
        },
        /**
             * Enables the usage of the filter function
             * to narrow down the items list based on the search
             * prop.
             * 
             * If false, the search prop won't have any effect.
             * 
             * @type {Boolean}
             */
         filterable: {
            type: Boolean,
            default: false,
        },
        /**
         * Shows an input in place of the placeholder for filtering
         * with the internal _search term.
         */
        filterInput: {
            type: Boolean,
            default: false,
        },
        /**
         * Search term used for filtering items from outside the component.
         * 
         * @type {String}
         */
        search: {
            type: String,
            default: ''
        },
        /**
         * When true the internal _search value will be reset
         * after the options list closes.
         * 
         * @type {Boolean}
         */
        clearSearch: {
            type: Boolean,
            default: true,
        },
        /**
         * @todo Implement this prop
         */
        filterBy: {
            type: String,
            default: '',
        },
        /**
         * Function used for filtering items.
         * 
         * The default implementation uses lowercase
         * string matching.
         * 
         * @param {Array} items - A copy of the items prop
         * @param {String} searchTerm - The search term passed by the search prop or the local _search data from the input
         * 
         * @returns {Array}
         */
        filter: {
            type: Function,
            default(items, searchTerm){
                return items.filter((item) => {
                    let normalizedItemText = this.itemText(item).toLowerCase();
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
         * in the case of :value (or v-model) being wither of those.
         * 
         * No item in the items list should be empty.
         * 
         * @param {Object|String|Number} item - The item to return the text for
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
         * @param {Object|String|Number} item - The item to return the value for
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
         * @return {void}
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
         * @return {void}
         */
        close: function(){
            this.isOpen = false;
            if(this.clearSearch){
                this.$data._search = '';
            }
        },
        /**
         * Toggles the state of the option list (open|close)
         * 
         * @public
         * @return {void}
         */
        toggle: function(){
            // this.isOpen = !this.isOpen;
            this.isOpen ? this.close() : this.open();
        },
        /**
         * Handles focus loose
         * @return {void}
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
            this.focusedElement = this.focusedElement?.previousElementSibling || this.focusedElement;
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
            this.focusedElement = this.focusedElement?.nextElementSibling || this.focusedElement;
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
         * @returns {Boolean}
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

    }
}

export default selectMixin;