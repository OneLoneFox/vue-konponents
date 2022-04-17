var uidMixin = {
	data: function(){
		return {
			uid: null,
		};
	},
	mounted: function(){
		/*
		 * bUt _uid iS foR iNteRnAl usAgE oNly
		 * lsiten, do you really want me to install an entire uuid module just to
		 * create simple id for your god damn label/input if you don't give it one?
		 */
		this.uid = this.id ? this.id : this._uid;
	},
};

export default uidMixin;