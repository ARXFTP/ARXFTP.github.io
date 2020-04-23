var APPCODE = '5942591bb99a4bb8b0a9477a5a532b8c';
// TODO 配置项里应该新增这个

define(['polyfill'], function(MediaRecorder){

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
      that.soundData = null;
      navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream){
        let mediaRecorder = new MediaRecorder(stream);
        n = ["start", "stop", "pause", "resume"]
        n.forEach(function(e) {
          mediaRecorder.addEventListener(e, that.onEvent.bind(null, e))
        }),
        mediaRecorder.addEventListener('dataavailable', that.onDataavailableEvent)
        mediaRecorder.start();
        that.mediaRecorder = mediaRecorder;
      });
    },
    onEvent: function(){
      var mediaRecorder = this.mediaRecorder;
      console.log(mediaRecorder.state);
      console.log(mediaRecorder.mimeType);
    },
    onDataavailableEvent: function(e){
      this.soundData = e.data
    },
    stopRecord: function(){
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