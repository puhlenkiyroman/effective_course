import React, {useState} from 'react';
import Card from '../../components/Card';
import styles from './Characters.module.css';

const charactersData = [
    {
        id: 1,
        name: 'Spider-Man',
        description: 'Spider-Man is a fictional superhero created by writer-editor Stan Lee',
        image: 'https://via.placeholder.com/150'
    },
    {
        id: 2,
        name: 'Spider-Man',
        description: 'Spider-Man is a fictional superhero created by writer-editor Stan Lee',
        image: 'https://via.placeholder.com/150'
    },
];

function Characters () {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Выполняется поиск по:', searchTerm);
    };


    return (
        <>
            <h1>Characters</h1>
            <div className={styles['search-container']}>
                <input
                    className={styles['search-input']}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="   Search for Characters by Name"
                />
                <button
                    className={styles['search-button']}
                    onClick={handleSearch}
                >
                    SEARCH
                </button>
            </div>
            <div className={styles.characters_container}>
                {charactersData.map(character => (
                    <Card key={character.id} item={character} />
                ))}
            </div>
        </>
    );
}

export default Characters;
