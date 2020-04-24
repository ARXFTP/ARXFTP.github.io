var APPCODE = '5942591bb99a4bb8b0a9477a5a532b8c';
// TODO 配置项里应该新增这个
log("20204_24_14_24");

define([], function(){

  var IdentifyingSound = {
    mediaRecorder: null,
    soundData: null,
    init: function(successCallback, failedCallback){
      this.successCallback = successCallback;
      this.failedCallback = failedCallback;
      this.initView();
      this.bindEvent();
    },
    initView: function(){
    },
    bindEvent: function() {
    },
    startRecord: function(){
      var that = this;
      console.log(MediaRecorder);
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream){
        log("获取权限");
        log("000000");
        that.mediaRecorder = new MediaRecorder(stream);
        n = ["start", "stop", "pause", "resume"]
        log("1");
        n.forEach(function(e) {
          that.mediaRecorder.addEventListener(e, that.onEvent.bind(that, e))
        }),
        log("2");
        that.mediaRecorder.addEventListener('dataavailable', that.onDataavailableEvent.bind(that))
        that.mediaRecorder.addEventListener('stop', that.onStopEvent.bind(that))
        log("3");
        that.mediaRecorder.start();
        log("4");
      });
    },
    onEvent: function(){
      var that = this;
      var mediaRecorder = this.mediaRecorder;
      log(mediaRecorder.state);
      log(mediaRecorder.mimeType);
    },
    onStopEvent: function(){
      var that = this;
      var mediaRecorder = this.mediaRecorder;
      log(mediaRecorder.state);
      log(mediaRecorder.mimeType);
      that.successCallback && that.successCallback(that.soundData);
    },
    onDataavailableEvent: function(e){
      this.soundData = e.data
    },
    stopRecord: function(){
      log(JSON.stringify(this));
      log(this.mediaRecorder);
      var mediaRecorder = this.mediaRecorder;
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(i => i.stop())
    },
    uploadSound: function(imgData, successCallback, failedCallback){
    }
  }
  
  var API = {
    socket: null,
    openWebSocket: function (successCallback, failedCallback){
      let socket = new WebSocket('wss://speech.xor-live.io/aquadaas/rest/speech/wsstream');
      socket.addEventListener('open', function (event) {
        console.log('WebSocket open', event);
      });
      socket.addEventListener('close', function (event) {
        console.log('WebSocket close', event);
      });
      socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
      });
      socket.addEventListener('error', function (event) {
        console.log('WebSocket error: ', event);
      });
    },
    send: function (soundPostData, ) {
      this.socket.send(soundPostData);
    },
  };


  return IdentifyingSound;
});