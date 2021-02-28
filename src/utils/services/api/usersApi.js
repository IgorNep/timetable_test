/* eslint-disable class-methods-use-this */
import Alert from '../../../modules/Alert';
// eslint-disable-next-line object-curly-newline
import { getApi, postApi } from './api';
import Store from '../../../modules/Store';
import ContentHeader from '../../../modules/ContentHeader/index';

const DEFAULT_TARGET = document.querySelector('body');

function getConfig() {
  return {
    headers: {
      'Content-type': 'application/json',
    },
  };
}
function showError(error) {
  Alert.render(DEFAULT_TARGET, { msg: error, type: 'danger' });
}

class ApiUsersService {
  // eslint-disable-next-line consistent-return
  async getUsers(addNew = false) {
    try {
      const users = [];
      const { data } = await getApi('/users');
      if (data !== null) {
        data.forEach((item) => {
          const newUser = JSON.parse(item.data);
          users.push(newUser);
        });
      }
      Store.saveUsers(users);
      if (addNew && users.length > 0) {
        ContentHeader.changeSelect(users);
      }

      return users;
    } catch (error) {
      showError(error);
    }
  }

  // eslint-disable-next-line consistent-return
  async addUserToDataBase(user) {
    try {
      const config = getConfig();
      const formData = {
        data: JSON.stringify(user),
      };
      await postApi('/users', formData, config);
      Alert.render(DEFAULT_TARGET, {
        msg: 'User has been added',
        type: 'success',
      });
      this.getUsers(true);
      return true;
    } catch (error) {
      showError(error);
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export const apiServiceUsers = new ApiUsersService();
