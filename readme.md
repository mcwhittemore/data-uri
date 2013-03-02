# Data-URI

Convert files (locally and via http/https) into data uris with ease.

# Installing

	npm install data-uri

## Usage

Explore demo/demo.js for more examples.

	data_uri.encode("buy_a_bonsai.jpg", function(results){
		console.log(results);
	});

Result:

	{
		buy_a_bonsai.jpg: {
			status: "SUCCESS",
			dataUri: "data:SOMELONGDATASTRING",
			err: null,
			statusCode: 200,
			res: { RESPOSE OBJECT }
		}
	}


## API

### encode(paths, callback, [startPos, endPos, results])

Creates data-uris for a file path or an array of files paths.

* paths: a string file path or an array of string file paths.
* callback: a function with a single parameter which will be passed a results object.
* startPos: Which index in the array of paths to start encoding at. Defaults to 0.
* endPos: Which index in the array of paths to stop decoding before. Defaults to paths.length;
* results: the results object to return, minus any changes to the results object made by encode. Defaults to {};
