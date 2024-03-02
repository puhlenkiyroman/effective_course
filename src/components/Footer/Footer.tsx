import React from 'react';
import styles from './Footer.module.css';

function Footer() {
    const currentYear:number = new Date().getFullYear(); // Получаем текущий год
    return (
        <footer className={styles.footer}>
            <img src="/marvel_logo.svg" alt="Marvel Logo" className={styles.logo} />
            <p className={styles.data}>Data provided by Marvel. © {currentYear} MARVEL</p>
            <a href="https://developer.marvel.com" target="_blank" rel="noopener noreferrer">developer.marvel.com</a>
        </footer>
    );
}

export default Footer;
