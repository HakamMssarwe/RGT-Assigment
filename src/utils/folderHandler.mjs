import fs from "fs";

export default function (folderName) {
	try {
		if (!fs.existsSync(`./src/data${folderName}`)) {
			fs.mkdirSync(`./src/data${folderName}`);
		}
	} catch (err) {
		console.error(err);
	}
}
