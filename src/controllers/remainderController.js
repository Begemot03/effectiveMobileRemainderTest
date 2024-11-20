import AppDataSource from "../data-source.js";
import RemainderSchema from "../entities/remainderSchema.js";

export default class RemainderController {
	static async all(req, res) {
		try {
			const remainderRepository = AppDataSource.getRepository(RemainderSchema);
			const remainders = await remainderRepository.find();

			return res.status(200).json({ data: remainders });
		} catch (e) {
			return res.status(500).json({ message: "Error fetching remainders", error });
		}
	}

	static async create(req, res) {
		try {
		} catch (e) {}
	}
}
