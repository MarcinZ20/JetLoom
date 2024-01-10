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
}

export function createTrip(tripData: Partial<Trip>): Trip {
    const defaultTripData: Trip = {
        TripName: '',
        Destination: '',
        StartDate: '',
        EndDate: '',
        Price: 0,
        MaxCapacity: 0,
        Capacity: 0,
        Description: '',
        Image: '',
        Tags: [],
    };

    const trip: Trip = { ...defaultTripData, ...tripData };
    trip.Capacity = trip.MaxCapacity;

    return trip;
}
    