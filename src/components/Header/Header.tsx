import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <NavLink to="/" className={styles.logoLink}>
                <img src="/marvel_logo.svg" alt="Marvel Logo" className={styles.logo} />
            </NavLink>
            <nav className={styles.navigation}>
                <ul className={styles.navList}>
                    <li><NavLink to="/characters" className={styles.link}>Characters</NavLink></li>
                    <li><NavLink to="/comics" className={styles.link}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
