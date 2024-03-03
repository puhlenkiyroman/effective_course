import { useParams, Link } from 'react-router-dom';
import { charactersData } from './Characters';
import { comicsData } from "../Comics/Comics";
import styles from './CharacterDetails.module.css';

function CharacterDetails() {
    const { id } = useParams<{ id: string | undefined }>();

    if (!id) {
        return <div>Invalid character ID</div>;
    }

    const characterId = parseInt(id, 10);

    const character
        = charactersData.find(character => character.id === characterId);

    if (!character) {
        return <div>Character not found</div>;
    }

    // Фильтруем комиксы, в которых появляется данный персонаж
    const characterComics =
        comicsData.filter(comic => comic.characters.includes(characterId));

    return (
        <div className={styles.card}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
            <h3>Appeared in Comics:</h3>
            <ul>
                {characterComics.map(comic => (
                    <li key={comic.id}>
                        <Link to={`/comics/${comic.id}`}>{comic.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetails;
