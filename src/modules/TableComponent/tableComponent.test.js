import TableComponent from './TableComponent';

const body = document.querySelector('body');
const table1 = new TableComponent(body);

describe('add meeting function should work', () => {
  const existMeetingCallBack = jest.fn();
  const meeting = {
    fieldId: 'Monday10',
    owner: ['Maxim'],
    title: 'Cook food',
  };
  const meetings = [
    meeting,
    { fieldId: 'Friday11', owner: ['Oleg'], title: 'Feed cat' },
  ];
  beforeEach(() => {
    existMeetingCallBack.mockClear();
  });
  test('should be called call back when add meeting', () => {
    table1.meetings = meetings;
    table1.addMeeting(meeting, existMeetingCallBack);
    expect(existMeetingCallBack).toHaveBeenCalledTimes(1);
  });
  test('should be called call back with <true> params', () => {
    table1.meetings = meetings;
    table1.addMeeting(meeting, existMeetingCallBack);
    expect(existMeetingCallBack).toHaveBeenCalledWith(true);
  });

  test('should be called call back with <null>-error and true-second param', () => {
    table1.meetings = [];
    table1.addMeeting(meeting, existMeetingCallBack);
    expect(existMeetingCallBack).toHaveBeenCalledWith(null, true);
  });
});
const table2 = new TableComponent(body);
describe('sorting function should return correct values', () => {
  table2.meetings = [
    {
      fieldId: 'Friday14',
      owner: ['Maxim'],
      title: 'Feed the cat',
      id: '68a9bada-7978-4eb0-878d-3ebefd5c6514',
    },
    {
      fieldId: 'Friday12',
      owner: ['Maria'],
      title: 'Feed the cat',
      id: '68a9b122-7978-4eb0-878d-3ebefd5c6514',
    },
  ];

  test('sort arr should be increased from 0 to 1 length', () => {
    const res = table2.sort('Maxim');
    expect(res).toHaveLength(1);
  });
  test('sort arr length should be 2', () => {
    const res = table2.sort('all');
    expect(res).toHaveLength(2);
  });
});
