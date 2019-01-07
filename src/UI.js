import Store from './Store';
import Utils from './Utils';

const container = document.querySelector('.container');

export default class UI {
  static createCards(people) {
    if (!people || people.length === 0) return;
    
    const cardList = document.querySelector('.card-list');
    while (cardList.firstChild) cardList.removeChild(cardList.firstChild);
    
    people.forEach(person => {
      cardList.appendChild(UI.createCard(person));
    });
  }

  static createCard(person) {
    const personsCard = document.createElement('article');
    personsCard.classList.add('card');

    personsCard.innerHTML = 
    `
      <img class="card-img" src="${person.img_url}" alt="${person.img_url}">
      <section class="card-details">
        <p class="card-details-name">${person.fullName()}<span class="invisible">${person.id}</span></p>
        <p class="card-details-city">${person.city}</p>
        <section class="card-details-rating-area">
          <button class="btn card-details-btn">Įvertinti</button>
          <p class="rating card-details-rating ${person.rating === 0 ? 'invisible' : ''}">
            ${person.rating}
          </p>
        </section>
      </section>
    `;
    
    return personsCard;
  }

  static createModal() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    const modal = document.createElement('section');
    modal.classList.add('modal');

    modal.innerHTML = 
    `
      <form id="modal-form">
        <h1>Naujas žmogus</h1>
        <button type="button" class="btn modal-close">X</button>
        <section class="form-controls">
          <input
            id="first_name"
            class="form-control"
            required
            type="text"
            placeholder="Vardas"
          />
          <input
            id="last_name"
            class="form-control"
            required
            type="text"
            placeholder="Pavardė"
          />
          <input
            id="img_url"
            class="form-control"
            required
            type="text"
            placeholder="Nuoroda į nuotrauką"
          />
          <select id="city" class="form-control" required>
            <option value="Vilnius">Vilnius</option>
            <option value="Kaunas">Kaunas</option>
            <option value="Klaipėda">Klaipėda</option>
            <option selected="selected" value="Šiauliai">Šiauliai</option>
            <option value="Panevėžys">Panevėžys</option>
            <option value="Alytus">Alytus</option>
            <option value="Marijampolė">Marijampolė</option>
            <option value="Mažeikiai">Mažeikiai</option>
            <option value="Jonava">Jonava</option>
            <option value="Utena">Utena</option>
          </select>
        </section>
        <button type="submit" class="btn modal-save-btn">Išsaugoti</button>
      </form>
    `;

    return { modal, overlay };
  }

  static createSidebar(people) {
    const sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');

    sidebar.innerHTML = '<h1 class="sidebar-title">TOP 10</h1>';

    for (const [index, person] of people.entries()) {
      sidebar.innerHTML += `
        <section class="sidebar-item">
          <p class="sidebar-name">${person.fullName()}</p>
          ${person.rating ? `<p class="rating sidebar-rating"><span class="sidebar-rating-icon"></span>${person.rating}</p>` : ''}
        </section>
      `;
      if (index === 9) break;
    }

    return sidebar;
  }

  static populateCards() {
    const people = Store.getPeople();
    const sortedByName = Utils.abcSort(people);
    UI.createCards(sortedByName);
  }

  static populateSidebar() {
    const people = Store.getPeople();
    if (people && people.length) {
      const sortedByRating = Utils.numberSort(people);
      const sidebar = UI.createSidebar(sortedByRating);
      const sidebarInDOM = document.querySelector('.sidebar');
      if (sidebarInDOM) sidebarInDOM.remove();
      container.appendChild(sidebar);
    }
  }

  static updateRating(id) {
    const people = Store.getPeople();
    const foundPerson = Utils.findById(people, id);
    const index = people.indexOf(foundPerson);
    foundPerson.increaseRating();
    Store.update(foundPerson, index);
  }
} 