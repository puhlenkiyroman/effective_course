import { useState, useEffect } from 'react';
import styles from "./Search.module.css";
import { useDebounce } from "@uidotdev/usehooks";

interface Props {
    onSearch: (searchTerm: string) => void;
}

function Search({ onSearch }: Props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 3000);

    useEffect(() => {
        onSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, onSearch]);

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
            >
                SEARCH
            </button>
        </div>
    );
}

export default Search;
