import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    card: {
        id: number;
        title?: string;
        name?: string;
        description: string;
        image: string;
    };
}

const Card: React.FC<CardProps> = ({ card }) => {
    const MAX_DESCRIPTION_LENGTH = 100; // Максимальная длина описания
    const MAX_TITLE_LENGTH = 18; // Максимальная длина названия

    // Функция для обрезки текста и добавления троеточия
    const truncateText = (text: string | undefined, maxLength: number) => {
        if (text) {
            return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
        }
        return text;
    };

    return (
        <div className={styles.card}>
            <img src={card.image} alt={card.title || card.name} />
            <h2>{truncateText(card.title || card.name, MAX_TITLE_LENGTH)}</h2>
            <p>{truncateText(card.description, MAX_DESCRIPTION_LENGTH)}</p>
        </div>
    );
};

export default Card;
