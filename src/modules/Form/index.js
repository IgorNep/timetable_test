import M from 'materialize-css';
import { participants, days, time } from '../../data/tableData';
import Alert from '../Alert';
import table1 from '../../index';
import { formGroupSelect } from '../../utils/templates';
import './Modal.scss';

class Modal {
  constructor(target) {
    this.target = target;
    this.render();
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'custom-modal';
    this.form = document.createElement('form');
    this.form.className = 'custom-form';

    const titleField = `
    <div class="form-group">
    <label for="titleField">Name of the event: </label>
    <input type="text" placeholder="Custom meeting name" id="titleField" class="custom-input"/>
    </div>`;

    const selectParticipants = formGroupSelect(
      participants,
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
        id: day + timeValue.substring(0, 2),
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
