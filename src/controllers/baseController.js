import AppDataSource from "../data-source.js";

export default class BaseController {
	static handleError(res, message, error, statusCode = 500) {
		console.error(message, error);
		return res.status(statusCode).json({ message, error });
	}

    static validateString(value, paramName) {
        if (!value || typeof value !== "string") {
            throw new Error(`${paramName} must be a valid string`);
        }
        return value.trim();
    }

	static validateInteger(value, paramName) {
		const intValue = parseInt(value, 10);
		if (isNaN(intValue)) {
			throw new Error(`${paramName} must be a valid integer`);
		}
		return intValue;
	}

	static getRepository(entitySchema) {
		return AppDataSource.getRepository(entitySchema);
	}
}
