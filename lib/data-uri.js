var request = require("request");
var mime = require("mime");
var fs = require("fs");

module.exports.render = function(type, content, isFile, callback){

	var data;
	if(typeof isFile != "undefined"){
		data = new Buffer(content).toString('base64');
	}
	else{
		data = new Buffer(content, "binary").toString('base64');
	}

	var result = "data:"+type+";base64,"+data;

	if(callback!=undefined){
		callback(result);
	}
	else{
		return result;
	}

}

module.exports.encode = function(paths, callback, startPos, endPos, results){

	if(Object.prototype.toString.call( paths ) !== '[object Array]'){
		paths = [paths];
	}

	if(typeof startPos == "undefined"){
		startPos = 0;
	}
	else if(typeof startPos == "object"){
		results = startPos;
		startPos = 0;
	}

	if(typeof endPos == "undefined"){
		endPos = paths.length;
	}
	else if(typeof endPos == "object"){
		results = endPos;
		endPos = paths.length;
	}

	if(typeof results == "undefined"){
		results = { };
	}


	if(startPos<endPos){
		var path = paths[startPos];

		var result = function(err, res, body){
		
			var sc = 301;

			if(err){
				sc = 500;
			}
			else{
				sc = res.statusCode;
			}

			results[path] = {
				status: undefined,
				dataUri: undefined,
				err: err,
				statusCode: sc,
				res: res
			};

			if(!err && res.statusCode==200){

				var data;
				if(typeof res.headers.isFile != "undefined"){
					data = new Buffer(body).toString('base64');
				}
				else{
					data = new Buffer(body, "binary").toString('base64');
				}

				results[path].dataUri = exports.render(res.headers["content-type"], body, res.headers.isFile);
				results[path].status = "SUCCESS";
			}
			else{
				results[path].err = err;
				results[path].status = "ERROR";
			}

			if(startPos<endPos-1){
				module.exports.encode(paths, callback, startPos+1, endPos, results);
			}
			else{
				callback(results);
			}
		}

		if(path.search(/http[s]*:\/\//g)>-1){
			request(path, {encoding:"binary"}, result);
		}
		else{
			fs.readFile(path, function(err, data){
				var res = {
					statusCode:200,
					headers:{
						"content-type": mime.lookup(path)
					},
					isFile:true
				};
				result(err, res, data);
			});
		}
	}
	else{
		callback(results);
	}
}