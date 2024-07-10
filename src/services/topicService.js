import { get } from "../untils/request";

export const getListTopics = async (key, value) => {
    const result = await get(`topics?${key}=${value}`);
    return result;
}

export const getTopic = async (id) => {
    const result = await get(`topics/${id}`);
    return result;
}