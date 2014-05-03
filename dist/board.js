var Board = {
  init : function(options){

    // this.canvas = document.getElementById(container);
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
    document.body.style.cssText = "padding: 0px;margin: 0px;overflow: hidden;";
    this.setInitValue(options||{});
    this.resize();
    this.bind();
  },
  setInitValue : function(options){
    this.cursorPath = options.cursorPath || "../img/eraser.png";
    this.lineColor = options.lineColor||"#ffffff";
    this.lineWidth = options.lineWidth||10;
    this.backgroundColor = options.backgroundColor||"#000";
    this.canvas.style.backgroundColor = this.backgroundColor;
  },
  fontSize : function(num){
    this.lineWidth = this.lineWidth + num;
  },
  color : function(color){
    this.lineColor = color;
  },
  mode : function(){
    if(this.canvas.style.cursor != ""){
      this.draw();
    }else{
      this.eraser();
    }
  },
  eraser : function(){
    this.oldLineColor = this.lineColor;
    this.oldLineWidth = this.lineWidth;
    this.color(this.backgroundColor);
    this.canvas.style.cursor =  "url("+this.cursorPath+") 0 35, auto";
  },
  draw : function(){
    this.color(this.oldLineColor);
    this.canvas.style.cursor =  "";
  },
  bind : function(){
    this.canvas.addEventListener("mousedown",this.mousedown.bind(this));
    this.mousemoveForBind = this.mousemove.bind(this);
    this.mouseupForBind = this.mouseup.bind(this);
  },
  mousedown : function(e){
    this.canvas.addEventListener("mousemove",this.mousemoveForBind);
    this.canvas.addEventListener("mouseup",this.mouseupForBind);
    
    this.context.beginPath();
    this.context.moveTo(e.pageX, e.pageY);
  },
  mousemove : function(e){
    var context = this.context;
    context.lineTo(e.pageX, e.pageY);
    context.strokeStyle = this.lineColor;
    context.lineWidth = this.lineWidth;
    context.stroke();
  },
  mouseup : function(e){
    this.canvas.removeEventListener("mousemove",this.mousemoveForBind);
    this.canvas.removeEventListener("mouseup",this.mouseupForBind);
  },
  resize : function(){
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
  }
};;// original code https://github.com/OscarGodson/jKey 

var keyCodes = { 
    /* start the a-z keys */
    'a' : 65,
    'b' : 66,
    'c' : 67,
    'd' : 68,
    'e' : 69,
    'f' : 70,
    'g' : 71,
    'h' : 72,
    'i' : 73,
    'j' : 74,
    'k' : 75,
    'l' : 76,
    'm' : 77,
    'n' : 78,
    'o' : 79,
    'p' : 80,
    'q' : 81,
    'r' : 82,
    's' : 83,
    't' : 84,
    'u' : 85,
    'v' : 86,
    'w' : 87,
    'x' : 88,
    'y' : 89,
    'z' : 90,
    /* start number keys */
    '0' : 48,
    '1' : 49,
    '2' : 50,
    '3' : 51,
    '4' : 52,
    '5' : 53,
    '6' : 54,
    '7' : 55,
    '8' : 56,
    '9' : 57,
    /* start the f keys */
    'f1' : 112,
    'f2' : 113,
    'f3' : 114,
    'f4' : 115,
    'f5' : 116,
    'f6' : 117,
    'f7' : 118,
    'f8' : 119,
    'f9' : 120,
    'f10': 121,
    'f11': 122,
    'f12': 123,
    /* start the modifier keys */
    'shift' : 16,
    'ctrl' : 17,
    'control' : 17,
    'alt' : 18,
    'option' : 18, //Mac OS key
    'opt' : 18, //Mac OS key
    'cmd' : 224, //Mac OS key
    'command' : 224, //Mac OS key
    'fn' : 255, //tested on Lenovo ThinkPad
    'function' : 255, //tested on Lenovo ThinkPad
    /* Misc. Keys */
    'backspace' : 8,
    'osxdelete' : 8, //Mac OS version of backspace
    'enter' : 13,
    'return' : 13, //Mac OS version of "enter"
    'space':32,
    'spacebar':32,
    'esc':27,
    'escape':27,
    'tab':9,
    'capslock':20,
    'capslk':20,
    'super':91,
    'windows':91,
    'insert':45,
    'delete':46, //NOT THE OS X DELETE KEY!
    'home':36,
    'end':35,
    'pgup':33,
    'pageup':33,
    'pgdn':34,
    'pagedown':34,
    /* Arrow keys */
    'left' : 37,
    'up'   : 38,
    'right': 39,
    'down' : 40,
    /* Special char keys */
    '!':49,
    '@':50,
    '#':51,
    '$':52,
    '%':53,
    '^':54,
    '&':55,
    '*':56,
    '(':57,
    ')':48,
    '`':192,
    '~':96,
    '-':189,
    '_':45,
    '=':187,
    '+':187,
    '[':219,
    '{':219,
    ']':221,
    '}':221,
    '\\':220, //it's actually a \ but there's two to escape the original
    '|':220,
    ';':59,
    ':':59,
    "'":222,
    '"':222,
    ',':188,
    '<':188,
    '.':190,
    '>':190,
    '/':191,
    '?':191
		};;var Shortcut = {
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