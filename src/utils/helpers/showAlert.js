import Alert from '../../modules/Alert';

const DEFAULT_TARGET = document.querySelector('body');
export const showError = (error) => {
  Alert.render(DEFAULT_TARGET, { msg: error, type: 'danger' });
};
export const showSuccess = (msg = 'Success!') => {
  Alert.render(DEFAULT_TARGET, { msg, type: 'success' });
};
