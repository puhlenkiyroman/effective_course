import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';

export const charactersData = [
    {
        id: 1,
        name: 'Spider-Man',
        description: 'Spider-Man is a fictional superhero created by writer-editor Stan Lee',
        image: 'https://via.placeholder.com/150',
        comics: [1] // Идентификаторы комиксов, в которых появляется этот персонаж
    },
];

function Characters () {
    return (
        <>
            <h1>Characters</h1>
            <div className={styles.characters_container}>
                {charactersData.map(character => (
                    <Link key={character.id} to={`/characters/${character.id}`} className={styles.character_link}>
                        <Card card={character} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Characters;