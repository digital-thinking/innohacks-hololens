var Leap = require("leapjs");
var Bacon = require('baconjs').Bacon;
var brain = require("brain");
var fs = require("fs");
var WebSocketServer = require('websocket').server;
var http = require('http');

// Leap.loop(function(frame){
//   console.log(frame);
// });

// var server = http.createServer(function(request, response) {
// 	console.log((new Date()) + ' Received request for ' + request.url);
// 	response.writeHead(404);
// 	response.end();
// });
// server.listen(8080, function() {
// 	console.log((new Date()) + ' Server is listening on port 8080');
// });

// wsServer = new WebSocketServer({
// 	httpServer: server,
// 	// You should not use autoAcceptConnections for production
// 	// applications, as it defeats all standard cross-origin protection
// 	// facilities built into the protocol and the browser.  You should
// 	// *always* verify the connection's origin and decide whether or not
// 	// to accept it.
// 	autoAcceptConnections: false
// });

// function originIsAllowed(origin) {
// 	// put logic here to detect whether the specified origin is allowed.
// 	return true;
// }

// var connection;

// wsServer.on('request', function(request) {
// 	if (!originIsAllowed(request.origin)) {
// 		// Make sure we only accept requests from an allowed origin
// 		request.reject();
// 		console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
// 		return;
// 	}

// 	connection = request.accept('echo-protocol', request.origin);
// 	console.log((new Date()) + ' Connection accepted.');
// 	connection.on('message', function(message) {
// 		if (message.type === 'utf8') {
// 			console.log('Received Message: ' + message.utf8Data);
// 			connection.sendUTF(message.utf8Data);
// 		} else if (message.type === 'binary') {
// 			console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
// 			connection.sendBytes(message.binaryData);
// 		}
// 	});
// 	connection.on('close', function(reasonCode, description) {
// 		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
// 	});
// });


var sendConnection;

var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
	console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
	sendConnection = connection;
	console.log('WebSocket Client Connected');
	connection.on('error', function(error) {
		console.log("Connection Error: " + error.toString());
	});
	connection.on('close', function() {
		console.log('echo-protocol Connection Closed');
	});
	connection.on('message', function(message) {
		if (message.type === 'utf8') {
			// console.log("Received: '" + message.utf8Data + "'");
		}
	});

	// function sendNumber() {
	// 	if (connection.connected) {
	// 		var number = Math.round(Math.random() * 0xFFFFFF);
	// 		connection.sendUTF(number.toString());
	// 		setTimeout(sendNumber, 1000);
	// 	}
	// }
	// sendNumber();
});

client.connect('ws://46.101.102.181:8080');

function sendMessage(message) {
	// if (connection !== undefined) {
		sendConnection.sendUTF(message);
	// }
}

var controller = new Leap.Controller({ enableGestures: false }).setBackground(false);

function frameStream(controller) {
	return Bacon.fromBinder(function(sink) {
		controller.loop(function(frame) {
			sink(frame);
			// })
			// .use('boneHand', {
			// targetEl: document.body,
			// arm: true
		});
		return function() {
			console.log("frameStream off");
		}
	})
}

var frameStream = frameStream(controller);


var net = new brain.NeuralNetwork();

fs.readFile("./distance_training_net.json", "utf8", function(err, data) {
	if (err) {
		console.log(err);
		return;
	}
	net = net.fromJSON(JSON.parse(data));
})


// frameStream.onValue(function(value) {
// 	// window.frameObject = value;
// 	console.log(value);
// })

var fingers = [];

for (var i = 0; i < 5; i++) {
	(function(i) {
		fingers.push(frameStream.map(function(value) {
			return value.fingers[i]
		}));
	})(i);
}

var bones = [
	[],
	[],
	[],
	[],
	[]
];

// starting from tip

for (var i = 0; i < 5; i++) {
	bones[i][0] = fingers[i].filter(function(value) {
		return value !== undefined
	}).map(function(value) {
		return value.tipPosition
	});
	bones[i][1] = fingers[i].filter(function(value) {
		return value !== undefined
	}).map(function(value) {
		return value.dipPosition
	});
	bones[i][2] = fingers[i].filter(function(value) {
		return value !== undefined
	}).map(function(value) {
		return value.pipPosition
	});
	bones[i][3] = fingers[i].filter(function(value) {
		return value !== undefined
	}).map(function(value) {
		return value.mcpPosition
	});
	bones[i][4] = fingers[i].filter(function(value) {
		return value !== undefined
	}).map(function(value) {
		return value.carpPosition
	});
}

// bones[3][3].log();

var palmPosition = frameStream.filter(function(value) {
	return value !== undefined && value.hands[0] !== undefined
}).map(function(value) {
	return value.hands[0].palmPosition
});


// var blueMesh = new THREE.Mesh(new THREE.SphereGeometry(5, 10, 10), new THREE.MeshLambertMaterial({color: 0x091DFF}));
// var redMesh = new THREE.Mesh(new THREE.SphereGeometry(5, 10, 10), new THREE.MeshLambertMaterial({color: 0xFF0007}));
// var yellowMesh = new THREE.Mesh(new THREE.SphereGeometry(5, 10, 10), new THREE.MeshLambertMaterial({color: 0xFFF200}));
// controller.plugins.boneHand.scene.add(blueMesh);

// bones[0][2].onValue(function(value) {
// 	blueMesh.position.fromArray(value);
// })

// starting from thumb
var tipDistances = [
	[],
	[],
	[],
	[]
];

tipDistances[0] = Bacon.zipAsArray(bones[0][0], bones[1][0]).map(function(value) {
	return Leap.vec3.distance(value[0], value[1]);
});

tipDistances[1] = Bacon.zipAsArray(bones[1][0], bones[2][0]).map(function(value) {
	return Leap.vec3.distance(value[0], value[1]);
});

tipDistances[2] = Bacon.zipAsArray(bones[2][0], bones[3][0]).map(function(value) {
	return Leap.vec3.distance(value[0], value[1]);
});

tipDistances[3] = Bacon.zipAsArray(bones[3][0], bones[4][0]).map(function(value) {
	return Leap.vec3.distance(value[0], value[1]);
});

// frameStream.log();
// t
// var trainCaseTrue = Bacon.zipAsArray(tipDistances).sampledBy(recordFrameEventStream.filter(function(value) {return value.keyCode === 84}))
// .map(function(value) {
// 	return value.map(function(val) {
// 		return val / 100;
// 	});
// })
// .map(function(value) {
// 	var trainCase =  {
// 		input: value,
// 		output: [1]
// 	}
// 	return trainCase;
// });

// // f
// var trainCaseFalse = Bacon.zipAsArray(tipDistances).sampledBy(recordFrameEventStream.filter(function(value) {return value.keyCode === 70}))
// .map(function(value) {
// 	return value.map(function(val) {
// 		return val / 100;
// 	});
// })
// .map(function(value) {
// 	var trainCase =  {
// 		input: value,
// 		output: [0]
// 	}
// 	return trainCase;
// });



// trainCaseTrue.merge(trainCaseFalse).onValue(function(value) {
// 	window.output.push(value);
// });


var gestureCheckStream = Bacon.combineAsArray(tipDistances)
	.map(function(value) {
		return value.map(function(val) {
			return val / 100;
		})
	})
	.map(function(value) {
		return net.run(value);
	});

var mapInteractionStream = palmPosition.slidingWindow(2)
	.filter(function(value) {
		return value.length > 1;
	});


var moveStream = mapInteractionStream.map(function(value) {
		return [(value[1][0] - value[0][0]) * -4, (value[1][1] - value[0][1]) * 4];
	})
	.sampledBy(gestureCheckStream.filter(function(value) {
		return value > 0.6;
	}))
	.onValue(function(value) {
		console.log(new Date(), { type: "move", data: value });
		sendMessage(JSON.stringify({ type: "move", data: value }));
		// moveMapByPx(value);
	});


var zoomStream = mapInteractionStream.map(function(value) {
		return value[0][2] - value[1][2];
	})
	.sampledBy(gestureCheckStream.filter(function(value) {
		return value > 0.6;
	}))
	.onValue(function(value) {
		console.log(new Date(), { type: "zoom", data: value });
		sendMessage(JSON.stringify({ type: "zoom", data: value }));
		// zoomBy(value);
	});
