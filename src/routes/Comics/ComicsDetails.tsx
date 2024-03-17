import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ComicsDetails.module.css';
import apiComics from '../../api/comics';
import apiCharacters from '../../api/characters';

function ComicsDetails() {
    const { id } = useParams<{ id: string | undefined }>();
    const [comic, setComic] = useState<any>(null);
    const [comicCharacters, setComicCharacters] = useState<any[]>([]);

    useEffect(() => {
        async function fetchComic() {
            try {
                const fetchedComic = await apiComics.getComic(parseInt(id!, 10));
                setComic(fetchedComic);

                const fetchedComicCharacters = await apiCharacters.getCharacterByComic(parseInt(id!, 10));
                setComicCharacters(fetchedComicCharacters);
            } catch (error) {
                console.error('Error fetching comic:', error);
            }
        }

        if (id) {
            fetchComic();
        }
    }, [id]);

    if (!id || !comic) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {comic.thumbnail && (
                <img className={styles.image} src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            )}
            <div className={styles.card}>
                <div className={styles.comic}>
                    <h2>{comic.title}</h2>
                    <p>{comic.description}</p>
                </div>
                <div className={styles.characters}>
                    <h2>Characters:</h2>
                    <ul>
                        {comicCharacters.map(character => (
                            <li key={character.id}>
                                <Link to={`/characters/${character.id}`}>{character.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default ComicsDetails;
