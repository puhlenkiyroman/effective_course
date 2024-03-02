import React, { useState } from 'react';
import Card from '../../components/Card';
import styles from "./Comics.module.css";

const comicsData: { id: number; title: string; description: string; image: string; }[] = [
    {
        id: 1,
        title: 'The Amazing Spider-Man',
        description: 'The Amazing Spider-Man is a comic book series featuring the Marvel Comics superhero Spider-Man.',
        image: 'https://via.placeholder.com/150'
    },
];

function Comics() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Выполняется поиск по:', searchTerm);
    };

    return (
        <>
            <h1>Comics</h1>
            <div className={styles['search-container']}>
                <input
                    className={styles['search-input']}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="   Search comics..."
                />
                <button
                    className={styles['search-button']}
                    onClick={handleSearch}
                >
                    SEARCH
                </button>
            </div>
            <div className={styles.comics_container}>
                {comicsData.map(comic => (
                    <Card key={comic.id} item={comic} />
                ))}
            </div>
        </>
    );
}

export default Comics;
