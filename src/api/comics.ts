import axios from '../api/helpers/axios.ts';

//Types
import { IComic } from '../types/comics';

export default {
    async getComicsList(offset: number = 0, limit: number = 60): Promise<IComic[]> {
        const response = await axios.get(`/v1/public/comics?limit=${limit}&offset=${offset}`);
        return response.data.data.results;
    },

    async getComic(comicId: number): Promise<IComic | null> {
        const response = await axios.get(`/v1/public/comics/${comicId}`);
        if (response.data.data.results.length > 0) {
            return response.data.data.results[0];
        } else {
            return null;
        }
    },

    async getComicsByCharacter(characterId: number): Promise<IComic[]> {
        const response = await axios.get(`/v1/public/comics`, {
            params: {
                characters: characterId
            }
        });
        return response.data.data.results;
    }
};
