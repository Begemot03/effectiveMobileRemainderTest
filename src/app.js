import "reflect-metadata";
import AppDataSource from "./data-source.js";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(errorHandler);
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
