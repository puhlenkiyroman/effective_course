import axios from '../api/helpers/axios.ts';

// Types
import { Character } from '../types/characters.ts';

export default {
    async getCharactersList(): Promise<Character[]> {
        try {
            const response = await axios.get('/v1/public/characters');
            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            throw error;
        }
    },

    async getCharacter(characterId: number): Promise<Character | null> {
        try {
            const response = await axios.get(`/v1/public/characters/${characterId}`);
            if (response.data.data.results.length > 0) {
                return response.data.data.results[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching character:', error);
            throw error;
        }
    },

    async getCharacterByComic(comicId: number): Promise<Character[]> {
        try {
            const response = await axios.get(`/v1/public/comics/${comicId}/characters`);
            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching characters by comic:', error);
            throw error;
        }
    }
};
