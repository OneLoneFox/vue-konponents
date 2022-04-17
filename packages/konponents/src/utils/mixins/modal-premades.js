export default {
	props: {
		okText: {
			type: String,
			default: 'Ok',
		},
		cancelText: {
			type: String,
			default: 'Cancel',
		},
		title: {
			type: String,
			default: '',
		},
		onCancel: {
			type: Function,
		},
		onOk: {
			type: Function,
		}
	},
	methods: {
		handleLeave: function(){
			this.$destroy();
		},
	},
};