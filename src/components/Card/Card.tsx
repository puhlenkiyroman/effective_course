import React from 'react';
import styles from './Card.module.css';
import { IComic } from '..//../types/comics';
import { ICharacter } from '../../types/characters';

interface CardProps {
    card: IComic | ICharacter;
}

const Card: React.FC<CardProps> = ({ card }) => {
    const imagePath = `${card.thumbnail.path}.${card.thumbnail.extension}`;
    const name = 'name' in card ? card.name : '';
    const title = 'title' in card ? card.title : '';

    return (
        <div className={styles.card}>
            <img src={imagePath} alt={name || title} />
            <h3>{name || title}</h3>
            <p>{'description' in card ? card.description : ''}</p>
        </div>
    );
};

export default Card;
