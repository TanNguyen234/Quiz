import { getCookie } from "../helpers/cookie"
import { get } from "../untils/request";

export const getAnswersByUserId = async () => {
    const userId = getCookie("id");
    const results = await get(`answers?userId=${userId}`);
    return results;
}

export const getAnswer= async (id) => {
    const results = await get(`answers/${id}`);
    return results;
}