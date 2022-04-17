<template>
    <div class="demo">
        <KonInput
          v-model="pass"
          placeholder="Password"
          autocomplete="off"
          type="password"
          :show-password="showPass"
          @click-trailing="showPass = !showPass"
		>
            <template #leadingicon>
                <Lock :size="16" />
            </template>
            <template #trailingicon>
				<EyeOff v-if="showPass" :size="16" />
				<Eye v-else :size="16" />
            </template>
        </KonInput>
    </div>
</template>

<script>
import { Lock, Eye, EyeOff } from 'lucide-vue';
export default {
    components: {
		Lock,
        Eye,
		EyeOff,
    },
    data: function(){
        return {
            pass: '',
			showPass: false,
        };
    }
}
</script>

<style scoped>
</style>