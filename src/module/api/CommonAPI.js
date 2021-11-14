import axios from 'axios';
import { ApplicationProperties } from '../../ApplicationProperties';
const instance = axios.create({
	baseURL: ApplicationProperties.ACTIVE_NETWORK.apiUrl
});
const post = async (url, params) => {
	const response = await instance.post(url, params)
	return response;
}
const get = async (url) => {
	const { data } = await instance.get(url);
	return data;
}
const setBaseUrl = (url) => {
	instance.defaults.baseURL = url;
}
const CommonAPI = {
	post,
	get,
	setBaseUrl
}
export default CommonAPI;
