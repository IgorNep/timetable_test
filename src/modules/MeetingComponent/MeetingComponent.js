import { isAdmin } from '../../data/tableData';
import './Meeeting.scss';

class MeetingComponent {
  constructor(meeting, timeSlot, onDelete) {
    this.meeting = meeting;
    this.timeSlot = timeSlot;
    this.onDelete = onDelete;
    this.render();
  }

  render() {
    this.span = document.createElement('span');
    this.span.className = 'meeting';
    this.span.textContent = this.meeting.title;

    this.span.setAttribute('data-id', this.meeting.id);
    this.span.id = this.meeting.fieldId;
    if (isAdmin) {
      this.span.setAttribute('draggable', true);
      this.span.style.cursor = 'pointer';
      const deleteBtn = document.createElement('i');
      deleteBtn.className = 'fa fa-times danger js-delete-event';
      deleteBtn.onclick = () => {
        this.onDelete(this.meeting);
      };
      this.span.appendChild(deleteBtn);
      this.span.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.currentTarget.style.backgroundColor = 'yellow';
      };
    } else {
      this.span.style.justifyContent = 'center';
    }
    this.timeSlot.appendChild(this.span);
  }
}
export default MeetingComponent;
