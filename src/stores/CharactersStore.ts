import { observable, action, makeObservable, runInAction } from 'mobx';
import api from '../api';
import { toast } from 'react-toastify';

// Types
import { ICharacter } from '../types/characters';
import { IComic } from "../types/comics.ts";

class CharactersStore {
    characters: ICharacter[] = [];
    loading: boolean = false;
    searchTerm: string = '';
    totalCharacters: number = 0;

    constructor() {
        makeObservable(this, {
            characters: observable,
            loading: observable,
            searchTerm: observable,
            totalCharacters: observable,
            fetchCharacters: action,
            setSearchTerm: action,
        });
    }

    async fetchCharacters(offset: number): Promise<void> {
        try {
            this.loading = true;
            const charactersList = await api.characters.getCharactersList(offset); // Передаем offset в API
            runInAction(() => {
                this.characters = charactersList;
                this.totalCharacters = charactersList.length; // Обновляем общее количество персонажей
            });
        } catch (error) {
            toast.error('Failed to fetch characters. Please try again later.');
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async fetchCharacter(characterId: number): Promise<ICharacter | null> {
        try {
            const character = await api.characters.getCharacter(characterId);
            return character;
        } catch (error) {
            toast.error('Failed to fetch character. Please try again later.');
            return null;
        }
    }

    async fetchComicsByCharacter(characterId: number): Promise<IComic[]> {
        try {
            const characters = await api.comics.getComicsByCharacter(characterId);
            return characters;
        } catch (error) {
            toast.error('Failed to fetch comics by character. Please try again later.');
            return [];
        }
    }

    setSearchTerm(searchTerm: string): void {
        this.searchTerm = searchTerm;
    }

}

export const charactersStore = new CharactersStore();