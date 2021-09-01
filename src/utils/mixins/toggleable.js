var toggleableMixin = {
    props: {
        val: {
            type: [Boolean, Array],
        },
        value: {
            type: String,
            default: "on",
        },
        checked: { // Initial state
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
        },
    },
    data: function(){
        return {
            isChecked: this.checked,
        };
    },
    methods: {
        handleChange: function(){
            this.isChecked = !this.isChecked;
            if(typeof this.val === 'boolean'){
                this.$emit('change', !this.val);
            }
            if(Array.isArray(this.val)){
                let len = this.val.length;
                let values = [...this.val];
                values = values.filter((item) => {return item !== this.value});
                // if nothing changed it means it wasn't there so we add it to the array
                if(values.length === len){
                    this.isChecked = true;
                    values.push(this.value);
                }
                this.$emit('change', values);
            }
        }
    },
}

export default toggleableMixin;