var postdata = "I'm changing this to see if I'm manipulating the wrong thing"
var paragraphs = dividewords();
var paused = false;
var timer;

$('#start').click(function(){
	var file = document.getElementById('file').files[0];
	if(file){
		getAsText(file);
		//alert(postdata);
		

	}
	 else if(document.getElementById('words').value != "") {
	// 	localStorage.setItem('data', document.getElementById('words').value)
		//alert(postdata);
		window.location.href = `action_page.html?data=` + document.getElementById('words').value
	} else {
		alert("Nothing was entered.");
	}
});

function getAsText(file) {//converts the file into a legible string
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			postdata = contents;
			window.location.href = `action_page.html?data=` + contents
		};
		reader.readAsText(file);
	} else {
		alert('The File APIs are not fully supported by your browser.');
	}
	/*
	reader.readAsText(readFile, "UTF-8");
	reader.onload = loaded;
	reader.onerror = errorHandler;
	*/
}

function displayContents(contents) {
  var element = document.getElementById('WORDS');
  element.textContent = contents;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function dividewords()//splits the paragraphs and stuff into different words
{
	if (getUrlVars().data) postdata = getUrlVars().data.replace(/%27/g, `'`)
	//postdata = localStorage.getItem('data');
	var paragraphs = postdata.split("\n");
	var realparagraphs = new Array(paragraphs.length);
	for (var i = 0; i <= paragraphs.length - 1; i++) {
		realparagraphs[i] = paragraphs[i].split("%20");
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

/*
function loaded(evt)//loads it
{
	var fileString = evt.target.result;
	loadedtext = fileString;
}

function errorHandler(evt) {//handles errors
	if(evt.target.error.name == "NotReadableError") {
		alert("Text could not be read");
	}
}

function BeginReadText()//posts it to the action_page.html, may need to be fixed. 
{
	post("action_page.html",loadedtext,"post");
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path: the path to send the post request to
 * @param {object} params: the parameters to add to the url
 * @param {string} [method=post]: the method to use on the form
 */
/*
function post(path, params, method) {//post method
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}
*/