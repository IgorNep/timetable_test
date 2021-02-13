import { days } from '../../data/tableData';
import Alert from '../Alert';
import Meeting from '../Meeting';
import Store from '../Store';
import './Table.scss';

class Table {
  constructor(target) {
    this.target = target;
    this.days = days;
    this.meetings = Store.getMeetings();
    this.timeWindows = [];
    this.sortMeetings = [];
    this.createdMeetings = [];
    this.existMeeting = false;
    this.render();
    this.renderTbody(this.meetings);
  }

  render() {
    const table = document.createElement('table');
    table.className = 'striped centered custom-table';

    this.thead = document.createElement('thead');
    this.thead.className = 'thead thead-secondary';
    this.tbody = document.createElement('tbody');

    const tr = document.createElement('tr');
    const th = document.createElement('th');

    th.textContent = 'Time';
    th.style.paddingBottom = '1rem';
    tr.appendChild(th);
    days.forEach((day) => {
      const tableHeadData = document.createElement('th');
      tableHeadData.textContent = day.substring(0, 3);
      tableHeadData.style.paddingBottom = '1rem';
      tr.appendChild(tableHeadData);
    });

    this.thead.appendChild(tr);
    table.appendChild(this.thead);
    table.appendChild(this.tbody);
    this.target.appendChild(table);
  }

  renderTbody(meetingsToDraw) {
    this.tbody.innerHTML = '';
    this.timeWindows = [];
    for (let i = 10; i <= 18; i += 1) {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      tr.appendChild(td);
      td.textContent = `${i}:00`;
      td.style.paddingTop = '1rem';

      for (let j = 0; j < this.days.length; j += 1) {
        const timeSlot = document.createElement('td');
        timeSlot.setAttribute('data-id', this.days[j] + i);
        timeSlot.ondragover = (e) => {
          e.preventDefault();
        };
        timeSlot.ondrop = (e) => {
          this.existMeeting = false;
          const dropzone = e.target;
          const id = e.dataTransfer.getData('text');
          const draggableElement = document.getElementById(id);

          if (dropzone.dataset.id === id) {
            draggableElement.style.background = 'lightblue';
            return;
          }
          if (dropzone.children.length > 0) {
            Alert.render(this.thead, {
              msg: 'Failed to transfer! Timeslot already reserved!',
              type: 'danger',
            });
            draggableElement.style.background = 'lightblue';
            return;
          }
          meetingsToDraw.forEach((item) => {
            if (item.id === draggableElement.id) {
              const findExistMeeting = this.meetings.find(
                (m) => m.id === dropzone.dataset.id,
              );
              if (findExistMeeting) {
                Alert.render(this.thead, {
                  msg: 'Failed to transfer! Timeslot already reserved!',
                  type: 'danger',
                });

                this.existMeeting = true;
                return;
              }
              const findEl = this.meetings.find((m) => m.id === item.id);
              if (findEl) {
                Store.updateMeetings(findEl.id, dropzone.dataset.id);
                findEl.id = dropzone.dataset.id;
              }
            }
          });

          if (!this.existMeeting) {
            dropzone.appendChild(draggableElement);
            draggableElement.id = dropzone.dataset.id;
            draggableElement.setAttribute('data-id', dropzone.dataset.id);
          }

          draggableElement.style.background = 'lightblue';
          e.dataTransfer.clearData();
        };
        this.timeWindows.push(timeSlot);
        this.renderMeetings(timeSlot, meetingsToDraw);
        tr.appendChild(timeSlot);
      }
      this.tbody.appendChild(tr);
    }
  }

  renderMeetings(timeWindow, meetingsToDraw) {
    meetingsToDraw.forEach((meeting) => {
      if (meeting.id === timeWindow.getAttribute('data-id')) {
        this.createMeeting(meeting, timeWindow);
      }
    });
  }

  addMeeting(meeting, cb) {
    const meetingExist = this.meetings.find((item) => item.id === meeting.id);
    if (meetingExist) {
      cb(true);
      return;
    }

    cb(null, true);

    this.meetings.push(meeting);
    Store.addMeeting(meeting);
    this.timeWindows.forEach((item) => {
      if (meeting.id === item.getAttribute('data-id')) {
        this.createMeeting(meeting, item);
      }
    });
  }

  createMeeting(meeting, timeWindow) {
    // eslint-disable-next-line
    new Meeting(meeting, timeWindow, this.deleteMeeting.bind(this));
  }

  deleteMeeting(meeting) {
    this.timeWindows.forEach((item) => {
      if (meeting.id === item.getAttribute('data-id')) {
        this.customConfirm(meeting, (confirmDeleting) => {
          if (confirmDeleting) {
            this.meetings = this.meetings.filter(
              (meetingItem) => meetingItem.id !== meeting.id,
            );
            item.children[0].remove();
            Store.removeMeeting(meeting.id);
            Alert.render(this.thead, {
              msg: 'The event successfully deleted!',
              type: 'success',
            });
          }
        });
      }
    });
  }

  sortByOwner(owner) {
    if (owner === 'all') {
      this.renderTbody(this.meetings);
      return;
    }
    this.sortMeetings = [];
    this.meetings.forEach((item) => {
      const matchOwner = item.owner.find((el) => el === owner);
      if (matchOwner) {
        this.sortMeetings.push(item);
      }
    });
    this.renderTbody(this.sortMeetings);
  }

  customConfirm(meeting, confirmDeleting) {
    const form = document.createElement('form');
    form.className = 'confirm-window';
    const h3 = document.createElement('h3');
    h3.textContent = `Are you sure you want to delete "${meeting.title}" event?`;

    const buttonsGroup = document.createElement('div');
    buttonsGroup.className = 'btn-group ';
    const yesButton = document.createElement('button');
    yesButton.setAttribute('type', 'submit');
    const noButton = document.createElement('button');
    noButton.setAttribute('type', 'button');
    yesButton.className = 'btn';
    yesButton.textContent = 'Yes';

    buttonsGroup.appendChild(yesButton);
    buttonsGroup.appendChild(noButton);

    noButton.textContent = 'No';
    noButton.className = 'btn';
    noButton.onclick = (e) => {
      e.preventDefault();
      this.removeModal(form.className);
    };
    yesButton.setAttribute('autofocus', 'true');
    form.appendChild(h3);
    form.appendChild(buttonsGroup);
    this.target.appendChild(form);
    form.onsubmit = () => {
      this.removeModal(form.className);
      confirmDeleting(true);
    };
  }

  removeModal(className) {
    this.target.removeChild(document.querySelector(`.${className}`));
  }
}

export default Table;
