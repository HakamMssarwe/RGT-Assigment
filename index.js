import express from "express";
import folderHandler from "./src/utils/folderHandler.mjs";
import {queue as multiplyQueue} from "./src/queues/multiply.queue.mjs";
import {queue as randomGeneratorQueue} from "./src/queues/randomGenerator.queue.mjs";
import {worker as multiplyWorker} from "./src/workers/multiply.worker.js";
import {worker as randomGeneratorWorker} from "./src/workers/randomGenerator.worker.js";

const app = express();
const port = 8000;

//Middlewares
app.use(express.json());

//Routes
app.post("/multiply", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const {x, y} = req.body;

	//Validation
	const pattern = /[0-9]$/;
	if (x == undefined || y == undefined) return res.status(404).json({status: 404, message: "Body must contain two properties: 'x' & 'y'"});
	else if (!(pattern.test(x) && pattern.test(y))) return res.status(404).json({status: 404, message: "Invalid property type, only numbers are allowed."});

	//Add to Queue
	multiplyQueue.add("multiply", {x: x, y: y});

	res.send(JSON.stringify({message: "ok"}));
});

app.post("/random", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const {max, min} = req.body;

	//Validation
	const pattern = /[0-9]$/;
	if (max == undefined || min == undefined) return res.status(404).json({status: 404, message: "Body must contain two properties: 'max' & 'min'"});
	else if (!(pattern.test(max) && pattern.test(min))) return res.status(404).json({status: 404, message: "Invalid property type, only numbers are allowed."});

	//Add to Queue
	randomGeneratorQueue.add("generate", {min: min, max: max});

	res.send(JSON.stringify({message: "ok"}));
});

//Server
app.listen(port, () => {
	//Create a folder foreach endpoint
	app._router.stack.forEach(r => {
		if (r.route && r.route.path) {
			folderHandler(r.route.path);
		}
	});
	console.log(`Server is now listening on port ${port}`);
	multiplyWorker.run();
	randomGeneratorWorker.run();
});
