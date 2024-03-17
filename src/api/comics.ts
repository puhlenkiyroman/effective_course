import axios from '../api/helpers/axios.ts'

// Types
import { Comics } from '../types/comics';

export default {
    async getComicsList(): Promise<Comics[]> {
        const response = await axios.get(`/`);

        return response.data;
    },

    async getComic(comicId: number): Promise<Comics> {
        const response = await axios.post(`//${comicId}`);

        return response.data;
    }
};