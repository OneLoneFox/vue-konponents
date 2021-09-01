<template>
    <div class="kon-switch" :class="{'checked': isChecked, 'disabled': disabled}">
        <div class="kon-switch-content">
            <input
              type="checkbox"
              :id="uid"
              :value="value"
              :checked="checked"
              :disabled="disabled"
              @change="handleChange"
              v-bind="$attrs"
            >
            <div class="kon-switch-track">
                <div class="kon-switch-thumb"></div>
            </div>
        </div>
        <template v-if="label">
            <label :for="uid" class="kon-switch-label">
                {{ label }}
            </label>
        </template>
    </div>
</template>

<script>
    import uidMixin from '../../../utils/mixins/uid.js';
    import toggleableMixin from '../../../utils/mixins/toggleable.js';
    export default {
        name: 'KonSwitch',
        model: {
            prop: 'val',
            event: 'change',
        },
        inheritAttrs: false,
        mixins: [uidMixin, toggleableMixin],
    }
</script>