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
    return (
        <div className={styles.card}>
            <img src={card.image} alt={card.title || card.name} />
            <h2>{card.title || card.name}</h2>
            <p>{card.description}</p>
        </div>
    );
};

export default Card;
