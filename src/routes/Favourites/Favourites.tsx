import {useState, useEffect } from 'react';
import Card from '../../components/Card';
import styles from './Favourites.module.css';
import Loader from "../../components/Loader/Loader.tsx";

function Favourites() {
    const [loading, setLoading] = useState(false);
    const [favoriteCharacters, setFavoriteCharacters] = useState<any[]>([]);

    useEffect(() => {
        const likedIds = Object.keys(localStorage)
            .filter(key => key.startsWith('liked_'))
            .map(key => key.replace('liked_', ''));
        const characters = likedIds.map((id: string) => {
            const savedCharacterString = localStorage.getItem(`liked_${id}`);
            if (savedCharacterString) {
                return JSON.parse(savedCharacterString);
            }
            return null;
        });

        setFavoriteCharacters(characters);
        console.log(characters)
    }, [favoriteCharacters]);

    return (
        <div className={styles.favorites}>
            <h1>Favourites <span className={styles.charactersCount}>({favoriteCharacters.length})</span></h1>
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.favourites_container}>
                    {favoriteCharacters.map(character => (
                        <div key={character.id} className={styles.character_link}>
                            <Card card={character} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourites;
