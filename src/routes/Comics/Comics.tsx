import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import apiComics from '../../api/comics';
import { Comic } from '../../types/comics';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useNameStartsWith from '../../hooks/useNameStartsWith';

function Comics() {
    const [comics, setComics] = useState<Comic[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    async function fetchComics() {
        try {
            const ComicsList = await apiComics.getComicsList();
            setComics(ComicsList);
        } catch (error) {
            toast.error('Failed to fetch comics. Please try again later.');
        }
    }

    useEffect(() => {
        fetchComics();
    }, []);

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    // Фильтрация комиксов по началу названия
    const filteredComics = useNameStartsWith(comics, searchTerm, 'title');

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

export default Comics;
