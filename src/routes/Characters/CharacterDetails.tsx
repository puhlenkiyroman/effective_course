import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiCharacters from '../../api/characters';
import apiComics from '../../api/comics';
import styles from './CharacterDetails.module.css';
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function CharacterDetails() {
    const {id} = useParams<{ id: string | undefined }>();
    const [character, setCharacter] = useState<any>(null);
    const [characterComics, setCharacterComics] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedCharacter = await apiCharacters.getCharacter(parseInt(id!, 10));
                setCharacter(fetchedCharacter);

                const fetchedComics = await apiComics.getComicsByCharacter(parseInt(id!, 10));
                setCharacterComics(fetchedComics);
            } catch (error) {
                toast.error('Failed to fetch comic details. Please try again later.');
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (!id || !character) {
        return <div>Loading...</div>;
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
export default CharacterDetails;
