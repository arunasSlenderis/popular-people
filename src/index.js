import Modal from './Modal';
import UI from './UI';
import './styles/index.scss';
import Utils from './Utils';

const addPersonBtn = document.querySelector('.add-person-btn');
const cardList = document.querySelector('.card-list');

addPersonBtn.addEventListener('click', Modal.show);
cardList.addEventListener('click', e => {
  if (e.target.classList.contains('card-details-btn')) {
    const ratingEl = e.target.nextSibling.nextSibling;
    Utils.addPulse(ratingEl);
    const id = e.target.parentElement.parentElement.firstChild.nextSibling.lastChild.textContent.trim();
    setTimeout(() => UI.updateRating(id), 500);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  UI.populateCards();
  UI.populateSidebar();
});


if (module.hot) module.hot.accept();
