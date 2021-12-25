import './style.scss';
import { line } from './types';
import Renderer from './renderer';

console.log('test');

window.addEventListener('load', () => {
  const outputScreen = document.querySelector<HTMLDivElement>('div#screen');
  if(!outputScreen) {
    throw Error('no output element');
  }
  const renderer = new Renderer(outputScreen, 720, 480);

  renderer.camera.coord.y = 10;
  renderer.camera.coord.z = -20;
  renderer.camera.focusDistance = 40;

  const lines: line[] = [
    {
      type: 'line',
      start: { x:  1, y: 0, z: 0, c: 0 },
      end:   { x:  0, y: 0, z: 0, c: 1 },
      color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -1, y: 0, z: 0, c: 0 },
      end:   { x:  0, y: 0, z: 0, c: 1 },
      color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: 0, y: 0, z:  1, c: 0 },
      end:   { x: 0, y: 0, z:  0, c: 1 },
      color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: 0, y: 0, z: -1, c: 0 },
      end:   { x: 0, y: 0, z:  0, c: 1 },
      color: { r: 0x7F, g: 0x7F, b: 0x7F, a: 1 },
      width: 1,
    },

    {
      type: 'line',
      start: { x:  5, y:  5, z: -5, c: 1 },
      end:   { x:  5, y:  5, z:  5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x:  5, y:  5, z:  5, c: 1 },
      end:   { x: -5, y:  5, z:  5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -5, y:  5, z:  5, c: 1 },
      end:   { x: -5, y:  5, z: -5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -5, y:  5, z: -5, c: 1 },
      end:   { x:  5, y:  5, z: -5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x:  5, y: -5, z: -5, c: 1 },
      end:   { x:  5, y: -5, z:  5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x:  5, y: -5, z:  5, c: 1 },
      end:   { x: -5, y: -5, z:  5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -5, y: -5, z:  5, c: 1 },
      end:   { x: -5, y: -5, z: -5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -5, y: -5, z: -5, c: 1 },
      end:   { x:  5, y: -5, z: -5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -5, y:  5, z: -5, c: 1 },
      end:   { x: -5, y: -5, z: -5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x:  5, y:  5, z: -5, c: 1 },
      end:   { x:  5, y: -5, z: -5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x: -5, y:  5, z:  5, c: 1 },
      end:   { x: -5, y: -5, z:  5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
    {
      type: 'line',
      start: { x:  5, y:  5, z:  5, c: 1 },
      end:   { x:  5, y: -5, z:  5, c: 1 },
      color: { r: 0xFF, g: 0x00, b: 0x00, a: 1 },
      width: 1,
    },
  ];

  renderer.render(lines);

  const rotX = document.querySelector<HTMLInputElement>('div#control input#rot_x');
  const rotY = document.querySelector<HTMLInputElement>('div#control input#rot_y');
  const rotZ = document.querySelector<HTMLInputElement>('div#control input#rot_z');
  if(rotX) {
    rotX.addEventListener('input', () => {
      renderer.camera.rotation.x = parseFloat(rotX.value) * Math.PI;
      renderer.render(lines);
    });
  }
  if(rotY) {
    rotY.addEventListener('input', () => {
      renderer.camera.rotation.y = parseFloat(rotY.value) * Math.PI;
      renderer.render(lines);
    });
  }
  if(rotZ) {
    rotZ.addEventListener('input', () => {
      renderer.camera.rotation.z = parseFloat(rotZ.value) * Math.PI;
      renderer.render(lines);
    });
  }
});