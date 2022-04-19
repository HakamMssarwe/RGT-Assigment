import {Queue} from "bullmq";
import {redisHost, redisHostport} from "../utils/constants.mjs";

export const name = "multiplyQueue";
export const queue = new Queue(name, {
	connection: {
		host: redisHost,
		port: redisHostport,
	},
});
