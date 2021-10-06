<template>
    <div class="example">
        <KonButton @click="removeItem">Remove</KonButton>
        <KonSelect
            placeholder="Imaginary products"
            :items="items"
            v-model="selectedItem"
            filterable
            filterInput
        >
        </KonSelect>
        <div class="col">
            <KonInput v-model="searchTerm" label="External filter" />
            <KonSelect
                placeholder="Sizes"
                v-model="selectedItem2"
                filterable
                :items="items2"
                :search="searchTerm"
                value-attribute="code"
                text-attribute="name"
                return-object
            >
            </KonSelect>
        </div>
        <KonButton @click="addItem">Add</KonButton>
        <div class="results">
            <h3>Select konponent results</h3>
            <pre class="language-json">{{ results }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            items: [
                'Nvidia RTX 3060',
                'Nvidia RTX 3060 TI',
                'Nvidia RTX 3060 SUPER',
                'Nvidia RTX 3070',
                'Nvidia RTX 3070 TI',
                'Nvidia RTX 3080',
                'Nvidia RTX 3080 TI',
                'Nvidia RTX 3090',
            ],
            items2: [
                {code: 'XS', name: 'Extra small'},
                {code: 'SM', name: 'Small'},
                {code: 'MD', name: 'Medium'},
                {code: 'LG', name: 'Large'},
                {code: 'XL', name: 'Extra large'},
            ],
            selectedItem: 'Nvidia RTX 3060',
            selectedItem2: null,
            searchTerm: '',
        };
    },
    computed: {
        results: function(){
            return {
                card: this.selectedItem,
                size: this.selectedItem2
            };
        },
    },
    methods: {
        addItem: function(){
            let lastItemId = this.items.length;
            this.items.push(`Item ${lastItemId + 1}`);
        },
        removeItem: function(){
            this.items.pop();
        },
    }
}
</script>

<style scoped>
.example {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.results{
    flex-basis: 100%;
}
</style>