<template>
    <div class="example">
        <KonButton @click="removeItems">Remove</KonButton>
        <KonSelect
            placeholder="Detached select (simple)"
            kon-style="detached"
            :items="items"
            v-model="selectedItem"
        >
        </KonSelect>
        <KonSelect
            placeholder="Detached select (object)"
            kon-style="detached"
            :items="objectItems"
            v-model="selectedObject"
        >
        </KonSelect>
        <KonButton @click="addItems">Add</KonButton>
        <div class="results">
            <h3>Select konponent results</h3>
            <pre class="language-json">{{selected}}</pre>
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
            objectItems: [
                {value: 1, text: "Option 1"},
                {value: 2, text: "Option 2"},
                {value: 3, text: "Option 3"},
                {value: 4, text: "Option 4"},
                {value: 5, text: "Option 5"},
            ],
            selectedObject: {value: 3, text: "Option 3"},
        };
    },
    computed: {
        selected: function(){
            return {
                'simple': this.selectedItem,
                'object': this.selectedObject,
            };
        },
    },
    methods: {
        addObjectItem: function(){
            let lastItemId = this.objectItems.length;
            let newItem = {
                value: lastItemId + 1,
                text: `Option ${lastItemId + 1}`
            };
            this.objectItems.push(newItem);
        },
        addItems: function(){
            let lastItemId = this.items.length;
            this.items.push(`Item ${lastItemId + 1}`);

            this.addObjectItem();
        },
        removeItems: function(){
            this.items.pop();
            this.objectItems.pop();
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