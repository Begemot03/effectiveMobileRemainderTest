import "reflect-metadata";
import AppDataSource from "./data-source.js";
import express from "express";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", apiRouter);
app.use("*", (req, res) => {
	res.status(500).json({ message: "Bad request" });
});

AppDataSource.initialize()
	.then(async () => {
		app.listen(PORT, () => {
			console.log("Server is running");
		});
	})
	.catch((e) => console.log(e));
