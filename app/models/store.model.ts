export interface Store {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    openingHours: {
        open: string;
        close: string;
    };
    isOpen: boolean;
    distance?: number;
}