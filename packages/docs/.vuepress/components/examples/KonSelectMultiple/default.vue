<template>
    <div class="example">
        <KonButton @click="removeItem">Remove</KonButton>
        <div class="col">
            <KonSelectMultiple
                placeholder="Select multiple"
                :items="items"
                v-model="selectedItems"
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
                "Konponents",
                "Vue.js",
                "Feather",
                "Vuepress",
                "Library",
            ],
            selectedItems: ["Konponents"],
        };
    },
    methods: {
        addItem: function(){
            let lastItemId = this.items.length;
            let newItem = `Option ${lastItemId + 1}`;
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