import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from '../../components/Search';
import apiComics from '../../api/comics';
import { Comic } from '../../types/comics';
import { useDebounce } from "@uidotdev/usehooks";

function Comics() {
    const [comics, setComics] = useState<Comic[]>([]);
    const [filteredComics, setFilteredComics] = useState<Comic[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    async function fetchComics() {
        try {
            const ComicsList = await apiComics.getComicsList();
            setComics(ComicsList);
            setFilteredComics(ComicsList); // Инициализируем отфильтрованный список
        } catch (error) {
            console.error('Error fetching comics:', error);
        }
    }

    useEffect(() => {
        fetchComics();
    }, []);


    // Используем хук useDebounce для задержки поиска
    const debouncedSearchTerm = useDebounce(searchTerm, 3000);

    // Функция для выполнения поиска
    const handleSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    // Фильтрация комиксов по поисковому запросу
    useEffect(() => {
        // Проверяем, что поисковый запрос не пустой
        if (debouncedSearchTerm.trim() !== '') {
            const filtered = comics.filter(comic => comic.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
            setFilteredComics(filtered);
        } else {
            // Если поисковый запрос пуст, показываем все комиксы
            setFilteredComics(comics);
        }
    }, [debouncedSearchTerm, comics]);

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
