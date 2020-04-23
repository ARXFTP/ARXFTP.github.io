define([], function(){
var template = '\
<div class="myinput">\
	<input type="text" v-model="inputValue" v-on:keyup.enter="tellValue" class="form-control"/>\
	<br>\
</div>\
';

var component = Vue.component('myinput', {
	template: template,
	data: function(){
		return {
			inputValue: ''
		};
	},
	methods: {
		tellValue : function(){
			this.$emit('input', this.inputValue);
		}
	}
});

return component;
});
