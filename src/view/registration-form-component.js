import {createElement} from '../framework/render.js';

function createRegistrationFormComponentTemplate() {
    return `
        <div class="registration-form">
            <h2>Добавление книги</h2>
            <form id="applicant-form">
                <input type="text" id="name" placeholder="Название книги" required>
                <input type="text" id="author" placeholder="Автор" required>
                <input type="number" id="year" placeholder="Год издания" required min="0" max="${new Date().getFullYear()}">
                
                <select id="genre" required>
                    <option value="">Выберите жанр</option>
                    <option value="Художественная литература">Художественная литература</option>
                    <option value="Научная литература">Научная литература</option>
                    <option value="Историческая литература">Историческая литература</option>
                    <option value="Программирование">Программирование</option>
                </select>

                <select id="status" required>
                    <option value="">Статус книги</option>
                    <option value="Доступна">Доступна</option>
                    <option value="Выдана">Выдана</option>
                    <option value="Зарезервирована">Зарезервирована</option>
                </select>

                <button type="submit">Добавить книгу</button>
            </form>
        </div>
    `;
}

export default class RegistrationFormComponent {
    constructor(applicantsModel, onDataChange) {
        this.applicantsModel = applicantsModel;
        this.onDataChange = onDataChange;
        this.element = null;
    }

    getTemplate() {
        return createRegistrationFormComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.setEventListeners();
        }
        return this.element;
    }

    setEventListeners() {
        const form = this.element.querySelector('#applicant-form');
        
        form.addEventListener('submit', (event) => {
            event.preventDefault();
        
            const name = form.querySelector('#name').value.trim();
            const author = form.querySelector('#author').value.trim();
            const year = form.querySelector('#year').value.trim();
            const genre = form.querySelector('#genre').value.trim();
            const status = form.querySelector('#status').value.trim();
        
            if (!name || !author || !year || !genre || !status) {
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }
        
            this.applicantsModel.addApplicant({ name, author, year, genre, status });
            this.onDataChange();
            form.reset();
        });
        
        
    }

    removeElement() {
        this.element = null;
    }
}
