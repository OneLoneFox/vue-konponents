<template>
    <div class="kon-checkbox" :class="{'checked': isChecked, 'disabled': disabled, 'readonly': readonly, 'indeterminate': $data._indeterminate}">
        <div class="kon-checkbox-content">
            <input
              type="checkbox"
              :id="uid"
              :name="name"
              :value="value"
              :checked="isChecked"
              :disabled="disabled"
              @change="handleChange"
              v-bind="$attrs"
              :tabindex="readonly ? -1 : 0"
            >
            <div class="kon-checkmark">
                <span class="kon-checkmark-tick"></span>
            </div>
        </div>
        <template v-if="label">
            <label :for="uid" class="kon-checkbox-label">
                {{ label }}
            </label>
        </template>
    </div>
</template>

<script>
import uidMixin from '../../../utils/mixins/uid.js';
import toggleableMixin from '../../../utils/mixins/toggleable.js';
export default {
	name: 'KonCheckbox',
	model: {
		prop: 'val',
		event: 'change',
	},
	inheritAttrs: false,
	mixins: [uidMixin, toggleableMixin],
};
</script>