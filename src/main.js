import StatisticsComponent from './view/statistics-component.js';
import RegistrationFormComponent from './view/registration-form-component.js';
import FiltersComponent from './view/filters-component.js';
import {render, RenderPosition} from './framework/render.js';
import BooksBoardPresenter from './presenter/books-board-presenter.js';
import BooksModel from './model/book-model.js';

const bodyContainer = document.querySelector('.container');
const statisticsContainer = document.querySelector('.statistics');
const registrationContainer = document.querySelector('.registration-form');
const filtersContainer = document.querySelector('.filters');
const applicantsListContainer = document.querySelector('.applicants-list');

const booksModel = new BooksModel();

const statisticsComponent = new StatisticsComponent(booksModel.getApplicants().length);

const booksBoardPresenter = new BooksBoardPresenter({
    boardContainer: applicantsListContainer,
    applicantsModel: booksModel,
    statisticsComponent,
});

render(statisticsComponent, statisticsContainer, RenderPosition.BEFOREBEGIN);

render(new RegistrationFormComponent(booksModel, () => {
    booksBoardPresenter.init();
    statisticsComponent.updateStatistics(booksModel.getApplicants().length); 
}), registrationContainer);

render(new FiltersComponent((filters) => booksBoardPresenter.handleFilterChange(filters)), filtersContainer);

booksBoardPresenter.init();
