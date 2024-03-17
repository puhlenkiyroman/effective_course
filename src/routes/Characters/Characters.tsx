import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import apiCharacters from '../../api/characters';
import { Character } from '../../types/characters';
import { useDebounce } from "@uidotdev/usehooks";

function Characters() {
    const [characters, setCharacters]
        = useState<Character[]>([]);
    const [filteredCharacters, setFilteredCharacters]
        = useState<Character[]>([]);
    const [searchTerm, setSearchTerm]
        = useState<string>('');

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


    // Используем хук useDebounce для задержки поиска
    const debouncedSearchTerm = useDebounce(searchTerm, 3000);

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    // Фильтрация персонажей по поисковому запросу
    useEffect(() => {
        // Проверяем, что поисковый запрос не пустой
        if (debouncedSearchTerm.trim() !== '') {
            const filtered = characters.filter(comic => comic.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
            setFilteredCharacters(filtered);
        } else {
            // Если поисковый запрос пуст, показываем всех персонажей
            setFilteredCharacters(characters);
        }
    }, [debouncedSearchTerm, characters]);

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
