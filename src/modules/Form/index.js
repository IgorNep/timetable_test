import M from 'materialize-css';
import { days, time } from '../../data/tableData';
import Alert from '../Alert';
import table1 from '../../index';
import { formGroupSelect } from '../../utils/helpers/templates';
import './Modal.scss';
import Store from '../Store';
import ee from '../../utils/EventEmitter/index';

class Modal {
  constructor(target, addUser = false) {
    this.target = target;
    this.addUser = addUser;
    this.users = [];
    this.render();
    ee.subscribe('click', (params) => {
      this.users.push(params[0].name);
    });
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'custom-modal';
    this.form = document.createElement('form');
    this.form.className = 'custom-form';

    if (!this.addUser) {
      this.renderEventForm();
    } else {
      this.renderUserForm();
    }
  }

  renderEventForm() {
    const titleField = `
    <div class="form-group">
    <label for="titleField">Name of the event: </label>
    <input type="text" placeholder="Custom meeting name" id="titleField" class="custom-input"/>
    </div>`;

    const selectParticipants = formGroupSelect(
      Store.getUsers().map((item) => item.name),
      'Participants',
      'multiple',
    );

    const selectDays = formGroupSelect(days, 'Days');
    const selectTime = formGroupSelect(time, 'Time');

    const buttonCreate = document.createElement('button');
    const buttonCancel = document.createElement('button');
    buttonCancel.className = 'btn grey';
    buttonCreate.className = 'btn ';
    buttonCreate.textContent = 'Create';
    buttonCancel.textContent = 'Cancel';

    buttonCancel.onclick = (e) => {
      e.preventDefault();
      this.closeModal();
    };
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const timeValue = document.querySelector('#Time').value;
      const titleFieldValue = document.querySelector('#titleField').value;
      const participantsList = document.querySelector('#Participants');
      const day = document.querySelector('#Days').value;

      if (titleFieldValue === '') {
        Alert.render(this.form, {
          msg: 'Please Enter Title',
          type: 'danger',
        });
        return;
      }
      const selectedParticipants = [];
      const participantsArr = Array.from(participantsList.options);

      participantsArr.forEach((option) => {
        if (option.selected) {
          selectedParticipants.push(option.value);
        }
      });
      if (selectedParticipants.length === 0) {
        Alert.render(this.form, {
          msg: 'Please choose participants from the list!',
          type: 'danger',
        });
        return;
      }
      const newMeeting = {
        fieldId: day + timeValue.substring(0, 2),
        owner: selectedParticipants,
        title: titleFieldValue,
      };
      this.createMeeting(newMeeting);
    });

    // eslint-disable-next-line operator-linebreak
    this.form.innerHTML =
      titleField + selectParticipants + selectDays + selectTime;
    this.form.appendChild(buttonCancel);
    this.form.appendChild(buttonCreate);
    this.container.appendChild(this.form);
    this.target.appendChild(this.container);

    const elems = this.form.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  renderUserForm() {
    this.container.innerHTML += `     
    <form  class="custom-form" id="userForm">
    <h4 class="center">Add new user </h4>
    <div class="input-field col s6">
    <input  id="name" type="text" class="validate">
    <label for="name">First Name</label>
  </div>
    <p>
      <label>
        <input type="checkbox" id="isAdmin"/>
        <span>Is Admin?</span>
      </label>
    </p>   
    <button type="button" class="btn" id="cancelBtn">Cancel</button>
    <button type="submit" class="btn" id="addUserBtn">Add User</button>
  </form>`;
    this.target.appendChild(this.container);
    document
      .querySelector('#cancelBtn')
      .addEventListener('click', this.closeModal.bind(this));
    document.querySelector('#userForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if (e.target.name.value === '') {
        Alert.render(this.container, {
          msg: 'Please Enter Name',
          type: 'danger',
        });
      } else {
        const user = {
          name: e.target.name.value,
          isAdmin: e.target.isAdmin.checked,
        };
        this.addNewUser(user);
      }
    });
  }

  createMeeting(meeting) {
    table1.addMeeting(meeting, (error, success) => {
      if (error) {
        Alert.render(this.form, {
          msg: 'Failed to create an event. Timeslot is already booked',
          type: 'danger',
        });
        return;
      }
      if (success) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    this.target.removeChild(this.container);
  }
}

export default Modal;
