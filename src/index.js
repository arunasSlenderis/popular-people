import Modal from './Modal';
import UI from './UI';
import Utils from './Utils';
import Store from './Store';
import './styles/index.scss';

const addPersonBtn = document.querySelector('.add-person-btn');
const cardList = document.querySelector('.card-list');

UI.createLoadingOverlay();

addPersonBtn.addEventListener('click', Modal.show);
cardList.addEventListener('click', e => {
  if (e.target.classList.contains('card-details-btn')) {
    const ratingEl = e.target.nextSibling.nextSibling;
    Utils.addPulse(ratingEl);
    const id = e.target.parentElement.parentElement.firstChild.nextSibling.lastChild.textContent.trim();
    setTimeout(() => UI.updateRating(id), 500);
  }
});

window.onload = () => {
  UI.removeLoadingOverlay();
  UI.populateCards();
  UI.populateSidebar();
};

if (module.hot) module.hot.accept();
