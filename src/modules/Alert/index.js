import ee from '../../utils/EventEmitter/index';
import './Alert.scss';

class Alert {
  static render(target, payload) {
    const container = document.createElement('div');
    const { msg, type } = payload;
    container.className = `alert alert-${type}`;
    const p = document.createElement('p');
    p.innerHTML = `
    <i class="fa fa-info-circle">${msg}</i> 
    `;
    container.appendChild(p);
    target.appendChild(container);

    setTimeout(() => {
      target.removeChild(container);
    }, 2500);
  }
}

// ee.subscribe('getEvents', async () => {
//   setTimeout(() => {
//     Alert.render(document.querySelector('body'), {
//       msg: 'HOHOHO',
//       type: 'success',
//     });
//   }, 2500);
// });

export default Alert;
