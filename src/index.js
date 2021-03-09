import M from 'materialize-css';
import ContentHeader from './modules/ContentHeader';
import Modal from './modules/Modal';
import './assets/styles/index.scss';
import Alert from './modules/Alert';
import { user } from './data/tableData';
// eslint-disable-next-line import/named
import { USERS } from './utils/api/endpoints';
import TransformData from './utils/helpers/transformData';
import Store from './modules/Store';
import ee from './utils/EventEmitter';
import TableComponent from './modules/TableComponent/TableComponent';

const content = document.querySelector('.content');

document.addEventListener('DOMContentLoaded', () => {
  ee.emit('getUsers', { endpoint: USERS });
});

ee.subscribe('recievedUsers', (props) => {
  const users = TransformData.transformDataToMeeting(props[0].res);
  Store.saveUsers(users);
  if (!user) {
    // eslint-disable-next-line no-new
    new Modal('Please Authorize', users);

    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  } else {
    const message = `Hello, ${user.name}!`;
    Alert.render(content, {
      msg: message,
      type: 'success',
    });
  }
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});
// eslint-disable-next-line no-new
new ContentHeader(content);
const table1 = new TableComponent(content);
export default table1;

const a = '2222';
