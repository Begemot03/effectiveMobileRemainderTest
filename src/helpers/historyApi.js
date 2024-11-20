import "dotenv/config";

const PORT = process.env.APP_HISTORY_POST;
const url = `http://localhost:${PORT}/api`;

const historyApi = async (path, body) => {
    await fetch(`${url}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
}

export default historyApi;