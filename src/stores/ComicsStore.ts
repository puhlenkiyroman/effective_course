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
    currentPage: number = 0;
    totalPages: number = 0;

    constructor() {
        makeObservable(this, {
            comics: observable,
            loading: observable,
            searchTerm: observable,
            currentPage: observable,
            totalPages: observable,
            totalComics: observable,
            fetchCharactersByComic: action,
            fetchComics: action,
            fetchComic: action,
            setSearchTerm: action,
            setCurrentPage: action,
            setTotalPages: action
        });
    }

    async fetchComics(offset: number, searchTerm?: string): Promise<void> {
        try {
            this.loading = true;
            let response;
            if (searchTerm) {
                response = await api.comics.searchComicsByName(searchTerm, offset);
            } else {
                response = await api.comics.getComicsList(offset);
            }
            const { data, total } = response;
            runInAction(() => {
                this.comics = data;
                this.totalComics = total;
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

    setCurrentPage(page: number): void {
        this.currentPage = page;
    }

    setTotalPages(totalPages: number): void {
        this.totalPages = totalPages;
    }
}

export const comicsStore = new ComicsStore();
