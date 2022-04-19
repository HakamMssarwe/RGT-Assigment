import {Queue} from "bullmq";
import { redisHost, redisHostport } from "../utils/constants.mjs";

export const name = "randomGenerator";
export const queue = new Queue(name, {
	connection: {
		host: redisHost,
		port: redisHostport,
	},
});
