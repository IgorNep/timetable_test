import M from 'materialize-css';
import { days, time } from '../../data/tableData';
const formTarget = document.querySelector('#modal-event');
import './Modal.scss';
import { formTemplate } from './formTemplate';
import { validateForm } from './validateForm';
import Alert from '../Alert/index';
import table1 from '../../index';

class EventForm {
  constructor(target = formTarget) {
    this.target = target;
    this.render();
  }
  render() {
    this.form = document.createElement('form');
    this.form.className = 'custom-form';
    this.form.innerHTML = formTemplate(days, time);
    this.form.onsubmit = (e) => {
      e.preventDefault();
      const titleField = this.form.querySelector('#titleField');
      const participantsField = this.form.querySelector('#Participants');
      const daysField = this.form.querySelector('#Days');
      const timeField = this.form.querySelector('#Time');
      const values = [titleField, participantsField, daysField, timeField];
      if (validateForm(values)) {
        const preparedData = this.prepareMeetingData(values);
        this.createMeeting(preparedData);
      }
    };
    this.form
      .querySelector('#cancelBtn')
      .addEventListener('click', this.closeModal.bind(this));
    this.target.classList.remove('hiden');
    this.target.appendChild(this.form);
    const elems = this.form.querySelectorAll('select');
    M.FormSelect.init(elems);
  }

  prepareMeetingData(values) {
    const [titleField, participantsField, daysField, timeField] = values;
    const timeValue = timeField.value;
    const titleFieldValue = titleField.value;
    const participantsList = participantsField;
    const day = daysField.value;

    const selectedParticipants = [];
    const participantsArr = Array.from(participantsList.options);

    participantsArr.forEach((option) => {
      if (option.selected) {
        selectedParticipants.push(option.value);
      }
    });

    const newMeeting = {
      fieldId: day + timeValue.substring(0, 2),
      owner: selectedParticipants,
      title: titleFieldValue,
    };
    return newMeeting;
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
    this.target.removeChild(this.form);
    this.target.classList.add('hiden');
  }
}

export default EventForm;
