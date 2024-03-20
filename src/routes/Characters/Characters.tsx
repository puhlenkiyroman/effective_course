import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import { charactersStore } from '../../stores/CharactersStore';
import { observer } from 'mobx-react-lite';
import ReactPaginate from "react-paginate";
import useNameStartsWith from "../../hooks/useNameStartsWith";

export const ITEMS_PER_PAGE = 20; // Количество персонажей на странице

function Characters() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const filteredCharacters = useNameStartsWith(charactersStore.characters, charactersStore.searchTerm, 'name');

    useEffect(() => {
        const offset = currentPage * ITEMS_PER_PAGE;
        charactersStore.fetchCharacters(offset);
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredCharacters.length / ITEMS_PER_PAGE));
    }, [filteredCharacters.length]);

    // Почему-то долго работает...
    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        charactersStore.setSearchTerm(searchTerm);
    };

    const isFirstPage = currentPage === 0;
    //const isLastPage = currentPage === setTotalPages.length;

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({filteredCharacters.length})</span></h1>
            <Search onSearch={handleSearch} />
            <div className={styles.characters_container}>
                {filteredCharacters.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE).map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`} className={styles.character_link}>
                        <Card card={character} />
                    </Link>
                ))}
            </div>
            <div className={styles.pagination}>
                <ReactPaginate
                    breakLabel="..."
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    containerClassName={styles.paginationContainer}
                    pageClassName={styles.page}
                    previousLabel={isFirstPage ? '' : <span style={{color: 'red', display: 'inline-block', marginRight: '35px', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {"<"} </span>}
                    nextLabel={/* isLastPage ? '' : */ <span style={{color: 'red', display: 'inline-block', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {">"} </span>}
                />
            </div>
        </>
    );
}

export default observer(Characters);
