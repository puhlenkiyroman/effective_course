import React, { useState } from 'react';
import styles from './Card.module.css';
import { IComic } from '..//../types/comics';
import { ICharacter } from '../../types/characters';
import { FaHeart } from 'react-icons/fa';

interface CardProps {
    card: IComic | ICharacter;
    onLike: (id: number) => void;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onLike, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(false);

    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLiked(!liked);
        onLike(card.id);
    };

    const imagePath = `${card.thumbnail.path}.${card.thumbnail.extension}`;
    const name = 'name' in card ? card.name : '';
    const title = 'title' in card ? card.title : '';

    return (
        <div
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <img src={imagePath} alt={name || title} className={styles.image} />
            {isHovered && <FaHeart className={`${styles.likeButton} ${liked ? styles.liked : ''}`} onClick={handleLike} />}
            <div className={styles.content}>
                <h3>{name || title}</h3>
                <p>{'description' in card ? card.description : ''}</p>
            </div>
        </div>
    );
};

export default Card;