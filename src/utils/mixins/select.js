var selectMixin = {
    methods: {
        itemText: function(item){
            return typeof item === "string" ? item : item[this.textAttribute];
        },
        itemValue: function(item){
            return typeof item === "string" ? item : item[this.valueAttribute];
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