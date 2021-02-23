import { participants, isAdmin, user } from '../../data/tableData';
import Form from '../Form';
import table1 from '../../index';
import './ContentHeader.scss';
import Store from '../Store';

const DEFAULT_TARGET_ELEMENT = document.querySelector('body');

class ContentHeader {
  constructor(target) {
    this.target = target;
    this.render();
  }

  render() {
    const container = document.createElement('div');
    container.className = 'header';
    const h2 = document.createElement('h2');
    h2.textContent = 'Calendar';

    const buttonsSection = document.createElement('div');
    buttonsSection.className = 'buttons';

    const select = document.createElement('select');
    select.className = 'select-item form-select';
    const generalOption = document.createElement('option');
    generalOption.value = 'all';
    generalOption.textContent = 'All participants';
    select.appendChild(generalOption);
    participants.forEach((participant) => {
      const option = document.createElement('option');
      option.value = participant;
      option.textContent = participant;
      select.appendChild(option);
    });

    select.onchange = (e) => {
      this.sortByParticipant(e);
    };
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
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    };
    buttonsSection.appendChild(select);
    buttonsSection.appendChild(logoutBtn);

    container.appendChild(h2);
    container.appendChild(buttonsSection);
    this.target.appendChild(container);
  }

  createModal() {
    this.modal1 = new Form(DEFAULT_TARGET_ELEMENT);
  }

  // eslint-disable-next-line class-methods-use-this
  sortByParticipant(e) {
    table1.sortByOwner(e.target.value);
  }
}
export default ContentHeader;
