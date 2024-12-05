import { FC, ChangeEventHandler } from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import themeStore, { themes } from '../../stores/ThemeStore';
import classes from './Theme.module.css';

const Theme: FC = () => {
    const { t } = useTranslation();
    const { activeTheme } = themeStore;

    const changeThemeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
        const newTheme = event.target.value as 'dark' | 'light';
        themeStore.changeActiveTheme(newTheme);
    };

    return (
        <div className={classes.themeContainer}>
            <select onChange={changeThemeHandler} value={activeTheme} className={classes.themeSelector}>
                {themes.map((theme) => (
                    <option key={theme} value={theme}>
                        {t(theme)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default observer(Theme);
