import axios from '../api/helpers/axios.ts'

import { Character } from '../types/characters.ts';

export default {
    async getCharactersList(): Promise<Character[]> {
        const response = await axios.get(`/`);

        return response.data;
    },

    async getCharacter(characterId: number): Promise<Character> {
        const response = await axios.post(`//${characterId}`);

        return response.data;
    }
};