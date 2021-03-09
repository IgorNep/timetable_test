import TransformData from './transformData';

describe('transform data function should work properly', () => {
  let data;
  let changedData;

  beforeEach(() => {
    data = [
      {
        id: '1',
        data: JSON.stringify({
          fieldId: 'Monday10',
          owner: ['Maxim'],
          title: 'Cook food',
        }),
      },
    ];
    changedData = [
      {
        fieldId: 'Monday10',
        owner: ['Maxim'],
        title: 'Cook food',
        id: '1',
      },
    ];
  });

  test('should return proper value', () => {
    const res = TransformData.transformDataToMeeting(data);
    expect(res).toEqual(changedData);
  });

  test('should return length of events array not equal 2', () => {
    data.push({ id: '2', data: '' });
    const res = TransformData.transformDataToMeeting(data);
    expect(res.length).not.toBe(2);
  });
  test('should return length of events array  equal 2', () => {
    data.push({
      id: '2',
      data: JSON.stringify({
        fieldId: 'Monday12',
        owner: ['Maxim'],
        title: 'Cook food',
      }),
    });
    const res = TransformData.transformDataToMeeting(data);
    expect(res.length).toBe(2);
  });
});
