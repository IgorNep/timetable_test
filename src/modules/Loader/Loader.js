import './Loader.scss';
import source from './loading-x.gif';

const DEFAULT_TARGET = document.querySelector('.loader');
class Loader {
  constructor(target = DEFAULT_TARGET, timer = 1000) {
    this.target = target;
    this.timer = timer;
    this.render();
  }

  render() {
    this.container = document.createElement('div');
    this.container.className = 'loaderr';
    const image = document.createElement('img');
    image.className = 'loader__image';
    image.setAttribute('src', source);
    image.setAttribute('alt', 'loading');
    this.container.appendChild(image);
    this.target.appendChild(this.container);
    setTimeout(() => {
      this.remove();
    }, this.timer);
  }

  remove() {
    this.target.removeChild(this.container);
    localStorage.removeItem('loader');
  }
}
export default Loader;
