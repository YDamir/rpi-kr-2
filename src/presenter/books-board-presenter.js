import {render, remove} from '../framework/render.js';
import ApplicantsListComponent from '../view/book-list-component.js';

export default class BooksBoardPresenter {
    constructor({boardContainer, applicantsModel, statisticsComponent}) {
        this.boardContainer = boardContainer;
        this.applicantsModel = applicantsModel;
        this.statisticsComponent = statisticsComponent;
        this.applicantsListComponent = null;
        this.filters = {
            genre: '',
            search: ''
        };
    }

    init() {
       
        if (this.applicantsListComponent) {
            remove(this.applicantsListComponent);
        }

      
        const filteredApplicants = this.filterApplicants(this.applicantsModel.getApplicants());

      
        this.applicantsListComponent = new ApplicantsListComponent(
            filteredApplicants,
            this.handleDelete.bind(this)
        );

      
        render(this.applicantsListComponent, this.boardContainer);
    }

    handleDelete(id) {
        this.applicantsModel.removeApplicant(id);
        this.init();
        this.statisticsComponent.updateStatistics(this.applicantsModel.getApplicants().length);
    }

    handleFilterChange(filters) {
        this.filters = filters; // Обновляем фильтры
        this.init();
    }

    filterApplicants(applicants) {
        return applicants.filter((applicant) => {
            const matchesGenre = !this.filters.genre || applicant.genre === this.filters.genre;
            const matchesSearch =
                !this.filters.search ||
                applicant.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                applicant.author.toLowerCase().includes(this.filters.search.toLowerCase());
            return matchesGenre && matchesSearch;
        });
    }
}
