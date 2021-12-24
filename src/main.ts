import './style.scss';

console.log('test');

document.querySelector('body')?.appendChild((() => {
  const p = document.createElement('p');
  p.textContent = 'this is test';

  return p;
})());