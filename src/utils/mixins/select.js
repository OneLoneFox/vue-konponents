var selectMixin = {
    methods: {
        itemText: function(item){
            if(item === null || item === undefined || item === ''){
                return null;
            }
            return typeof item === "object" ? item[this.textAttribute] : item;
        },
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