import { observable, action, makeObservable, runInAction } from 'mobx';
import api from '../api';
import { toast } from 'react-toastify';
// Types
import { ICharacter } from '../types/characters';
import { IComic } from "../types/comics";

class CharactersStore {
    characters: ICharacter[] = [];
    loading: boolean = false;
    searchTerm: string = '';
    totalCharacters: number = 0;
    currentPage: number = 0;
    totalPages: number = 0;

    constructor() {
        makeObservable(this, {
            characters: observable,
            loading: observable,
            searchTerm: observable,
            totalCharacters: observable,
            currentPage: observable,
            totalPages: observable,
            fetchCharacters: action,
            fetchCharacter: action,
            fetchComicsByCharacter: action,
            setSearchTerm: action,
            setCurrentPage: action,
            setTotalPages: action
        });
    }

    async fetchCharacters(offset: number, searchTerm?: string): Promise<void> {
        try {
            this.loading = true;
            let response;
            if (searchTerm) {
                response = await api.characters.searchCharactersByName(searchTerm, offset);
            } else {
                response = await api.characters.getCharactersList(offset);
            }
            const { data, total } = response;
            runInAction(() => {
                this.characters = data;
                this.totalCharacters = total;
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

    setCurrentPage(page: number): void {
        this.currentPage = page;
    }

    setTotalPages(totalPages: number): void {
        this.totalPages = totalPages;
    }
}

export const charactersStore = new CharactersStore();
