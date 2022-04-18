import {Queue} from "bullmq";

export const name = "multiplyQueue";
export const queue = new Queue(name, {});
