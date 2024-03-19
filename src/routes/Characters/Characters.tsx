import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import { charactersStore } from '../../stores/CharactersStore';
import { observer } from 'mobx-react-lite';
import useNameStartsWith from "../../hooks/useNameStartsWith.ts";

function Characters() {

    useEffect(() => {
        charactersStore.fetchCharacters();
    }, []);

    // Фильтрация персонажей по началу названия
    const filteredCharacters = useNameStartsWith(charactersStore.characters, charactersStore.searchTerm, 'name');

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        charactersStore.setSearchTerm(searchTerm);
    };

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({filteredCharacters.length})</span></h1>
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

export default observer(Characters);
