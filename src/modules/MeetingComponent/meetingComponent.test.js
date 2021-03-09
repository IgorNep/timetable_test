import MeetingComponent from './MeetingComponent';

describe('meeting component should be created', () => {
  const onDeleteFn = jest.fn();
  beforeEach(() => {
    onDeleteFn.mockClear();
  });
  const meeting = {
    fieldId: 'Friday14',
    owner: ['Maxim'],
    title: 'Feed the cat',
    id: '68a9bada-7978-4eb0-878d-3ebefd5c6514',
  };
  const timeWindow = document.createElement('timeWindow');
  timeWindow.setAttribute('data-id', 'Friday14');
  timeWindow.innerHTML = ` <span
  class="meeting"
  data-id="479d4f96-a77b-4b58-ac36-7f83ae24af46"
  id="Friday14"
  draggable="true"
  style="cursor: pointer;"
>
  Feed the cat<i class="fa fa-times danger"></i>
</span>`;

  const newEvent = new MeetingComponent(meeting, timeWindow, onDeleteFn);
  test('delete btn should be called 1 time', () => {
    newEvent.onDelete();
    expect(onDeleteFn).toHaveBeenCalledTimes(1);
  });
  test('delete btn should not be called', () => {
    expect(onDeleteFn).toHaveBeenCalledTimes(0);
  });
});
