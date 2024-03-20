import { observable, action, makeObservable, runInAction } from 'mobx';
import api from '../api';
import { toast } from 'react-toastify';
//Types
import { IComic } from "../types/comics";
import { ICharacter } from "../types/characters";

class ComicsStore {
    comics: IComic[] = [];
    loading: boolean = false;
    searchTerm: string = '';
    totalComics: number = 0;

    constructor() {
        makeObservable(this, {
            comics: observable,
            loading: observable,
            searchTerm: observable,
            fetchComics: action,
            fetchComic: action,
            fetchCharactersByComic: action,
            totalComics: observable,
            setSearchTerm: action
        });
    }

    async fetchComics(offset: number): Promise<void> {
        try {
            this.loading = true;
            const comicsList = await api.comics.getComicsList(offset);
            runInAction(() => {
                this.comics = comicsList;
                this.totalComics = comicsList.length; // Обновляем общее количество персонажей
            });
        } catch (error) {
            toast.error('Failed to fetch comics. Please try again later.');
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async fetchComic(comicId: number): Promise<IComic | null> {
        try {
            const comic = await api.comics.getComic(comicId);
            return comic;
        } catch (error) {
            toast.error('Failed to fetch comic. Please try again later.');
            return null;
        }
    }

    async fetchCharactersByComic(comicId: number): Promise<ICharacter[]> {
        try {
            const comics = await api.characters.getCharacterByComic(comicId);
            return comics;
        } catch (error) {
            toast.error('Failed to fetch characters by comic. Please try again later.');
            return [];
        }
    }

    setSearchTerm(searchTerm: string): void {
        this.searchTerm = searchTerm;
    }
}

export const comicsStore = new ComicsStore();
