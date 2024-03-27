import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from 'mobx-react-lite';
import ReactPaginate from "react-paginate";
import {charactersStore} from "../../stores/CharactersStore.ts";
import Loader from "../../components/Loader/Loader.tsx";

export const ITEMS_PER_PAGE = 25;

function Comics() {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const filteredComics = comicsStore.comics;

    useEffect(() => {
        const offset = currentPage * ITEMS_PER_PAGE;
        const fetchComics = async () => {
            setLoading(true);
            try {
                if (comicsStore.searchTerm) {
                    await comicsStore.fetchComicsByName(offset);
                } else {
                    await comicsStore.fetchComics(offset);
                }
            } catch (error) {
                console.error('Error fetching comics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComics();
    }, [currentPage, comicsStore.searchTerm]);

    useEffect(() => {
        const totalComics = comicsStore.totalComics;
        const calculatedTotalPages = Math.ceil(totalComics / ITEMS_PER_PAGE);
        setTotalPages(calculatedTotalPages);
    }, [comicsStore.totalComics]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleSearch = (searchTerm: string) => {
        comicsStore.setSearchTerm(searchTerm);
        setCurrentPage(0); // Сбросить страницу на первую при поиске
    };

    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({comicsStore.totalComics})</span></h1>
            <Search onSearch={handleSearch} />
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.comics_container}>
                    {filteredComics.map(comic => (
                        <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                            <Card card={comic} />
                        </Link>
                    ))}
                </div>
            )}
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
        </>
    );
}

export default observer(Comics);
