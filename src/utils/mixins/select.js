var selectMixin = {
    methods: {
        itemText: function(item){
            return typeof item === "object" ? item[this.textAttribute] : item;
        },
        itemValue: function(item){
            return typeof item === "object" ? item[this.valueAttribute] : item;
        },
        /**
         * Opens the option list
         * 
         * @public
         */
        open: function(){
            this.isOpen = true;
        },
        /**
         * Closes the option list
         * 
         * @public
         */
        close: function(){
            this.isOpen = false;
        },
        /**
         * Toggles the state of the option list (open|close)
         * 
         * @public
         */
        toggle: function(){
            this.isOpen = !this.isOpen;
        },
        /**
         * Handles focus loose
         */
        handleBlur: function(){
            this.close();
        },
    }
}

export default selectMixin;