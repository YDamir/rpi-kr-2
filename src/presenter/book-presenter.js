import BookItemComponent from '../view/book-item-component.js';
import DeleteButtonComponent from '../view/delete-button-component.js';
import EditButtonComponent from '../view/edit-button-component.js';
import { render, remove } from '../framework/render.js';

export default class BookPresenter {
  #container = null;
  #book = null;
  #deleteButtonComponent = null;
  #editButtonComponent = null;
  #onBookUpdate = null;
  #bookItemComponent = null;

  constructor({ container, onBookUpdate }) {
    this.#container = container;
    this.#onBookUpdate = onBookUpdate;
  }

  init(book) {
    this.#book = book;

    this.#bookItemComponent = new BookItemComponent(book);

    render(this.#bookItemComponent, this.#container);

    this.#deleteButtonComponent = new DeleteButtonComponent({
      onDelete: () => this.#onBookUpdate('delete', this.#book),
    });
    this.#editButtonComponent = new EditButtonComponent({
      onEdit: (newTitle, newAuthor) =>
        this.#onBookUpdate('edit', { ...this.#book, title: newTitle, author: newAuthor }),
    });

    render(this.#deleteButtonComponent, this.#bookItemComponent.actionsContainer);
    render(this.#editButtonComponent, this.#bookItemComponent.actionsContainer);
  }

  destroy() {
    remove(this.#deleteButtonComponent);
    remove(this.#editButtonComponent);
    remove(this.#bookItemComponent);
  }
}
