class Store {
  static getMeetings() {
    let meetings;
    if (localStorage.getItem('meetings') === null) {
      meetings = [];
    } else {
      meetings = JSON.parse(localStorage.getItem('meetings'));
    }
    return meetings;
  }

  static addMeeting(meeting) {
    const meetings = Store.getMeetings();

    meetings.push(meeting);

    localStorage.setItem('meetings', JSON.stringify(meetings));
  }

  static removeMeeting(id) {
    const meetings = Store.getMeetings();
    meetings.forEach((meeting, index) => {
      if (meeting.id === id) {
        meetings.splice(index, 1);
      }
    });
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }

  static updateMeetings(oldMeetingId, newMeetingId) {
    const meetings = Store.getMeetings();
    const changedMeeting = meetings.find(
      (meeting) => meeting.id === oldMeetingId,
    );
    if (changedMeeting) {
      changedMeeting.id = newMeetingId;
    }
    localStorage.setItem('meetings', JSON.stringify(meetings));
  }

  static saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static removeUser() {
    localStorage.removeItem('user');
  }
}

export default Store;
