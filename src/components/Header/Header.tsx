import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Localization from '../../routes/Localization';
import { useTranslation } from 'react-i18next';
import Theme from '../../routes/Theme';

function Header() {
    const { t } = useTranslation();

    return (
        <header className={styles.header}>
            <NavLink to="/" className={styles.logoLink}>
                <img src="public/marvel_logo.svg" alt="Marvel Logo" className={styles.logo} />
            </NavLink>
            <nav className={styles.navigation}>
                <ul className={styles.navList}>
                    <li><NavLink to="/characters" className={styles.link}>{t('Characters')}</NavLink></li>
                    <li><NavLink to="/comics" className={styles.link}>{t('Comics')}</NavLink></li>
                    <li><NavLink to="/favourites" className={styles.link}>{t('Favourites')}</NavLink></li>
                    <Localization />
                    <Theme />
                </ul>
            </nav>
        </header>
    );
}

export default Header;
