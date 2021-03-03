import './components/scss/style.scss';

function starter() {
  const body = document.querySelector('body');
  const h1 = document.createElement('h1');
  h1.innerHTML = 'What a life, man';
  body.appendChild(h1);
}

export default starter;
