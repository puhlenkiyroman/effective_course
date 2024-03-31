export interface ICharacter {
    id: number;
    name: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    comics: {
        available: number;
        items: {
            name: string;
        }[];
    };
}
