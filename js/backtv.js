define([], function(){
var template = '\
<div class="list">\
	<ul class="list-group">\
		<li class="list-group-item" v-for="item in listing" v-on:click="goVideo">{{item.name}}</>\
	</ul>\
</div>\
';

	var component = Vue.component('backtv', {
		template: template,
		data: {
		},
		computed: {
			listing: function(){
				return [{
					name: 'D'
				},
				{
					name: 'E'
				},
				{
					name: 'F'
				}]
			}
		},
		created: function(){
			this.$root.isNavShow = true;
		},
		methods: {
			goVideo: function(e){
				var txt = $.trim($(e.target).text());
				this.$root.$router.push({
					path: '/video',
					query: {
						src: txt
					}
				});
			}
		}
	});

	return component;
});
