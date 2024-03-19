import axios from '../api/helpers/axios.ts';

//Types
import { ICharacter } from '../types/characters.ts';

export default {
    async getCharactersList(): Promise<ICharacter[]> {
        const response = await axios.get('/v1/public/characters');
        return response.data.data.results;
    },

    async getCharacter(characterId: number): Promise<ICharacter | null> {
        const response = await axios.get(`/v1/public/characters/${characterId}`);
        if (response.data.data.results.length > 0) {
            return response.data.data.results[0];
        } else {
            return null;
        }
    },

    async getCharacterByComic(comicId: number): Promise<ICharacter[]> {
        const response = await axios.get(`/v1/public/comics/${comicId}/characters`);
        return response.data.data.results;
    }
};
