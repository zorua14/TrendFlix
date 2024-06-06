import axios from "axios";
import Keys from "../constants/Keys";


const apiBaseUrl = "https://api.themoviedb.org/3";
const searchMovieEndpoint = `${apiBaseUrl}/search/movie?api_key=${Keys.api_key}`;
const searcheriesEndpoint = `${apiBaseUrl}/search/tv?api_key=${Keys.api_key}`;

const movieDetailsEndpoint = (id) =>
    `${apiBaseUrl}/movie/${id}?api_key=${Keys.api_key}`;
const seriesDetailsEndpoint = (id) =>
    `${apiBaseUrl}/tv/${id}?api_key=${Keys.api_key}`;

const moviesCastEndPoint = (id) =>
    `${apiBaseUrl}/movie/${id}/credits?api_key=${Keys.api_key}`;
const seriesCastEndPoint = (id) =>
    `${apiBaseUrl}/tv/${id}/credits?api_key=${Keys.api_key}`;

const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params ? params : {},
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);
        return {};
    }
};
export const searchMovies = (params) => {
    return apiCall(searchMovieEndpoint, params);
};
export const searchSeries = (params) => {
    return apiCall(searcheriesEndpoint, params);
};
export const getMovieDetails = (id) => {
    return apiCall(movieDetailsEndpoint(id));
};
export const getSeriesDetails = (id) => {
    return apiCall(seriesDetailsEndpoint(id));
};
export const getMovieCast = (id) => {

    return apiCall(moviesCastEndPoint(id));
};
export const getSeriesCast = (id) => {

    return apiCall(seriesCastEndPoint(id));
};
