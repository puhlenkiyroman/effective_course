import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import { charactersStore } from '../../stores/CharactersStore';
import { observer } from 'mobx-react-lite';
import ReactPaginate from "react-paginate";

export const ITEMS_PER_PAGE = 25;

function Characters() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const filteredCharacters = charactersStore.characters;

    useEffect(() => {
        const offset = currentPage * ITEMS_PER_PAGE;
        if (charactersStore.searchTerm) {
            charactersStore.fetchCharactersByName(charactersStore.searchTerm, offset);
        } else {
            charactersStore.fetchCharacters(offset);
        }
    }, [currentPage, charactersStore.searchTerm]);

    useEffect(() => {
        const totalCharacters = charactersStore.totalCharacters;
        const calculatedTotalPages = Math.ceil(totalCharacters / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
    }, [charactersStore.totalCharacters]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSearch = (searchTerm: string) => {
        charactersStore.setSearchTerm(searchTerm);
        setCurrentPage(0); // Сбросить страницу на первую при поиске
    };

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({charactersStore.totalCharacters})</span></h1>
            <Search onSearch={handleSearch} />
            <div className={styles.characters_container}>
                {filteredCharacters.map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`} className={styles.character_link}>
                        <Card card={character} />
                    </Link>
                ))}
            </div>
            <div className={styles.pagination}>
                <ReactPaginate
                    breakLabel={<span style={{color: 'red', display: 'inline-block', marginRight: '35px', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {"..."} </span>}
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    pageCount={totalPages}
                    containerClassName={styles.paginationContainer}
                    pageClassName={styles.page}
                    previousLabel={<span style={{color: 'red', display: 'inline-block', marginRight: '35px', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {"<"} </span>}
                    nextLabel={<span style={{color: 'red', display: 'inline-block', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {">"} </span>}
                />
            </div>
        </>
    );
}

export default observer(Characters);