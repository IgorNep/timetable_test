import M from 'materialize-css';
import './assets/styles/index.scss';
import Table from './modules/Table';
import ContentHeader from './modules/ContentHeader';

const content = document.querySelector('.content');

// eslint-disable-next-line no-unused-vars
const header1 = new ContentHeader(content);
const table1 = new Table(content);
export default table1;

document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});
