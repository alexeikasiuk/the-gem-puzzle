import _ from 'lodash';
import './style.css';
import Icon from './assets/images/icons/icon.svg';
import Print from './print.js';

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');
  const myIcon = new Image();

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  element.onclick = Print.bind(null, 'hello webpack 2!');

  myIcon.src = Icon;

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = Print;

  element.appendChild(myIcon);
  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
