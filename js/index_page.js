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
          
          <div id='log_'></div>
          <div id='audioContainer'></div>
        </div>
      `);
      jq("#"+containerId+"").append("<div id=\"next_page_button\" style=\"border:1px red sold;width:100%;height:150px\">跳下一页</div>");
      var CommonApiObj = new CommonApi();

      var logFlag = true;

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

      if(obj1.isSupportRecord()){
        obj1.init(function(data){
          log(data.data);
        }, function(result, error){
          log(result);
          log(JSON.stringify(error));          
        })
  
        var btnRecord = document.querySelector('button#btnRecord');
        btnRecord.onclick = function(){
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
          }
        }
      }else{
        log('设备不支持');
      }

      



      window.onerror = function(msg, url, link){
        log('报错信息', msg, {classList:['red'], focus:true});
        log('报错行数', link, {classList:['red'], focus:true});
      };
      
      function log(key, value, options) {
        var log_ = document.getElementById('log_');
        options = options || {};
        var classList = options.classList || [];
        var keyHtml = '<span style="font-weight: bolder">' + (key || '') + '</span>';
        var outHtml = '<span class="' + classList.join(' ') + '">' + (value || '') + '</span>';
        if(options.focus){
          log_.innerHTML += keyHtml + ": " + outHtml + '<br>';
          return;
        }
        if(logFlag){
          log_.innerHTML += keyHtml + ": " + outHtml + '<br>';
          return;
        }
      }
      window.log = log;
      document.getElementById("next_page_button").onclick=function(){
         CommonApiObj.togglePage('js/page_detail.js');
      }
    }
  };
  return indexPage
})