<template>
    <div class="example">
        <KonButton @click="removeItem">Remove</KonButton>
        <KonSelect
            placeholder="Select konponent (simple)"
            :items="items"
            v-model="selectedItem"
        >
        </KonSelect>
        <KonSelect
            placeholder="Select konponent (simple)"
            :items="items2"
            v-model="selectedItem2"
        >
        </KonSelect>
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
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4',
                'Item 5',
            ],
            items2: [
                'aaaaaaaaaaaaa',
                'bbbbbbbbbbbbb',
                'ccccccccccccc',
                'ddddddddddddd',
            ],
            selectedItem: 'Item 3',
            selectedItem2: null,
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