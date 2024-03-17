import React from 'react';
import styles from './Card.module.css';
import { Comic } from '..//../types/comics';
import { Character } from '../../types/characters';

interface CardProps {
    card: Comic | Character;
}
const Card: React.FC<CardProps> = ({ card }) => {
    const imagePath = `${card.thumbnail.path}.${card.thumbnail.extension}`;

    return (
        <div className={styles.card}>
            <img src={imagePath} alt={card.name || card.title} />
            <h3>{card.name || card.title}</h3>
            <p>{card.description}</p>
        </div>
    );
};


export default Card;
