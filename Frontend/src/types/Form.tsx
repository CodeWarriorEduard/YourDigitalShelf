export type loginInput = {
    email: string,
    password: string
}

export type registerInput = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    yearOfBirth: Date
}

export type addToCollectionInput = {
    bookId: string,
    rating: number,
    review: String
}


export type bookOpinion = {
    rating: number,
    review: string
}