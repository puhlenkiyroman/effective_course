import axios from '../api/helpers/axios.ts';

//Types
import { ICharacter } from '../types/characters.ts';

export default {
    async getCharactersList(offset: number = 0, limit: number = 25): Promise<{ data: ICharacter[], total: number }> {
        const response = await axios.get(`/characters?offset=${offset}&limit=${limit}`);
        return {
            data: response.data.data.results,
            total: response.data.data.total
        };
    },

    async getCharacter(characterId: number): Promise<ICharacter | null> {
        const response = await axios.get(`/characters/${characterId}`);
        if (response.data.data.results.length > 0) {
            return response.data.data.results[0];
        } else {
            return null;
        }
    },

    async getCharacterByComic(comicId: number): Promise<ICharacter[]> {
        const response = await axios.get(`/comics/${comicId}/characters`);
        return response.data.data.results;
    },

    async searchCharactersByName(nameStartsWith: string, offset: number = 0, limit: number = 25): Promise<{ data: { results: ICharacter[] }, total: number }> {
        const response = await axios.get(`/characters?nameStartsWith=${nameStartsWith}&offset=${offset}&limit=${limit}`);
        return {
            data: response.data.data.results,
            total: response.data.data.total
        };
    },
};