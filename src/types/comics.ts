export interface IComic {
    id: number;
    title: string;
    description: string;
    thumbnail: {
        path: string;
        extension: string;
    };
    characters: {
        available: number;
        items: {
            name: string;
        }[];
    };
}
