export default {
    inject: ['setResultSnippet'],
    watch: {
        results(val, _){
            this.setResultSnippet(val);
        },
    },
    mounted: function(){
        this.setResultSnippet(this.results);
    },
};