import React from 'react';
import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <a href="/" className={styles.logoLink}>
                <img src="/marvel_logo.svg" alt="Marvel Logo" className={styles.logo} />
            </a>
            <nav className={styles.navigation}>
                <ul className={styles.navList}>
                    <li><a href="characters" className={styles.link}>Characters</a></li>
                    <li><a href="comics" className={styles.link}>Comics</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
