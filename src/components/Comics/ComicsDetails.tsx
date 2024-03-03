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
        <div className={styles.card}>
            <img src={comic.image} alt={comic.title} />
            <h2>{comic.title}</h2>
            <p>{comic.description}</p>
            <h3>Characters Appeared:</h3>
            <ul>
                {comicCharacters.map(character => (
                    <li key={character.id}>
                        <Link to={`/characters/${character.id}`}>{character.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ComicsDetails;
