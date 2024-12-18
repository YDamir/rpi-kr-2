import {createElement} from '../framework/render.js';

function createStatisticsComponentTemplate(totalBooks) {
    return `
        <div class="statistics">
            <h2>Статистика</h2>
            <div class="stats-block">
                <p>Всего книг: <span id="total-applicants">${totalBooks}</span></p>
            </div>
        </div>
    `;
}

export default class StatisticsComponent {
    constructor(totalBooks = 0) {
        this.totalBooks = totalBooks;
        this.element = null;
    }

    getTemplate() {
        return createStatisticsComponentTemplate(this.totalBooks);
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
        }
        return this.element;
    }

    updateStatistics(newTotal) {
        this.totalBooks = newTotal;
        const totalElement = this.element.querySelector('#total-applicants');
        if (totalElement) {
            totalElement.textContent = this.totalBooks;
        }
    }

    removeElement() {
        this.element = null;
    }
}
