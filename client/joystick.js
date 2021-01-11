class Joystick{
    constructor(){
        this.mousePressed = false;
        this.ctx = null;
        this.body = null
        this.lastX = 0;
        this.lastY = 0;
        this.xAmount = null;
        this.yAmount = null;
        this.leftBorder =35;
        this.upBorder = 35;
        this.downBorder = 165;
        this.rightBorder = 165
        this.canvas = null;
        this.initCanvas()
    }
    
    initCanvas(){
        window.onload = () =>{
            this.canvas =document.getElementById('canvas'); 
            this.body = document.getElementById('body'); 
            this.ctx = this.canvas.getContext("2d");
            this.xAmount =document.getElementById('x'); 
            this.yAmount =document.getElementById('y'); 
            this.drawOuteOuterrCircle();
            this.loadController();
            this.drawInnerCircle();
          };
    }
    
      loadController(){
        this.body.addEventListener('mousedown' ,  (e) =>{
            this.mousePressed = true;
        });
    
        this.body.addEventListener('mousemove' , (e) =>{
            if (this.mousePressed) {
                let cancelateXPotion = e.pageX - this.canvas.offsetLeft
                if(cancelateXPotion > this.rightBorder || cancelateXPotion < this.leftBorder) return;
                let cancelateYPotion = e.pageY - this.canvas.offsetTop
                if(cancelateYPotion > this.downBorder || cancelateYPotion < this.upBorder) return;
                if(Math.abs(cancelateYPotion - this.canvas.height/2) > Math.abs(cancelateXPotion - this.canvas.width/2)){
                  cancelateXPotion = this.canvas.width/2;
                }
              else{
                cancelateYPotion = this.canvas.height/2;
              }
                this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
                this.drawOuteOuterrCircle();
                this.drawInnerCircle(cancelateXPotion, cancelateYPotion, true);
            }
        });
    
        this.body.addEventListener('mouseup' , () =>{
            if (this.mousePressed) {
                this.mousePressed = false;
               this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
               this.drawOuteOuterrCircle();
              this.drawInnerCircle();
            }
        });
    
        this.body.addEventListener('mouseleave', () =>{
            if (this.mousePressed) {
                this.mousePressed = false;
                this.ctx.clearRect(0, 0,this.canvas.width, this.canvas.height);
               this.drawOuteOuterrCircle();
              this.drawInnerCircle();
            }
        });
    }
  
    drawOuteOuterrCircle(){
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width/2, this.canvas.height/2, this.canvas.width/2 -10, 0, 2 * Math.PI, true);
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = "gray";
      this.ctx.stroke();
      this.ctx.closePath();
    }
  
    drawInnerCircle(x=this.canvas.width/2, y=this.canvas.height/2){
      this.ctx.beginPath();
      this.ctx.arc(x, y, 25, 0, 2 * Math.PI);
      this.ctx.fillStyle = "gray";
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
      this.lastX = x;
      this.lastY = y;
      this.xAmount.innerText =`x : ${x}`;
      this.yAmount.innerText = `y : ${y}`;;
    }

}

const joystick = new Joystick();