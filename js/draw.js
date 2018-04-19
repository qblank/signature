window.onload = function (){
    var Draw = new draw();
    Draw.init();
};
var draw = function(){
    this.type = 'pen';  //默认为铅笔
    this.penal = document.getElementById('penal');
    this.pen = this.penal.getContext('2d');
    this.isDraw = false;
    this.color = document.getElementById('color');
    this.lineWidth = document.getElementById('lineWidth');
    this.select = document.getElementById('select');    //选择面板
    this.img = new Image();//用于动态绘制指向，矩形，原型
};
draw.prototype.init = function(){
    var self = this;
    var originX = null;
    var originY = null;
    this.penal.addEventListener('mousedown',function(event){
        self.isDraw = true;
        if(self.type != 'robber'){
            self.img.src = self.penal.toDataURL('image/png');
        }
        originX = event.clientX - self.penal.offsetLeft;    //原点x坐标
        originY = event.clientY - self.penal.offsetTop;     //原点y坐标
        self.pen.moveTo(originX, originY);
        //self.pen.strokeStyle = self.color.value;
        //self.pen.lineWidth = self.lineWidth.value;

    },false);
    this.penal.addEventListener('mousemove',function(event){
        if(self.isDraw){
            var x = event.clientX - self.penal.offsetLeft;
            var y = event.clientY - self.penal.offsetTop;

            var newOriginX  = originX,newOriginY = originY;
            if(self.type == 'pen'){
                self.pen.lineTo(x,y);
                self.pen.stroke();
            }else if(self.type == 'robber'){
                self.pen.strokeStyle = '#ccc';
                self.pen.clearRect(x-10,y-10,20,20);

            }else if(self.type == 'line'){
                self.pen.clearRect(0,0,800,800);
                self.pen.drawImage(self.img, 0, 0);
                self.pen.beginPath();
                self.pen.moveTo(originX,originY);
                self.pen.lineTo(x,y);
                self.pen.stroke();
                self.pen.closePath();

            }else if(self.type == 'rect'){
                self.pen.clearRect(0,0,800,800);
                self.pen.drawImage(self.img, 0, 0);
                self.pen.beginPath();

                if(x < originX){
                    newOriginX = x;
                }
                if(y < originY){
                    newOriginY = y;
                }
                self.pen.rect(newOriginX,newOriginY,Math.abs(x-originX),Math.abs(y-originY));
                self.pen.stroke();
                self.pen.closePath();
            }else if(self.type == 'arc'){
                self.pen.clearRect(0,0,800,800);
                self.pen.drawImage(self.img, 0, 0);
                self.pen.beginPath();
                if(x < originX){
                    newOriginX = x;
                }
                if(y < originY){
                    newOriginY = y;
                }
                var r = Math.sqrt(Math.abs(x-originX) * Math.abs(x-originX) + Math.abs(y-originY) * Math.abs(y-originY))
                self.pen.arc(Math.abs(x-originX)+newOriginX, Math.abs(y-originY)+newOriginY , r, 0, 2*Math.PI);
                self.pen.fillStyle = self.color.value;
                self.pen.fill();
                self.pen.closePath();
            }
        }
    },false);
    this.penal.addEventListener('mouseleave', function () {
        if(self.isDraw){
            self.isDraw = false;
            self.pen.closePath();
        }
    },false);
    
    this.penal.addEventListener('mouseup', function (event) {
        self.isDraw = false;

    },false);
    
   /* this.select.addEventListener('click',function(event){
        if(event.target.id == 'pen'){
            self.type = 'pen';}
         else if(event.target.id == 'robber'){
            self.type = 'robber';
            var bg = document.getElementById('bg');
            bg.style.background = "#ffff";
        }
    },false);*/
};
