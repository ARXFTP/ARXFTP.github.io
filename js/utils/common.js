define([], function(){	
	var commonApi = function(){};
	commonApi.prototype={
		togglePage:function(target){
			console.log(1);
			require([target], function(curpage){
				document.getElementById("waste_sorting_body").innerHTML="";
				var curpage = new curpage();
				curpage.init("waste_sorting_body");
				window.lastPageList.push(target);
			})
		},
		backPage:function(){
		    console.log(window.lastPageList);
			var lastPageList=window.lastPageList;
			if(lastPageList.length>1){//不在第一页
				var curPage=lastPageList[lastPageList.length-2];//之前一页
				require([curPage], function(curpage){
					document.getElementById("waste_sorting_body").innerHTML="";
					var curpage = new curpage();
					curpage.init("waste_sorting_body");
					lastPageList.splice(-1)
				})
			}
		}
	};
	return commonApi;
})


