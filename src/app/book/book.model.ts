import { categoryDTO } from "src/app/category/category.model";
import { genreDTO } from "src/app/genre/genre.model";
import { publisherDTO } from "src/app/publisher/publisher.model";
import { Photo } from "../utilities/photo.model";

export interface bookCreationDTO {
    name: string;
    size: string;
    price: number;
    cover: string;
    pages: string;
    quantity: number;
    author: string;
    content: string;
    translators: string;
    productImage: File;
    releaseDate: Date;
    CategoryId: number;
    PublisherId: number;
    genresIds: number[];
}

export interface bookDTO {
    id: number;
    name: string;
    size: string;
    price: number;
    cover: string;
    pages: string;
    quantity: number;
    content: string;
    translators: string;
    author: string;
    productImage: string;
    releaseDate: Date;
    CategoryId: number;
    PublisherId: number;
    categoryName: string;
    publisherName: string;
    genresIds: number[];
    photos: Photo[];
}

export interface BookPostGetDTO {
    genres: genreDTO[];
    categories: categoryDTO[];
    publishers: publisherDTO[];
}

export interface BookPutGetDTO {
    product: bookDTO;
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
}

export interface homeDTO {
    latestProducts: bookDTO[];
    upComingProducts: bookDTO[];
}