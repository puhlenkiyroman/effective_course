import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from 'mobx-react-lite';
import useNameStartsWith from '../../hooks/useNameStartsWith';
import ReactPaginate from "react-paginate";

export const ITEMS_PER_PAGE = 20; // Количество персонажей на странице
function Comics() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const filteredComics = useNameStartsWith(comicsStore.comics, comicsStore.searchTerm, 'title');

    useEffect(() => {
        const offset = currentPage * ITEMS_PER_PAGE;
        comicsStore.fetchComics(offset);
    }, [currentPage]);

    useEffect(() => {
        setTotalPages(Math.ceil(filteredComics.length / ITEMS_PER_PAGE));
    }, [filteredComics.length]);

    const handlePageChange = (selected: { selected: number }) => {
        setCurrentPage(selected.selected);
    };

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        comicsStore.setSearchTerm(searchTerm);
    };

    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({filteredComics.length})</span></h1>
            <Search onSearch={handleSearch} />
            <div className={styles.comics_container}>
                {filteredComics.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE).map(comic => (
                    <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                        <Card card={comic} />
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
                    previousLabel={""}
                    nextLabel={<span style={{color: 'red', display: 'inline-block', padding: '15px', cursor: 'pointer', userSelect: 'none'}}> {">"} </span>}
                />
            </div>
        </>
    );
}

export default observer(Comics);
