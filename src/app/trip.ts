export interface Trip {
    id: number;
    TripName: string;
    Destination: string;
    StartDate: string;
    EndDate: string;
    Price: number;
    MaxCapacity: number;
    Description: string;
    Image: string;

    // initialize(id: number, name: string, destination: string, startDate: string, endDate: string, price: number, maxCapacity: number, description: string, image: string): void;
}