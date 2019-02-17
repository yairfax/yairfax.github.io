var postdata = "Hello World, lorem ispu dolor sit amet\nHello people I exist."//to be the read post text
var paragraphs = dividewords();
var paused = false;
var timer;

function readposttext()
{
	//reads the post text to be implemented
}


function dividewords()//splits the paragraphs and stuff into different words
{
	var paragraphs = postdata.split("\n");
	var realparagraphs = new Array(paragraphs.length);
	for (var i = 0; i <= paragraphs.length - 1; i++) {
		realparagraphs[i] = paragraphs[i].split(" ");
	};
	return realparagraphs;
}

function Timer(callback, delay) {//the timer, adds the pause and resume functinality to setTimeout
	var args = arguments,
		self = this,
		timer, start;

	this.clear = function () {
		clearTimeout(timer);
	};

	this.pause = function () {
		this.clear();
		delay -= new Date() - start;
	};

	this.resume = function () {
		start = new Date();
		timer = setTimeout(function () {
			callback.apply(self, Array.prototype.slice.call(args, 2, args.length));
		}, delay);
	};

	this.resume();
}

function callback(i, q, timeout) //callback function, constantly called function that writes the words and then waits.s
{
	document.getElementById("WORDS").innerHTML = paragraphs[i][q];
	if (q == 0){
		timer = new Timer(callback, timeout*3,i,q+1,timeout)//sets the timer and calls the function and the next word
		if(paused)//checks if paused, if it is pauses it. 
		{
			timer.pause();
		}
	}
	else if (q < paragraphs[i].length-1) 
	{
		timer = new Timer(callback, timeout,i,q+1,timeout)//sets the timer and calls the function and the next word
		if(paused)//checks if paused, if it is pauses it. 
		{
			timer.pause();
		}
	} 
	else if (i < paragraphs.length-1) 
	{
		timer = new Timer(callback,timeout,i + 1, 0,timeout)//sets the timer and calls the function and the next paragraph
		if(paused)//checks if paused, if it is pauses it. 
		{
			timer.pause();
		}
	}
}

function writewords()//first callback, began with button press
{
	var num = parseInt(document.getElementById("timeout").value)+250
	callback(0,0, num);
}

function Pause()//button toggled pause resume
{
	if(paused)
	{
		paused = false;
		//resume
		timer.resume();
		document.getElementById("pause").value = "Pause"
	}
	else
	{
		paused = true;
		//pause
		timer.pause();
		document.getElementById("pause").value = "Resume"
	}
}

$("#starts").click(function() {
	var num = parseInt($("#timeout").val())+250;
	console.log('hello')
	callback(0,0, num);
})

$("#pause").click(function() {
	if(paused)
	{
		paused = false;
		//resume
		timer.resume();
		$("#pause").text("Pause");
	}
	else
	{
		paused = true;
		//pause
		timer.pause();
		$("#pause").text("Resume");
	}
})