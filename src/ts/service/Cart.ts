import Buyable from '../domain/Buyable';

export default class Cart {
  private items: Buyable[] = [];

  /**
   * Добавляет товар в корзину
   */
  add(item: Buyable): void {
    this.items.push(item);
  }

  /**
   * Возвращает все товары в корзине
   */
  getAll(): Buyable[] {
    return [...this.items];
  }

  /**
   * Считает суммарную стоимость без скидки
   * @returns общая стоимость товаров
   */
  getTotalAmount(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * Считает суммарную стоимость с учётом скидки
   * @param discount - процент скидки (0-100)
   * @returns стоимость со скидкой
   */
  getTotalWithDiscount(discount: number): number {
    const total = this.getTotalAmount();
    return total * (1 - discount / 100);
  }

  /**
   * Удаляет товар из корзины по id
   * @param id - идентификатор товара
   */
  removeById(id: number): void {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }
}
