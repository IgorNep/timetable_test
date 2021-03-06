import { showSuccess, showError } from './showAlert';

const CatchDecorator = (target, key, descriptor) => {
  const originalMethod = descriptor.value;
  // eslint-disable-next-line no-param-reassign
  descriptor.value = async function (...args) {
    try {
      showSuccess();
      return await originalMethod.apply(this, args);
    } catch (error) {
      showError(error);
      return error;
    }
  };
  return descriptor;
};

export default CatchDecorator;
