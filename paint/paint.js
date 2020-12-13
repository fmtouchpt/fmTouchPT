var canvas, ctx, flag = false,
		prevX = 0,
		currX = 0,
		prevY = 0,
		currY = 0,
		dot_flag = false;

var x = "red",
		y = 0.25;

function init() {
		canvas = document.getElementById('can');
		ctx = canvas.getContext("2d");
		w = canvas.width;
		h = canvas.height;


		canvas0 = document.getElementById('can0');
		ctx0 = canvas0.getContext("2d");
		make_base();

		canvas.addEventListener("mousemove", function (e) {
				findxy('move', e)
		}, false);
		canvas.addEventListener("mousedown", function (e) {
				findxy('down', e)
		}, false);
		canvas.addEventListener("mouseup", function (e) {
				findxy('up', e)
		}, false);
		canvas.addEventListener("mouseout", function (e) {
				findxy('out', e)
		}, false);
}



function make_base()
{
  base_image = new Image();
  base_image.src = 'img/base.png';
  base_image.onload = function(){
    ctx0.drawImage(base_image, 0, 0);
  }
}

function lineWidthRange() {
    var widthLine = document.getElementById("myRange").value;
    return widthLine;
};

function color(obj) {
		switch (obj.id) {
				case "red":
						x = "red";
						y = 0.15
						ctx.globalCompositeOperation = "source-over";
						break;
				case "white":
						x = "white";
						y = 1;
						ctx.globalCompositeOperation = "destination-out";
						ctx.strokeStyle = "rgba(0,0,0,1)";
						break;
		}
}

function draw() {
		ctx.beginPath();
		ctx.lineWidth = lineWidthRange();
		ctx.strokeStyle = x;
		ctx.lineCap = "round"
		ctx.globalAlpha = y;
		ctx.arc(currX, currY, ctx.lineWidth, 0, 2*Math.PI);
		ctx.fillStyle = x
    ctx.fill();

}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function findxy(res, e) {
		if (res == 'down') {
				prevX = currX;
				prevY = currY;
				currX = e.clientX - canvas.offsetLeft;
				currY = e.clientY - canvas.offsetTop;
				draw();
				flag = true;

		}
		if (res == 'up' || res == "out") {
				flag = false;
		}
		if (res == 'move') {
				if (flag) {
						prevX = currX;
						prevY = currY;
						currX = e.clientX - canvas.offsetLeft;
						currY = e.clientY - canvas.offsetTop;
						draw();
						// sleep(90)
						if (x=="red"){
							sleep(80)
						}
				}
		}
}

function erase() {
		var m = confirm("Seguro que desea borrar todo?");
		if (m) {
				ctx.clearRect(0, 0, w, h);
		}
}

function save() {
		var m2 = confirm("Esta será la imagen final que se enviará. Desea proceder?");
		if (m2) {
				var dataURL = canvas.toDataURL();
				var query = window.location.search.substring(1);
				document.getElementById('inp_img').value = dataURL;
				document.getElementById('idNum').value = query;
				//document.getElementById('submitForm').action="https://send.pageclip.co/kShRurKKnsNkhkEnbHrXx8ShfltuyC9w";
				document.getElementById('submitForm').action="https://usebasin.com/f/2cf9ca060022"
				document.getElementById("submitForm").submit();
				//window.alert("Su información ha sido enviada. Muchas gracias por su colaboración");
				//var win = window.open("../finalMess.html", '_self');

		}
}
