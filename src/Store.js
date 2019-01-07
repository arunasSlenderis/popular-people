import Person from "./Person";
import UI from "./UI";

let people = [];
export default class Store {
  static loadPeople() {
    const peopleData = JSON.parse(localStorage.getItem('people')) || [];
    people = peopleData.map(person => new Person(person));
    return people;
  }

  static getPeople() {
    return people;
  }

  static addPerson(person) {
    people.push(person);
    UI.populateCards(people);
    UI.populateSidebar(people);
    localStorage.setItem('people', JSON.stringify(people));
  }

  static update(person, index) {
    people[index] = person;
    UI.populateCards(people);
    UI.populateSidebar(people);

    localStorage.setItem('people', JSON.stringify(people));
  }
}
