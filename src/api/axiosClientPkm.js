import axios from 'axios';
import queryString from 'query-string';
import appConfig from '../config';

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClientPkm = axios.create({
    baseURL:`${appConfig.API_POKEMON_URL}`,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClientPkm.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClientPkm.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClientPkm;