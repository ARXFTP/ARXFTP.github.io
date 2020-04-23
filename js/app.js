define(['js/utils/common.js'], function(CommonApi){	
	var App = function(){};
	App.prototype = {
		init: function(){
			var innerWidthRatio=(document.body.clientWidth/640);
			var fontSize = 14;//模拟  100
			document.getElementById("app").style.fontSize=(fontSize+"px");	
			var jq=jQuery;
			jq("#app").append("<div class=\"nav_header\"><img id=\"nav_header_back\" src=\"img/back.png\" class=\"nav_header_back\"/></div>");
			jq("#app").append("<div id=\"waste_sorting_body\" class=\"page-view\"></div>");
			var CommonApiObj = new CommonApi();
			window.lastPageList=["js/index_page.js"];//第一页
			document.getElementById("nav_header_back").onclick=function(){
				CommonApiObj.backPage()
			};
			require(['js/index_page.js'], function(curpage){
				var curpage = new curpage();
		        curpage.init("waste_sorting_body");
			})
		}
	};
	return App
})
