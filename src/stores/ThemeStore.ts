import { makeAutoObservable, reaction } from 'mobx';

type Theme = 'dark' | 'light';

export const themes: Theme[] = ['dark', 'light'];

class ThemeStore {
    activeTheme: Theme;

    constructor() {
        const storedTheme = localStorage.getItem('ACTIVE_THEME') as Theme;
        this.activeTheme = storedTheme || 'light';

        makeAutoObservable(this);

        // Реакция на изменение темы
        reaction(
            () => this.activeTheme,
            (theme) => {
                document.body.dataset.theme = theme;
                localStorage.setItem('ACTIVE_THEME', theme);
            },
            { fireImmediately: true }
        );
    }

    changeActiveTheme(newTheme: Theme): void {
        if (themes.includes(newTheme)) {
            this.activeTheme = newTheme;
        }
    }
}

const themeStore = new ThemeStore();

export default themeStore;
