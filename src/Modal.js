import UI from './UI';
import Store from './Store';
import Person from './Person';

export default class Modal {
  static show() {
    const modal = UI.createModal();
    document.body.prepend(modal.overlay);
    document.body.prepend(modal.modal);

    const closeModalBtn = document.querySelector('.modal-close');
    const modalForm = document.getElementById('modal-form');

    closeModalBtn.addEventListener('click', Modal.remove);
    modalForm.addEventListener('submit', Modal.submit);
  }

  static remove() {
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    modal.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
      if (modal) modal.remove();
      if (overlay) overlay.remove();
    }, 200);
  }

  static submit(e) {
    e.preventDefault();

    const now = new Date();
    const firstName = document.getElementById('first_name').value;
    const lastName = document.getElementById('last_name').value;
    const imageUrl = document.getElementById('img_url').value;
    const city = document.getElementById('city').value;

    if (firstName && lastName && imageUrl && city) {
      const data = {
        first_name: firstName,
        last_name: lastName,
        img_url: imageUrl,
        city,
        id: now.getTime()
      };

      const person = new Person(data);

      Store.addPerson(person);
      Modal.remove();
    }
  }
}
