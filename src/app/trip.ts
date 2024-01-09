export interface Trip {
    TripName: string;
    Destination: string;
    StartDate: string;
    EndDate: string;
    Price: number;
    MaxCapacity: number;
    Capacity: number;
    Description: string;
    Image: string;
    Tags: string[];

    initialize(name: string, destination: string, startDate: string, endDate: string, price: number, maxCapacity: number, capacity: number, description: string, image: string, tags: string[]): void;
}