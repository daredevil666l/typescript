import Buyable from './Buyable';

export default class Movie implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly originalName: string,
    readonly year: number,
    readonly country: string,
    readonly slogan: string,
    readonly genres: string[],
    readonly duration: number, // В минутах
    readonly price: number,
    readonly poster?: string
  ) {}

  /**
   * Форматирует длительность фильма в формат "ХХХ мин. / ЧЧ:ММ"
   */
  getFormattedDuration(): string {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${this.duration} мин. / ${hours}:${minutesStr}`;
  }

  /**
   * Возвращает строку с жанрами через запятую
   */
  getGenresString(): string {
    return this.genres.join(', ');
  }
}
