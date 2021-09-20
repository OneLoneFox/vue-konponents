<template>
    <div class="example">
        <KonButton @click="removeItem">Remove</KonButton>
        <KonSelect
            placeholder="Select filter"
            :items="items"
            v-model="selectedItem"
            filterable
            filterInput
        >
        </KonSelect>
        <div class="col">
            <KonInput v-model="searchTerm" label="External filter" />
            <KonSelect
                placeholder="Select filter (external)"
                :items="items2"
                v-model="selectedItem2"
                filterable
                :search="searchTerm"
            >
            </KonSelect>
        </div>
        <KonButton @click="addItem">Add</KonButton>
        <div class="results">
            <h3>Select konponent results</h3>
            <pre class="language-json">
                {
                    a: {{ selectedItem }},
                    b: {{ selectedItem2 }}
                }
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            items: [
                'Gªwr Gurª',
                'Smol Ame',
                'Ninomae Inaff',
                'Tsundori Calliope',
                'Kusotori',
            ],
            items2: [
                'Fubuki V O I D',
                'Tokino Soda',
                'Korone D O O G',
                'Rushia 🦋',
            ],
            selectedItem: 'Smol Ame',
            selectedItem2: null,
            searchTerm: '',
        };
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