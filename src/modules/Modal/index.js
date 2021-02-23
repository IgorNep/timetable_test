import './index.scss';
import Loader from '../Loader/Loader';
import { participants } from '../../data/tableData';
import User from '../common/User';
import Admin from '../common/Admin';

const DEFAULT_TARGET = document.querySelector('.content');

class Modal {
  constructor(title, target = DEFAULT_TARGET) {
    this.target = target;
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
    participants.forEach((user) => {
      let newUser;
      if (user === 'Maria') {
        newUser = new Admin(user);
      } else {
        newUser = new User(user);
      }
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
          localStorage.setItem('user', JSON.stringify(user));
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
