// класс Section, который отвечает за отрисовку элементов на странице.
class Section {
  constructor({ items, renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector); // добавить поиск в доме
  }

  // Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
  // getCardItem() {
  //   this._items.forEach((item) => {
  //     this.addItem(this._renderer(item));
  //   });
  // }

  // Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    this._container.prepend(item);
  }

  getCardItem(items) {
    items.forEach((item) => {
      const element = this._renderer(item);
      this.addItem(element);
    });
  }

}

export default Section;
