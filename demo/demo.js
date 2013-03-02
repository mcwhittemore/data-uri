var data_uri = require("../lib/data-uri");
var fs = require("fs");

/* ========================================================================================= ***/
/** ======================================= FILE TEST ======================================= **/
/*** ========================================================================================= */

var file_callback = function(results){
	var filePaths = Object.keys(results);
	
	var html = "<html><body><table>";

	for(var i=0; i<filePaths.length; i++){
		var filePath = filePaths[i];
		
		html += "<tr>";
			html += "<td>";
				html += filePath;
			html += "</td>";
			html += "<td>";
				html += "<a href='"+filePath+"'>ORIGNAL FILE</a>";
			html += "</td>";
			html += "<td>";
				html += "<a href='"+results[filePath].dataUri+"'>DATA URI</a>";
			html += "</td>";
		html += "</tr>";
	}

	html += "</table></body></html>";

	fs.writeFile("fileTest.html", html, "utf8");
}

var files = [
	"demo.js", //LOCAL FILE
	"buy_a_bonsai.jpg", //LOCAL IMG
	"imgTest.html", //LOCAL HTML
	"http://willrobotsdream.com/", //HTTP HTML
	"https://github.com/", //HTTPS HTML
	"http://soundjax.com/reddo/97407%5EClapping.mp3" //HTTP MP3

];

/* ========================================================================================= ***/
/** ====================================== IMAGE DEMO ======================================= **/
/*** ========================================================================================= */

var img_callback = function(results){
	var filePaths = Object.keys(results);
	
	var html = "<html><body><table><tr><th>Orignal</th><th>DATA URI</th></tr>";

	for(var i=0; i<filePaths.length; i++){
		var filePath = filePaths[i];
		
		html += "<tr>";
			html += "<td>";
				html += "<img src='"+filePath+"'>";
			html += "</td>";
			html += "<td>";
				html += "<img src='"+results[filePath].dataUri+"'>";
			html += "</td>";
		html += "</tr>";
	}

	html += "</table></body></html>";

	fs.writeFile("imgTest.html", html, "utf8", function(err){
		//WE ARE GOING TO USE THIS FILE IN OUR NEXT TEST SO WE NEED
		//TO WAIT UNTIL WE KNOW IT HAS BEEN MADE TO RUN
		if(!err)
			data_uri.encode(files, file_callback);
		else
			console.log("ERROR");
	});

}

var imgs = [
	"https://www.google.com/images/srpr/logo4w.png", //HTTPS
	"http://feval.info/html5devconf/resources/nodejs.png", //HTTP
	"buy_a_bonsai.jpg" //LOCAL
];


//START IMG TEST
data_uri.encode(imgs, img_callback);