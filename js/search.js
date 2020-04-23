define(['utils/myinput'], function(myinput){
var template = '\
<div class="searchlist">\
	<myinput v-on:input="setLabel"></myinput>\
	<div>\
		<label>{{searchStr}}</label>&nbsp;\
		<button class="btn btn-default" v-on:click="searchList">Search</button>\
	</div>\
	<ul class="list-group">\
		<li class="list-group-item" v-for="item in listing" v-on:click="goVideo">{{item.name}}</>\
	</ul>\
</div>\
';

	var component = Vue.component('search', {
		template: template,
		data: function(){
			return {
				listing: [],
				searchStr: 'searching'
			}
		},
		created: function(){
			this.$root.isNavShow = true;
		},
		components: {
			myinput: myinput
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
			},
			setLabel: function(e){
				this.searchStr = e;
			},
			searchList: function(){
				this.listing = [{
					name: this.searchStr
				}, {
					name: 'J'
				}, {
					name: 'K'
				}]
			}
		}
	});

	return component;
});
