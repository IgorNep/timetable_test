import './Meeeting.scss';

class Meeting {
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
    this.span.setAttribute('draggable', true);

    const deleteBtn = document.createElement('i');

    deleteBtn.className = 'fa fa-times danger';
    deleteBtn.onclick = () => {
      this.onDelete(this.meeting);
    };
    this.span.appendChild(deleteBtn);

    this.span.setAttribute('data-id', this.meeting.id);
    this.span.id = this.meeting.id;

    this.span.ondragstart = (e) => {
      e.dataTransfer.setData('text/plain', e.target.id);
      e.currentTarget.style.backgroundColor = 'yellow';
    };
    this.timeSlot.appendChild(this.span);
  }
}
export default Meeting;
