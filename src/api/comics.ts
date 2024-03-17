import axios from '../api/helpers/axios.ts'

// Types
import { Comic } from '../types/comics';

export default {
    async getComicsList(): Promise<Comic[]> {
        try {
            const response = await axios.get('/v1/public/comics');

            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            throw error;
        }
    },

    async getComic(comicId: number): Promise<Comic | null> {
        try {
            const response = await axios.get(`/v1/public/comics/${comicId}`);
            if (response.data.data.results.length > 0) {
                return response.data.data.results[0];
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching comic:', error);
            throw error;
        }
    },

    async getComicsByCharacter(characterId: number): Promise<Comic[]> {
        try {
            const response = await axios.get(`/v1/public/comics`, {
                params: {
                    characters: characterId
                }
            });

            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching comics:', error);
            throw error;
        }
    }
};