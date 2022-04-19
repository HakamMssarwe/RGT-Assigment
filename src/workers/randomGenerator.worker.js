import {Worker} from "bullmq";
import * as fs from "fs/promises";
import {name} from "../queues/randomGenerator.queue.mjs";
import {dataPath, redisHost, redisHostport} from "../utils/constants.mjs";

export const worker = new Worker(
	name,
	async job => {
		const {max, min} = job.data;
		let d = new Date();

		let filename = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
		filename += ".txt";

		const text = `\n[${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}] Random Number = ${Math.round(Math.random() * (max - min) + min)}`;

		fs.appendFile(`${dataPath}/random/${filename}`, text, "utf-8", error => {
			if (error != null) throw new Error(error);
		});
	},
	{
		autorun: false,
		connection: {
			host: redisHost,
			port: redisHostport,
		},
	}
);
