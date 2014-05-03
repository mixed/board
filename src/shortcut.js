var Shortcut = {
  init : function(shortcutMap){
    this.bind();
    this.codeMap = this.covertcode(shortcutMap);
    // console.log(this.codeMap);
  },
  covertcode : function(shortcutMap){
    var arr;
    var codeMap = {};
    for(var key in shortcutMap){
      arr = key.split(/\s+/);
      var command = "0";
      var ctrl  = "0";
      var alt   = "0";
      var shift = "0";
      var keycode = "";
      for(var  i = 0; i < arr.length; i++){
        if(arr[i]==="command"){
          command = "1";
        }else if(arr[i]==="ctrl"){
          ctrl = "1";
        }else if(arr[i]==="alt"){
          alt = "1";
        }else if(arr[i]==="shift"){
          shift = "1";
        }else{
          keycode = keyCodes[arr[i]];
        }
      }
      codeMap[command+ctrl+alt+shift+keycode] = shortcutMap[key];
    }
    
    return codeMap;
  },
  bind : function(){
    document.body.addEventListener("keydown",this.keypress.bind(this));
  },
  keypress : function(e){
    // console.log(e);
    
    var command = (e.metaKey?1:0)+"";
    var ctrl  = (e.ctrlKeY?1:0)+"";
    var alt   = (e.altKey?1:0)+"";
    var shift = (e.shiftKey?1:0)+"";
    var keycode = e.keyCode+"";
    // console.log(command+ctrl+alt+shift+keycode);
    var exec = this.codeMap[command+ctrl+alt+shift+keycode];

    if(exec){
      e.preventDefault();
      exec()
    }
  }
};