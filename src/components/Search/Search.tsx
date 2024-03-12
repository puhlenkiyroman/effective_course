import {useState} from 'react';
import styles from "./Search.module.css";

function Search() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log('Выполняется поиск по:', searchTerm);
    };

    return (
        <div className={styles.search_container}>
            <input
                className={styles.search_input}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="   Search characters..."
            />
            <button
                className={styles.search_button}
                onClick={handleSearch}
            >
                SEARCH
            </button>
        </div>
    );
}

export default Search;