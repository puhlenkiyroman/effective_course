import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import Search from "../../components/Search";
import apiComics from '../../api/comics';
import { Comic } from "../../types/comics";

function Comics() {

    const [comics, setComics] = useState<Comic[]>([]);
    async function fetchCharacters() {
        try {
            // Получаем список персонажей из API и сохраняем его в состояние
            const ComicsList = await apiComics.getComicsList();
            setComics(ComicsList);
        } catch (error) {
            console.error('Error fetching characters:', error);
        }
    }

    useEffect(() => {
        fetchCharacters();
    }, []);

    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({comics.length})</span></h1>
            <Search/>
            <div className={styles.comics_container}>
                {comics.map(comic => (
                    <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                        <Card card={comic} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Comics;
