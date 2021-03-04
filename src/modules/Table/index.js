/* eslint-disable class-methods-use-this */
import { days } from '../../data/tableData';
import TransformData from '../../utils/helpers/transformData';
import Alert from '../Alert';
import Meeting from '../Meeting';
import customConfirm from '../common/customConfirm';
import { EVENTS } from '../../utils/api/endpoints';
import './Table.scss';
import { showSuccess } from '../../utils/helpers/showAlert';
import ee from '../../utils/EventEmitter';

class Table {
  constructor(target) {
    this.target = target;
    this.days = days;
    this.meetings = [];
    this.timeWindows = [];
    this.sortMeetings = [];
    this.createdMeetings = [];
    this.existMeeting = false;
    this.init();
  }

  init() {
    ee.emit('getEvents', { endpoint: EVENTS });
    ee.subscribe('recievedEvents', (props) => {
      this.meetings = TransformData.transformDataToMeeting(props[0].res);
      this.render();
      this.renderTbody(this.meetings);
    });
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
            if (item.fieldId === draggableElement.id) {
              const findExistMeeting = this.meetings.find(
                (m) => m.fieldId === dropzone.dataset.id,
              );
              if (findExistMeeting) {
                Alert.render(this.thead, {
                  msg: 'Failed to transfer! Timeslot already reserved!',
                  type: 'danger',
                });

                this.existMeeting = true;
                return;
              }
              const findEl = this.meetings.find(
                (m) => m.fieldId === item.fieldId,
              );
              if (findEl) {
                findEl.fieldId = dropzone.dataset.id;
                this.updateEvent(findEl);
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
      if (meeting.fieldId === timeWindow.getAttribute('data-id')) {
        this.createMeeting(meeting, timeWindow);
      }
    });
  }

  addMeeting(meeting, cb) {
    const meetingExist = this.meetings.find(
      (item) => item.fieldId === meeting.fieldId,
    );
    if (meetingExist) {
      cb(true);
      return;
    }

    ee.emit('addEvent', { endpoint: EVENTS, data: meeting });

    const renderNewEvent = (props) => {
      const meetingFromDataBase = props[0].res;
      const modifiedMeeting = TransformData.transformSingleItemToMeeting(
        meetingFromDataBase,
      );
      this.meetings.push(modifiedMeeting);
      this.timeWindows.forEach((item) => {
        if (modifiedMeeting.fieldId === item.getAttribute('data-id')) {
          this.createMeeting(modifiedMeeting, item);
        }
      });
      ee.unsubscribe('getSingleEvent', renderNewEvent);
    };
    ee.subscribe('getSingleEvent', renderNewEvent);

    cb(null, true);
    showSuccess('Event has been added!');
  }

  createMeeting(meeting, timeWindow) {
    // eslint-disable-next-line
    new Meeting(meeting, timeWindow, this.deleteMeeting.bind(this));
  }

  updateEvent(event) {
    ee.emit('updateEvent', { endpoint: EVENTS, data: event });
    showSuccess('Event time has been changed!');
  }

  deleteMeeting(meeting) {
    this.timeWindows.forEach((item) => {
      if (meeting.fieldId === item.getAttribute('data-id')) {
        customConfirm(meeting, async (confirmDeleting) => {
          if (confirmDeleting) {
            this.meetings = this.meetings.filter(
              (meetingItem) => meetingItem.fieldId !== meeting.fieldId,
            );
            item.children[0].remove();
            ee.emit('deleteEvent', { endpoint: EVENTS, data: meeting });
            showSuccess('Event has been deleted!');
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
}

export default Table;
