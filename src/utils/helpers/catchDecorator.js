import Alert from '../../modules/Alert';

const DEFAULT_TARGET = document.querySelector('body');

const showError = (error) => {
  Alert.render(DEFAULT_TARGET, { msg: error, type: 'danger' });
};
const showSuccess = () => {
  Alert.render(DEFAULT_TARGET, { msg: 'Success!', type: 'success' });
};
const Catch = (target, key, descriptor) => {
  const originalMethod = descriptor.value;
  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function (...args) {
    try {
      showSuccess();
      return await originalMethod.apply(this, args);
    } catch (error) {
      showError(error);
    }
  };
  return descriptor;
};

export default Catch;
