<template>
    <div class="demo between">
        <KonButton @click="removeItem" icon-only><ListMinus :size="16" /></KonButton>
        <KonSelect
            placeholder="Select konponent (simple)"
            :items="items"
            v-model="selectedItem"
        >
        </KonSelect>
        <KonSelect
            placeholder="Select konponent (simple)"
            :items="items"
            disabled
            v-model="disabledItem"
        >
        </KonSelect>
        <KonButton @click="addItem" icon-only><ListPlus :size="16" /></KonButton>
    </div>
</template>

<script>
import { ListPlus, ListMinus } from 'lucide-vue';
import injectResultSnippet from '../../mixins/injectResultSnippet';
export default {
    mixins: [injectResultSnippet],
    components: {
        ListPlus,
        ListMinus,
    },
    data: function(){
        return {
            items: [
                'Gªwr Gurª',
                'Smol Ame',
                'Ninomae Inaff',
                'Tsundori Calliope',
                'Kusotori',
            ],
            selectedItem: 'Smol Ame',
            disabledItem: 'Kusotori',
        };
    },
    computed: {
        results: function(){
            return {
                selectedItem: this.selectedItem
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