export default class OrderController {
	static async all(req, res) {
		return res.status(200).json({ message: "all good" });
	}
}
