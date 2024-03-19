import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './ComicsDetails.module.css';
import { comicsStore } from "../../stores/ComicsStore";
import { observer } from "mobx-react-lite";

function ComicsDetails() {
    const { id } = useParams<{ id: string | undefined }>();
    const [comic, setComic] = useState<any>(null);
    const [comicCharacters, setComicCharacters] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const fetchedComic = await comicsStore.fetchComic(parseInt(id!, 10));
            setComic(fetchedComic);

            const fetchedComicCharacters = await comicsStore.fetchCharactersByComic(parseInt(id!, 10));
            setComicCharacters(fetchedComicCharacters);
        }

        if (id) {
            fetchData();
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

export default observer(ComicsDetails);
