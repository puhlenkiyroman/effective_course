import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import apiCharacters from '../../api/characters';
import { Character } from '../../types/characters';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNameStartsWith from '../../hooks/useNameStartsWith';

function Characters() {
    const [characters, setCharacters]
        = useState<Character[]>([]);
    const [searchTerm, setSearchTerm]
        = useState<string>('');

    async function fetchCharacters() {
        try {
            const charactersList = await apiCharacters.getCharactersList();
            setCharacters(charactersList);
        } catch (error) {
            toast.error('Failed to fetch characters. Please try again later.');
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    // Фильтрация персонажей по началу названия
    const filteredCharacters = useNameStartsWith(characters, searchTerm, 'name');

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({filteredCharacters.length}) </span> </h1>
            <Search onSearch={handleSearch} />
            <div className={styles.characters_container}>
                {filteredCharacters.map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`} className={styles.character_link}>
                        <Card card={character} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Characters;
