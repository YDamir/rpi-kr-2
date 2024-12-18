import {books} from '../mock/books.js';

export default class BooksModel {
    constructor() {
        this.books = [...books];
    }

    getApplicants() {
        return this.books; 
    }

    addApplicant(newBook) {
        const newId = String(this.books.length + 1);
        const bookToAdd = { ...newBook, id: newId }; 
        this.books.push(bookToAdd); 
    }

    removeApplicant(id) {
        this.books = this.books.filter(book => book.id !== id); 
    }
    update(applicants) {
        this.applicants = applicants; 
        this.renderApplicants(); 
    }
    
}
