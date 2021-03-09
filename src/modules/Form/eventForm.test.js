import { formTemplate } from './formTemplate';
import { validateForm } from './validateForm';

const form = document.createElement('form');
form.innerHTML = formTemplate();
document.body.appendChild(form);

describe('form submition', () => {
  const onSubmitForm = jest.fn();
  const onValidateSuccess = jest.fn();
  beforeEach(() => {
    onSubmitForm.mockClear();
    onValidateSuccess.mockClear();
  });
  form.onsubmit = (e) => {
    e.preventDefault();
    const title = form.querySelector('#titleField');
    const participants = form.querySelector('#Participants');
    const time = form.querySelector('#Time');
    const days = form.querySelector('#Days');
    const values = [title, participants, time, days];
    if (validateForm(values)) {
      onValidateSuccess();
    }
    onSubmitForm();
  };

  test('form submit should work', () => {
    form.submit();
    expect(onSubmitForm).toHaveBeenCalledTimes(1);
  });

  test('validation form: should return false', () => {
    form.submit();
    expect(onValidateSuccess).toHaveBeenCalledTimes(0);
  });

  test('validation values: should return true', () => {
    const values = [{ value: 'test' }, { value: 'test' }, { value: 'test' }];
    if (validateForm(values)) {
      onValidateSuccess();
    }
    expect(onValidateSuccess).toHaveBeenCalledTimes(1);
  });
  test('validation values: should return false', () => {
    const values = [{ value: ' ' }, { value: 'test' }, { value: 'test' }];
    if (validateForm(values)) {
      onValidateSuccess();
    }
    expect(onValidateSuccess).toHaveBeenCalledTimes(0);
  });
});
