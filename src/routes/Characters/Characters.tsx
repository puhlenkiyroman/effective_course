import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Characters.module.css';
import spidermanImage from '../../assets/spiderman.jpg';
import hulkImage from '../../assets/hulk.jpg';
import ironManImage from '../../assets/ironman.jpg';
import fantasticFourImage from '../../assets/fantasticfour.jpg';
import deadpoolImage from '../../assets/deadpool.jpg';
import Search from '../../components/Search'
export const charactersData = [
    {
        id: 1,
        name: 'Spider-Man',
        description: 'Spider-Man is a fictional superhero created by writer-editor Stan Lee',
        image: spidermanImage,
        comics: [1] // Идентификаторы комиксов, в которых появляется этот персонаж
    },
    {
        id: 2,
        name: 'Fantastic Four',
        description: 'The Fantastic Four is a superhero team appearing in American comic books published by Marvel Comics.',
        image: fantasticFourImage,
        comics: [2]
    },
    {
        id: 3,
        name: 'Iron Man',
        description: 'In the aftermath of his battle with the Demolisher, Tony Stark race against the clock to create a new suite complete with a new lasting battery to keep his heart from failing.',
        image: ironManImage,
        comics: [3]
    },
    {
        id: 4,
        name: 'Hulk',
        description: 'Hulk, a green-skinned, hulking and muscular humanoid possessing a limitless degree of physical strength, and the alter ego Dr. Robert Bruce Banner, a physically weak, socially withdrawn, and emotionally reserved physicist, both of whom typically resent each other.',
        image: hulkImage,
        comics: [4]
    },
    {
        id: 5,
        name: 'Deadpool',
        description: 'Deadpool is a highly trained assassin and mercenary',
        image: deadpoolImage,
        comics: [5]
    },
];
function Characters () {

    return (
        <>
            <h1>Characters <span className={styles.charactersCount}>({charactersData.length}) </span> </h1>
            <Search/>
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