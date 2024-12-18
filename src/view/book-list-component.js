import {createElement} from '../framework/render.js';
import ApplicantComponent from './book-component.js';

function createApplicantsListComponentTemplate() {
    return (
        `<div class="applicants-list">
            <h2>Список книг</h2>
            <div id="applicants-container"></div>
        </div>`
    );
}

export default class ApplicantsListComponent {
    constructor(applicants, onDelete) {
        this.applicants = applicants;
        this.onDelete = onDelete;
        this.element = null;
    }

    getTemplate() {
        return createApplicantsListComponentTemplate();
    }

    getElement() {
        if (!this.element) {
            this.element = createElement(this.getTemplate());
            this.renderApplicants();
        }
        return this.element;
    }

    renderApplicants() {
        const container = this.element.querySelector('#applicants-container');
        container.innerHTML = '';
        this.applicants.forEach(applicant => {
            const applicantComponent = new ApplicantComponent(applicant, this.onDelete);
            container.appendChild(applicantComponent.getElement());
        });
    }

    update(applicants) {
        this.applicants = applicants;
        this.renderApplicants();
    }

    removeElement() {
        this.element = null;
    }
}