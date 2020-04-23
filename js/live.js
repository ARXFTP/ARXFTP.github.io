define([], function(){
var template = '\
<div class="list">\
	<ul class="list-group">\
		<li class="list-group-item" v-for="item in listing" v-on:click="goVideo">{{item.name}}</>\
	</ul>\
</div>\
';

	var component = Vue.component('live', {
		template: template,
		data: {
		},
		computed: {
			listing: function(){
				return [{
					name: 'A'
				},
				{
					name: 'B'
				},
				{
					name: 'C'
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
