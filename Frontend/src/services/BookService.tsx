import axios from "axios";
import { addToCollectionInput } from "../types/Form";

const url = import.meta.env.VITE_URL;



export async function getBookId(id:string|undefined, headerValue:string){
    try{
        const response = await axios.get(url+"/book/"+id, { headers:{'Authorization': headerValue}})
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function getBookOfTheMonth(headerValue:string){
    try{
        const response = (await axios.get(url+"/book/month", { headers:{'Authorization': headerValue}}));
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function getListOfBooks(headerValue:string, genre:string){
    try{
        const response = await axios.get(url+"/book/"+genre+"/list", { headers:{'Authorization': headerValue}})
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function addBookToCollection(headerValue:string, bookData: addToCollectionInput){
    try{
        const response = await axios.post(url+"/collection/book", bookData, {headers:{'Authorization': headerValue}});
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function getUserCollection(headerValue:string, page: string){
    try{
        const response = await axios.get(url+"/collection?page="+page, { headers:{'Authorization': headerValue}})
        return response.data;
    }catch(error){
        throw error;
    }
}

export async function getBookSearchResponse(headerValue:string, searchTerm: string | null, page: number){
    try{
        const response = await axios.get(url+`/book/search?searchTerm=${searchTerm}&page=${page}`, { headers:{'Authorization': headerValue}})
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function getBookOpion(headerValue:string, idBook: string|null){
    try{
        const response = await axios.get(url+`/collection/${idBook}/opinion`,{ headers:{'Authorization': headerValue}});
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function deleteBookInCollection(headerValue:string, idBook: string|null){
    try{
        const response = await axios.delete(url+`/collection/${idBook}/book`,{ headers:{'Authorization': headerValue}});
        return response.data;
    }catch(error){
        throw error;
    }
}


export async function updateBookReview(headerValue:string, bookData: addToCollectionInput){
    try{
        const response = await axios.put(url+`/collection/book/opinion`,bookData,{ headers:{'Authorization': headerValue}});
        return response.data;
    }catch(error){
        throw error;
    }
}



export async function getRecommendations(headerValue:string, idBook: number){
    try{
        const response = await axios.get(url+`/book/recommendations/+${idBook}`,{ headers:{'Authorization': headerValue}});
        return response.data;
    }catch(error){
        throw error;
    }
}



export async function getBookComments(headerValue:string, idBook: string){

    try{
        const response = await axios.get(url+`/collection/book/${idBook}/comments`,{ headers:{'Authorization': headerValue}});
        return response.data;
    }catch(error){
        throw error;
    }
}