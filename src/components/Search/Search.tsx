import { useState, useEffect } from 'react';
import styles from "./Search.module.css";

interface Props {
    onSearch: (searchTerm: string) => void;
}

function Search({ onSearch }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(searchTerm);
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, onSearch]);

    const handleSearchClick = () => {
        onSearch(searchTerm);
    };

    return (
        <div className={styles.search_container}>
            <input
                className={styles.search_input}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search"
            />
            <button
                className={styles.search_button}
                onClick={handleSearchClick}
            >
                SEARCH
            </button>
        </div>
    );
}

export default Search;