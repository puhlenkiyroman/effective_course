import { Link } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './Comics.module.css';
import spidermanImage from '../../assets/spiderman.jpg';
import hulkImage from '../../assets/hulk.jpg';
import ironManImage from '../../assets/ironman.jpg';
import fantasticFourImage from '../../assets/fantasticfour.jpg';
import deadpoolImage from '../../assets/deadpool.jpg';
import Search from "../../components/Search";
export const comicsData = [
    {
        id: 1,
        title: 'The Amazing Spider-Man #1',
        description: 'The Amazing Spider-Man is a comic book series featuring the Marvel Comics superhero Spider-Man.',
        image: spidermanImage,
        characters: [1] // Идентификаторы персонажей, появляющихся в этом комиксе
    },
    {
        id: 2,
        title: 'The Fantastic Four #1',
        description: 'The Fantastic Four is a superhero team appearing in American comic books published by Marvel Comics.',
        image: fantasticFourImage,
        characters: [1, 2]
    },
    {
        id: 3,
        title: 'Iron Man #3',
        description: 'In the aftermath of his battle with the Demolisher, Tony Stark race against the clock to create a new suite complete with a new lasting battery to keep his heart from failing.',
        image: ironManImage,
        characters: [3]
    },
    {
        id: 4,
        title: 'Hulk #131',
        description: 'Hulk, a green-skinned, hulking and muscular humanoid possessing a limitless degree of physical strength, and the alter ego Dr. Robert Bruce Banner, a physically weak, socially withdrawn, and emotionally reserved physicist, both of whom typically resent each other.',
        image: hulkImage,
        characters: [4]
    },
    {
        id: 5,
        title: 'Deadpool #5',
        description: 'Deadpool is a highly trained assassin and mercenary',
        image: deadpoolImage,
        characters: [5]
    },
];

function Comics() {
    return (
        <>
            <h1>Comics <span className={styles.comicsCount}>({comicsData.length})</span></h1>
            <Search/>
            <div className={styles.comics_container}>
                {comicsData.map(comic => (
                    <Link key={comic.id} to={`/comics/${comic.id}`} className={styles.comic_link}>
                        <Card card={comic} />
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Comics;
