
var Board = {

  init : function(options){

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
    this.currentLineWidth = this.lineWidth;
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
      this.lineWidth = this.currentLineWidth;
      this.draw();
    }else{
      this.currentLineWidth = this.lineWidth;
      this.lineWidth = 30;
      this.eraser();
    }
  },
  eraser : function(){
    this.oldLineColor = this.lineColor;
    this.oldLineWidth = this.lineWidth;
    this.color(this.backgroundColor);
    this.canvas.style.cursor =  "url("+this.cursorPath+") 0 15, auto";
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
};

