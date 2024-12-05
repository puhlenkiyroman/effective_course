import { Resource } from 'i18next';

// Translations
import enTranslation from './en.json';
import esTranslation from './ru.json';

export const locales: Resource = {
    EN: {
        title: 'English',
        translation: enTranslation
    },
    RU: {
        title: 'Russian',
        translation: esTranslation
    }
};