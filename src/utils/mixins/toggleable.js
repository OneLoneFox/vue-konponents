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
        readonly: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
        },
    },
    computed: {
        isChecked: function(){
            if(this.readonly){
                return this.checked;
            }
            if(typeof this.val === 'boolean'){
                return this.val;
            }
            if(Array.isArray(this.val)){
                let itemFound = this.val.find((item) => {
                    return item === this.value;
                });
                return !!itemFound;
            }
        },
    },
    methods: {
        handleChange: function(){
            if(typeof this.val === 'boolean'){
                this.$emit('change', !this.val);
            }
            if(Array.isArray(this.val)){
                let len = this.val.length;
                let values = [...this.val];
                values = values.filter((item) => {return item !== this.value});
                // if nothing changed it means it wasn't there so we add it to the array
                if(values.length === len){
                    values.push(this.value);
                }
                this.$emit('change', values);
            }
        },
    },
}

export default toggleableMixin;