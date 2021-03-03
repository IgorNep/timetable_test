import M from 'materialize-css';
import { isAdmin, user } from '../../data/tableData';
import Form from '../Form';
import table1 from '../../index';
import './ContentHeader.scss';
import Store from '../Store';

const DEFAULT_TARGET_ELEMENT = document.querySelector('body');

// eslint-disable-next-line class-methods-use-this
function getOptions(users = null) {
  let options = '<option value="all">All participants</option>';
  const participants = users || Store.getUsers();
  participants.forEach((participant) => {
    options += `
        <option value="${participant.name}">${participant.name}</option>
        `;
  });
  return options;
}

class ContentHeader {
  constructor(target) {
    this.target = target;
    this.render();
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'header';
    const h2 = document.createElement('h2');
    h2.textContent = 'Calendar';

    const buttonsSection = document.createElement('div');
    buttonsSection.className = 'buttons';
    const select = this.createSelect();

    let addButton;
    if (isAdmin) {
      addButton = document.createElement('button');
      addButton.textContent = 'New Event +';
      addButton.className = 'btn btn-secondary';
      addButton.onclick = () => {
        this.createModal();
      };

      buttonsSection.appendChild(addButton);
    }
    if (user) {
      const userDiv = document.createElement('div');
      userDiv.className = 'btn success';
      userDiv.textContent = `${user.isAdmin ? 'Admin' : 'User'} - ${user.name}`;
      buttonsSection.appendChild(userDiv);
    }
    const logoutBtn = document.createElement('button');
    logoutBtn.textContent = 'Logout';
    logoutBtn.className = 'btn';
    logoutBtn.onclick = () => {
      Store.removeUser();
      Store.removeUsers();

      // eslint-disable-next-line no-restricted-globals
      location.reload();
    };
    buttonsSection.appendChild(select);
    buttonsSection.appendChild(logoutBtn);

    this.container.appendChild(h2);
    this.container.appendChild(buttonsSection);
    this.target.appendChild(this.container);
  }

  createSelect() {
    const select = document.createElement('select');
    select.className = 'select-item form-select js-select';
    select.innerHTML = getOptions();
    select.onchange = (e) => {
      this.sortByParticipant(e);
    };
    return select;
  }

  static changeSelect(users) {
    const select = document.querySelector('.js-select');
    select.innerHTML = '';
    select.innerHTML = getOptions(users);
    M.FormSelect.init(select);
  }

  createModal() {
    this.modal1 = new Form(DEFAULT_TARGET_ELEMENT);
  }

  createUserModal() {
    this.modal2 = new Form(DEFAULT_TARGET_ELEMENT, true);
  }

  // eslint-disable-next-line class-methods-use-this
  sortByParticipant(e) {
    table1.sortByOwner(e.target.value);
  }
}
export default ContentHeader;
