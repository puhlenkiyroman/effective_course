import {useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Favourites.module.css';

function Favourites() {
    const [favoriteItems, setFavoriteItems] = useState<object[]>([]);

    useEffect(() => {
        const likedIds = Object.keys(localStorage)
            .filter(key => key.startsWith('liked_'))
            .map(key => key.replace('liked_', ''));
        const items = likedIds.map((id: string) => {
            const savedItemString = localStorage.getItem(`liked_${id}`);
            if (savedItemString) {
                const item = JSON.parse(savedItemString);
                item.type = item.name ? 'characters' : 'comics';
                return item;
            }
            return null;
        });

        setFavoriteItems(items);
        console.log(items)
    }, []);

    return (
        <>
            <h1>Favourites <span className={styles.favouritesCount}>({favoriteItems.length})</span></h1>
                <div className={styles.favourites_container}>
                    {favoriteItems.map(item => (
                        <Link key={item.id} to={`/${item.type}/${item.id}`} className={styles.favourite_link}>
                            <Card card={item} />
                        </Link>
                    ))}
                </div>
        </>
    );
}

export default Favourites;
