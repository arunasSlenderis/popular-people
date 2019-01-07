import Person from "./Person";
import UI from "./UI";

let people = [];

export default class Store {
  static getPeople() {
    people = JSON.parse(localStorage.getItem('people')) || [];

    return people.map(person => new Person(person));
  }

  static addPerson(person) {
    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
    UI.populateCards();
    UI.populateSidebar();
  }

  static update(person, index) {
    people[index] = person;
    localStorage.setItem('people', JSON.stringify(people));

    UI.populateCards();
    UI.populateSidebar();
  }
}
