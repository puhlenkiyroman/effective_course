import axios from '../api/helpers/axios.ts';
import { Character } from '../types/characters.ts';

export default {
    // Функция для получения списка персонажей
    async getCharactersList(): Promise<Character[]> {
        try {
            const response = await axios.get('/v1/public/characters');

            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching characters:', error);
            throw error;
        }
    },

    async getCharacter(characterId: number): Promise<Character> {
        try {
            const response = await axios.get(`/v1/public/characters/${characterId}`);

            return response.data.data.results;
        } catch (error) {
            console.error('Error fetching character:', error);
            throw error;
        }
    }
};
