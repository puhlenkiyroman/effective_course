import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from 'mobx-react-lite';
import Loader from "../../components/Loader/Loader.tsx";
import {VirtuosoGrid} from "react-virtuoso";
import { useTranslation } from 'react-i18next';

export const ITEMS_PER_PAGE = 25;

function Comics() {
    const [loading, setLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        const offset = comicsStore.currentPage * ITEMS_PER_PAGE;
        const fetchComics = async () => {
            setLoading(true);
            try {
                await comicsStore.fetchComics(offset, comicsStore.searchTerm);
                setIsDataLoaded(true);
                if (comicsStore.comics.length >= comicsStore.totalComics) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
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

    const handleSearch = (searchTerm: string) => {
        if (!loading) {
            comicsStore.setSearchTerm(searchTerm);
            comicsStore.setCurrentPage(0); // Сбросить страницу на первую при поиске
            setIsDataLoaded(false);
            setHasMore(true);
        }
    };

    const fetchMoreData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const nextPage = comicsStore.currentPage + 1;
            const offset = nextPage * ITEMS_PER_PAGE;
            await comicsStore.fetchComics(offset, comicsStore.searchTerm);
            comicsStore.setCurrentPage(nextPage); // Обновляем текущую страницу после успешной загрузки

            if (comicsStore.comics.length >= comicsStore.totalComics) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more comics:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>{t('Comics')} <span className={styles.comicsCount}>({comicsStore.totalComics})</span></h1>
            <Search onSearch={handleSearch} />
            <VirtuosoGrid
                listClassName={styles.comics_container}
                useWindowScroll={true}
                totalCount={comicsStore.comics.length}
                endReached={fetchMoreData}
                components={{ Footer: loading && hasMore ? Loader : null }}
                itemContent={(index) => {
                    const comic = comicsStore.comics[index];
                    return (
                        <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                            <Card card={comic} />
                        </Link>
                    )
                }}
            />
        </>
    );
}

export default observer(Comics);