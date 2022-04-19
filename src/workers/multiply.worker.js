import {Worker} from "bullmq";
import * as fs from "fs/promises";
import {name} from "../queues/multiply.queue.mjs";
import {dataPath, redisHost, redisHostport} from "../utils/constants.mjs";

export const worker = new Worker(
	name,
	async job => {
		const {x, y} = job.data;
		let d = new Date();

		let filename = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
		filename += ".txt";
		const text = `\n[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] ${x} * ${y} = ${x * y}`;

		try {
			fs.appendFile(`${dataPath}/multiply/${filename}`, text, "utf-8");
		} catch (ex) {
			console.log(ex);
		}
	},
	{
		autorun: false,
		connection: {
			host: redisHost,
			port: redisHostport,
		},
	}
);
