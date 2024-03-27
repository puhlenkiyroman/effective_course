import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from 'mobx-react-lite';
import ReactPaginate from "react-paginate";
import Loader from "../../components/Loader/Loader.tsx";

export const ITEMS_PER_PAGE = 25;

function Comics() {
    const [loading, setLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        const offset = comicsStore.currentPage * ITEMS_PER_PAGE;
        const fetchComics = async () => {
            setLoading(true);
            try {
                await comicsStore.fetchComics(offset, comicsStore.searchTerm);
                setIsDataLoaded(true);
            } catch (error) {
                console.error('Error fetching comics:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isDataLoaded) {
            fetchComics();
        }
    }, [comicsStore.currentPage, comicsStore.searchTerm]);

    useEffect(() => {
        const totalComics = comicsStore.totalComics;
        const calculatedTotalPages = Math.ceil(totalComics / ITEMS_PER_PAGE);
        comicsStore.setTotalPages(calculatedTotalPages);
    }, [comicsStore.totalComics]);

    const handlePageChange = ({ selected }: { selected: number }) => {
        if (!loading) {
            comicsStore.setCurrentPage(selected);
            setIsDataLoaded(false);
        }
    };

    const handleSearch = (searchTerm: string) => {
        if (!loading) {
            comicsStore.setSearchTerm(searchTerm);
            comicsStore.setCurrentPage(0); // Сбросить страницу на первую при поиске
            setIsDataLoaded(false);
        }
    };

    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({comicsStore.totalComics})</span></h1>
            <Search onSearch={handleSearch} />
            {loading ? (
                <Loader />
            ) : (
                <div className={styles.comics_container}>
                    {comicsStore.comics.map(comic => (
                        <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                            <Card card={comic} />
                        </Link>
                    ))}
                </div>
            )}
            <ReactPaginate
                breakLabel={<span style={{color: 'red', display: 'inline-block', marginRight: '35px', padding: '15px', cursor: 'pointer', userSelect: 'none'}}>
                    {"..."} </span>}
                onPageChange={loading ? undefined : handlePageChange}
                pageRangeDisplayed={3}
                pageCount={comicsStore.totalPages}
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