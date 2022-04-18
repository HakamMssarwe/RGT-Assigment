import {Queue} from "bullmq";

export const name = "randomGenerator";
export const queue = new Queue(name, {});
