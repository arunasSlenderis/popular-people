export default class Person {
  constructor({ id, first_name, last_name, img_url, city, rating }) {
    this.id = id || 1,
    this.first_name = first_name || '';
    this.last_name = last_name || '';
    this.img_url = img_url || '';
    this.city = city || 'Šiauliai';
    this.rating = rating || 0;
  }

  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  increaseRating() {
    this.rating += 1;
  }
}
