export type BookCompleteInfo = {
    title: string,
    author: string,
    description: string,
    genre: string,
    cover: string,
    publisher: string,
    isbn: string,
    language: string,
    yearofrelease: Date,
    pageCount: number,
    inCollection: boolean,
    meanRating: number,
    numberOfRatings: number
}


export type BookPreview = {
    id: number;
    title: string;
    author: string;
    genre: string;
    cover: string;
};

export type BooksIncollection = {
    data: BookPreview[]
}

export type Links = {
    next: string | null;
    prev: string | null;
    last: string;
};

export type BookSearchResponse = {
    books: BookPreview[];
    pageCount: number;
    currentPage: number;
    numberOfResults: number;
    links: Links;
};

export type BookComment = {
    firstName: string,
    lastName: string,
    rating: number,
    review: string
}