/* eslint-disable no-new */
import M from 'materialize-css';
import Table from './modules/Table';
import ContentHeader from './modules/ContentHeader';
import Modal from './modules/Modal';
import './assets/styles/index.scss';
import Alert from './modules/Alert';
import Loader from './modules/Loader/Loader';
import { user } from './data/tableData';
import { apiServiceUsers } from './utils/services/api/usersApi';

const content = document.querySelector('.content');

// eslint-disable-next-line indent
new Loader();
new ContentHeader(content);
const table1 = new Table(content);
export default table1;

document.addEventListener('DOMContentLoaded', async () => {
  const users = await apiServiceUsers.getUsers();
  if (!user) {
    // eslint-disable-next-line no-new
    new Modal('Please Authorize', users);

    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  } else {
    const message = `Hello, ${user.name}!`;
    Alert.render(content, { msg: message, type: 'success' });
  }
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});
