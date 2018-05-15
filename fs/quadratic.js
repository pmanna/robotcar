var canvas = null;
var context = null;
var xyFactor = 20;   	
var xyRange = 0;
var xyStep = 10;

function clearCanvas() {
	var h = canvas.height;
	var w = canvas.width;	
	var halfH = h / 2;
	var halfW = w / 2;
	
	context.clearRect(-halfW, -halfH, w, h);
	
	context.lineWidth = 1;
	
	context.beginPath();
	context.moveTo(-halfW,0);
	context.lineTo(halfW,0);
	context.stroke();

	context.beginPath();
	context.moveTo(0,-halfH);
	context.lineTo(0,halfH);
	context.stroke();

	context.lineWidth = 7;
	context.strokeRect(-halfW, -halfH, w, h);
}

function setupCanvas() {
	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');
	
	var h=parseInt(canvas.height);
	var w=parseInt(canvas.width);	
	
	xyRange = w/2;// eg 600/2 gives range of -300 to + 300

	context.fillStyle = "#9ea7b8";
	context.fillRect(0,0,w,h);
	context.translate(h/2,w/2);
	
	clearCanvas();
}

function printDot(thix,thiy,tcolor,tsize) {
	var myx = thix;
	var myy = -1*thiy;

	context.beginPath();
	context.rect(myx, myy, tsize, tsize);
	context.fillStyle = tcolor;
	context.fill();
}

var a = 0;
var b = 0;
var c = 0;

function fullCheck() {
	return inputcheck() && rangeCheck();
}

function initialise() {
	clearCanvas();
	
	a = document.getElementById("a").value;
	b = document.getElementById("b").value;
	c = document.getElementById("c").value;
}

function getDistance(x1,y1,x2,y2) {
	var dist = 0;

	dist = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
//	alert("getDistance x1,y1 = "+x1+","+y1+" x2,y2 = "+x2+","+y2+" dist = " + dist);

	return dist;
}

function getAngle(x1,y1,x2,y2) {
	var angle = 0;
	var xDist = x1 - x2;
	var yDist = y1 - y2;
	
	// NOTE: According to https://www.w3schools.com/jsref/jsref_atan2.asp
	// Y comes _first_
	angle = Math.atan2(yDist, xDist);
	angle *= 180 / Math.PI;

//	console.log("getAngle x1,y1 = "+x1+","+y1+" x2,y2 = "+x2+","+y2+"xDist = "+xDist+ "yDist = "+yDist+" angle " + angle);

	return angle;	
}

function getQuadratic(x){
	var y = (a * x * x) + (b * x) + (c * 1);

//	alert("getQuadratic x = "+x + ", y = "+ y);

	return y;
}

/*
function getOrientation(angle1,angle2,orientation,angle){
	angle1 = angle;
	angle2 - angle1 = 

	return angle1;

}
*/ 

function generate(){
	var output = "";
//	var range = 10;
	var dist = 0;
	var angle = 0;
	var prevX = 0;
	var prevY = 0;
	var x = 0;
	var y = 0;
	var prevAngle = 0;
	var moveAngle = 0;
	var orientation = 0
	
	
	initialise();
	
	// TODO: Position the car to the starting point
	
	// prevX = -range;
	// prevY = getQuadratic(prevX);

	if (fullCheck()){
		for(x = -xyRange+1; x <= xyRange; x += xyStep) {
			y = getQuadratic(x / xyFactor);
			
			/*
			dist = getDistance(x,y,prevX,prevY);
			prevAngle = getAngle(x,y,prevX,prevY);
			moveAngle = orientation - prevAngle;

			moveRobot(dist,moveAngle);
			*/
			printDot(x,y,"red",5);
			
//			console.log("prevX,prevY = "+prevX+","+prevY+" x,y = "+x+","+y+" dist = "+dist+" angle = "+angle);
			
// 			prevX = x;
// 			prevY = y;
		}
		
		// TODO: Take car back to zero again
	} else {
		alert("Invalid input/s, please use integers and stay within the ranges");
	}
}

function moveRobot(dist,angle){
	console.log(dist + " , " + angle);
}

function rangeCheck() {
	var ret = true;
	
	var myaMax = document.getElementById("amax").value;
	var myaMin = document.getElementById("amin").value;
	
	var mybMax = document.getElementById("bmax").value;
	var mybMin = document.getElementById("bmin").value;
	
	var mycMax = document.getElementById("cmax").value;
	var mycMin = document.getElementById("cmin").value;

	if ((inRange(a,myaMin,myaMax) == true)
		&&(inRange(b,mybMin,mybMax) == true)
		&&(inRange(c,mycMin,mycMax) == true)) {
		ret = true;
	} else {
		ret = false
	}
	
	return ret;
}

function inRange(myVal,myMin,myMax) {
	// alert("inrange check");
	var ret = true;
	myVal = myVal*1;
	
	if ((myVal <= myMax) && (myVal >= myMin)) { 
		ret = true;
	} else {
		ret = false;
	}
	
//	alert("inrange ret is "+ret + "for parameters "+myVal+","+myMin+","+myMax);
	
	return ret;
}

function inputcheck() {
	var ret = true;
	
	if ((isInt(a))
		&& (isInt(b))
		&& (isInt(c))) {
		ret = true; 
	} else {
		ret = false;
	}
//	alert(ret);
//	alert("Checking...");
	
	return ret;
}

function isInt(value) {
	var x = parseFloat(value);

	return !isNaN(value) && (x | 0) === x;
}