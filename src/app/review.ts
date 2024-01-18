export class Review {
    ReviewId: number;
    TripId: number;
    ReviewerName: string;
    Title: string;
    ReviewDate: Date;
    ReviewText: string;
    Rating: number;

    constructor(
        TripId: number,
        Title: string,
        ReviewDate: Date,
        ReviewerName: string,
        ReviewText: string,
        Rating: number,
    ) { 
        this.ReviewId = 0;
        this.TripId = TripId;
        this.Title = Title;
        this.ReviewDate = ReviewDate;
        this.ReviewerName = ReviewerName;
        this.ReviewText = ReviewText;
        this.Rating = Rating;
    }
}

