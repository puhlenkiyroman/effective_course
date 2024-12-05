import { useState, useEffect } from 'react';
import Card from '../../components/Card';
import styles from './Favourites.module.css';
import { IComic } from '../../types/comics';
import { ICharacter } from '../../types/characters';
import { useTranslation } from 'react-i18next';

//Types
type FavoriteItem = IComic | ICharacter;

function Favourites() {
    const [favoriteItems, setFavoriteItems] = useState<FavoriteItem[]>([]);

    const { t } = useTranslation();

    useEffect(() => {
        const likedIds = Object.keys(localStorage)
            .filter(key => key.startsWith('liked_'))
            .map(key => key.replace('liked_', ''));
        const items: FavoriteItem[] = likedIds.map((id: string) => {
            const savedItemString = localStorage.getItem(`liked_${id}`);
            if (savedItemString) {
                const item = JSON.parse(savedItemString);
                item.type = item.name ? 'characters' : 'comics';
                return item;
            }
            return null;
        }).filter((item): item is FavoriteItem => item !== null);

        setFavoriteItems(items);
    }, []);

    // Обработчик для удаления карточки из избранного
    const handleRemoveFromFavorites = (id: number) => {
        setFavoriteItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    return (
        <>
            <h1>{t('Favourites')} <span className={styles.favouritesCount}>({favoriteItems.length})</span></h1>
            <div className={styles.favourites_container}>
                {favoriteItems.map(item => (
                    <div key={item.id} className={styles.favourite_link}>
                        <Card
                            card={item}
                            onLike={() => handleRemoveFromFavorites(item.id)}
                            onClick={() => {}}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Favourites;
