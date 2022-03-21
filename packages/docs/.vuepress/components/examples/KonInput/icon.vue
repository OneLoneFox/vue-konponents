<template>
    <div class="demo">
        <KonInput v-model="data" placeholder="Leading icon" autocomplete="off">
            <template #leadingicon>
                <User :size="16" />
            </template>
        </KonInput>
        <KonInput v-model="data2" placeholder="Leading &amp; trailing icon" autocomplete="off">
            <template #leadingicon>
                <Lock :size="16" />
            </template>
            <template #trailingicon>
                <Eye :size="16" />
            </template>
        </KonInput>
        <KonInput v-model="data3" placeholder="Trailing icon" autocomplete="off">
            <template #trailingicon>
                <Search :size="16" />
            </template>
        </KonInput>
    </div>
</template>

<script>
import { User, Lock, Eye, Search } from 'lucide-vue';
export default {
    components: {
        User,
        Lock,
        Eye,
        Search,
    },
    data: function(){
        return {
            data: '',
            data2: '',
            data3: '',
        };
    }
}
</script>