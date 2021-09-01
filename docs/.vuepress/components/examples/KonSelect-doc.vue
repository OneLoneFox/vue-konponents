<template>
    <div class="example">
        <KonButton @click="removeItem">Remove</KonButton>
        <KonSelect
            placeholder="Select konponent (simple)"
            :items="items"
            v-model="selectedItem"
        >
        </KonSelect>
        <KonButton @click="addItem">Add</KonButton>
        <div class="results">
            <h3>Select konponent results</h3>
            <pre class="language-json">{{ selectedItem }}</pre>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5',
            ],
            selectedItem: 'Item 3',
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