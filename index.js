var express = require("express");
var alexa = require("alexa-app");
var express_app = express();

let fancify = require('./fancify')

var app = new alexa.app("sample");

app.intent("MyPhraseIsIntent", {
	"slots": { "UserPhrase": "AMAZON.SearchQuery" },
	"utterances": [
		"fancy fi {UserPhrase}",
		"repeat {UserPhrase}",
		"say {UserPhrase}",
		"translate {UserPhrase}"
	]
},
	(request, response) => {
		var input = request.slot("UserPhrase");
		
		console.log(`Incoming Request, Input: ${input}`)

		return fancify(input)
			.then(output => response.say(output))
			.catch(err => console.error(err));
	}
);

// setup the alexa app and attach it to express before anything else
app.express({ expressApp: express_app });

// now POST calls to /sample in express will be handled by the app.request() function
// GET calls will not be handled

// from here on, you can setup any other express routes or middleware as normal
express_app.listen(process.env.PORT || 443);