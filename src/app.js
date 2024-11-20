import "reflect-metadata";
import AppDataSource from "./data-source.js";
import express from "express";
import apiRouter from "./routes/api.js";
import "dotenv/config";

const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use("/api", apiRouter);
app.use("*", (req, res) => {
	res.status(500).json({ message: "Bad request" });
});

AppDataSource.initialize()
	.then(async () => {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((e) => console.log(e));
