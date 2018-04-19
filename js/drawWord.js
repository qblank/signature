/**
 * 开始触摸
 * @param event
 * @returns
 */
function onDocumentTouchStart( event ) {
    if( event.touches.length == 1 ) {
        event.preventDefault();
        // Faking double click for touch devices
        var now = new Date().getTime();
        if ( now - timeOfLastTouch  < 250 ) {
            reset();
            return;
        }
        timeOfLastTouch = now;
        mouseX = event.touches[ 0 ].pageX;
        mouseY = event.touches[ 0 ].pageY;
        isMouseDown = true;
    }
}
/**
 * 触摸移动
 * @param event
 * @returns
 */
function onDocumentTouchMove( event ) {
    if ( event.touches.length == 1 ) {
        event.preventDefault();
        mouseX = event.touches[ 0 ].pageX;
        mouseY = event.touches[ 0 ].pageY;
    }
}

/**
 * 结束触摸
 * @param event
 * @returns
 */
function onDocumentTouchEnd( event ) {
    if ( event.touches.length == 0 ) {
        event.preventDefault();
        isMouseDown = false;
    }
}

/*var canvasDiv = document.getElementById('canvasDiv');
var canvas = document.createElement('canvas');
var canvasWidth = 1191;
var canvasHeight=670;
document.addEventListener( 'touchmove', onDocumentTouchMove, false );
var point = {};
point.notFirst = false;
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if(typeof G_vmlCanvasManager != 'undefined') {
	canvas = G_vmlCanvasManager.initElement(canvas);
}*/
/*var context = canvas.getContext("2d");
var img = new Image();
img.src = "./a.jpg";
img.onload = function(){
    var ptrn = context.createPattern(img,'no-repeat');
    context.fillStyle = ptrn;
    context.fillRect(0, 0, canvas.width, canvas.height);
}*/
/**
 * 触摸开始
 * @param e
 * @returns
 */
canvas.addEventListener("touchstart", function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

/**
 * 触摸结束
 * @param e
 * @returns
 */
canvas.addEventListener("touchend", function(e){
   paint = false;
});

/**
 * 触摸移动
 * @param e
 * @returns
 */
canvas.addEventListener("touchmove", function(e){
	 if(paint){
	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	    redraw();
	  }
});

/**
 * 鼠标按下
 * @param e
 * @returns
 */
canvas.addEventListener("mousedown", function(e){
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;
  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

/**
 * 鼠标移动
 * @param e
 * @returns
 */
canvas.addEventListener("mousemove", function(e){

  if(paint){

    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);

    redraw();
  }
});

/**
 * 鼠标松开
 * @param e
 * @returns
 */
canvas.addEventListener("mouseup", function(e){
  paint = false;
});

/**
 * 鼠标移开
 * @param e
 * @returns
 */
canvas.addEventListener("mouseleave", function(e){
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging){
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  //canvas.width = canvas.width; // Clears the canvas
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 2;
  while (clickX.length > 0 ) {
	  point.bx = point.x;
	  point.by = point.y;
	  point.x = clickX.pop();
	  point.y = clickY.pop();
	  point.drag = clickDrag.pop();
	  context.beginPath();
	  if (point.drag && point.notFirst) {
		  context.moveTo(point.bx, point.by);
	  } else {
		  point.notFirst = true;
		  context.moveTo(point.x - 1, point.y);
	  }
     context.lineTo(point.x, point.y);
     context.closePath();
     context.stroke();
  	}
  }