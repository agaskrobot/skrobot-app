import axios from 'axios/index';

// Get all episodes
export const getResultsInfo = (date) => axios.get(`https://www.lottoland.com/api/drawings/euroJackpot/${date}`);
