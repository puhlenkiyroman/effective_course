import { useParams, Link } from 'react-router-dom';
import { comicsData } from './Comics';
import { charactersData } from '../Characters/Characters';
import styles from './ComicsDetails.module.css';

function ComicsDetails () {
    const { id } = useParams<{ id: string | undefined }>();

    if (!id) {
        return <div>Invalid comic ID</div>;
    }

    const comicId = parseInt(id, 10);

    const comic
        = comicsData.find(comic => comic.id === comicId);

    if (!comic) {
        return <div>Comic not found</div>;
    }

    // Фильтруем персонажей, которые появляются в данном комиксе
    const comicCharacters
        = charactersData.filter(character => comic.characters.includes(character.id));

    return (
        <>
            <img className={styles.image} src={comic.image} alt={comic.title} />
            <div className={styles.card}>
                <div className={styles.comic}>
                <h2>{comic.title}</h2>
                <p>{comic.description}</p>
                </div>
                <div className={styles.characters}>
                    <h2>Characters</h2>
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
};

export default ComicsDetails;
