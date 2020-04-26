var APPCODE = '5942591bb99a4bb8b0a9477a5a532b8c';
// TODO 配置项里应该新增这个
define([], function(){

var IdentifyingSound = {
  mediaRecorder: null,
  soundData: null,
  init: function(successCallback, failedCallback){
    var that = this;
    that.successCallback = successCallback;
    that.failedCallback = failedCallback;
  },
  isSupportRecord: function(){
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      return true;
    } else {
      return false;
    }
  },
  startRecord: function(){
    var that = this;
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream){
      that.mediaRecorder = new MediaRecorder(stream);
      that.mediaRecorder.addEventListener('dataavailable', that.onDataavailableEvent.bind(that))
      that.mediaRecorder.addEventListener('stop', that.onStopEvent.bind(that))
      that.mediaRecorder.start();

      API.create_WebSocket();
      API.bindEvent_WebSocketEvent({
        openCallback: function(result){
        },
        closeCallback: function(result){
        },
        messageCallback: function(result){
          that.successCallback && that.successCallback(result);
          API.close_WebSocket();
        },
        errorCallback: function(result){
          that.failedCallback && that.failedCallback('websocket error', result);
        },
      });
    }).catch(function(){
      that.failedCallback('录音功能异常');
    });    
  },
  onStopEvent: function(){
    var that = this;
    API.send_WebSocket(that.soundData);
    API.send_WebSocket('');
  },
  onDataavailableEvent: function(e){
    this.soundData = e.data
  },
  stopRecord: function(){
    var mediaRecorder = this.mediaRecorder;
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(i => i.stop())
  }
}  

//  仅调通WebSocket接口 暂未调通POST stream/1接口
var API = {
  socket: null,
  create_WebSocket: function (){
    var socket = new WebSocket('wss://speech.xor-live.io/aquadaas/rest/speech/wsstream');
    this.socket = socket;
  },
  bindEvent_WebSocketEvent:function(options){
    var socket = this.socket;
    socket.addEventListener('open', function (event) {
      options.openCallback && options.openCallback(event)
    });
    socket.addEventListener('close', function (event) {
      options.closeCallback && options.closeCallback(event)
    });
    socket.addEventListener('message', function (event) {
      options.messageCallback && options.messageCallback(event)
    });
    socket.addEventListener('error', function (event) {
      options.errorCallback && options.errorCallback(event)
    });
  },
  send_WebSocket: function (soundPostData) {
    this.socket.send(soundPostData);
  },
  close_WebSocket: function () {
    this.socket.close();
  },
  sendWav: function(options, callback){
    var that = this;
    var url = 'http://speech.xor-live.io/aquadaas/rest/speech/stream/1?audiotype=pcm&audiorate=8000';
    var formdata = new FormData(); // form 表单 {key:value}
    //formdata.append("audio", options.data);
    formdata.append("name", "file");
    formdata.append("filename", options.data);
    makeRequest({
      url: url,
      type: 'POST',
      async: true,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/octet-stream'
      },
      data: formdata,
      done: function(raw){
        callback && callback()
      },
      fail: function(xhr){
        callback && callback()
      }
    });

    function makeRequest (obj){
      var type = obj.type || 'GET';
      var url = obj.url;
      var async = obj.async;
      var done = obj.done;
      var fail = obj.fail;
      var always = obj.always;
      var data = obj.data || null;
      var headers = obj.headers;
      var timeout = obj.timeout;
      var xhr;
      if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
      } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xhr.open(type, url, async);
      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
          if(xhr._timeout != null){
            clearTimeout(xhr._timeout);
            xhr._timeout = null;
          }
          if(xhr.status == 200 || xhr.status == 201){
            if(typeof done === 'function'){
              done(xhr.responseText);
            }
          } else {
            if(typeof fail === 'function'){
              fail(xhr);
            }
          }
          if(typeof always === 'function'){
            always(xhr);
          }
        }
      };
      // xhr.overrideMimeType("text/html;charset=utf-8");
      if(headers){
        for(var item in headers){
          if(headers.hasOwnProperty(item)){
            xhr.setRequestHeader(item, headers[item]);
          }
        }
      }
      if(timeout != null){
        xhr._timeout = setTimeout(function(){
          clearTimeout(xhr._timeout);
          xhr._timeout = null;
          xhr.abort();
        }, timeout);
      }
      xhr.send(data);
      return xhr;
    }

    function getTimeStamp(){
      return (new Date().toISOString()).substr(0,19) + 'Z';
    }
  }
};


return IdentifyingSound;
});