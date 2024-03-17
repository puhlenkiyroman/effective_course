import { useEffect, useState } from 'react';

interface HasNameOrTitle {
    name?: string;
    title?: string;
}

function useNameStartsWith<T extends HasNameOrTitle>(items: T[], searchTerm: string, field: keyof T): T[] {
    const [filteredItems, setFilteredItems] = useState<T[]>(items);

    useEffect(() => {
        // Проверяем, что поисковый запрос не пустой
        if (searchTerm.trim() !== '') {
            const filtered = items.filter(item => {
                const fieldValue = (item[field] || '') as string; // Получаем значение поля, которое нужно фильтровать
                return fieldValue.toLowerCase().startsWith(searchTerm.toLowerCase());
            });
            setFilteredItems(filtered);
        } else {
            // Если поисковый запрос пуст, показываем всех персонажей или все комиксы
            setFilteredItems(items);
        }
    }, [items, searchTerm, field]);

    return filteredItems;
}

export default useNameStartsWith;
