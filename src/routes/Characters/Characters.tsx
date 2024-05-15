import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import Search from '../../components/Search';
import { charactersStore } from '../../stores/CharactersStore';
import { observer } from 'mobx-react-lite';
import { VirtuosoGrid } from 'react-virtuoso';
import Loader from "../../components/Loader/Loader.tsx";

export const ITEMS_PER_PAGE = 25;

function Characters() {
    const [loading, setLoading] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const offset = charactersStore.currentPage * ITEMS_PER_PAGE;
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                await charactersStore.fetchCharacters(offset, charactersStore.searchTerm);
                setIsDataLoaded(true);
                if (charactersStore.characters.length >= charactersStore.totalCharacters) {
                    setHasMore(false);
                } else {
                    setHasMore(true);
                }
            } catch (error) {
                console.error('Error fetching characters:', error);
            } finally {
                setLoading(false);
            }
        };

        if (!isDataLoaded) {
            fetchCharacters();
        }
    }, [charactersStore.currentPage, charactersStore.searchTerm]);

    useEffect(() => {
        const totalCharacters = charactersStore.totalCharacters;
        const calculatedTotalPages = Math.ceil(totalCharacters / ITEMS_PER_PAGE);
        charactersStore.setTotalPages(calculatedTotalPages);
    }, [charactersStore.totalCharacters]);

    const handleSearch = (searchTerm: string) => {
        if (!loading) {
            charactersStore.setSearchTerm(searchTerm);
            charactersStore.setCurrentPage(0); // Сбросить страницу на первую при поиске
            setIsDataLoaded(false);
            setHasMore(true);
        }
    };

    const fetchMoreData = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const nextPage = charactersStore.currentPage + 1;
            const offset = nextPage * ITEMS_PER_PAGE;
            await charactersStore.fetchCharacters(offset, charactersStore.searchTerm);
            charactersStore.setCurrentPage(nextPage); // Обновляем текущую страницу после успешной загрузки

            if (charactersStore.characters.length >= charactersStore.totalCharacters) {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching more characters:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({charactersStore.totalCharacters})</span></h1>
            <Search onSearch={handleSearch} />
            <VirtuosoGrid
                listClassName={styles.characters_container}
                useWindowScroll={true}
                totalCount={charactersStore.characters.length}
                endReached={fetchMoreData}
                components={{ Footer: loading && hasMore ? Loader : null }}
                itemContent={(index) => {
                    const character = charactersStore.characters[index];
                    return (
                        <Link key={character.id} to={`/characters/${character.id}`} className={styles.character_link}>
                            <Card card={character} />
                        </Link>
                    )
                }}
            />
        </>
    );
}

export default observer(Characters);