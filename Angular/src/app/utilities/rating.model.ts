export interface ratingDTO {
    rating: number;
    comment: string;
    productId: number;
}

export interface ratingForReturn {
    id: number;
    rate: number;
    comment: string;
    ratingDate: Date;
    productId: number;
    userId: string;
    userName: string;
}

export interface ratingValuePercentage {
    star: number;
    value: number;
}