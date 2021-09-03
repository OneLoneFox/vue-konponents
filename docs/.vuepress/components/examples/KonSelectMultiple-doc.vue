<template>
    <div class="example">
        <KonButton @click="removeItem">Remove</KonButton>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select konponent"
                :items="items"
                v-model="selectedItems"
                value-attribute="id"
                text-attribute="name"
            >
            </KonSelectMultiple>
        </div>
        <KonButton @click="addItem">Add</KonButton>
        <div class="results">
            <h3>Select multiple konponent results</h3>
            <pre class="language-json">{{ selectedItems }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            items: [
                {id: 1, name: "Option 1"},
                {id: 2, name: "Option 2"},
                {id: 3, name: "Option 3"},
                {id: 4, name: "Option 4"},
                {id: 5, name: "Option 5"},
            ],
            selectedItems: [{id: 3, name: "Option 3"}],
        };
    },
    methods: {
        addItem: function(){
            let lastItemId = this.items.length;
            let newItem = {
                id: lastItemId + 1,
                name: `Option ${lastItemId + 1}`
            };
            this.items.push(newItem);
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
.example .col{
    flex-basis: 200px;
}
.results{
    flex-basis: 100%;
}
</style>