import { Review } from './review';

export interface Trip {
    TripId: number;
    TripName: string;
    Country: string;
    City: string;
    StartDate: Date;
    EndDate: Date;
    Price: number;
    MaxCapacity: number;
    Description: string;
    Image: string;
    Tags: string[];
    Reviews: Review[];
}

    