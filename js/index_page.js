define(['js/utils/common.js',
				'js/component/IdentifyingPhotos/index.js',
				'js/component/IdentifyingSound/index.js',
			], function(CommonApi, IdentifyingPhotos, IdentifyingSound){	
	var indexPage = function(){};
	indexPage.prototype = {
		init: function(containerId){
			var jq=jQuery;
			jq("#"+containerId+"").append(`
				<div style="border:1px red sold;width:100%;height:300px">
					页面1
					<button id='test'>上传图片</button>
					<div id='log'></div>

					<button id="btnRecord">开始录制</button>
					<button disabled id="btnPlay">开始播放</button>
					<button disabled id="btnDownload">开始下载</button>
					
					<div id='log_'></div>
					<div id='audioContainer'></div>
				</div>
			`);
			jq("#"+containerId+"").append("<div id=\"next_page_button\" style=\"border:1px red sold;width:100%;height:150px\">跳下一页</div>");
			var CommonApiObj = new CommonApi();



			// 图片识别例子
			var obj = Object.create(IdentifyingPhotos);
			obj.init({
				container: '#test'
			}, function(data){
				$('#log').html(JSON.stringify(data));
			}, function(text){
				$('#log').html(text);
			});

			// 声音识别例子
			var obj1 = Object.create(IdentifyingSound);
			obj1.init(function(){

			}, function(){

			})

			var btnRecord = document.querySelector('button#btnRecord');
			var btnDownload = document.querySelector('button#btnDownload');
			btnRecord.onclick = () => {
				if(btnRecord.textContent === '开始录制'){
					obj1.startRecord();
					btnRecord.textContent = '停止录制';
					btnPlay.disabled = true;
					btnDownload.disabled = true;
				}else{
					obj1.stopRecord();
					btnRecord.textContent = '开始录制';
					btnPlay.disabled = false;
					btnDownload.disabled = false;

					var o = document.createElement("audio");
					o.controls = !0,
					URL_ = URL.createObjectURL(obj1.soundData),
					o.src = URL_,
					audioPlay = o;
					document.querySelector('div#audioContainer').appendChild(o)
				}
			}
			btnDownload.onclick = () => {
				var a = document.createElement('a');
				a.href = obj1.soundData;
				a.download = 'test';
				a.click();
			}
			









			document.getElementById("next_page_button").onclick=function(){
				 CommonApiObj.togglePage('js/page_detail.js');
			}
		}
	};
	return indexPage
})