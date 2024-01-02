import axios from 'axios';

const fetcher = (url: string) => axios.get(url, { withCredentials: false }).then((response) => response.data);

export default {fetcher};