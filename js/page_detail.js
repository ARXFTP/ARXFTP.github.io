define(['js/utils/common.js'], function(CommonApi){	
	var indexPage = function(){};
	indexPage.prototype = {
		init: function(containerId){
			console.log(containerId);
			var jq=jQuery;
			jq("#"+containerId+"").append("<div style=\"border:1px red sold;width:500px;height:300px\">页面2</div>");
			jq("#"+containerId+"").append("<div id=\"next_page_button2\" style=\"border:1px red sold;width:100%;height:150px\">跳下一页</div>");
			var CommonApiObj = new CommonApi();
			document.getElementById("next_page_button2").onclick=function(){
					 CommonApiObj.togglePage('js/page3.js');
			}
		}
	};
	return indexPage
})