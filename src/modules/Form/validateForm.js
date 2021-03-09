import { showError } from '../../utils/helpers/showAlert';
export const validateForm = (valuesArray) => {
  let counter = 0;
  valuesArray.forEach((item) => {
    if (item.value.trim() === '') {
      counter++;
      showError(`Please fill ${item.id} field!`);
    }
  });
  if (counter === 0) {
    return true;
  } else {
    return false;
  }
};
