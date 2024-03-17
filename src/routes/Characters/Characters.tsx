import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import apiCharacters from '../../api/characters';
import { Character } from '../../types/characters';

function Characters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    async function fetchCharacters() {
        try {
            const charactersList = await apiCharacters.getCharactersList();
            setCharacters(charactersList);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({characters.length}) </span> </h1>
            <Search />
            <div className={styles.characters_container}>
                {characters.map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`} className={styles.character_link}>
                        <Card card={character} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Characters;
