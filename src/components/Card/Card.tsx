import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    item: {
        id: number;
        title?: string;
        name?: string;
        description: string;
        image: string;
    };
}

const Card: React.FC<CardProps> = ({ item }) => {
    return (
        <div className={styles.card}>
            <img src={item.image} alt={item.title || item.name} />
            <h2>{item.title || item.name}</h2>
            <p>{item.description}</p>
        </div>
    );
};

export default Card;
