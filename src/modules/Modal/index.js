import Loader from '../Loader/Loader';
import Store from '../Store';
import UserFactory from '../common/UserFactory';
import './index.scss';

const DEFAULT_TARGET = document.querySelector('.content');

class Modal {
  constructor(title, data, target = DEFAULT_TARGET) {
    this.target = target;
    this.participants = data;
    this.title = title;
    this.users = [];
    this.render();
  }

  render() {
    const modal = document.createElement('div');
    modal.className = 'modal-custom';
    const title = document.createElement('h3');
    title.textContent = this.title;
    modal.appendChild(title);
    const form = document.createElement('form');
    const factory = new UserFactory();
    this.participants.forEach((user) => {
      const { name, isAdmin } = user;
      const newUser = isAdmin
        ? factory.create(name, 'admin')
        : factory.create(name);
      this.users.push(newUser);
    });
    const options = this.users.map(
      (user) => `<option value="${user.name}">${user.name}</option>`,
    );
    form.innerHTML = `
        <select id="participant">
              ${options}
        </select>
        <button type="submit" class="btn">Confirm</button>    
    `;
    form.onsubmit = (e) => {
      e.preventDefault();
      const participant = document.querySelector('#participant');

      this.users.forEach((user) => {
        if (user.name === participant.value) {
          Store.saveUser(user);
          // eslint-disable-next-line no-restricted-globals
          location.reload();
        }
      });
      this.target.removeChild(modal);
      // eslint-disable-next-line no-new
      new Loader();
    };

    modal.appendChild(form);
    this.target.appendChild(modal);
  }
}

export default Modal;
