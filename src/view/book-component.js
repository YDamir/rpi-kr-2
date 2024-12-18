import {createElement} from '../framework/render.js';

function createApplicantComponentTemplate(books) {
    return (
        `<div class="card">
            <p><strong>Название книги:</strong> ${books.name}</p>
            <p><strong>Автор книги:</strong> ${books.author}</p>
            <p><strong>Год издания:</strong> ${books.year}</p>
            <p><strong>Жанр:</strong> ${books.genre}</p>
            <p><strong>Статус книги:</strong> ${books.status}</p>
            <button class="delete-button" data-id="${books.id}">Удалить</button>
        </div>`
    );
}

export default class ApplicantComponent {
    constructor(books, onDelete) {
        this.books = books;
        this.onDelete = onDelete;
        this.element = null;
    }

    getTemplate() {
        return createApplicantComponentTemplate(this.books);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.setEventListeners();
        }
        return this.element;
    }

    setEventListeners() {
        const deleteButton = this.element.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            this.onDelete(this.books.id);
        });
    }

    removeElement() {
        this.element = null;
    }
}
