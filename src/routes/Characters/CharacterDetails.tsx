import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CharacterDetails.module.css';
import { charactersStore } from "../../stores/CharactersStore.ts";
import { observer } from "mobx-react-lite";
import Loader from "../../components/Loader/Loader.tsx";

function CharacterDetails() {
    const {id} = useParams<{ id: string | undefined }>();
    const [character, setCharacter] = useState<any>(null);
    const [characterComics, setCharacterComics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const fetchedCharacter = await charactersStore.fetchCharacter(parseInt(id!, 10));
            setCharacter(fetchedCharacter);

            const fetchedComics = await charactersStore.fetchComicsByCharacter(parseInt(id!, 10));
            setCharacterComics(fetchedComics);

            setLoading(false);
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!id || !character || loading) {
        return <Loader />;
    }

    const imagePath = character.thumbnail
        ? `${character.thumbnail.path}.${character.thumbnail.extension}`
        : null;

    return (
        <>
            {imagePath && (
                <img className={styles.image} src={imagePath} alt={character.name}/>
            )}
            <div className={styles.card}>
                <div className={styles.character}>
                    <h2>{character.name}</h2>
                    <p>{character.description}</p>
                </div>
                <div className={styles.comics}>
                    <h2>Comics:</h2>
                    <ul>
                        {characterComics.map(comic => (
                            <li key={comic.id}>
                                <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
export default observer(CharacterDetails);
