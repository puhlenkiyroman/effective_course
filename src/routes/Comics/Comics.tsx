import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from 'mobx-react-lite';
import ReactPaginate from "react-paginate";

export const ITEMS_PER_PAGE = 25;

function Comics() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const filteredComics = comicsStore.comics;

    useEffect(() => {
        const offset = currentPage * ITEMS_PER_PAGE;
        if (comicsStore.searchTerm) {
            comicsStore.fetchComicsByName(comicsStore.searchTerm, offset);
        } else {
            comicsStore.fetchComics(offset);
        }
    }, [currentPage, comicsStore.searchTerm]);

    useEffect(() => {
        const totalComics = comicsStore.totalComics;
        const calculatedTotalPages = Math.ceil(totalComics / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
    }, [comicsStore.totalComics]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const isFirstPage = currentPage === 0;

    const handleSearch = (searchTerm: string) => {
        comicsStore.setSearchTerm(searchTerm);
        setCurrentPage(0); // Сбросить страницу на первую при поиске
    };

    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({comicsStore.totalComics})</span></h1>
            <Search onSearch={handleSearch} />
            <div className={styles.comics_container}>
                {filteredComics.map(comic => (
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
                    previousLabel={isFirstPage ? '' : <span style={{color: 'red', display: 'inline-block', marginRight: '35px', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {"<"} </span>}
                    nextLabel={<span style={{color: 'red', display: 'inline-block', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                        {">"} </span>}
                />
            </div>
        </>
    );
}

export default observer(Comics);
