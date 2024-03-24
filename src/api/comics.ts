import axios from '../api/helpers/axios.ts';

//Types
import { IComic } from '../types/comics';

export default {
    async getComicsList(offset: number = 0, limit: number = 25): Promise<{ data: { results: IComic[] }, total: number }> {
        const response = await axios.get(`/comics?limit=${limit}&offset=${offset}`);
        return {
            data: response.data.data.results,
            total: response.data.data.total
        };
    },

    async getComic(comicId: number): Promise<IComic | null> {
        const response = await axios.get(`/comics/${comicId}`);
        if (response.data.data.results.length > 0) {
            return response.data.data.results[0];
        } else {
            return null;
        }
    },

    async getComicsByCharacter(characterId: number): Promise<IComic[]> {
        const response = await axios.get(`/comics`, {
            params: {
                characters: characterId
            }
        });
        return response.data.data.results;
    }
};
