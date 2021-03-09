const DEFAULT_TARGET = document.querySelector('body');

const customConfirm = (meeting, confirmDeleting) => {
  const form = document.createElement('form');
  form.className = 'confirm-window';
  const h3 = document.createElement('h3');
  h3.textContent = `Are you sure you want to delete "${meeting.title}" event?`;

  const buttonsGroup = document.createElement('div');
  buttonsGroup.className = 'btn-group ';
  const yesButton = document.createElement('button');
  yesButton.setAttribute('type', 'submit');
  const noButton = document.createElement('button');
  noButton.setAttribute('type', 'button');
  yesButton.className = 'btn';
  yesButton.textContent = 'Yes';

  buttonsGroup.appendChild(yesButton);
  buttonsGroup.appendChild(noButton);

  noButton.textContent = 'No';
  noButton.className = 'btn';
  noButton.onclick = (e) => {
    e.preventDefault();
    DEFAULT_TARGET.removeChild(form);
  };
  yesButton.setAttribute('autofocus', 'true');
  form.appendChild(h3);
  form.appendChild(buttonsGroup);
  DEFAULT_TARGET.appendChild(form);
  form.onsubmit = () => {
    DEFAULT_TARGET.removeChild(form);
    confirmDeleting(true);
  };
};
export default customConfirm;
