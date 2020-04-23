define([], function(){
var template = '\
<div class="video-page">\
	<div class="btn btn-default" v-on:click="goBack">返回</div>\
	<div><br></div>\
	<video width="800" height="600" :src="videoUrl" controls="controls"></video>\
</div>\
';

	var component = Vue.component('video', {
		template: template,
		data: {
		},
		computed: {
			videoUrl: function(){
				var src = this.$route.query.src;
				return 'http://192.168.7.143:8080/itf_evan/video/vt.mp4' + '?src=' + src;
			}
		},
		created: function(){
			this.$root.isNavShow = false;
		},
		methods: {
			goBack: function(){
				this.$root.$router.back();
			}
		}
	});

	return component;
});