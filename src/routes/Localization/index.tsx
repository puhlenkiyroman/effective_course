import { ChangeEventHandler, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { localesKeys } from '../../localization';
import styles from './Localization.module.css';

const Localization: FC = () => {
    const {t, i18n } = useTranslation();

    const changeLanguageHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        i18n.changeLanguage(event.target.value);
        localStorage.LOCALE = event.target.value;
    };

    return (
        <div className={styles.localizationContainer}>
            <select onChange={changeLanguageHandler} value={i18n.language} className={styles.languageSelector}>
                {localesKeys.map((language) => (
                    <option key={language} value={language}>
                        {language}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Localization;
