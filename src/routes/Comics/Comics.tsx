import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from 'mobx-react-lite';
import useNameStartsWith from '../../hooks/useNameStartsWith';

function Comics() {

    useEffect(() => {
        comicsStore.fetchComics();
    }, []);

    // Фильтрация комиксов по началу названия
    const filteredComics = useNameStartsWith(comicsStore.comics, comicsStore.searchTerm, 'title');

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        comicsStore.setSearchTerm(searchTerm);
    };

    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({filteredComics.length})</span></h1>
            <Search onSearch={handleSearch} />
            <div className={styles.comics_container}>
                {filteredComics.map(comic => (
                    <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                        <Card card={comic} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default observer(Comics);
