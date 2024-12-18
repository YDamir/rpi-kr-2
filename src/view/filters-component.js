import {createElement} from '../framework/render.js';

function createFiltersComponentTemplate() {
    return `
        <div class="filters">
            <h2>Фильтры</h2>
            <select id="genre-filter">
                <option value="">Все жанры</option>
                <option value="Художественная литература">Художественная литература</option>
                <option value="Научная литература">Научная литература</option>
                <option value="Историческая литература">Историческая литература</option>
                <option value="Программирование">Программирование</option>
            </select>
            <input type="text" id="search-input" placeholder="Поиск по названию или автору">
        </div>
    `;
}

export default class FiltersComponent {
    constructor(onFilterChange) {
        this.onFilterChange = onFilterChange;
        this.element = null;
    }

    getTemplate() {
        return createFiltersComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.setEventListeners();
        }
        return this.element;
    }

    setEventListeners() {
        const genreFilter = this.element.querySelector('#genre-filter');
        const searchInput = this.element.querySelector('#search-input');

        // Обработка изменения жанра
        genreFilter.addEventListener('change', () => {
            this.onFilterChange({
                genre: genreFilter.value,
                search: searchInput.value.trim()
            });
        });

        // Обработка поиска
        searchInput.addEventListener('input', () => {
            this.onFilterChange({
                genre: genreFilter.value,
                search: searchInput.value.trim()
            });
        });
    }

    removeElement() {
        this.element = null;
    }
}
